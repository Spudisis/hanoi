import { useEffect } from 'react'

import { HanoiGame } from '@/widgets/hanoi-game'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

import { ModalWinGameObservered } from './ui/modal-win-game'
import { SidebarHanoiObservered } from './ui/sidebar'

const HanoiTower = () => {
  const { reset } = HanoiTowerGame
  useEffect(() => {
    return () => reset()
  }, [])

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

export const HanoiTowerObservered = observer(HanoiTower)
