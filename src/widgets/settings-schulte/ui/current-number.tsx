import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'

const CurrentNumber = () => {
  const { lastCorrectNumber } = SchulteTableGame
  return <p className='font-medium'>Last selected number: {lastCorrectNumber}</p>
}

export const CurrentNumberObservered = observer(CurrentNumber)
