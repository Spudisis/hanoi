export const MAX_COLUMNS = [3, 4, 5] as const
export const MAX_LAYERS = 100
export const MIN_LAYERS = 4

export const LAYERS_COUNT = Array.from({ length: MAX_LAYERS })
  .map((_, index) => index)
  .filter((elem) => elem > MIN_LAYERS - 1)

export const COLORS = [
  '#E9172C',
  '#E98E17',
  '#EEF52B',
  '#28F919',
  '#19F9EA',
  '#1928F9',
  '#8919F9',
  '#360962',
  '#DB0EE9',
  '#DB80BA',
  '#84CDAD'
] as const

export type GameMode = 'Normal' | 'Free'

export const GAME_MODES: GameMode[] = ['Normal', 'Free']
