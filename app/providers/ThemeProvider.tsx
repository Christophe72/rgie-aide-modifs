'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type ThemeCtx = { theme: Theme; toggle: () => void };

const Ctx = createContext<ThemeCtx>({ theme: 'light', toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');

  // Lecture de la préférence au montage (après hydration)
  useEffect(() => {
    let initial: Theme = 'light';
    try {
      const stored = localStorage.getItem('rgie-theme');
      if (stored === 'dark' || stored === 'light') {
        initial = stored;
      } else {
        // Fallback : lire la classe déjà appliquée par le script inline
        initial = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      }
    } catch {
      initial = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    }
    // Synchroniser la classe DOM avec la préférence lue
    document.documentElement.classList.toggle('dark', initial === 'dark');
    setTheme(initial);
  }, []);

  // Utilise le DOM comme source de vérité pour éviter les closures stales
  function toggle() {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next: Theme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', next === 'dark');
    try { localStorage.setItem('rgie-theme', next); } catch {}
    setTheme(next);
  }

  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}

export const useTheme = () => useContext(Ctx);
