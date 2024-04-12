import { ReactNode } from 'react'

type FooterProps = {
  children: ReactNode
}

export const Footer = ({ children }: FooterProps) => {
  return <div className='flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b'>{children}</div>
}
