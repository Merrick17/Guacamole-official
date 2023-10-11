import { cn } from '@/lib/utils';
import { FC } from 'react';

interface StatisticsCardContainerProps {
  children: React.ReactNode;
  className?: string;
}

const StatisticsCardContainer: FC<StatisticsCardContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'w-full  h-full bg-background  p-6 rounded-lg border border-transparent hover:border-primary transition-colors duration-500 ease-in-out',
        className
      )}
    >
      {children}
    </div>
  );
};

export default StatisticsCardContainer;
