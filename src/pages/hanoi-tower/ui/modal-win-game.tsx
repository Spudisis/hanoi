import { observer } from 'mobx-react-lite'

import { HanoiTowerGame } from '@/shared/data/hanoi-tower'
import { Button, Modal, Typography } from '@/shared/ui'

const ModalWinGame = () => {
  const { closeModalWin, modalIsWin } = HanoiTowerGame
  return (
    <Modal
      status={modalIsWin}
      title='Congrats!'
      onClose={closeModalWin}
      body={<Typography>Um....</Typography>}
      footer={<Button onClick={closeModalWin}>Close</Button>}
    />
  )
}

export const ModalWinGameObservered = observer(ModalWinGame)
