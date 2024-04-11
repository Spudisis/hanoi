import { observer } from 'mobx-react-lite'

import { HanoiTowerGame, MAX_LAYERS } from '@/shared/data/hanoi-tower'
import { Select } from '@/shared/ui'

const ChangeCountLayersHanoi = () => {
  const { changeInitLayers, countLayersInit } = HanoiTowerGame
  const options = MAX_LAYERS.map((elem) => ({ value: elem }))

  return (
    <Select label='Count layers' options={options} onChange={(value) => changeInitLayers({ countLayers: value })} value={countLayersInit} />
  )
}

export const ChangeCountLayersHanoiObservered = observer(ChangeCountLayersHanoi)
