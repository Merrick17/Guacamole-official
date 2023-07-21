import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

export const Link = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) => {
  return (
    <a
      className={cn(className, 'underline')}
      rel="noopener noreferrer"
      target="_blank"
      href={href}
    >
      {children}
    </a>
  );
};
