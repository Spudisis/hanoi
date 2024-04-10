import { createPortal } from 'react-dom'

import { StandHanoiObservered } from '@/entities/stand-hanoi'
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'

import { DraggableBrickHanoiObservered } from '@/features/draggable-brick-hanoi'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'

import { ActiveDragBrickObservered } from './ui/active-drag-brick'

export const HanoiGame = observer(() => {
  const sensors = useSensors(useSensor(PointerSensor))

  const { columns, getLayersFromColumn, changeColumnLayer, changeDraggedLayoutId, changeDraggedLayoutSize } = HanoiTowerGame

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
      {createPortal(
        <DragOverlay
          zIndex={4000}
          style={{ width: 'auto', userSelect: 'none' }}
          dropAnimation={{ duration: 400, easing: 'cubic-bezier(0.18, 0.67, 0.6, 1.22)' }}
        >
          <ActiveDragBrickObservered />
        </DragOverlay>,
        document.body
      )}
      <div
        className={clsx('grid gap-6 h-80', {
          'grid-cols-3': columns === 3,
          'grid-cols-4': columns === 4,
          'grid-cols-5': columns === 5
        })}
      >
        {Array(columns)
          .fill(null)
          .map((_, i) => i)
          .map((column) => (
            <StandHanoiObservered key={String(column)} column={column}>
              {getLayersFromColumn({ column }).map((layer) => (
                <DraggableBrickHanoiObservered layer={layer} key={layer.id} />
              ))}
            </StandHanoiObservered>
          ))}
      </div>
    </DndContext>
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    //TODO: bug with color if drop item
    if (over && over.data.current && active.data.current) {
      changeColumnLayer({ column: over.data.current.index, idLayer: active.data.current.id })
    }
    changeDraggedLayoutId(null)
    changeDraggedLayoutSize(null)
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event

    if (active.data.current) {
      changeDraggedLayoutId(active.data.current.id)
      changeDraggedLayoutSize({ width: active.data.current.width, height: active.data.current.height })
    }
  }
})
