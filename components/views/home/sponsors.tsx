import FallbackImage from '@/components/common/FallbackImage';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import Image from 'next/image';

const Sponsors = () => {
  return (
    <div className="p-6 flex flex-row flex-wrap w-full items-center gap-6 justify-center rounded-lg border border-[#E5E7EB] bg-white">
      {sponsorList.map((sponsor) => (
        <TooltipProvider key={sponsor.name}>
          <Tooltip>
            <TooltipTrigger>
              <FallbackImage
                src={sponsor.href}
                alt={sponsor.name}
                width={42}
                height={42}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>{sponsor.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );
};

const sponsorList = [
  {
    name: 'Jupiter',
    href: '/images/home/sponsors/Jupiter.png',
  },
  {
    name: 'Orca',
    href: '/images/home/sponsors/Orca.png',
  },
  {
    name: 'Raydium',
    href: '/images/home/sponsors/Raydium.png',
  },
  {
    name: 'Goose',
    href: '/images/home/sponsors/Goose.png',
  },
  {
    name: 'Openbook',
    href: '/images/home/sponsors/Openbook.png',
  },
  {
    name: 'Meteora',
    href: '/images/home/sponsors/Meteora.png',
  },
  {
    name: 'Marinade',
    href: '/images/home/sponsors/Marinade.png',
  },
  {
    name: 'Saber',
    href: '/images/home/sponsors/Saber.png',
  },
  {
    name: 'Lifinity',
    href: '/images/home/sponsors/Lifinity.png',
  },
  {
    name: 'Saros',
    href: '/images/home/sponsors/Saros.png',
  },
  {
    name: 'Invariant',
    href: '/images/home/sponsors/Invariant.png',
  },
  {
    name: 'Oasis',
    href: '/images/home/sponsors/Oasis.png',
  },
  {
    name: 'Phoenix',
    href: '/images/home/sponsors/Phoenix.png',
  },
  {
    name: 'Symmetry',
    href: '/images/home/sponsors/Symmetry.png',
  },
  {
    name: 'BonkSwap',
    href: '/images/home/sponsors/BonkSwap.png',
  },
  {
    name: 'Stepn',
    href: '/images/home/sponsors/Stepn.png',
  },
  {
    name: 'Mayan',
    href: '/images/home/sponsors/Mayan.png',
  },
  {
    name: 'Guac',
    href: '/images/home/sponsors/Guac.png',
  },
];

export default Sponsors;
