import { observer } from 'mobx-react-lite'

import { HanoiTowerGame, MAX_LAYERS, MIN_LAYERS } from '@/shared/data/hanoi-tower'
import { Range } from '@/shared/ui'

const ChangeCountLayersHanoi = () => {
  const { changeInitLayers, countLayersInit } = HanoiTowerGame
  // const options = MAX_LAYERS.map((elem) => ({ value: elem }))

  return (
    <Range
      label='Count layers'
      max={MAX_LAYERS}
      min={MIN_LAYERS}
      step={1}
      value={countLayersInit}
      onChange={(e) => changeInitLayers({ countLayers: e.target.value })}
    >
      <div>{countLayersInit}</div>
    </Range>
    // <Select label='Count layers' options={options} onChange={(value) => changeInitLayers({ countLayers: value })} value={countLayersInit} />
  )
}

export const ChangeCountLayersHanoiObservered = observer(ChangeCountLayersHanoi)
