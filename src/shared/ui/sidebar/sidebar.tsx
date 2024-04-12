import { ReactNode } from 'react'

import clsx from 'clsx'

import { Header } from './header'

type SidebarProps = {
  children: ReactNode
  open: boolean
  className?: string
}

export const Sidebar = ({ children, open, className = '' }: SidebarProps) => {
  return (
    <div
      className={clsx(
        'z-20 w-72 h-full border-l-[1px] border-black transition-transform transform  ease-in-out duration-300 bg-white',
        !open ? 'translate-x-full' : '',
        className
      )}
    >
      <div className='p-4 sticky top-0'>{children}</div>
    </div>
  )
}

Sidebar.Header = Header
