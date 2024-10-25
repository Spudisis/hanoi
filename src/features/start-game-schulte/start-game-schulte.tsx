import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Button } from '@/shared/ui'

const StartGameSchulte = () => {
  const { startGame, isRunningGame } = SchulteTableGame
  return (
    <Button className='justify-center' onClick={startGame} disabled={isRunningGame}>
      <Icon icon='ph:game-controller' /> Start
    </Button>
  )
}

export const StartGameSchulteObservered = observer(StartGameSchulte)
