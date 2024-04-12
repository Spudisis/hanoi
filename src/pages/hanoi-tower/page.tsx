import { HanoiGame } from '@/widgets/hanoi-game'

import { ModalWinGameObservered } from './ui/modal-win-game'
import { SidebarHanoiObservered } from './ui/sidebar'

export const HanoiTower = () => {
  return (
    <div className='flex flex-row items-center justify-between w-full h-full'>
      <div className='flex-1'>
        <HanoiGame />
      </div>
      <div className='flex h-full'>
        <SidebarHanoiObservered />
      </div>
      <ModalWinGameObservered />
    </div>
  )
}
