import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Toggle } from '@/shared/ui'

const ToggleHardModeSchulte = () => {
  const { toggleHardGame, isHardMode, isRunningGame } = SchulteTableGame
  return <Toggle disabled={isRunningGame} label='Hard mode' checked={isHardMode} onChange={(e) => toggleHardGame(e.target.checked)} />
}

export const ToggleHardModeSchulteObservered = observer(ToggleHardModeSchulte)
