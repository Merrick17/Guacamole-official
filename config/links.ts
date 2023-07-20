import routes from './routes';

export const Links = [
  {
    name: 'Home',
    href: routes.home,
  },
  {
    name: 'Trade',
    href: routes.swap,
  },

  {
    name: 'Play',
    href: routes.play,
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
  //   dropdownItems: [
  //     {
  //       name: 'Explore',
  //       href: routes.nft,
  //     },
  //     {
  //       name: 'create spl token',

  //       href: routes.createSplToken,
  //     },
  //   ],
  // },

  // {
  //   name: 'Tools',
  //   href: routes.tools,
  // },
];
