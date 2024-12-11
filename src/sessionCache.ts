type UserSession = {
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
};

const KEY = "intuvist-user-session";
const DEFAULT_SESSION: UserSession = {
  hasFinishedOnboarding: false,
  hasConverted: false,
  conversionDetails: {},
  report: { status: "initial" },
  subscription: { status: "initial" },
};

function setSession(input: Partial<UserSession>) {
  const session = getSession() ?? DEFAULT_SESSION;
  sessionStorage.setItem(KEY, JSON.stringify({ ...session, ...input }));
}

function getSession(): UserSession {
  const item = sessionStorage.getItem(KEY);
  if (!item) {
    return DEFAULT_SESSION;
  }

  try {
    return JSON.parse(item);
  } catch (err) {
    console.error("Failed to parse user session data from session storage");
    return DEFAULT_SESSION;
  }
}

function createNewCache(): void {
  const session = getSession();
  if (session) {
    return;
  }

  setSession(DEFAULT_SESSION);
}

export const sessionCache = {
  createNewCache,
  hasConverted: () => getSession().hasConverted,
  setHasConverted: () => setSession({ hasConverted: true }),
  getConversionDetails: () => getSession().conversionDetails,
  setConversionDetails: (conversionDetails: ConversionDetails) => setSession({ conversionDetails }),
  hasFinishedOnboarding: () => getSession().hasFinishedOnboarding,
  setHasFinishedOnboarding: () => setSession({ hasFinishedOnboarding: true }),
  getReport: () => getSession().report,
  setReport: (report: Report) => setSession({ report }),
  getSubscription: () => getSession().subscription,
  setSubscription: (subscription: Subscription) => setSession({ subscription }),
};
