import { SettingsHanoi } from '@/widgets/settings-hanoi'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Sidebar } from '@/shared/ui'

const SidebarHanoi = () => {
  const { statusSidebar } = HanoiTowerGame
  return (
    <Sidebar open={statusSidebar}>
      <Sidebar.Header>Settings</Sidebar.Header>
      <SettingsHanoi />
    </Sidebar>
  )
}

export const SidebarHanoiObservered = observer(SidebarHanoi)
