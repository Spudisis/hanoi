import { observer } from 'mobx-react-lite'

import { SchulteTableGame, SIZE_TABLE } from '@/shared/data/schute-table'
import { Range } from '@/shared/ui'

const ChangeSizeChain = () => {
  const { height, weight, changeSize, isRunningGame } = SchulteTableGame

  return (
    <Range
      label='Size'
      disabled={isRunningGame}
      value={height}
      max={SIZE_TABLE.height.max}
      min={SIZE_TABLE.height.min}
      onChange={(e) => changeSize(Number(e.target.value))}
    >
      <div>
        {height}x{weight}
      </div>
    </Range>
  )
}

export const ChangeSizeChainObservered = observer(ChangeSizeChain)
