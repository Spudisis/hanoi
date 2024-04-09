import { Outlet } from 'react-router-dom'

export const MainLayout = () => {
  return (
    <div className='min-h-screen flex justify-between flex-col'>
      <header className='border border-black'>header</header>
      <main>
        <Outlet />
      </main>
      <footer className='border border-black'>footer</footer>
    </div>
  )
}
