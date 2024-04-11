import { ChangeCountCoolumnsHanoiObservered } from '@/features/change-count-columns-hanoi'
import { ChangeCountLayersHanoiObservered } from '@/features/change-count-layers-hanoi'
import { ResetLayersHanoiObservered } from '@/features/reset-layers-hanoi'
import { StartNewGameHanoiObservered } from '@/features/start-new-game-hanoi'
import { ToggleBabyModeHanoiObservered } from '@/features/toggle-baby-mode-hanoi'
import { ToggleRainbowModeHanoiObservered } from '@/features/toggle-rainbow-mode-hanoi'

export const SettingsHanoi = () => {
  return (
    <div className='flex flex-col gap-2'>
      <ChangeCountLayersHanoiObservered />
      <ChangeCountCoolumnsHanoiObservered />
      <ToggleBabyModeHanoiObservered />
      <ToggleRainbowModeHanoiObservered />
      <div className='grid grid-cols-2 gap-2'>
        <ResetLayersHanoiObservered />
        <StartNewGameHanoiObservered />
      </div>
    </div>
  )
}
