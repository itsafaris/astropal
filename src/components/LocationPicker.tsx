import { AsyncSelect } from "chakra-react-select";
import { FormControl, SelectProps } from "@chakra-ui/react";
import { useCallback, useState } from "react";

export type LocationValue = Readonly<{
  formattedText: string;
  placeID: string;
  lat: number;
  long: number;
}>;

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
): Promise<LocationValue[] | { error: { message: string; [prop: string]: any } }> {
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
        lat: Number(it.lat),
        long: Number(it.lon),
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

const locationApiKey = "pk.ce6e81605ad27d8ee1815287902636e1";

export type LocationProps = { onSelect: (value: LocationValue) => void };

export function LocationPicker({ onSelect }: LocationProps) {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState<LocationValue | null>(null);

  const inputStyles = commonInputStyles();

  const loadOptionsDebounced = useCallback(
    debounce((inputValue: string, cb: (options: LocationValue[]) => void) => {
      fetchOptions(locationApiKey, inputValue).then((result) => {
        if ("error" in result) {
          cb([]);
          return;
        }
        cb(result);
      });
    }, 350),
    []
  );

  return (
    <FormControl>
      <AsyncSelect
        size={"lg"}
        chakraStyles={{
          container: (provided) => ({
            ...provided,
            width: "full",
          }),
          control: (provided) => ({
            ...provided,
            ...inputStyles,
          }),
          placeholder: (provided) => ({
            ...provided,
            ...inputStyles._placeholder,
          }),
        }}
        cacheOptions
        noOptionsMessage={() => "No locations found"}
        onChange={(e) => {
          setValue(e);

          if (e != null) {
            onSelect(e);
          }
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
        value={value}
        openMenuOnClick={false}
        loadOptions={loadOptionsDebounced}
        placeholder={"Enter your city"}
        components={{
          DropdownIndicator: null,
        }}
      />
    </FormControl>
  );
}

function commonInputStyles() {
  return {
    size: "lg",
    _hover: {
      borderColor: "bg.600",
    },
    _placeholder: {
      color: "text.400",
    },
    borderColor: "bg.600",
    borderWidth: 1,
    backgroundColor: "bg.200",
    color: "text.main",
  } satisfies SelectProps;
}

function debounce<T extends Function>(fn: T, delay = 250): T {
  let timeout: number | undefined;

  // @ts-expect-error
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      return fn(...args);
    }, delay) as unknown as number;
  };
}
