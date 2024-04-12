import { observer } from 'mobx-react-lite'

import { GAME_MODES, HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Select } from '@/shared/ui'

const ChangeGameModeHanoi = () => {
  const { gameMode, changeGameMode } = HanoiTowerGame
  const options = GAME_MODES.map((elem) => ({ value: elem }))
  return <Select label='Game mode' options={options} onChange={changeGameMode} value={gameMode} />
}

export const ChangeGameModeHanoiObservered = observer(ChangeGameModeHanoi)
