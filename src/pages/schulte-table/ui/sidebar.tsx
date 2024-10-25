import { memo } from 'react'

import { SettingsSchulteMemo } from '@/widgets/settings-schulte'
import { Icon } from '@iconify/react'

import { Sidebar } from '@/shared/ui'

const SidebarSchulte = () => {
  return (
    <Sidebar open={true} className=''>
      <Sidebar.Header className='flex gap-2 items-center'>
        <Icon icon='material-symbols:settings' /> Settings
      </Sidebar.Header>
      <SettingsSchulteMemo />
    </Sidebar>
  )
}

export const SidebarSchulteMemo = memo(SidebarSchulte)
