import { useEffect } from 'react'

import { PATHS } from '@/shared/config'
import { changeIconSite } from '@/shared/data/change-icon-site.ts'

import { ItemGame } from './ui/item-game.tsx'

export const GamesList = () => {
  useEffect(() => {
    document.title = 'Games'

    changeIconSite('/gamepad.svg')
  }, [])
  return (
    <div className='flex flex-col h-full gap-6 p-2'>
      <h2 className='font-bold text-2xl'>List games</h2>
      <div className='grid grid-cols-4 gap-4'>
        <ItemGame to={PATHS.hanoiTower}>Hanoi tower</ItemGame>
        <ItemGame to={PATHS.schulteTable}>Schulte table</ItemGame>
      </div>
    </div>
  )
}
