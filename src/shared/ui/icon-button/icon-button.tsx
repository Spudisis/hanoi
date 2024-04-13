import { ButtonHTMLAttributes } from 'react'

import clsx from 'clsx'

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton = (props: IconButtonProps) => {
  const { children, className, ...rest } = props
  return (
    <button
      {...rest}
      className={clsx(
        'before:absolute before:transition before:hover:bg-gray-200 before:w-8 before:h-8 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:-z-10 before:rounded-full',
        className
      )}
    >
      {children}
    </button>
  )
}
