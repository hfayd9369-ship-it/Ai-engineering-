export function readStorageJson<T>(key: string, fallback: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeStorageJson<T>(key: string, value: T): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage quota or private-browsing failures safely
  }
}

export function readStorageString(key: string, fallback: string): string {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return fallback;
    }
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStorageString(key: string, value: string): void {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage errors safely
  }
}
