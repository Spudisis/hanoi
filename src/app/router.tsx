import { createBrowserRouter, Navigate } from 'react-router-dom'

import { MainLayout } from '@/layouts/main-layout'
import { GamesList } from '@/pages/games-list'
import { HanoiTowerObservered } from '@/pages/hanoi-tower'
import { SchulteTableObservered } from '@/pages/schulte-table'

import { PATHS } from '@/shared/config'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Navigate to={PATHS.games} replace /> },
      { path: PATHS.games, element: <GamesList /> },
      {
        path: PATHS.hanoiTower,
        element: <HanoiTowerObservered />
      },
      {
        path: PATHS.schulteTable,
        element: <SchulteTableObservered />
      }
    ]
  }
])
