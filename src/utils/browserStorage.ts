type StorageType = "session" | "local";

function getStorage(storageType: StorageType) {
  return storageType === "session" ? sessionStorage : localStorage;
}

function set<T>(storageType: StorageType, name: string, state: T): void {
  getStorage(storageType).setItem(name, JSON.stringify(state));
}

function remove(storageType: StorageType, name: string): void {
  getStorage(storageType).removeItem(name);
}

function get<T>(
  storageType: StorageType,
  name: string,
  validate?: (state: unknown) => state is T
): T | undefined {
  const storage = getStorage(storageType);

  const it = storage.getItem(name);
  if (!it) {
    return;
  }

  let state: unknown;

  try {
    state = JSON.parse(it);
  } catch (err) {
    console.error("Session storage: failed to parse data");
    storage.removeItem(name);
    return;
  }

  if (typeof state !== "object" || state == null) {
    storage.removeItem(name);
    return;
  }

  if (validate && !validate(state)) {
    storage.removeItem(name);
    return;
  }

  return state as T;
}

export const storage = {
  set,
  remove,
  get,
};
