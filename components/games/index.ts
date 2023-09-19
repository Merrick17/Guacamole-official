import { GameBundle } from 'gamba/react-ui'
import HiLo from './HiLo'
import Mines from './Mines'
import Roulette from './Roulette'
import Slots from './Slots'
import Dice from './Dice'

export const GAMES: GameBundle[] = [Dice, Roulette, Slots, HiLo, Mines]
