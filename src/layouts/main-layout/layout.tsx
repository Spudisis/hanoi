import { Outlet } from 'react-router-dom'

import { Header } from './ui/header'

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex justify-between flex-col'>
      <Header />
      <div className='w-full justify-center flex'>
        <main className='max-w-container w-full'>
          <Outlet />
        </main>
      </div>
      <footer className='border border-black'>footer</footer>
    </div>
  )
}
