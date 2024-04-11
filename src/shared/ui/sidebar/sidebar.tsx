import { ReactNode } from 'react'

import clsx from 'clsx'

import { Header } from './header'

type SidebarProps = {
  children: ReactNode
  open: boolean
}

export const Sidebar = ({ children, open }: SidebarProps) => {
  return (
    <div
      className={clsx(
        'absolute right-0 top-0 min-w-56 z-20 h-full border-l-[1px] border-black transition-transform transform  ease-in-out duration-300 bg-white',
        !open ? 'translate-x-full' : ''
      )}
    >
      <div className='p-4 sticky top-0'>{children}</div>
    </div>
  )
}

Sidebar.Header = Header
