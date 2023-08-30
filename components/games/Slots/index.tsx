import React from 'react';

const game = {
  name: 'Slots',
  short_name: 'slots',
  description: '',
  creator: 'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC',
  image: '/icons/play/slots.png',
  theme_color: '#ad6bff',
  app: React.lazy(() => import('./App')),
};
export default game;
