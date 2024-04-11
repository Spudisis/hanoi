import { ReactNode } from 'react'

export const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className='border-b-[1px] border-gray-400 mb-4'>
      <h3 className='text-2xl pb-2 font-bold'>{children}</h3>
    </div>
  )
}
