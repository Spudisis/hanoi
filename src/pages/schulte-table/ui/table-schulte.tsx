import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'

import { ItemTableObservered } from './item-table.tsx'

const TableSchulte = () => {
  const { weight, height, filledShuffledArray } = SchulteTableGame

  return (
    <div
      className='grid'
      style={{
        gridTemplateColumns: `repeat(${weight}, 100px)`,
        gridTemplateRows: `repeat(${height}, 100px)`
      }}
    >
      {filledShuffledArray.map((elem) => (
        <ItemTableObservered key={elem}>{elem}</ItemTableObservered>
      ))}
    </div>
  )
}

export const TableSchulteObservered = observer(TableSchulte)
