'use client';

import React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Theme } from '@/contexts/ThemeContext';

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <Select
      value={theme}
      onValueChange={(value) => {
        setTheme(value as Theme);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Thème">
          <div className="flex items-center">
            {theme === 'light' && <Sun className="w-4 h-4 mr-2" />}
            {theme === 'dark' && <Moon className="w-4 h-4 mr-2" />}
            {theme === 'system' && <Monitor className="w-4 h-4 mr-2" />}
            {theme === 'light' && 'Clair'}
            {theme === 'dark' && 'Sombre'}
            {theme === 'system' && 'Système'}
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <div className="flex items-center">
            <Sun className="w-4 h-4 mr-2" />
            Clair
          </div>
        </SelectItem>
        <SelectItem value="dark">
          <div className="flex items-center">
            <Moon className="w-4 h-4 mr-2" />
            Sombre
          </div>
        </SelectItem>
        <SelectItem value="system">
          <div className="flex items-center">
            <Monitor className="w-4 h-4 mr-2" />
            Système
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
} 