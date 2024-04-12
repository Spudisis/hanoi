import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Divider } from '@/shared/ui'

const RequiredMinRearrangement = () => {
  const { requiredMinRearrangementBasedOnSettings, gameMode } = HanoiTowerGame

  if (gameMode === 'Free') {
    return null
  }

  if (!requiredMinRearrangementBasedOnSettings) {
    return (
      <>
        <p className='font-medium'>Umm...</p> <Divider />
      </>
    )
  }

  return (
    <>
      <p className='font-medium'>
        {requiredMinRearrangementBasedOnSettings}
        {requiredMinRearrangementBasedOnSettings < 100000
          ? ' perfect rearrangement to win'
          : requiredMinRearrangementBasedOnSettings < 100000000
            ? ', are you serious?'
            : ', okay...'}
      </p>
      <Divider />
    </>
  )
}

export const RequiredMinRearrangementObservered = observer(RequiredMinRearrangement)
