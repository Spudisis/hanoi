import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

const CurrentRearrangementCount = () => {
  const { rearrangementCount } = HanoiTowerGame
  return <p className='font-medium'>Count rearrangements: {rearrangementCount}</p>
}

export const CurrentRearrangementCountObservered = observer(CurrentRearrangementCount)
