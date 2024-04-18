import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Button } from '@/shared/ui'

const AutoPlayHanoi = () => {
  const { handleAutoPlay } = HanoiTowerGame
  return <Button onClick={handleAutoPlay}>autoplay</Button>
}

export const AutoPlayHanoiObservable = observer(AutoPlayHanoi)
