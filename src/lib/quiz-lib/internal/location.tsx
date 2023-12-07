import { AsyncSelect } from "chakra-react-select";
import { useCallback, useState } from "react";
import { useQuizConfig } from "../public/quiz";
import { useSlide } from "../public/slide";
import { SlidePropsLocation } from "../public/types";
import { LocationState, LocationValue, useQuizActions, useQuizSnapshot } from "./state";
import { debounce } from "./utils";
import { commonInputStyles } from "./commonInput";

type SelectOptionType = LocationValue;

type LocationApiResult =
  | Array<{
      address: { country: string; name: string; state: string };
      lat: string;
      lon: string;
      place_id: string;
    }>
  | { error: string };

const getApiURL = (apiKey: string, query: string) => {
  const places = ["city", "town"];
  const placeTags = places.map((p) => `place:${p}`).join(",");

  const p = new URLSearchParams();
  p.set("q", query);
  p.set("key", apiKey);
  p.set("tag", placeTags);

  return `https://api.locationiq.com/v1/autocomplete?${p.toString()}`;
};

async function fetchOptions(
  apiKey: string,
  input: string
): Promise<SelectOptionType[] | { error: { message: string; [prop: string]: any } }> {
  try {
    const res = await fetch(getApiURL(apiKey, input));
    const r = (await res.json()) as LocationApiResult;

    // this is ok for us, not an error
    if (res.status === 404) {
      return [];
    }

    if ("error" in r) {
      return {
        error: {
          message: r.error,
          status: res.status,
        },
      };
    }

    return r.map((it) => {
      const formattedLabel = [it.address.name, it.address.state, it.address.country].join(", ");
      return {
        formattedText: formattedLabel,
        placeID: it.place_id,
        lat: it.lat,
        long: it.lon,
      };
    });
  } catch (err) {
    return {
      error: {
        message: "fetch location options unknown error",
        originalErr: err,
      },
    };
  }
}

export type LocationProps = {} & SlidePropsLocation;

export function Location({ placeholder }: LocationProps) {
  const quizConfig = useQuizConfig();
  const actions = useQuizActions();
  const slide = useSlide();
  const snap = useQuizSnapshot();
  const [inputValue, setInputValue] = useState("");

  const state = snap.currentSlideState as LocationState;

  const loadOptionsDebounced = useCallback(
    debounce((inputValue: string, cb: (options: SelectOptionType[]) => void) => {
      fetchOptions(quizConfig.locationApiKey, inputValue).then((result) => {
        if ("error" in result) {
          quizConfig.onErrorEvent?.({ name: "error", data: result.error });
          cb([]);
          return;
        }
        cb(result);
      });
    }, 350),
    []
  );

  return (
    <AsyncSelect
      chakraStyles={{
        container: (provided) => ({
          ...provided,
          width: "full",
        }),
        control: (provided) => ({
          ...provided,
          ...commonInputStyles(),
        }),
      }}
      cacheOptions
      noOptionsMessage={() => "No locations found"}
      onChange={(e) => {
        actions.setLocationValue(slide.id, e ?? undefined);
      }}
      onInputChange={(val) => {
        setInputValue(val);
      }}
      onFocus={() => {
        setInputValue(" "); // empty string doesn't work, so using a single space here
      }}
      inputValue={inputValue}
      isClearable
      isSearchable
      blurInputOnSelect
      getOptionLabel={(o) => o.formattedText}
      getOptionValue={(o) => o.placeID}
      value={state.value}
      openMenuOnClick={false}
      loadOptions={loadOptionsDebounced}
      placeholder={placeholder}
      components={{
        DropdownIndicator: null,
      }}
    />
  );
}
