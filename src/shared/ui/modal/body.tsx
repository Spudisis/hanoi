import { ReactNode } from 'react'

type BodyProps = { children: ReactNode }

export const Body = ({ children }: BodyProps) => {
  return <div className='p-4 md:p-5 space-y-4'>{children}</div>
}
