import { InputHTMLAttributes, ReactNode } from 'react'

import { clsx } from 'clsx'

type ToggleProps = InputHTMLAttributes<HTMLInputElement> & { label: ReactNode }

export const Toggle = (props: ToggleProps) => {
  const { label, disabled, ...rest } = props
  return (
    <label className={clsx('inline-flex items-center', disabled ? 'cursor-default' : 'cursor-pointer')}>
      <input type='checkbox' className='sr-only peer' disabled={disabled} {...rest} />
      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-disabled:ring-gray-400  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all  peer-checked:bg-blue-600 peer-disabled:bg-gray-400"></div>
      <span className='ms-3 text-sm font-medium text-gray-900'>{label}</span>
    </label>
  )
}
