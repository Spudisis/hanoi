import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Button } from '@/shared/ui'

const ResetGameSchulte = () => {
  const { resetGame } = SchulteTableGame
  return (
    <Button onClick={resetGame} className='justify-center'>
      <Icon icon='material-symbols:refresh' /> Reset
    </Button>
  )
}

export const ResetGameSchulteObservered = observer(ResetGameSchulte)
