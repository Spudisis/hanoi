import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

const ResetLayersHanoi = () => {
  const { resetCurrentLayers, brickHasBeenMoved } = HanoiTowerGame
  return (
    <button onClick={resetCurrentLayers} disabled={!brickHasBeenMoved}>
      reset-layers-hanoi
    </button>
  )
}

export const ResetLayersHanoiObservered = observer(ResetLayersHanoi)
