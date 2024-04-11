import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import clsx from 'clsx'

import { Header } from './header'

type SidebarProps = {
  children: ReactNode
  open: boolean
}

export const Sidebar = ({ children, open }: SidebarProps) => {
  return createPortal(
    <div
      className={clsx(
        'absolute right-0 top-0 min-w-56 z-20 min-h-screen border border-black transition-transform transform  ease-in-out duration-300 bg-slate-200',
        !open ? 'translate-x-full' : ''
      )}
    >
      <div className='p-4'>{children}</div>
    </div>,
    document.body
  )
}

Sidebar.Header = Header
