import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Button } from '@/shared/ui'

const StartNewGameHanoi = () => {
  const { startNewGame } = HanoiTowerGame
  return (
    <Button onClick={startNewGame} className='justify-center'>
      <Icon icon='ph:game-controller' /> Start
    </Button>
  )
}

export const StartNewGameHanoiObservered = observer(StartNewGameHanoi)
