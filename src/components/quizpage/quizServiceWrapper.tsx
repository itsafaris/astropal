import React, { PropsWithChildren } from "react";

interface NumerologyData {
  zodiacSign: string;
  destinyNumber: number;
  favDay: string;
  favMetal: string;
  favStone: string;
}

const QuizServiceContext = React.createContext<{
  setNumerologyData: (data: NumerologyData) => void;
  numerologyData?: NumerologyData;
} | null>(null);

export function QuizServiceWrapper({ children }: PropsWithChildren<{}>) {
  const [numerologyData, setNumerologyData] = React.useState<NumerologyData | undefined>();

  const ctxValue = React.useMemo(() => {
    return {
      numerologyData,
      setNumerologyData,
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
