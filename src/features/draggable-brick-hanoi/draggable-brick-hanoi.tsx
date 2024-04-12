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
  const { percentLayerWidth, firstLayoutInColumn, babyMode, isWin } = HanoiTowerGame

  const brickRef = useRef<HTMLDivElement>(null)

  const disabledBrick = !firstLayoutInColumn(layer.id, layer.column)

  const disabled = disabledBrick || isWin

  const { attributes, listeners, setNodeRef, isDragging, transform } = useDraggable({
    id: layer.id,
    data: {
      id: layer.id,
      type: 'drag-hanoi-brick',
      width: brickRef.current?.clientWidth,
      height: brickRef.current?.clientHeight
    },
    disabled
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
        className={clsx('h-7 rounded-xl shadow-brick flex justify-center', disabled ? 'cursor-auto' : 'cursor-grab')}
      >
        {babyMode && (
          <div className='bg-white rounded-lg px-1 my-1 border border-[rgba(0,0,0,0.5)]'>
            <p className='font-semibold text-sm leading-[18px]'>{layer.size + 1}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export const DraggableBrickHanoiObservered = observer(DraggableBrickHanoi)
