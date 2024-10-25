import { makeAutoObservable } from 'mobx'

import { shuffleArray } from '@/shared/data/shuffle.ts'

import { INIT_TABLE, SIZE_TABLE } from './config.ts'

class SchulteTable {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  isBindValues = true
  weight: number = SIZE_TABLE.weight.default
  height: number = SIZE_TABLE.height.default
  lastCorrectNumber = 0

  countErrors = 0

  isPrecessingGaming = false

  timer: NodeJS.Timeout | null = null
  gameTime: number = 0

  statusModalWin = false
  statusWin = false

  shuffledArray: number[] = INIT_TABLE

  get sizeArr() {
    return this.weight * this.height
  }

  get isRunningGame() {
    return this.isPrecessingGaming || this.statusWin
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

  shuffleArray() {
    const sizeArr = this.sizeArr
    const ArrNumber = new Array(sizeArr).fill('').map((_, i) => ++i)
    this.shuffledArray = shuffleArray(ArrNumber)
  }

  get filledShuffledArray() {
    return this.shuffledArray
  }

  get sizeCell() {
    const max = Math.max(this.weight, this.height)
    if (max <= 7) {
      return '100px'
    } else if (max <= 9) {
      return '75px'
    } else {
      return '50px'
    }
  }

  changeSize(value: number) {
    this.weight = value
    this.height = value
    this.shuffleArray()
  }

  changeWeight(newWeight: number) {
    this.weight = newWeight
    this.shuffleArray()
  }
  changeHeight(newHeight: number) {
    this.height = newHeight
    this.shuffleArray()
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
    if (!this.isPrecessingGaming) {
      this.startGame()
    }
    if (this.lastCorrectNumber + 1 === b) {
      this.lastCorrectNumber = b
      if (this.sizeArr === b) {
        this.endGame()
        this.changeStatusWinGame()
      }
      return true
    }
    this.countErrors = this.countErrors + 1
    return false
  }

  startGame() {
    this.isPrecessingGaming = true
    const started = new Date().getTime()

    this.timer = setInterval(() => {
      const current = new Date().getTime()
      this.gameTime = current - started
    }, 300)
  }

  endGame() {
    this.isPrecessingGaming = false
    this.statusWin = true
    this.clearInterval()
  }

  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  changeStatusWinGame(b?: boolean) {
    this.toggleModalWin(b)
  }

  toggleModalWin(b?: boolean) {
    this.statusModalWin = b ?? !this.statusModalWin
  }

  reset() {
    this.weight = 3
    this.height = 3
    this.isBindValues = true
    this.lastCorrectNumber = 0
    this.countErrors = 0
    this.isPrecessingGaming = false
    this.gameTime = 0
    this.statusModalWin = false
    this.statusWin = false
    this.clearInterval()
  }

  resetGame() {
    this.lastCorrectNumber = 0
    this.countErrors = 0
    this.isPrecessingGaming = false
    this.gameTime = 0
    this.statusModalWin = false
    this.statusWin = false
    this.clearInterval()
    this.shuffleArray()
  }
}
export const SchulteTableGame = new SchulteTable()
