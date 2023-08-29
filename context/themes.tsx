'use client';

import { ThemeProvider } from 'next-themes';

export function Themes({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
