import { useCallback, useEffect, useState } from 'react';
import { readStorageString, writeStorageString } from '../services/storage';
import type { ThemeMode } from '../types/academy';

const THEME_STORAGE_KEY = 'ai_academy_theme_v1';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    const saved = readStorageString(THEME_STORAGE_KEY, 'dark');
    return saved === 'light' ? 'light' : 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    root.style.colorScheme = theme;
    writeStorageString(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const setTheme = useCallback((next: ThemeMode) => {
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, setTheme, toggleTheme };
}
