import { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { ThemeContextType } from '@/types';
import { isClient } from '@/lib/utils';

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}

export function useThemeToggle() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    } else {
      setTheme('dark');
    }
  };
  
  return {
    theme,
    setTheme,
    toggleTheme,
    isDark: theme === 'dark' || (theme === 'system' && isClient && window.matchMedia('(prefers-color-scheme: dark)').matches),
    isLight: theme === 'light' || (theme === 'system' && isClient && !window.matchMedia('(prefers-color-scheme: dark)').matches),
    isSystem: theme === 'system',
  };
} 