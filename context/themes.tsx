'use client';

import routes from '@/config/routes';
import { ThemeProvider, useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { ReactNode, useLayoutEffect } from 'react';

export function Themes({ children }) {
  return (
    <ThemeProvider>
      <ThemeAutoSwitcher>{children}</ThemeAutoSwitcher>
    </ThemeProvider>
  );
}

const ThemeAutoSwitcher = ({ children }) => {
  const { setTheme } = useTheme();
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (pathname.includes(routes.trade.root)) {
      setTheme('violet');
    } else if (pathname.includes(routes.earn.root)) {
      setTheme('orange');
    } else if (pathname.includes(routes.play.root)) {
      setTheme('yellow');
    } else if (pathname.includes(routes.tools.root)) {
      setTheme('white');
    } else if (pathname.includes(routes.launch.root)) {
      setTheme('red');
    } else {
      setTheme('system');
    }
  }, [pathname, setTheme]);

  return <>{children}</>;
};
