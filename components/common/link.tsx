'use client ';
import { LinkProps } from 'next/link';
import { FC, use, useMemo } from 'react';
import NextLink from 'next/link';
import routes from '@/config/routes';
import { useTheme } from 'next-themes';

interface ThemeLink extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const ThemeLink: FC<ThemeLink> = ({ children, ...props }) => {
  const { href, className, onClick } = props;
  const { setTheme } = useTheme();
  const theme = useMemo(() => {
    if (href.toString() === routes.home) return 'system';
    else if (href.toString().includes(routes.swap.root)) {
      return 'violet';
    } else if (href.toString().includes(routes.earn.root)) {
      return 'orange';
    }
    if (href.toString().includes(routes.play.root)) {
      return 'yellow';
    }
    if (href.toString().includes(routes.tools.root)) {
      return 'white';
    }
    if (href.toString().includes(routes.info.root)) {
      return 'red';
    }
  }, [href]);

  return (
    <NextLink className={className} {...props}>
      {children}
    </NextLink>
  );
};

export default ThemeLink;
