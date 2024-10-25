import { TableSchulteObservered } from '@/pages/schulte-table/ui/table-schulte.tsx'

import { SidebarSchulteMemo } from './ui/sidebar.tsx'

export const SchulteTable = () => {
  return (
    <div className='flex flex-row items-center justify-between w-full h-full'>
      <div className='flex-1 justify-center items-center flex'>
        <TableSchulteObservered />
      </div>
      <div className='flex h-full'>
        <SidebarSchulteMemo />
      </div>
    </div>
  )
}
