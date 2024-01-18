import ExploreCard from '@/components/common/explore-card';
import InfoCard from '@/components/common/info-card';
import Play from '@/components/views/play';
import routes from '@/config/routes';

const Page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-3 lg:px-8 py-6 md:px-16 md:py-12   max-w-[1440px]">
      <div
        className={
          ' mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6'
        }
      >
        {featuredTools.map((tool, index) => (
          <ExploreCard key={index} {...tool} />
        ))}

        {tools.map((tool, index) => (
          <InfoCard key={index} {...tool} />
        ))}
      </div>
    </main>
  );
};

export default Page;

const featuredTools: {
  image: string;
  title: string;
  description: string;
  href: string;
  buttonTxt?: string;
}[] = [
  {
    title: 'Play Dice',
    description:
      'Change your settings and bet on the outcome of a randomized dice roll.',
    href: routes.play.dice,
    image: '/images/play/dice.png',
    buttonTxt: 'Play Now',
  },
  {
    title: 'Play Roulette',
    description:
      'Place your chips on the board to speculate where the ball will land on a spinning wheel.',
    href: routes.play.roulette,
    image: '/images/play/roulette.png',
    buttonTxt: 'Play Now',
  },
  {
    title: 'Play Slots',
    description:
      'Bet on a combination of symbols with the goal of receiving specific winning combinations.',
    href: routes.play.slots,
    image: '/images/play/slots.png',
    buttonTxt: 'Play Now',
  },
];
const tools: {
  image: string;
  name: string;
  description: string;
  href?: string;
  disabled?: boolean;
  buttonTxt?: string;
}[] = [
  {
    image: '/icons/play/hilo.png',
    name: 'Play HiLo',
    description:
      'Bet on whether the next number will be higher or lower in the sequence.',
    href: routes.play.hilo,
    buttonTxt: 'Play Now',
  },
  {
    image: '/icons/play/mines.png',
    name: 'Play Mines',
    description: 'Choose your steps wisely as you try to survive a mine field.',
    href: routes.play.mines,
    buttonTxt: 'Play Now',
  },
  {
    image: '/icons/play/provide-token-liquidity.svg',
    name: 'Provide Token Liquidity',
    description:
      'Provide liquidity for bets in your favorite tokens to earn fees.',
    buttonTxt: 'Play Now',
    href: routes.play.root,
    disabled: true,
  },
];
