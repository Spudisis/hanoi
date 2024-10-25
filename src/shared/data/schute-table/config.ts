import { shuffleArray } from '@/shared/data/shuffle.ts'

export const SIZE_TABLE = {
  weight: {
    max: 13,
    default: 3,
    min: 2
  },
  height: {
    max: 13,
    default: 3,
    min: 2
  }
} as const

export const DELAY_SHUFFLE_ULTRA = {
  max: 10000,
  min: 300,
  step: 100
}

export const INIT_TABLE = (() => {
  const ArrNumber = new Array(SIZE_TABLE.weight.default * SIZE_TABLE.height.default).fill('').map((_, i) => ++i)
  return shuffleArray(ArrNumber)
})()
