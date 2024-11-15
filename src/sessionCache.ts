type UserSession = {
  hasPurchasedTrial: boolean;
  hasPurchasedSubscription: boolean;
  hasPurchasedReport: boolean;
  hasFinishedOnboarding: boolean;
};

const KEY = "intuvist-user-session";
const DEFAULT_SESSION: UserSession = {
  hasPurchasedTrial: false,
  hasPurchasedSubscription: false,
  hasPurchasedReport: false,
  hasFinishedOnboarding: false,
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
  hasPurchasedTrial: () => getSession().hasPurchasedTrial,
  hasPurchasedSubscription: () => getSession().hasPurchasedSubscription,
  hasPurchasedReport: () => getSession().hasPurchasedReport,
  hasFinishedOnboarding: () => getSession().hasFinishedOnboarding,
  setPurchasedTrial: () => setSession({ hasPurchasedTrial: true }),
  setPurchasedSubscription: () => setSession({ hasPurchasedSubscription: true }),
  setPurchasedReport: () => setSession({ hasPurchasedReport: true }),
  setFinishedOnboarding: () => setSession({ hasFinishedOnboarding: true }),
};
