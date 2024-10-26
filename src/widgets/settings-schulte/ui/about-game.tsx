import { useState } from 'react'

import { Icon } from '@iconify/react'
import { observer } from 'mobx-react-lite'

import { Button, Modal, Typography } from '@/shared/ui'

const AboutGame = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)} className='justify-center'>
        <Icon icon='material-symbols:info-outline' className='text-blue-600 w-6 h-6' />
        About game
      </Button>
      <Modal
        status={isOpen}
        title='About game'
        onClose={() => setIsOpen((prev) => !prev)}
        body={<Typography>t</Typography>}
        footer={<Button onClick={() => setIsOpen((prev) => !prev)}>Close</Button>}
      />
    </>
  )
}

export const AboutGameObservered = observer(AboutGame)
