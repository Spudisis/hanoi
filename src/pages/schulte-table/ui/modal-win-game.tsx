import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'
import { Button, Modal, Typography } from '@/shared/ui'

const ModalWinGame = () => {
  const { statusModalWin, toggleModalWin, time, weight, height } = SchulteTableGame
  return (
    <Modal
      status={statusModalWin}
      title='Congrats!'
      onClose={toggleModalWin}
      body={
        <Typography>
          Win game size {weight}x{height} with time {time}
        </Typography>
      }
      footer={<Button onClick={() => toggleModalWin()}>Close</Button>}
    />
  )
}

export const ModalWinGameObservered = observer(ModalWinGame)
