import { observer } from 'mobx-react-lite'

import { DraggableBrickHanoiObservered } from '@/features/draggable-brick-hanoi'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

const ActiveDragBrick = () => {
  const { draggedLayout, draggedLayoutSize } = HanoiTowerGame
  if (!draggedLayout) {
    return null
  }

  return (
    <DraggableBrickHanoiObservered style={draggedLayoutSize ? { ...draggedLayoutSize, cursor: 'grabbing' } : null} layer={draggedLayout} />
  )
}

export const ActiveDragBrickObservered = observer(ActiveDragBrick)
