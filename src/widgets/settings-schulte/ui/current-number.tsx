import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'

const CurrentNumber = () => {
  const { needToFindNumber, isPrecessingGaming } = SchulteTableGame
  if (!isPrecessingGaming) return null
  return <p className='font-medium'>Need to find: {needToFindNumber}</p>
}

export const CurrentNumberObservered = observer(CurrentNumber)
