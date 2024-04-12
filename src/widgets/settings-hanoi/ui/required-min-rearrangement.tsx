import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

const RequiredMinRearrangement = () => {
  const { requiredMinRearrangementBasedOnSettings } = HanoiTowerGame

  if (!requiredMinRearrangementBasedOnSettings) {
    return <p className='font-medium'>Umm...</p>
  }

  return (
    <p className='font-medium'>
      {requiredMinRearrangementBasedOnSettings}
      {requiredMinRearrangementBasedOnSettings < 100000 ? ' perfect rearrangement to win' : ', are you serious?'}
    </p>
  )
}

export const RequiredMinRearrangementObservered = observer(RequiredMinRearrangement)
