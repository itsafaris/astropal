export function createExternalURL<T = Record<string, any>>(pathname: string, params: T): string {
  const result = new URL(window.location.href);
  result.pathname = pathname;

  for (let key in params) {
    result.searchParams.set(key, String(params[key as keyof typeof params]));
  }

  return result.toString();
}

export function createInternalURL<T = Record<string, any>>(pathname: string, params: T): string {
  const result = new URL(window.location.href);
  result.pathname = pathname;

  for (let key in params) {
    result.searchParams.set(key, String(params[key as keyof typeof params]));
  }

  return result.pathname + result.search;
}

export function parseURLParams<T extends Record<string, any>>(urlString: string): Partial<T> {
  const result: Partial<T> = {};

  const url = new URL(urlString);
  url.searchParams.forEach((value, key) => {
    (result as Record<string, any>)[key] = value;
  });

  return result;
}
