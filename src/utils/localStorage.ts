export function saveToStorage<T extends object>(name: string, state: T) {
  localStorage.setItem(name, JSON.stringify(state));
}

export function clearStorage(name: string) {
  localStorage.removeItem(name);
}

export function loadFromStorage<T extends object>(
  name: string,
  validate: (state: object) => state is T
) {
  const it = localStorage.getItem(name);
  if (!it) {
    return;
  }

  let state: unknown;

  try {
    state = JSON.parse(it);
  } catch (err) {
    localStorage.removeItem(name);
    return;
  }

  if (typeof state !== "object" || state == null) {
    localStorage.removeItem(name);
    return;
  }

  if (!validate(state)) {
    localStorage.removeItem("quizstate");
    return;
  }

  return state;
}
