import { InputHTMLAttributes, ReactNode } from 'react'

type RangeProps = InputHTMLAttributes<HTMLInputElement> & { label: ReactNode; children?: ReactNode }

export const Range = (props: RangeProps) => {
  const { label, children, ...rest } = props
  return (
    <>
      <label className='block first-letter:text-sm font-medium text-gray-900'>
        <div className='flex justify-between items-center'>
          <span>{label}</span>
          {children}
        </div>
        <input type='range' {...rest} className='w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer' />
      </label>
    </>
  )
}
