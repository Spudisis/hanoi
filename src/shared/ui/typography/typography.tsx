import { ReactNode } from 'react'

type TypographyProps = {
  children: ReactNode
}

export const Typography = ({ children }: TypographyProps) => {
  return <p className='text-base leading-relaxed text-gray-500 dark:text-gray-400'>{children}</p>
}
