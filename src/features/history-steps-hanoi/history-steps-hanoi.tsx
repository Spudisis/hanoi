import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Button } from '@/shared/ui'

const HistoryStepsHanoi = () => {
  const { isLastStep, isFirstStep, goPrevStep, goNextStep } = HanoiTowerGame
  return (
    <div className='flex flex-row justify-between items-center'>
      <Button disabled={isFirstStep} onClick={goPrevStep}>
        back
      </Button>
      <div>count</div>
      <Button disabled={isLastStep} onClick={goNextStep}>
        next
      </Button>
    </div>
  )
}

export const HistoryStepsHanoiObservered = observer(HistoryStepsHanoi)
