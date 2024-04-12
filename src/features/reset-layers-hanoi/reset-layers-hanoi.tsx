import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Button } from '@/shared/ui'

const ResetLayersHanoi = () => {
  const { resetCurrentLayers, brickHasBeenMoved } = HanoiTowerGame
  return (
    <Button onClick={resetCurrentLayers} disabled={!brickHasBeenMoved} className='justify-center'>
      <Icon icon='material-symbols:refresh' /> Reset
    </Button>
  )
}

export const ResetLayersHanoiObservered = observer(ResetLayersHanoi)
