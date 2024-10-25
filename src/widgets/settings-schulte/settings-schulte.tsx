import { memo } from 'react'

import { CurrentNumberObservered } from '@/widgets/settings-schulte/ui/current-number.tsx'
import { TimerObservered } from '@/widgets/settings-schulte/ui/timer.tsx'

import { ChangeSizeTableSchulteObservered } from '@/features/change-size-table-schulte'
import { ResetGameSchulteObservered } from '@/features/reset-game-schulte'
import { StartGameSchulteObservered } from '@/features/start-game-schulte'
import { ToggleChainSizeSchulteObservered } from '@/features/toggle-chain-size-schulte'
import { ToggleHardModeSchulteObservered } from '@/features/toggle-hard-mode-schulte'
import { ToggleHardModeUltraSchulteObservered } from '@/features/toggle-hard-mode-ultra-schulte'
import { ToggleMarkAnswersSchulteObservered } from '@/features/toggle-mark-answers-schulte'

import { CountErrorsObservered } from './ui/count-errors.tsx'

const SettingsSchulte = () => {
  return (
    <div className='flex flex-col gap-3'>
      <TimerObservered />
      <CountErrorsObservered />
      <CurrentNumberObservered />

      <ToggleChainSizeSchulteObservered />
      <ChangeSizeTableSchulteObservered />
      <ToggleMarkAnswersSchulteObservered />
      <ToggleHardModeSchulteObservered />
      <ToggleHardModeUltraSchulteObservered />

      <div className='grid grid-cols-2 gap-2'>
        <ResetGameSchulteObservered />
        <StartGameSchulteObservered />
      </div>
    </div>
  )
}

export const SettingsSchulteMemo = memo(SettingsSchulte)
