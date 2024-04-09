import { createBrowserRouter } from 'react-router-dom'

import { MainLayout } from '@/layouts/main-layout'
import { GamesList } from '@/pages/games-list'
import { HanoiTower } from '@/pages/hanoi-tower'

import { PATHS } from '@/shared/config'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, path: '/', element: <GamesList /> },
      {
        path: PATHS.hanoiTower,
        element: <HanoiTower />
      }
    ]
  }
])
