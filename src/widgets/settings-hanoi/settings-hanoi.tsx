import { AutoPlayHanoiObservable } from '@/features/auto-play-hanoi'
import { ChangeCountCoolumnsHanoiObservered } from '@/features/change-count-columns-hanoi'
import { ChangeCountLayersHanoiObservered } from '@/features/change-count-layers-hanoi'
import { ChangeGameModeHanoiObservered } from '@/features/change-game-mode-hanoi'
import { HistoryStepsHanoiObservered } from '@/features/history-steps-hanoi'
import { ResetLayersHanoiObservered } from '@/features/reset-layers-hanoi'
import { StartNewGameHanoiObservered } from '@/features/start-new-game-hanoi'
import { ToggleAnimationHanoiObservered } from '@/features/toggle-animation-hanoi'
import { ToggleBabyModeHanoiObservered } from '@/features/toggle-baby-mode-hanoi'
import { ToggleRainbowModeHanoiObservered } from '@/features/toggle-rainbow-mode-hanoi'

import { Divider } from '@/shared/ui'

import { CurrentRearrangementCountObservered } from './ui/current-rearrangement-count'
import { RequiredMinRearrangementObservered } from './ui/required-min-rearrangement'

export const SettingsHanoi = () => {
  return (
    <div className='flex flex-col gap-3'>
      <>
        <ChangeGameModeHanoiObservered />
        <RequiredMinRearrangementObservered />

        <CurrentRearrangementCountObservered />
      </>
      <Divider />
      <ChangeCountLayersHanoiObservered />
      <ChangeCountCoolumnsHanoiObservered />
      <ToggleBabyModeHanoiObservered />
      <ToggleRainbowModeHanoiObservered />
      <ToggleAnimationHanoiObservered />
      <div className='grid grid-cols-2 gap-2'>
        <ResetLayersHanoiObservered />
        <StartNewGameHanoiObservered />
      </div>
      <Divider />
      <HistoryStepsHanoiObservered />
      <AutoPlayHanoiObservable />
    </div>
  )
}
