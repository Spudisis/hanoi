import { makeAutoObservable } from 'mobx'

import { shuffleArray } from '@/shared/data/shuffle.ts'

import { INIT_TABLE, SIZE_TABLE } from './config.ts'

class SchulteTable {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  isHardMode = false
  isUltraHardMode = false
  delayShuffleUltraMode = 1000

  timerUltraMode: NodeJS.Timeout | null = null

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

  isMarkAnswers = true

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
        this.changeHeight(this.weight)
      } else {
        this.changeWeight(this.height)
      }
    }
  }

  toggleIsMarkAnswers(b?: boolean) {
    this.isMarkAnswers = b ?? !this.isMarkAnswers
  }

  toggleHardGame(b?: boolean) {
    this.isHardMode = b ?? !this.isHardMode
    if (this.isUltraHardMode) {
      this.toggleUltraHardGame(false)
    }
  }
  toggleUltraHardGame(b?: boolean) {
    this.isUltraHardMode = b ?? !this.isUltraHardMode
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
      } else if (this.isHardMode && !this.isUltraHardMode) {
        this.shuffleArray()
      }
      return true
    }
    this.countErrors = this.countErrors + 1
    return false
  }

  startGame() {
    this.isPrecessingGaming = true
    const started = new Date().getTime()

    if (this.isUltraHardMode) {
      this.timerUltraMode = setInterval(() => {
        this.shuffleArray()
      }, this.delayShuffleUltraMode)
    }

    this.timer = setInterval(() => {
      const current = new Date().getTime()
      this.gameTime = current - started
    }, 300)
  }

  endGame() {
    this.isPrecessingGaming = false
    this.statusWin = true
    this.clearIntervalTime()
    this.clearIntervalUltraMode()
  }

  clearIntervalTime() {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
  clearIntervalUltraMode() {
    if (this.timerUltraMode) {
      clearInterval(this.timerUltraMode)
    }
  }

  changeStatusWinGame(b?: boolean) {
    this.toggleModalWin(b)
  }

  changeDelayShuffleUltraMode(ms: number) {
    this.delayShuffleUltraMode = ms
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
    this.isMarkAnswers = true
    this.toggleHardGame(false)
    this.clearIntervalTime()
    this.clearIntervalUltraMode()
    this.delayShuffleUltraMode = 1000
  }

  resetGame() {
    this.lastCorrectNumber = 0
    this.countErrors = 0
    this.isPrecessingGaming = false
    this.gameTime = 0
    this.statusModalWin = false
    this.statusWin = false
    this.clearIntervalTime()
    this.shuffleArray()
    this.clearIntervalUltraMode()
  }
}
export const SchulteTableGame = new SchulteTable()
