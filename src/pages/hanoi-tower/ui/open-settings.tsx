import { createPortal } from 'react-dom'

import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

const OpenSettings = () => {
  const { changeStatusSidebar } = HanoiTowerGame
  return createPortal(
    <button onClick={() => changeStatusSidebar(true)} className='absolute right-0 top-1/2 -translate-y-1/2 mr-4'>
      open
    </button>,
    document.body
  )
}

export const OpenSettingsObservered = observer(OpenSettings)
