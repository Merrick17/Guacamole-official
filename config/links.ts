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
    dropdownItems: [
      {
        name: 'Explore',
        href: routes.play,
      },
      {
        name: 'Guac-a-Mole',

        href: routes.guacamole,
      },
    ],
  },

  {
    name: 'Tools',
    href: routes.tools,
  },
];
