import { FunctionComponent } from 'react';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import routes from '@/config/routes';
import Image from 'next/image';

interface EarnHeaderProps {
  className?: string;
  viewAll?: boolean;
  title: string;
  tutorialLink: string;
}

const EarnHeader: FunctionComponent<EarnHeaderProps> = ({
  className,
  title,
  viewAll = false,
  tutorialLink,
}) => {
  return (
    <header
      className={cn(
        'flex flex-col gap-4 md:flex-row items-center justify-between  capitalize',
        className
      )}
    >
      <div className="flex flex-row gap-2 items-center">
        <div className="shrink-0 w-5 aspect-square">
          <Image
            src="/icons/earn/dynamic-vault.png"
            width={20}
            height={20}
            alt="trending"
          />
        </div>
        <h1 className="text-xl font-medium capitalize">{title}</h1>
      </div>
      <div className="flex  flex-col gap-4 sm:flex-row  items-center sm:gap-5">
        <Link
          href={viewAll ? routes.earn.dynamicVault : routes.earn.statistics}
          className="text-sm font-medium capitalize py-[6px] rounded-lg text-primary-foreground bg-primary px-3 transition-colors "
        >
          <span>{viewAll ? 'View All Vaults' : 'View Statistics'}</span>
        </Link>
        <Link
          href={tutorialLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium capitalize py-[6px] rounded-lg text-white bg-black px-3 transition-colors "
        >
          <span>View tutorial</span>
        </Link>
      </div>
    </header>
  );
};

export default EarnHeader;
