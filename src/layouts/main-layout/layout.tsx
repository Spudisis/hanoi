import { Outlet } from 'react-router-dom'

import { Header } from './ui/header'

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex flex-col justify-between'>
      <Header />
      <main className='w-full h-full justify-center relative flex flex-1'>
        <div className='max-w-container w-full flex items-center'>
          <Outlet />
        </div>
      </main>
      <footer className='border border-black'>footer</footer>
    </div>
  )
}
