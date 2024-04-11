import { observer } from 'mobx-react-lite'

import { HanoiTowerGame, MAX_COLUMNS } from '@/shared/data/hanoi-tower'
import { Select } from '@/shared/ui'

const ChangeCountCoolumnsHanoi = () => {
  const { columnsInit, changeInitColumns } = HanoiTowerGame
  const options = MAX_COLUMNS.map((elem) => ({ value: elem }))

  return <Select label='Count columns' options={options} onChange={(value) => changeInitColumns({ column: value })} value={columnsInit} />
}

export const ChangeCountCoolumnsHanoiObservered = observer(ChangeCountCoolumnsHanoi)
