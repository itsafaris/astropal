import React, { PropsWithChildren } from "react";

import { useQuizSnapshot, ShortTextState, DateState } from "@martynasj/quiz-lib";

import { getService } from "@utils/service";
import { getPersonalInfoFromState } from "@utils/state";

interface NumerologyData {
  zodiacSign: string;
  destinyNumber: number;
  favDay: string;
  favMetal: string;
  favStone: string;
}

const QuizServiceContext = React.createContext<{
  numerologyData?: NumerologyData;
} | null>(null);

export function QuizServiceWrapper({ children }: PropsWithChildren<{}>) {
  const state = useQuizSnapshot();

  const [numerologyData, setNumerologyData] = React.useState<NumerologyData | undefined>();

  React.useEffect(() => {
    async function fetchNumerologyData() {
      if (!state) {
        return;
      }

      const nameState = state.slideStateByID["birth-name"] as ShortTextState;
      const birthdateState = state.slideStateByID["birth-date"] as DateState;

      if (
        nameState &&
        nameState.value &&
        nameState.confirmed &&
        birthdateState &&
        birthdateState.value &&
        birthdateState.confirmed &&
        !numerologyData
      ) {
        const service = getService({ mock: false });
        const personalInfo = getPersonalInfoFromState(state.slideStateByID);
        const numerologyData = await service.getNumerologyData({
          day: birthdateState.value.day,
          month: birthdateState.value.month,
          year: birthdateState.value.year,
          name: nameState.value,
        });

        setNumerologyData({
          zodiacSign: personalInfo.yourZodiac.name,
          destinyNumber: numerologyData.destiny_number,
          favDay: numerologyData.fav_day,
          favMetal: numerologyData.fav_metal,
          favStone: numerologyData.fav_stone,
        });
      }
    }

    fetchNumerologyData();
  }, [state, state.slideStateByID]);

  const ctxValue = React.useMemo(() => {
    return {
      numerologyData,
    };
  }, [numerologyData]);

  return <QuizServiceContext.Provider value={ctxValue}>{children}</QuizServiceContext.Provider>;
}

export function useQuizServiceWrapper() {
  const ctx = React.useContext(QuizServiceContext);
  if (!ctx) {
    throw new Error("useQuizServiceWrapper must be used within QuizServiceContext");
  }

  return ctx;
}
