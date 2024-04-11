import { ReactNode, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import { Divider } from '../divider'

type SelectProps<T> = {
  label: ReactNode
  options: { value: T; label?: string | number }[]
  onChange: (value: T) => void
  value: T
}

export const Select = <T,>({ label, options, onChange, value }: SelectProps<T>) => {
  const dropdown = useRef<HTMLDivElement | null>(null)
  const [status, changeStatus] = useState(false)

  const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as Node | null
    if (dropdown.current && !dropdown.current.contains(target)) {
      changeStatus(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true)
    return () => {
      document.removeEventListener('click', handleClickOutside, true)
    }
  }, [])

  const onChangeSelect = (value: T) => {
    onChange(value)
    changeStatus(false)
  }

  return (
    <div className='relative' ref={dropdown}>
      <label className='flex flex-col'>
        <span>{label}</span>
        <button
          className='p-2 transition rounded-lg border-black border flex justify-start bg-white hover:bg-gray-50'
          onClick={() => changeStatus(!status)}
        >
          {String(value)}
        </button>
      </label>
      <div className={clsx('rounded-lg bg-white absolute w-full z-10 max-h-52 overflow-auto', status ? 'visible' : 'hidden')}>
        <ul className='flex flex-col p-1'>
          {options.map((elem, index) => (
            <li key={String(elem.value)}>
              <button
                className={clsx(
                  'w-full text-start p-2 transition hover:bg-gray-50',
                  index === 0 && 'rounded-t-lg',
                  index === options.length - 1 && 'rounded-b-lg'
                )}
                onClick={() => onChangeSelect(elem.value)}
              >
                {elem.label || String(elem.value)}
              </button>
              {index !== options.length - 1 && <Divider />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
