import { memo } from 'react'

import { ChangeDelayUltraModeSchulteObservered } from '@/features/change-delay-ultra-mode-schulte'
import { ChangeSizeTableSchulteObservered } from '@/features/change-size-table-schulte'
import { ResetGameSchulteObservered } from '@/features/reset-game-schulte'
import { StartGameSchulteObservered } from '@/features/start-game-schulte'
import { ToggleChainSizeSchulteObservered } from '@/features/toggle-chain-size-schulte'
import { ToggleHardModeSchulteObservered } from '@/features/toggle-hard-mode-schulte'
import { ToggleHardModeUltraSchulteObservered } from '@/features/toggle-hard-mode-ultra-schulte'
import { ToggleMarkAnswersSchulteObservered } from '@/features/toggle-mark-answers-schulte'
import { ToggleReverseModeSchulteObservered } from '@/features/toggle-reverse-mode-schulte'

import { AboutGameObservered } from './ui/about-game.tsx'
import { CountErrorsObservered } from './ui/count-errors.tsx'
import { CurrentNumberObservered } from './ui/current-number.tsx'
import { TimerObservered } from './ui/timer.tsx'

const SettingsSchulte = () => {
  return (
    <div className='flex flex-col gap-3'>
      <AboutGameObservered />
      <TimerObservered />
      <CountErrorsObservered />
      <CurrentNumberObservered />

      <ToggleChainSizeSchulteObservered />
      <ChangeSizeTableSchulteObservered />
      <ToggleMarkAnswersSchulteObservered />
      <ToggleReverseModeSchulteObservered />
      <ToggleHardModeSchulteObservered />
      <ToggleHardModeUltraSchulteObservered />
      <ChangeDelayUltraModeSchulteObservered />

      <div className='grid grid-cols-2 gap-2'>
        <ResetGameSchulteObservered />
        <StartGameSchulteObservered />
      </div>
    </div>
  )
}

export const SettingsSchulteMemo = memo(SettingsSchulte)
