import { useEffect, useRef, useState } from 'react'

import { clsx } from 'clsx'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tw-merge'

import { SchulteTableGame } from '@/shared/data/schute-table'

type ItemTableProps = { children: number; status: boolean; index: number }

const ItemTable = ({ children, index, status }: ItemTableProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  const { selectNumber, isMarkAnswers, activeItem } = SchulteTableGame
  const [error, setError] = useState(false)
  const handleClick = (b: number) => {
    const res = selectNumber(b, index)
    if (!res) {
      setError(true)
      setTimeout(() => setError(false), 1000)
    }
  }

  useEffect(() => {
    if (activeItem === index) {
      buttonRef.current?.focus()
    }
  }, [activeItem, index])

  return (
    <button
      tabIndex={-1}
      ref={buttonRef}
      data-item='number-schulte'
      data-index={index}
      disabled={status && isMarkAnswers}
      onClick={() => handleClick(children)}
      className={twMerge(
        clsx(
          'border bg-white outline-none transition box-border font-bold text-2xl border-gray-500 flex h-full w-full justify-center items-center',
          { 'bg-green-500': status && isMarkAnswers },
          error ? 'animate-error-pulse' : !status || !isMarkAnswers ? 'hover:bg-green-200' : '',
          { 'border-amber-500 border-4': activeItem === index }
        )
      )}
    >
      {children}
    </button>
  )
}

export const ItemTableObservered = observer(ItemTable)
