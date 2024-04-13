import { ReactNode } from 'react'

import { useDroppable } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'

type StandHanoiProps = {
  column: number
  children: ReactNode
}

const StandHanoi = ({ column, children }: StandHanoiProps) => {
  const { setNodeRef } = useDroppable({
    id: column,
    data: {
      index: column
    }
  })

  return (
    <div
      ref={setNodeRef}
      id={'stand-hanoi-' + column}
      data-hanoi='stand-hanoi'
      className='flex flex-col relative justify-end items-center w-64'
    >
      {children}
      <div className='bg-gray-800 w-8 h-full absolute -z-10'></div>
      <div className='h-6 bg-black w-full'></div>
    </div>
  )
}

export const StandHanoiObservered = observer(StandHanoi)
