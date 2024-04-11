import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Toggle } from '@/shared/ui'

const ToggleBabyModeHanoi = () => {
  const { babyMode, changeStatusBabyMode } = HanoiTowerGame
  return (
    <Toggle
      checked={babyMode}
      onChange={(e) => changeStatusBabyMode(e.target.checked)}
      label={
        <div className='flex items-center gap-2'>
          <Icon icon='ph:baby-carriage' /> Baby mode
        </div>
      }
    />
  )
}

export const ToggleBabyModeHanoiObservered = observer(ToggleBabyModeHanoi)
