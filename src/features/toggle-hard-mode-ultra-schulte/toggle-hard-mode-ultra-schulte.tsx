import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Toggle } from '@/shared/ui'

const ToggleHardModeUltraSchulte = () => {
  const { toggleUltraHardGame, isUltraHardMode, isHardMode } = SchulteTableGame

  if (!isHardMode) {
    return null
  }

  return (
    <Toggle
      label={<span className='text-red-700'>Ultra mode</span>}
      checked={isUltraHardMode}
      onChange={(e) => toggleUltraHardGame(e.target.checked)}
    />
  )
}

export const ToggleHardModeUltraSchulteObservered = observer(ToggleHardModeUltraSchulte)
