import { observer } from 'mobx-react-lite'

import { SchulteTableGame } from '@/shared/data/schute-table'

const CountErrors = () => {
  const { countErrors } = SchulteTableGame
  return <p className='font-medium'>Count errors: {countErrors}</p>
}

export const CountErrorsObservered = observer(CountErrors)
