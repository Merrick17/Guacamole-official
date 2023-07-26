import routes from './routes';
import { GoHome, GoArrowSwitch, GoHourglass } from 'react-icons/go';
export const Links = [
  {
    name: 'Home',
    href: routes.home,
    Icon: GoHome,
  },
  {
    name: 'Trade',
    href: routes.swap,
    Icon: GoArrowSwitch,
  },

  {
    name: 'Play',
    href: routes.play,
    Icon: GoHourglass,
    // dropdownItems: [
    //   {
    //     name: 'Explore',
    //     href: routes.play,
    //   },
    // {
    //   name: 'Guac-a-Mole',

    //   href: routes.guacamole,
    // },
    //   {
    //     name: 'Coin Flip',

    //     href: routes.coinFlip,
    //   },
    // ],
  },
  // {
  //   name: 'Nft',
  //   href: routes.nft,

  // },

  {
    name: 'Tools',
    href: routes.tools,
    dropdownItems: [
      {
        name: 'Explore',
        href: routes.tools,
      },
      {
        name: 'create spl token',

        href: routes.createSplToken,
      },
      {
        name: 'token multi sender',

        href: routes.tokenMultiSender,
      },
      {
        name: 'burn nft',

        href: routes.burnNft,
      },
      {
        name: 'emergency send tool',

        href: routes.emergencySend,
      },
      {
        name: 'token multi sender CSV',

        href: routes.tokenMultiSenderCsv,
      },
      {
        name: 'Token to many wallets',
        href: routes.tokenToManyWallets,
      },
    ],
  },
];
