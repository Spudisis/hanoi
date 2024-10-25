import { useState } from 'react'

import { clsx } from 'clsx'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tw-merge'

import { SchulteTableGame } from '@/shared/data/schute-table'

type ItemTableProps = { children: number }

const ItemTable = ({ children }: ItemTableProps) => {
  const { selectNumber, lastCorrectNumber, isMarkAnswers } = SchulteTableGame
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
      disabled={hasBeenSelected && isMarkAnswers}
      onClick={() => handleClick(children)}
      className={twMerge(
        clsx(
          'border bg-white transition font-bold text-2xl border-gray-500 flex h-full w-full justify-center items-center',
          { 'bg-green-500': hasBeenSelected && isMarkAnswers },
          error ? 'animate-error-pulse' : !hasBeenSelected || !isMarkAnswers ? 'hover:bg-green-200' : ''
        )
      )}
    >
      {children}
    </button>
  )
}

export const ItemTableObservered = observer(ItemTable)
