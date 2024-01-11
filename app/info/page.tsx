// import InfoCard from '@/components/common/info-card';
// import { Metadata } from 'next';
// import { FC } from 'react';

// interface InfoProps {}
// export const metadata: Metadata = {
//   title: 'Ecosystem Information | Guacamole',
//   description:
//     'Looking for more information on the Guacamole and $GUAC ecosystem? Participate in governance, view the extended ecosystem, or join us on multiple social channels like Discord, Telegram, and X.',
// };
// const Info: FC<InfoProps> = () => {
//   return (
//     <main className="container mx-auto my-auto flex flex-col justify-center min-h-[calc(100vh-160px)] gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px]">
//       <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6">
//         {infos.map((tool, index) => (
//           <InfoCard key={index} {...tool} openNewTab />
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Info;

// const infos: {
//   image: string;
//   name: string;
//   description: string;
//   href?: string;
//   openNewTab?: boolean;
// }[] = [
//   {
//     image: '/images/info/avocado.png',
//     name: 'The Avocadao',
//     description:
//       'Participate in governance of the Guacamole ecosystem. All proposal information is available in Discord.',
//     href: 'https://app.realms.today/dao/Ha56K8MGrJuiJSyK2UaYRpAf7Hu2BZw2XALEmW9EQemu',
//   },
//   {
//     image: '/images/info/guacgg.png',
//     name: 'Explore Guac.gg',
//     description:
//       'Explore a fresher way to reward yourself through GUAC.GG! Shop for discounted games or enter raffles and giveaways.',
//     href: 'https://guac.gg/',
//   },
//   {
//     image: '/images/info/docs.png',
//     name: 'View Docs',
//     description:
//       'Explore our documentation to learn more about each current and future product offered on Guacamole.',
//     href: 'https://docs.guacamole.gg/',
//   },
//   {
//     image: '/images/info/discord.png',
//     name: 'Join Discord',
//     description:
//       'Join the Guacamole Discord server to chat with like-minded community members or obtain support.',
//     href: 'https://discord.gg/guac',
//   },
//   {
//     image: '/images/info/telegram.png',
//     name: 'Join Telegram',
//     description:
//       'Join the Guacamole Telegram channel to chat with like-minded community members or obtain support.',
//     href: 'https://t.me/guacgg',
//   },
//   {
//     image: '/images/info/follow.png',
//     name: 'Follow ON X',
//     description:
//       'All official Guacamole community announcements are always posted on our official “X” account.',
//     href: 'https://x.com/guac_gg',
//   },
// ];
import Container from "@/components/common/container";
import ExploreCard from "@/components/common/explore-card";
import InfoCard from "@/components/common/info-card";
import { Button } from "@/components/ui/button";
import routes from "@/config/routes";
import Link from "next/link";

const Page = () => {
  return (
    <main className="container mx-auto  items-center flex flex-col  gap-14 px-8 py-6 md:px-16 md:py-12  max-w-[1440px] h-full">
      <Container className="max-w-[1000px] max-sm:max-w-xs  bg-[url('/images/tools.png')] border border-transparent min-h-[238px] hover:border-primary">
        <div className="flex w-full h-full flex-col items-start justify-start gap-4">
          <svg
            width="29"
            height="28"
            viewBox="0 0 29 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M25.3889 24.8889H3.61111V3.11111H14.5V0H3.61111C1.88444 0 0.5 1.4 0.5 3.11111V24.8889C0.5 26.6 1.88444 28 3.61111 28H25.3889C27.1 28 28.5 26.6 28.5 24.8889V14H25.3889V24.8889ZM17.6111 0V3.11111H23.1956L7.90444 18.4022L10.0978 20.5956L25.3889 5.30444V10.8889H28.5V0H17.6111Z"
              fill="#FCFCFC"
            />
          </svg>

          <h5 className=" text-2xl font-medium tracking-tight ">
            A Fresher Way To Reward Yourself
          </h5>
          <p className="text-muted-foreground ">
            GUAC.GG helps you earn and redeem rewards, enter raffles and
            giveaways, or easily purchase tons of game keys, gift cards,
            subscriptions, merch, and more!
          </p>
          <Button className="w-[150px] bg-[#FCFCFC]">
            <Link
              href={"https://guac.gg"}
              target="_blank"
              className="flex justify-center items-center"
            >
              Go To GUAC.GG
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>{" "}
          </Button>
        </div>
      </Container>
      <div
        className={
          " mx-auto grid grid-cols-1 sm:grid-cols-2 max-w-6xl lg:grid-cols-3 gap-x-6 gap-y-6"
        }
      >
        {/* {featuredTools.map((tool, index) => (
          <ExploreCard key={index} {...tool} />
        ))} */}

        {infos.map((tool, index) => (
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
    title: "Swap Aggregator",
    description:
      "Easily find the best trading routes to ensure you get the best bang for your buck!",
    href: routes.trade.swap,
    image: "/images/trade/swap.png",
    buttonTxt: "Swap",
  },
  {
    title: "Bridge Swaps",
    description:
      "Bridge your ETH, BNB, AVAX, and ARB to Solana and pick up tokens like GUAC.",
    image: "/images/trade/bridge.png",
    href: routes.trade.bridge,
    buttonTxt: "Bridge",
  },
  {
    title: "Crypto Futures",
    description:
      "Use margin to trade gamified perpetual futures markets for BTC, ETH, SOL, and more. ",
    image: "/images/trade/crypto-future.png",
    href: routes.trade.perpetuals,
    buttonTxt: "Trade",
  },
];

const infos: {
  image: string;
  name: string;
  description: string;
  href?: string;
  openNewTab?: boolean;
  buttonTxt?: string;
}[] = [
  {
    image: "",
    name: "The Avocadao DAO",
    description:
      "Participate in governance through our GUAC voting mechanisms.",
    href: "https://app.realms.today/dao/Ha56K8MGrJuiJSyK2UaYRpAf7Hu2BZw2XALEmW9EQemu",
    buttonTxt: "View Governance ",
  },
  // {
  //   image: '',
  //   name: 'Explore Guac.gg',
  //   description:
  //     'Explore a fresher way to reward yourself through GUAC.GG! Shop for discounted games or enter raffles and giveaways.',
  //   href: 'https://guac.gg/',
  // },
  {
    image: "",
    name: "View Documentation ",
    description: "Learn about the Guacamole ecosystem and its features.",
    href: "https://docs.guacamole.gg/",
    buttonTxt: "Explore Guacamole",
  },
  {
    image: "",
    name: "Discord Community",
    description:
      "Join our official community to stay in touch and get support.",
    href: "https://discord.gg/guac",
    buttonTxt: "Join Discord",
  },
  // {
  //   image: '',
  //   name: 'Join Telegram',
  //   description:
  //     'Join the Guacamole Telegram channel to chat with like-minded community members or obtain support.',
  //   href: 'https://t.me/guacgg',
  // },
  // {
  //   image: '',
  //   name: 'Follow ON X',
  //   description:
  //     'All official Guacamole community announcements are always posted on our official “X” account.',
  //   href: 'https://x.com/guac_gg',
  // },
];
