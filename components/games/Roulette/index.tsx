import React from 'react';
const game = {
  name: 'Roulette',
  short_name: 'roulette',
  description: '',
  creator: 'DwRFGbjKbsEhUMe5at3qWvH7i8dAJyhhwdnFoZMnLVRV',
  image: '/images/roulette.png',
  theme_color: '#59ff5f',
  app: React.lazy(() => import('./App')),
};

export default game;
