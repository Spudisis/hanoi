import { makeAutoObservable } from 'mobx'

import { shuffleArray } from '@/shared/data/shuffle.ts'

class SchulteTable {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  isBindValues = true
  weight = 3
  height = 3
  lastCorrectNumber = 0

  countErrors = 0

  isRunningGame = false

  timer: NodeJS.Timeout | null = null
  gameTime: number = 0

  get sizeArr() {
    return this.weight * this.height
  }

  get time() {
    function secondsToTime(secs: number) {
      const divisor_for_minutes = secs % (60 * 60)
      const minutes = Math.floor(divisor_for_minutes / 60)
      const divisor_for_seconds = divisor_for_minutes % 60
      const seconds = Math.ceil(divisor_for_seconds)
      const normalizationMin = minutes < 10 ? '0' + minutes : minutes
      const normalizationSec = seconds < 10 ? '0' + seconds : seconds
      return normalizationMin + ':' + normalizationSec
    }
    return secondsToTime(this.gameTime / 1000)
  }

  get filledShuffledArray() {
    const sizeArr = this.sizeArr
    const ArrNumber = new Array(sizeArr).fill('').map((_, i) => ++i)
    return shuffleArray(ArrNumber)
  }

  changeSize(value: number) {
    this.weight = value
    this.height = value
  }

  changeWeight(newWeight: number) {
    if (this.isBindValues) {
      this.changeSize(newWeight)
    } else this.weight = newWeight
  }
  changeHeight(newHeight: number) {
    if (this.isBindValues) {
      this.changeSize(newHeight)
    } else this.height = newHeight
  }

  toggleBindValues(b?: boolean) {
    const newValue = b ?? !this.isBindValues
    this.isBindValues = newValue
    if (newValue) {
      if (this.weight > this.height) {
        this.height = this.weight
      } else {
        this.weight = this.height
      }
    }
  }

  selectNumber(b: number) {
    if (!this.isRunningGame) {
      this.startGame()
    }
    if (this.lastCorrectNumber + 1 === b) {
      this.lastCorrectNumber = b
      if (this.sizeArr === b) {
        this.endGame()
      }
      return true
    }
    this.countErrors = this.countErrors + 1
    return false
  }

  startGame() {
    this.resetGame()

    this.isRunningGame = true
    const started = new Date().getTime()

    this.timer = setInterval(() => {
      const current = new Date().getTime()
      this.gameTime = current - started
    }, 300)
  }

  endGame() {
    this.isRunningGame = false
    this.clearInterval()
  }

  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  reset() {
    this.weight = 3
    this.height = 3
    this.isBindValues = true
    this.lastCorrectNumber = 0
    this.countErrors = 0
    this.isRunningGame = false
    this.gameTime = 0
    this.clearInterval()
  }

  resetGame() {
    this.lastCorrectNumber = 0
    this.countErrors = 0
    this.isRunningGame = false
    this.gameTime = 0
    this.clearInterval()
  }
}
export const SchulteTableGame = new SchulteTable()
