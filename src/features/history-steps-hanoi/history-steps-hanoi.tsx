import { Icon } from '@iconify/react/dist/iconify.js'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Button } from '@/shared/ui'

const HistoryStepsHanoi = () => {
  const { isLastStep, isFirstStep, goPrevStep, goNextStep } = HanoiTowerGame
  return (
    <div className='flex flex-row justify-between items-center'>
      <Button disabled={isFirstStep} onClick={goPrevStep}>
        <Icon icon='material-symbols:play-arrow' className='rotate-180' />
      </Button>
      <div>Steps</div>
      <Button disabled={isLastStep} onClick={goNextStep}>
        <Icon icon='material-symbols:play-arrow' />
      </Button>
    </div>
  )
}

export const HistoryStepsHanoiObservered = observer(HistoryStepsHanoi)
