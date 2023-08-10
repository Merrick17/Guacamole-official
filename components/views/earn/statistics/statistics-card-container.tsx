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
        'w-full h-full p-6 rounded-lg border border-[#E5E7EB]',
        className
      )}
    >
      {children}
    </div>
  );
};

export default StatisticsCardContainer;
