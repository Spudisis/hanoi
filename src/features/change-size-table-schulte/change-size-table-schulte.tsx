import { observer } from 'mobx-react-lite'

import { ChangeSizeChainObservered } from '@/features/change-size-table-schulte/change-size-chain.tsx'

import { SchulteTableGame } from '@/shared/data/schute-table'

import { ChangeHeightObservered } from './change-height.tsx'
import { ChangeWeightObservered } from './change-weight.tsx'

const ChangeSizeTableSchulte = () => {
  const { isBindValues } = SchulteTableGame
  return (
    <div>
      {isBindValues ? (
        <ChangeSizeChainObservered />
      ) : (
        <>
          <ChangeWeightObservered />
          <ChangeHeightObservered />
        </>
      )}
    </div>
  )
}

export const ChangeSizeTableSchulteObservered = observer(ChangeSizeTableSchulte)
