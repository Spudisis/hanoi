import { observer } from 'mobx-react-lite'

import { DELAY_SHUFFLE_ULTRA, SchulteTableGame } from '@/shared/data/schute-table'
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
      max={DELAY_SHUFFLE_ULTRA.max}
      step={DELAY_SHUFFLE_ULTRA.step}
      min={DELAY_SHUFFLE_ULTRA.min}
      onChange={(e) => changeDelayShuffleUltraMode(Number(e.target.value))}
    >
      <div>{(delayShuffleUltraMode / 1000).toFixed(1)}s</div>
    </Range>
  )
}

export const ChangeDelayUltraModeSchulteObservered = observer(ChangeDelayUltraModeSchulte)
