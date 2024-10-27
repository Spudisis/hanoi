import { ComponentProps, useState } from 'react'

import { Icon } from '@iconify/react'
import { clsx } from 'clsx'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tw-merge'

import { Button, Divider, Modal, Typography } from '@/shared/ui'

const HeaderSection = ({ className, children, ...rest }: ComponentProps<'h2'>) => (
  <h2 className={twMerge(clsx('font-semibold text-xl', className))} {...rest}>
    {children}
  </h2>
)

const AboutGame = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <Button onClick={() => setIsOpen((prev) => !prev)} className='justify-center'>
        <Icon icon='material-symbols:info-outline' className='text-blue-600 w-6 h-6' />
        About game
      </Button>
      <Modal
        classContent='md:w-[800px]'
        status={isOpen}
        title='About game'
        onClose={() => setIsOpen((prev) => !prev)}
        body={
          <>
            <HeaderSection>What is Schulte tables?</HeaderSection>
            <Typography className='text-black'>
              Schulte tables are tables of randomly arranged objects (usually numbers or letters) used to test and develop the speed of
              finding these objects in a particular order. Exercises with tables allow to improve peripheral visual perception, which is
              important, for example, for speed reading.
            </Typography>
            <HeaderSection>Speed reading practice</HeaderSection>
            <ul className='list-disc pl-4'>
              <li>The distance from the table to your eyes should be the same as when reading a book, i.e. about 30-35 cm.</li>
              <li>Before you start working with the table, fix your eyes in the center of the table and do not move.</li>
              <li>
                Find numbers in ascending order from 1 to 25, without skips, with maximum speed, preferably without saying the numbers
                either to yourself or aloud. It is very important to avoid moving the gaze from the center and look for numbers only with
                peripheral vision.
              </li>
              <li>The time and frequency of training should be chosen so as to avoid overwork. Usually no more than 10 tables per day.</li>
              <li>
                As the skill develops, one moves to tables with the number of cells 6x6, 7x7, 8x8, increasing the size of the square
                accordingly.
              </li>
            </ul>
            <div>
              <HeaderSection>About game modes</HeaderSection>
              <HeaderSection className='font-medium text-lg'>Reverse mode</HeaderSection>
              <Typography className='text-black'>Same rules, except you have to look for numbers in reverse order</Typography>
            </div>
            <Typography className='text-black'>
              <b>All further game modes are created for fun only</b>
            </Typography>
            <div>
              <HeaderSection className='font-medium text-lg'>Hard mode</HeaderSection>
              <Typography className='text-black'>After each correct number selection, the table is shuffled</Typography>
              <Divider />
              <HeaderSection className='font-medium text-lg'>Ultra mode</HeaderSection>
              <Typography className='text-black'>
                The table is shuffled every <b>N</b> milliseconds, which can be customized
              </Typography>
            </div>
            <HeaderSection>Another features</HeaderSection>
            <ul className='list-decimal pl-4'>
              <li>
                <b>Show answers</b> - enabled by default, lights up already correctly selected numbers.
              </li>
              <li>
                <b>Navigation with keyboard</b> - after the start there is a special selection at one of the numbers, from which you can
                start moving between cells using the <b>arrows</b> on the keyboard. You can move from one side to another with the{' '}
                <b>shift key</b> pressed.
              </li>
              <li>
                <b>Custom size table</b> - you can customize the table size, as well as customize the height and width of the table
                separately by turning off the <b>&quot;Chain size&quot;</b> parameter
              </li>
            </ul>

            <Typography>
              Game description source:{' '}
              <a
                className='text-black hover:text-gray-500'
                target='_blank'
                href='https://ru.wikipedia.org/wiki/%D0%A2%D0%B0%D0%B1%D0%BB%D0%B8%D1%86%D0%B0_%D0%A8%D1%83%D0%BB%D1%8C%D1%82%D0%B5'
                rel='noreferrer'
              >
                wiki
              </a>
            </Typography>
          </>
        }
        footer={<Button onClick={() => setIsOpen((prev) => !prev)}>Close</Button>}
      />
    </>
  )
}

export const AboutGameObservered = observer(AboutGame)
