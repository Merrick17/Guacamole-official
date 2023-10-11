import InfoCard from '@/components/common/info-card';
import { Metadata } from 'next';
import { FC } from 'react';

interface InfoProps {}
export const metadata: Metadata = {
  title: 'Ecosystem Information | Guacamole',
  description:
    'Looking for more information on the Guacamole and $GUAC ecosystem? Participate in governance, view the extended ecosystem, or join us on multiple social channels like Discord, Telegram, and X.',
};
const Info: FC<InfoProps> = () => {
  return (
    <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-80px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6">
        {infos.map((tool, index) => (
          <InfoCard key={index} {...tool} openNewTab />
        ))}
      </div>
    </main>
  );
};

export default Info;

const infos: {
  image: string;
  name: string;
  description: string;
  href?: string;
  openNewTab?: boolean;
}[] = [
  {
    image: '/images/info/avocado.png',
    name: 'The Avocadao',
    description:
      'Participate in governance of the Guacamole ecosystem. All proposal information is available in Discord.',
    href: 'https://app.realms.today/dao/Ha56K8MGrJuiJSyK2UaYRpAf7Hu2BZw2XALEmW9EQemu',
  },
  {
    image: '/images/info/guacgg.png',
    name: 'Explore Guac.gg',
    description:
      'Explore a fresher way to reward yourself through GUAC.GG! Shop for discounted games or enter raffles and giveaways.',
    href: 'https://guac.gg/',
  },
  {
    image: '/images/info/docs.png',
    name: 'View Docs',
    description:
      'Explore our documentation to learn more about each current and future product offered on Guacamole.',
    href: 'https://docs.guacamole.gg/',
  },
  {
    image: '/images/info/discord.png',
    name: 'Join Discord',
    description:
      'Join the Guacamole Discord server to chat with like-minded community members or obtain support.',
    href: 'https://discord.gg/guac',
  },
  {
    image: '/images/info/telegram.png',
    name: 'Join Telegram',
    description:
      'Join the Guacamole Telegram channel to chat with like-minded community members or obtain support.',
    href: 'https://t.me/guacgg',
  },
  {
    image: '/images/info/follow.png',
    name: 'Follow ON X',
    description:
      'All official Guacamole community announcements are always posted on our official “X” account.',
    href: 'https://x.com/guac_gg',
  },
];
