import React from 'react';

const game = {
  name: 'Slots',
  short_name: 'slots',
  description: '',
  creator: 'DwRFGbjKbsEhUMe5at3qWvH7i8dAJyhhwdnFoZMnLVRV',
  image: '/images/slots.png',
  theme_color: '#ad6bff',
  app: React.lazy(() => import('./App')),
};
export default game;
