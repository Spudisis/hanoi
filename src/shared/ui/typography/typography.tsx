import { ReactNode } from 'react'

import clsx, { ClassValue } from 'clsx'

type TypographyProps = {
  children: ReactNode
  className?: ClassValue[]
}

export const Typography = ({ children, className }: TypographyProps) => {
  return <p className={clsx('text-base leading-relaxed text-gray-500', className)}>{children}</p>
}
