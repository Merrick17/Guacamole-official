import { FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ToolHeaderProps {
  className?: string;
  burnAll?: boolean;
  closeAll?: boolean;
  title: string;
  handleBurn?: () => void;
  tutorialLink: string;
}

const ToolHeader: FunctionComponent<ToolHeaderProps> = ({
  className,
  title,
  closeAll,
  burnAll,
  handleBurn,
  tutorialLink
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
            className="text-sm font-medium capitalize py-[6px] h-[32px]"
            onClick={handleBurn}
          >
            <span className="text-sm font-medium ">Burn All Selected</span>
          </Button>
        )}
        {closeAll && (
          <Button
            size="sm"
            variant="destructive"
            className="text-sm font-medium capitalize py-[6px] h-[32px]"
            onClick={handleBurn}
          >
            <span className="text-sm font-medium ">Close All Selected</span>
          </Button>
        )}
        <Link
          href={tutorialLink}
          target='_blank'
          rel="noopener noreferrer"
           className="text-sm font-medium capitalize py-[6px] rounded-lg text-white bg-black px-3 hover:bg-black/80 transition-colors " >
          <span>View tutorial</span>
        </Link>
      </div>
    </header>
  );
};

export default ToolHeader;
