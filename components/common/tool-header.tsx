import { FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';

interface ToolHeaderProps {
  className?: string;
  burnAll?: boolean;
  title: string;
}

const ToolHeader: FunctionComponent<ToolHeaderProps> = ({
  className,
  title,
  burnAll,
}) => {
  return (
    <header
      className={cn(
        'flex flex-row items-center justify-between  capitalize',
        className
      )}
    >
      <h1 className="font-medium text-base text-[#4B5563]">{title}</h1>
      <div className="flex flex-row items-center gap-5">
        {burnAll && (
          <Button
            size="sm"
            variant="destructive"
            className="text-sm font-medium capitalize py-[6px]"
          >
            <span className="text-sm font-medium ">Burn All Selected</span>
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
