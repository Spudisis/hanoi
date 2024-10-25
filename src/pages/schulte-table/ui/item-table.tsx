import { useState } from 'react'

import { clsx } from 'clsx'
import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'

type ItemTableProps = { children: number }

const ItemTable = ({ children }: ItemTableProps) => {
  const { selectNumber, lastCorrectNumber } = SchulteTableGame
  const [error, setError] = useState(false)
  const handleClick = (b: number) => {
    const res = selectNumber(b)

    if (!res) {
      setError(true)
      setTimeout(() => setError(false), 1000)
    }
  }
  const hasBeenSelected = lastCorrectNumber >= children

  return (
    <button
      disabled={hasBeenSelected}
      onClick={() => handleClick(children)}
      className={clsx(
        'border transition font-bold text-xl border-gray-500 flex h-full w-full justify-center items-center',
        { 'bg-green-500': hasBeenSelected },
        error ? 'animate-error-pulse' : !hasBeenSelected ? 'hover:bg-green-200' : ''
      )}
    >
      {children}
    </button>
  )
}

export const ItemTableObservered = observer(ItemTable)
