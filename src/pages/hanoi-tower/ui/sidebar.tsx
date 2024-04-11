import { SettingsHanoi } from '@/widgets/settings-hanoi'
import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { Sidebar } from '@/shared/ui'

const SidebarHanoi = () => {
  return (
    <Sidebar open={true} className=''>
      <Sidebar.Header className='flex gap-2 items-center'>
        <Icon icon='material-symbols:settings' /> Settings
      </Sidebar.Header>
      <SettingsHanoi />
    </Sidebar>
  )
}

export const SidebarHanoiObservered = observer(SidebarHanoi)
