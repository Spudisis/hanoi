import { CSSProperties, useRef } from 'react'

import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import clsx from 'clsx'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame, HanoiTowerLayer } from '@/shared/data/hanoi-tower'

type DraggableBrickHanoiProps = {
  layer: HanoiTowerLayer
  style?: {
    width: number
    height: number
    cursor?: string
  } | null
}

const DraggableBrickHanoi = ({ layer, style }: DraggableBrickHanoiProps) => {
  const { percentLayerWidth, firstLayoutInColumn } = HanoiTowerGame

  const brickRef = useRef<HTMLDivElement>(null)

  const disabledBrick = !firstLayoutInColumn(layer.id, layer.column)

  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: layer.id,
    data: {
      id: layer.id,
      type: 'drag-hanoi-brick',
      width: brickRef.current?.clientWidth,
      height: brickRef.current?.clientHeight
    },
    disabled: disabledBrick
  })

  const styleT: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform)
  }

  return (
    <div ref={setNodeRef} className='w-full h-7 flex justify-center' style={styleT}>
      <div
        style={{ width: 100 - layer.size * percentLayerWidth + '%', backgroundColor: layer.color, ...style }}
        ref={brickRef}
        {...attributes}
        {...listeners}
        className={clsx('h-7 rounded-xl shadow-brick', disabledBrick ? 'cursor-auto' : 'cursor-grab')}
      ></div>
    </div>
  )
}

export const DraggableBrickHanoiObservered = observer(DraggableBrickHanoi)
