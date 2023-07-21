import React from 'react';

const game = {
  name: 'HiLo',
  short_name: 'hilo',
  description: '',
  creator: 'DwRFGbjKbsEhUMe5at3qWvH7i8dAJyhhwdnFoZMnLVRV',
  image: '/images/hilo.png',
  app: React.lazy(() => import('./App')),
};

export default game;
