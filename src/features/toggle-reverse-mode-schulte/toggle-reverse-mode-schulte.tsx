import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Toggle } from '@/shared/ui'

const ToggleReverseModeSchulte = () => {
  const { isReverseMode, toggleReverseModeGame, isRunningGame } = SchulteTableGame
  return (
    <Toggle
      label='Reverse mode'
      disabled={isRunningGame}
      checked={isReverseMode}
      onChange={(e) => toggleReverseModeGame(e.target.checked)}
    />
  )
}

export const ToggleReverseModeSchulteObservered = observer(ToggleReverseModeSchulte)
