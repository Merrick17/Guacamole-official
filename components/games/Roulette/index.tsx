import React from 'react';
import App from './App';

const game = {
  name: 'Roulette',
  short_name: 'roulette',
  description: `
    A miniature version of Roulette. WYSIWYG!
  `,
  image: '/images/play/roulette.png',
  app: () => <App />,
};

export default game;
