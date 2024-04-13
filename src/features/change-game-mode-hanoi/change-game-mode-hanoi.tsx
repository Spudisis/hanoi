import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { GAME_MODES, HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { IconButton, Select } from '@/shared/ui'

const ChangeGameModeHanoi = () => {
  const { gameMode, changeGameMode } = HanoiTowerGame
  const options = GAME_MODES.map((elem) => ({ value: elem }))
  return (
    <div className='relative'>
      <Select label='Game mode' options={options} onChange={changeGameMode} value={gameMode} />
      <IconButton className='absolute right-2 -translate-y-1/2 top-1/2'>
        <Icon icon='material-symbols:info-outline' className='text-blue-600 w-6 h-6' />
      </IconButton>
    </div>
  )
}

export const ChangeGameModeHanoiObservered = observer(ChangeGameModeHanoi)
