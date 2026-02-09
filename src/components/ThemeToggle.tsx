import { Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';

export function ThemeToggle() {
  const { t } = useTranslation();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const oppositeMode = theme === 'light' ? t('theme.dark') : t('theme.light');

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors border border-border shadow-sm"
      aria-label={t('theme.switchTo', { mode: oppositeMode })}
      title={t('theme.switchTo', { mode: oppositeMode })}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="text-sm font-medium">
        {theme === 'light' ? t('theme.darkLabel') : t('theme.lightLabel')}
      </span>
    </button>
  );
}
