import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Toggle } from '@/shared/ui'

const ToggleRainbowModeHanoi = () => {
  const { rainbowMode, changeStatusRainbowMode } = HanoiTowerGame

  return (
    <Toggle
      label={
        <div className='flex items-center gap-2'>
          <Icon icon='twemoji:rainbow' /> Rainbow mode
        </div>
      }
      checked={rainbowMode}
      onChange={(e) => changeStatusRainbowMode(e.target.checked)}
    />
  )
}

export const ToggleRainbowModeHanoiObservered = observer(ToggleRainbowModeHanoi)
