type UserSession = {
  hasPerformedPurchase: boolean;
};

const KEY = "intuvist-user-session";
const DEFAULT_SESSION: UserSession = {
  hasPerformedPurchase: false,
};

function setSession(input: UserSession) {
  sessionStorage.setItem(KEY, JSON.stringify(input));
}

function getSession(): UserSession | undefined {
  const item = sessionStorage.getItem(KEY);
  if (!item) {
    return;
  }

  try {
    return JSON.parse(item);
  } catch (err) {
    console.error("Failed to parse user session data from session storage");
  }
}

function createNewCache(): void {
  const session = getSession();
  if (session) {
    return;
  }

  setSession(DEFAULT_SESSION);
}

function registerPurchase(): void {
  const session = getSession();

  setSession({
    ...(session ? session : DEFAULT_SESSION),
    hasPerformedPurchase: true,
  });
}

function hasPurchased(): boolean {
  const session = getSession();
  if (!session) {
    setSession(DEFAULT_SESSION);
    return DEFAULT_SESSION.hasPerformedPurchase;
  }

  return session.hasPerformedPurchase;
}

export const sessionCache = {
  createNewCache,
  registerPurchase,
  hasPurchased,
};
