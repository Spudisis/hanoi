import { useEffect } from 'react'

import { TableSchulteObservered } from '@/pages/schulte-table/ui/table-schulte.tsx'
import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'

import { SidebarSchulteMemo } from './ui/sidebar.tsx'

const SchulteTable = () => {
  const { reset } = SchulteTableGame

  useEffect(() => {
    return () => reset()
  }, [])

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

export const SchulteTableObservered = observer(SchulteTable)
