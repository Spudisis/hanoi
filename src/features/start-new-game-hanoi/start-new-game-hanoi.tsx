import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

const StartNewGameHanoi = () => {
  const { startNewGame } = HanoiTowerGame
  return <button onClick={startNewGame}>StartNewGameHanoi</button>
}

export const StartNewGameHanoiObservered = observer(StartNewGameHanoi)
