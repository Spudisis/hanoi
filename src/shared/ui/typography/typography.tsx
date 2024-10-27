import { ReactNode } from 'react'

import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tw-merge'

type TypographyProps = {
  children: ReactNode
  className?: string | ClassValue[]
}

export const Typography = ({ children, className }: TypographyProps) => {
  return <p className={twMerge(clsx('text-base leading-relaxed text-gray-500', className))}>{children}</p>
}
