import React from 'react';
const game = {
  name: 'Roulette',
  short_name: 'roulette',
  description: '',
  creator: 'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC',
  image: '/images/roulette.png',
  theme_color: '#59ff5f',
  app: React.lazy(() => import('./App')),
};

export default game;
