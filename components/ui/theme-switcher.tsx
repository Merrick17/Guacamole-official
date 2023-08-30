'use client';
import { useState, useEffect, useLayoutEffect } from 'react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import routes from '@/config/routes';
import Link from 'next/link';

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  const pathname = usePathname();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (pathname === routes.home) {
      setTheme('system');
    }
    if (pathname.includes(routes.trade.root)) {
      setTheme('violet');
    }
    if (pathname.includes(routes.earn.root)) {
      setTheme('orange');
    }
    if (pathname.includes(routes.play.root)) {
      setTheme('yellow');
    }
    if (pathname.includes(routes.tools.root)) {
      setTheme('white');
    }
    if (pathname.includes(routes.info.root)) {
      setTheme('red');
    }
  }, [pathname, setTheme]);

  if (!mounted) {
    return null;
  }
  return (
    <div className="fixed z-50 top-1/4 left-0 w-max h-max flex flex-col gap-5  ">
      <Link
        href={routes.home}
        className={cn(
          'p-3 w-max h-max flex items-center justify-center  rounded-tr-lg rounded-br-lg overflow-hidden bg-foreground ',
          pathname === routes.home && 'shadow-themeButtonShadow'
        )}
      >
        <Image
          src="/images/themes/green.png"
          width={24}
          height={24}
          alt="green"
        />
      </Link>
      <Link
        href={routes.trade.root}
        className={cn(
          'p-3 w-max h-max flex items-center justify-center  rounded-tr-lg rounded-br-lg overflow-hidden bg-foreground ',
          pathname.includes(routes.trade.root) && 'shadow-themeButtonShadow'
        )}
      >
        <Image
          src="/images/themes/violet.png"
          width={24}
          height={24}
          alt="light"
        />
      </Link>
      <Link
        href={routes.earn.root}
        className={cn(
          'p-3 w-max h-max flex items-center justify-center  rounded-tr-lg rounded-br-lg overflow-hidden bg-foreground ',
          pathname.includes(routes.earn.root) && 'shadow-themeButtonShadow'
        )}
      >
        <Image
          src="/images/themes/orange.png"
          width={24}
          height={24}
          alt="light"
        />
      </Link>
      <Link
        href={routes.play.root}
        className={cn(
          'p-3 w-max h-max flex items-center justify-center  rounded-tr-lg rounded-br-lg overflow-hidden bg-foreground ',
          pathname.includes(routes.play.root) && 'shadow-themeButtonShadow'
        )}
      >
        <Image
          src="/images/themes/yellow.png"
          width={24}
          height={24}
          alt="light"
        />
      </Link>
      <Link
        href={routes.tools.root}
        className={cn(
          'p-3 w-max h-max flex items-center justify-center  rounded-tr-lg rounded-br-lg overflow-hidden bg-foreground ',
          pathname.includes(routes.tools.root) && 'shadow-themeButtonShadow'
        )}
      >
        <Image
          src="/images/themes/white.png"
          width={24}
          height={24}
          alt="light"
        />
      </Link>
      <Link
        href={routes.info.root}
        className={cn(
          'p-3 w-max h-max flex items-center justify-center  rounded-tr-lg rounded-br-lg overflow-hidden bg-foreground ',
          pathname.includes(routes.info.root) && 'shadow-themeButtonShadow'
        )}
      >
        <Image
          src="/images/themes/red.png"
          width={24}
          height={24}
          alt="light"
        />
      </Link>
    </div>
  );
};

export default ThemeSwitcher;
