import { ButtonHTMLAttributes, useEffect, useRef } from 'react'

import clsx from 'clsx'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  mouseDownCb?: (props: unknown) => void
  mouseUpCb?: (props: unknown) => void
}

export const Button = (props: ButtonProps) => {
  const { children, className, disabled, mouseDownCb, mouseUpCb, ...rest } = props
  const ref = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (ref.current && mouseDownCb && mouseUpCb) {
      ref.current.addEventListener('mousedown', mouseDownCb)
      ref.current.addEventListener('mouseup', mouseUpCb)
    }
    return () => {
      if (ref.current && mouseDownCb && mouseUpCb) {
        ref.current.removeEventListener('mousedown', mouseDownCb)
        ref.current.removeEventListener('mouseup', mouseUpCb)
      }
    }
  }, [mouseDownCb, mouseUpCb])

  return (
    <button
      ref={ref}
      className={clsx(
        'flex items-center gap-2 text-gray-900 disabled:text-gray-400 bg-white border cursor-pointer disabled:cursor-auto border-gray-300 focus:outline-none hover:bg-gray-100 hover:disabled:bg-white focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5',
        className
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  )
}
