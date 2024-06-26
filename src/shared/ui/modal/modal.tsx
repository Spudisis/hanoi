import { ReactNode } from 'react'
import { createPortal } from 'react-dom'

import { Body } from './body'
import { Footer } from './footer'
import { Header, HeaderProps } from './header'

type ModalProps = {
  status: boolean
  header?: ReactNode
  body: ReactNode
  footer?: ReactNode
} & HeaderProps

export const Modal = ({ status, header, body, footer, onClose, title, wrapperHeaderTitleClassName }: ModalProps) => {
  return status
    ? createPortal(
        <div className='absolute left-0 top-0 w-full z-50 h-full bg-[rgba(0,0,0,0.5)]'>
          <div className='relative h-full'>
            <div tabIndex={-1} className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[500px] z-50'>
              <div className='relative p-4 w-[500px]'>
                {/* <!-- Modal content --> */}
                <div className='relative bg-white rounded-lg shadow '>
                  <Header onClose={onClose} title={title} wrapperHeaderTitleClassName={wrapperHeaderTitleClassName}>
                    {header}
                  </Header>

                  <Body>{body}</Body>

                  <Footer>{footer}</Footer>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )
    : null
}
