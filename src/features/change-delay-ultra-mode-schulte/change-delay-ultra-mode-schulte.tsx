import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Range } from '@/shared/ui'

const ChangeDelayUltraModeSchulte = () => {
  const { delayShuffleUltraMode, changeDelayShuffleUltraMode, isRunningGame, isUltraHardMode } = SchulteTableGame

  if (!isUltraHardMode) {
    return null
  }
  return (
    <Range
      label='Delay shuffle'
      value={delayShuffleUltraMode}
      disabled={isRunningGame}
      max={3000}
      step={100}
      min={300}
      onChange={(e) => changeDelayShuffleUltraMode(Number(e.target.value))}
    >
      <div>{delayShuffleUltraMode}</div>
    </Range>
  )
}

export const ChangeDelayUltraModeSchulteObservered = observer(ChangeDelayUltraModeSchulte)
