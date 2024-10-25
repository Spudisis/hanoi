import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Toggle } from '@/shared/ui'

const ToggleMarkAnswersSchulte = () => {
  const { isMarkAnswers, toggleIsMarkAnswers, isRunningGame } = SchulteTableGame
  return (
    <Toggle disabled={isRunningGame} label='Show anwsers' checked={isMarkAnswers} onChange={(e) => toggleIsMarkAnswers(e.target.checked)} />
  )
}

export const ToggleMarkAnswersSchulteObservered = observer(ToggleMarkAnswersSchulte)
