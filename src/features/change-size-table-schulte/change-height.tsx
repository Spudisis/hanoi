import { observer } from 'mobx-react-lite'

import { SchulteTableGame, SIZE_TABLE } from '@/shared/data/schute-table'
import { Range } from '@/shared/ui'

const ChangeHeight = () => {
  const { height, changeHeight, isRunningGame } = SchulteTableGame

  return (
    <Range
      label='Height'
      value={height}
      disabled={isRunningGame}
      max={SIZE_TABLE.height.max}
      min={SIZE_TABLE.height.min}
      onChange={(e) => changeHeight(Number(e.target.value))}
    >
      <div>{height}</div>
    </Range>
  )
}

export const ChangeHeightObservered = observer(ChangeHeight)
