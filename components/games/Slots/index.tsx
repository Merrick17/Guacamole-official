import React from 'react'
import App from './App'

const game = {
  name: 'Slots',
  short_name: 'slots',
  description: `
    Play and pray. At the top of the slot machine you can see your potential rewards. Always fair.
  `,
  image: '/icons/play/slots.png',
  app: () => <App />,
}

export default game
