import { GameBundle } from 'gamba-react-ui-v2'
import React from 'react'

export const GAMES: GameBundle[] = [
  {
    id: 'dice',
    meta: {
      background: '#ff6490',
      name: 'Dice',
      image: '/images/play/bg/dice_bg.png',
      description: `
        Use the slider to pick a number, then roll below that number to win. Lower numbers will increase your potential payout, while higher ones are safer.
      `,
    },
    app: React.lazy(() => import('./Dice')),
  },
  {
    id: 'slots',
    meta: {
      background: '#5465ff',
      name: 'Slots',
      image: '/images/play/bg/slots_bg.png',
      description: `
        Play and pray. At the top of the slot machine you can see your potential rewards. Always fair.
      `,
    },
    app: React.lazy(() => import('./Slots')),
  },
  {
    id: 'flip',
    meta: {
      name: 'Flip',
      description: `
        Pick Heads or Tails. Double your money or go broke. Simple as.
      `,
      image: '/images/flip/Coin_Flip.png',
      background: '#ffe694',
    },
    app: React.lazy(() => import('./Flip')),
  },
  {
    id: 'plinko',
    meta: {
      background: '#7272ff',
      image: '/images/flip/plinko_save_main.png',
      name: 'Plinko',
      description: `
        Plinko
      `,
    },
    app: React.lazy(() => import('./Plinko')),
  },
  {
    id: 'hilo',
    meta: {
      name: 'HiLo',
      image: '/images/play/hilo_v2.png',
      description: 'Guess if the next card is going to be higher or lower than the current one. Continue until you want to cash out!',
      background: '#77bbff',
    },
    props: { logo: '/logo.svg' },
    app: React.lazy(() => import('./HiLo')),
  },
  {
    id: 'mines',
    meta: {
      name: 'Mines',
      description: `
        There's money hidden beneath the squares. The reward will increase the more squares you reveal, but watch out for the 5 hidden mines. Touch one and you'll go broke. You can cash out at any time.
      `,
      image: '/images/play/bg/mines_bg.png',
      background: '#8376ff',
    },
    app: React.lazy(() => import('./Mines')),
  },
  {
    id: 'roulette',
    meta: {
      name: 'Roulette',
      image: '/images/play/bg/main.gif',
      description: `
        A miniature version of Roulette. WYSIWYG!
      `,
      background: '#1de87e',
    },
    app: React.lazy(() => import('./Roulette')),
  },
]
