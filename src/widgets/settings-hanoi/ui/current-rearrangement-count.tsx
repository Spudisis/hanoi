import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

const CurrentRearrangementCount = () => {
  const { rearrangementCount } = HanoiTowerGame
  return <p className='font-medium'>Current rearrangement count: {rearrangementCount}</p>
}

export const CurrentRearrangementCountObservered = observer(CurrentRearrangementCount)
