import React from 'react';

const game = {
  name: 'Mines',
  short_name: 'mines',
  description: '',
  creator: 'DwRFGbjKbsEhUMe5at3qWvH7i8dAJyhhwdnFoZMnLVRV',
  theme_color: '#ff6a6a',
  image: '/images/mines.png',
  app: React.lazy(() => import('./App')),
};

export default game;
