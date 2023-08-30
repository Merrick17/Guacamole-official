import React from 'react';

const game = {
  name: 'HiLo',
  short_name: 'hilo',
  description: '',
  creator: 'EjJxmSmbBdYu8Qu2PcpK8UUnBAmFtGEJpWFPrQqHgUNC',
  image: '/icons/play/hilo.png',
  app: React.lazy(() => import('./App')),
};

export default game;
