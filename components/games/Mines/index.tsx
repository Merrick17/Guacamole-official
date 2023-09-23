import React from 'react';
import App from './App';

const game = {
  name: 'Mines',
  short_name: 'mines',
  description: `
    There's money hidden beneath the squares. The reward will increase the more squares you reveal, but watch out for the 5 hidden mines. Touch one and you'll go broke. You can cash out at any time.
  `,
  image: '/images/play/mines.png',
  app: () => <App />,
};

export default game;
