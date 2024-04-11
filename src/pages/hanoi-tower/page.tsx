import { HanoiGame } from '@/widgets/hanoi-game'

import { OpenSettingsObservered } from './ui/open-settings'
import { SidebarHanoiObservered } from './ui/sidebar'

export const HanoiTower = () => {
  return (
    <>
      <HanoiGame />
      <SidebarHanoiObservered />
      <OpenSettingsObservered />
    </>
  )
}
