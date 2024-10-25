import { observer } from 'mobx-react-lite'

import { SchulteTableGame, SIZE_TABLE } from '@/shared/data/schute-table'
import { Range } from '@/shared/ui'

const ChangeWeight = () => {
  const { weight, changeWeight, isRunningGame } = SchulteTableGame

  return (
    <Range
      label='Weight'
      value={weight}
      disabled={isRunningGame}
      max={SIZE_TABLE.weight.max}
      min={SIZE_TABLE.weight.min}
      onChange={(e) => changeWeight(Number(e.target.value))}
    >
      <div>{weight}</div>
    </Range>
  )
}

export const ChangeWeightObservered = observer(ChangeWeight)
