import { useRef } from 'react'

import { useDraggable } from '@dnd-kit/core'
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

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: layer.id,
    data: {
      id: layer.id,
      type: 'drag-hanoi-brick',
      width: brickRef.current?.clientWidth,
      height: brickRef.current?.clientHeight
    },
    disabled: disabledBrick
  })

  return (
    <div
      style={{ width: 100 - layer.size * percentLayerWidth + '%', backgroundColor: layer.color, ...style }}
      ref={(el) => {
        //@ts-ignore
        brickRef.current = el
        setNodeRef(el)
      }}
      {...attributes}
      {...listeners}
      className={clsx('h-7 bg-gray-500 rounded-xl', disabledBrick ? 'cursor-auto' : 'cursor-grab')}
    ></div>
  )
}

export const DraggableBrickHanoiObservered = observer(DraggableBrickHanoi)
