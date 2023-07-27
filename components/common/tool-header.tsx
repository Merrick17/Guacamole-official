import { FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface ToolHeaderProps {
  className?: string;
  burnAll?: boolean;
  closeAll?: boolean;
  title: string;
}

const ToolHeader: FunctionComponent<ToolHeaderProps> = ({
  className,
  title,
  burnAll,
  closeAll,
}) => {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 md:flex-row items-center justify-between  capitalize',
        className
      )}
    >
      <h1 className="font-medium text-base text-[#4B5563]">{title}</h1>
      <div className="flex  flex-col gap-4 sm:flex-row  items-center sm:gap-5">
        {burnAll && (
          <Button
            size="sm"
            variant="destructive"
            className="text-sm font-medium capitalize py-[6px]"
          >
            <span className="text-sm font-medium ">Burn All Selected</span>
          </Button>
        )}
        {closeAll && (
          <Button
            size="sm"
            variant="destructive"
            className="text-sm font-medium capitalize py-[6px]"
          >
            <span className="text-sm font-medium ">Close All Selected</span>
          </Button>
        )}
        <Button size="sm" className="text-sm font-medium capitalize py-[6px]">
          <span>View tutorial</span>
        </Button>
      </div>
    </header>
  );
};

export default ToolHeader;
