import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'

import { ItemTableObservered } from './item-table.tsx'

const TableSchulte = () => {
  const { weight, height, filledShuffledArray, sizeCell } = SchulteTableGame

  return (
    <div
      className='grid'
      style={{
        gridTemplateColumns: `repeat(${weight}, ${sizeCell})`,
        gridTemplateRows: `repeat(${height}, ${sizeCell})`
      }}
    >
      {filledShuffledArray.map((elem, index) => (
        <ItemTableObservered key={elem.number} status={elem.status} index={index}>
          {elem.number}
        </ItemTableObservered>
      ))}
    </div>
  )
}

export const TableSchulteObservered = observer(TableSchulte)
