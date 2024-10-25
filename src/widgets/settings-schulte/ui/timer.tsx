import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'

const Timer = () => {
  const { time } = SchulteTableGame
  return <div>Timer: {time}</div>
}

export const TimerObservered = observer(Timer)
