import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Toggle } from '@/shared/ui'

const ToggleChainSizeSchulte = () => {
  const { isBindValues, toggleBindValues, isRunningGame } = SchulteTableGame
  return <Toggle label='Chain size' disabled={isRunningGame} checked={isBindValues} onChange={(e) => toggleBindValues(e.target.checked)} />
}

export const ToggleChainSizeSchulteObservered = observer(ToggleChainSizeSchulte)
