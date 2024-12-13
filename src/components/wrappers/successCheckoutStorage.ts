import { storage as browserStorage } from "@utils/browserStorage";

type SuccessCheckoutData = {
  hasFinishedOnboarding: boolean;
  hasConverted: boolean;
  conversionDetails: ConversionDetails;
  report: Report;
  subscription: Subscription;
};

type Report =
  | {
      status: "initial";
    }
  | {
      status: "purchase-started" | "purchase-finalized";
      productID: string;
    };

type Subscription = {
  status: "initial" | "purchase-finalized";
};

type ConversionDetails = {
  paymentType?: string;
  value?: number;
  currency?: string;
  planID?: string;
  userID?: string;
};

const KEY = "intuvist-success-checkout";
const DEFAULT_DATA: SuccessCheckoutData = {
  hasFinishedOnboarding: false,
  hasConverted: false,
  conversionDetails: {},
  report: { status: "initial" },
  subscription: { status: "initial" },
};

function get(): SuccessCheckoutData {
  const cache = browserStorage.get<SuccessCheckoutData>("session", KEY);
  if (cache) {
    return cache;
  }

  return DEFAULT_DATA;
}

function set(data: Partial<SuccessCheckoutData>) {
  const cache = get();
  browserStorage.set("session", KEY, { ...cache, ...data });
}

function createNewStorage(): void {
  const session = get();
  if (session) {
    console.log("Success checkout: data in storage already exists");
    return;
  }

  set(DEFAULT_DATA);
}

export const storage = {
  createNewStorage,
  hasConverted: () => get().hasConverted,
  setHasConverted: () => set({ hasConverted: true }),
  getConversionDetails: () => get().conversionDetails,
  setConversionDetails: (conversionDetails: ConversionDetails) => set({ conversionDetails }),
  hasFinishedOnboarding: () => get().hasFinishedOnboarding,
  setHasFinishedOnboarding: () => set({ hasFinishedOnboarding: true }),
  getReport: () => get().report,
  setReport: (report: Report) => set({ report }),
  getSubscription: () => get().subscription,
  setSubscription: (subscription: Subscription) => set({ subscription }),
};
