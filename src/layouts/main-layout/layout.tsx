import { Outlet } from 'react-router-dom'

import { Header } from './ui/header'

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex justify-between flex-col'>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer className='border border-black'>footer</footer>
    </div>
  )
}
