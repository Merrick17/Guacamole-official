import React from 'react';

const game = {
  name: 'Flip',
  short_name: 'flip',
  description: '',
  creator: 'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC',
  image: '/images/coin-flip.png',
  theme_color: '#ad6bff',
  app: React.lazy(() => import('./App')),
};
export default game;
