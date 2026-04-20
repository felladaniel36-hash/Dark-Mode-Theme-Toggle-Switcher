import { createContext, useContext, useCallback, useEffect, useState, type ReactNode } from 'react';

export type ThemeName = 'dark' | 'light' | 'midnight' | 'ocean' | 'forest' | 'sunset';
type BaseTheme = 'dark' | 'light';

interface ThemeContextType {
  theme: ThemeName;
  baseTheme: BaseTheme;
  isPresetActive: boolean;
  toggleTheme: () => void;
  setTheme: (theme: ThemeName) => void;
  applyPreset: (preset: ThemeName) => void;
  resetToDefault: () => void;
}

const THEME_STORAGE_KEY = 'luna-theme';
const VALID_THEMES: ThemeName[] = ['dark', 'light', 'midnight', 'ocean', 'forest', 'sunset'];
const PRESET_THEMES: ThemeName[] = ['midnight', 'ocean', 'forest', 'sunset'];

function isValidTheme(value: string): value is ThemeName {
  return VALID_THEMES.includes(value as ThemeName);
}

function isPreset(theme: ThemeName): boolean {
  return PRESET_THEMES.includes(theme);
}

function getSystemPreference(): BaseTheme {
  if (typeof window === 'undefined') return 'dark';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getInitialTheme(): { theme: ThemeName; fromStorage: boolean } {
  if (typeof window === 'undefined') return { theme: 'dark', fromStorage: false };

  const stored = localStorage.getItem(THEME_STORAGE_KEY);
  if (stored && isValidTheme(stored)) {
    return { theme: stored, fromStorage: true };
  }

  return { theme: getSystemPreference(), fromStorage: false };
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [{ theme, fromStorage }, setThemeState] = useState(getInitialTheme);
  const [isPresetActive, setIsPresetActive] = useState(isPreset(theme));

  const baseTheme: BaseTheme = PRESET_THEMES.includes(theme) ? 'dark' : (theme as BaseTheme);

  // Apply theme attribute to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Listen for system preference changes (only if no user preference stored)
  useEffect(() => {
    if (fromStorage) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const newTheme: BaseTheme = e.matches ? 'dark' : 'light';
      setThemeState({ theme: newTheme, fromStorage: false });
      setIsPresetActive(false);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [fromStorage]);

  const setTheme = useCallback((newTheme: ThemeName) => {
    setThemeState({ theme: newTheme, fromStorage: true });
    setIsPresetActive(isPreset(newTheme));

    // Only persist dark/light to localStorage
    if (newTheme === 'dark' || newTheme === 'light') {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prevState) => {
      const currentBase = PRESET_THEMES.includes(prevState.theme) ? 'dark' : (prevState.theme as BaseTheme);
      const newTheme: BaseTheme = currentBase === 'dark' ? 'light' : 'dark';
      setIsPresetActive(false);
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      return { theme: newTheme, fromStorage: true };
    });
  }, []);

  const applyPreset = useCallback((preset: ThemeName) => {
    setThemeState({ theme: preset, fromStorage: false });
    setIsPresetActive(true);
  }, []);

  const resetToDefault = useCallback(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored && isValidTheme(stored) && (stored === 'dark' || stored === 'light')) {
      setThemeState({ theme: stored, fromStorage: true });
    } else {
      const systemPref = getSystemPreference();
      setThemeState({ theme: systemPref, fromStorage: false });
    }
    setIsPresetActive(false);
  }, []);

  return (
    <ThemeContext.Provider
      value={{ theme, baseTheme, isPresetActive, toggleTheme, setTheme, applyPreset, resetToDefault }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
