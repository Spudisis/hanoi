import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Toggle } from '@/shared/ui'

const ToggleAnimationHanoi = () => {
  const { isAnimatedBricksStatus, changeIsAnimatedBricksStatus } = HanoiTowerGame
  return (
    <Toggle
      checked={isAnimatedBricksStatus}
      onChange={(e) => changeIsAnimatedBricksStatus(e.target.checked)}
      label={
        <div className='flex items-center gap-2'>
          <Icon icon='material-symbols:line-curve' /> Animation
        </div>
      }
    />
  )
}

export const ToggleAnimationHanoiObservered = observer(ToggleAnimationHanoi)
