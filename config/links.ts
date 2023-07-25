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
  {
    name: 'Nft',
    href: routes.nft,
    dropdownItems: [
      {
        name: 'Explore',
        href: routes.nft,
      },
      {
        name: 'create spl token',

        href: routes.createSplToken,
      },
    ],
  },

  {
    name: 'Tools',
    href: routes.tools,
  },
];
