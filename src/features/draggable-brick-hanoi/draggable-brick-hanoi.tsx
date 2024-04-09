import { useRef } from 'react'

import { useDraggable } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'

import { HanoiTowerGame, HanoiTowerLayer } from '@/shared/data/hanoi-tower'

type DraggableBrickHanoiProps = {
  layer: HanoiTowerLayer
  style?: {
    width: number
    height: number
  } | null
}

const DraggableBrickHanoi = ({ layer, style }: DraggableBrickHanoiProps) => {
  const { percentLayerWidth } = HanoiTowerGame

  const brickRef = useRef<HTMLDivElement>(null)

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: layer.id,
    data: {
      id: layer.id,
      type: 'drag-hanoi-brick',
      width: brickRef.current?.clientWidth,
      height: brickRef.current?.clientHeight
    }
  })

  return (
    <div
      draggable
      style={{ width: 100 - layer.size * percentLayerWidth + '%', backgroundColor: layer.color, ...style }}
      ref={(el) => {
        //@ts-ignore
        brickRef.current = el
        setNodeRef(el)
      }}
      {...attributes}
      {...listeners}
      className='h-6 bg-gray-500 rounded-xl'
    ></div>
  )
}

export const DraggableBrickHanoiObservered = observer(DraggableBrickHanoi)
