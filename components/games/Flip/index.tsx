import React from 'react';

const game = {
  name: 'Flip',
  short_name: 'flip',
  description: '',
  creator: 'DwRFGbjKbsEhUMe5at3qWvH7i8dAJyhhwdnFoZMnLVRV',
  image: '/images/coin-flip.png',
  theme_color: '#ad6bff',
  app: React.lazy(() => import('./App')),
};
export default game;
