import { ReactNode } from 'react'

import clsx from 'clsx'

export const Header = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <div className='border-b-[1px] border-gray-400 mb-4'>
      <h3 className={clsx('text-2xl pb-2 font-bold', className)}>{children}</h3>
    </div>
  )
}
