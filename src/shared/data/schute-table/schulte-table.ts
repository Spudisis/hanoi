import { makeAutoObservable, reaction } from 'mobx'

import { shuffleArray } from '@/shared/data/shuffle.ts'

import { INIT_TABLE, SIZE_TABLE } from './config.ts'

class SchulteTable {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  isHardMode = false
  isUltraHardMode = false
  isReverseMode = false
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

  shuffledArray: { number: number; status: boolean }[] = INIT_TABLE

  focusItem: { col: number; row: number } | null = null

  get sizeArr() {
    return this.weight * this.height
  }

  get needToFindNumber() {
    return this.isReverseMode ? this.lastCorrectNumber - 1 : this.lastCorrectNumber + 1
  }

  get isRunningGame() {
    return this.isPrecessingGaming || this.statusWin
  }

  get activeItem() {
    if (this.focusItem) {
      return this.focusItem.col + this.height * this.focusItem.row
    }
    return null
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
    const ArrNumber = new Array(sizeArr).fill('').map((_, i) => ({ status: false, number: ++i }))
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

  setActiveFocus(index: number) {
    const col = index % this.weight
    const row = Math.floor(index / this.height)
    this.focusItem = { col, row }
  }

  eventNavigateByArrows(e: KeyboardEvent) {
    if (!this.focusItem) return null
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      const col = this.focusItem.col
      const row = this.focusItem.row

      if (e.key === 'ArrowLeft') {
        const newCol = col > 0 ? col - 1 : this.weight - 1

        this.focusItem = {
          col: newCol,
          row
        }
      }
      if (e.key === 'ArrowRight') {
        const newCol = col < this.weight - 1 ? col + 1 : 0

        this.focusItem = {
          col: newCol,
          row
        }
      }
      if (e.key === 'ArrowUp') {
        const newRow = row > 0 ? row - 1 : this.height - 1

        this.focusItem = {
          col,
          row: newRow
        }
      }
      if (e.key === 'ArrowDown') {
        const newRow = row < this.height - 1 ? row + 1 : 0
        this.focusItem = {
          col,
          row: newRow
        }
      }
    }
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
  toggleReverseModeGame(b?: boolean) {
    const status = b ?? !this.isReverseMode
    this.isReverseMode = status
    if (status) {
      this.lastCorrectNumber = this.sizeArr + 1
    } else {
      this.lastCorrectNumber = 0
    }
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

  randomizeShuffleCurrentArray() {
    this.shuffledArray = shuffleArray(this.shuffledArray)
  }

  selectNumber(b: number, index: number) {
    if (!this.isPrecessingGaming) {
      this.startGame()
    }
    this.setActiveFocus(index)

    if (this.isReverseMode ? this.lastCorrectNumber - 1 === b : this.lastCorrectNumber + 1 === b) {
      this.lastCorrectNumber = b
      this.shuffledArray[index].status = true
      if (this.isReverseMode ? 1 === b : this.sizeArr === b) {
        this.endGame()
        this.changeStatusWinGame()
      } else if (this.isHardMode && !this.isUltraHardMode) {
        this.randomizeShuffleCurrentArray()
      }
      return true
    }
    this.countErrors = this.countErrors + 1
    return false
  }

  startGame() {
    this.isPrecessingGaming = true
    const started = new Date().getTime()
    this.focusItem = { col: 0, row: 0 }
    if (this.isUltraHardMode) {
      this.timerUltraMode = setInterval(() => {
        this.randomizeShuffleCurrentArray()
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
    this.focusItem = null
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

  private resetLastCorrectNumber() {
    this.lastCorrectNumber = this.isReverseMode ? this.sizeArr + 1 : 0
  }

  reset() {
    this.weight = 3
    this.height = 3
    this.isBindValues = true
    this.resetLastCorrectNumber()
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
    this.focusItem = null
  }

  resetGame() {
    this.resetLastCorrectNumber()
    this.countErrors = 0
    this.isPrecessingGaming = false
    this.gameTime = 0
    this.statusModalWin = false
    this.statusWin = false
    this.clearIntervalTime()
    this.shuffleArray()
    this.clearIntervalUltraMode()
    this.focusItem = null
  }
}
export const SchulteTableGame = new SchulteTable()

reaction(
  () => SchulteTableGame.isRunningGame,
  (value) => {
    if (value) {
      document.addEventListener('keydown', SchulteTableGame.eventNavigateByArrows)
    } else {
      document.removeEventListener('keydown', SchulteTableGame.eventNavigateByArrows)
    }
  }
)
