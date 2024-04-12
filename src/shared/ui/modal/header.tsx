import { ReactNode } from 'react'

import { Icon } from '@iconify/react'
import clsx from 'clsx'

export type HeaderProps = {
  title: string
  onClose: () => void
  children?: ReactNode
  wrapperHeaderTitleClassName?: string
}

export const Header = ({ children, title, onClose, wrapperHeaderTitleClassName }: HeaderProps) => {
  return (
    <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t'>
      <div className={clsx('flex flex-row', wrapperHeaderTitleClassName)}>
        <h3 className='text-xl font-semibold text-gray-900'>{title}</h3>
        {children}
      </div>
      <button
        onClick={onClose}
        type='button'
        className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
        data-modal-hide='default-modal'
      >
        <Icon icon='mdi:close' className='w-6 h-6' />
        <span className='sr-only'>Close modal</span>
      </button>
    </div>
  )
}
