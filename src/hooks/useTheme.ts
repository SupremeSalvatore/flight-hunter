import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    // Initialize from system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove('light', 'dark');

    // Apply theme class
    root.classList.add(theme);

    // Store preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Listen for system theme changes (optional - only active if explicitly enabled)
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      // Only auto-switch if user hasn't set a preference
      if (!localStorage.getItem('theme')) {
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');
        root.classList.add(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return { theme, setTheme };
}
