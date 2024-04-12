import { makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import { GameMode, LAYERS_COUNT, MAX_COLUMNS } from './config'

export type HanoiTowerLayer = {
  id: string
  color: string
  column: number
  position: number
  size: number
}

const randomiseDistance = ({ min, max }: { min: number; max: number }) => {
  return Math.floor(Math.random() * (max - min) + min)
}
// 6
const rainbowColor = (current: number, length: number) => {
  // количество айтемов на каждую часть радуги

  const frequency = 5 / length
  const r = Math.floor(Math.sin(frequency * current + 0) * 127 + 128)
  const g = Math.floor(Math.sin(frequency * current + 2) * 127 + 128)
  const b = Math.floor(Math.sin(frequency * current + 4) * 127 + 128)
  return `rgb(${r}, ${g}, ${b})`
}

const randomiseColor = () => {
  return `rgb(${randomiseDistance({ min: 0, max: 255 })},${randomiseDistance({ min: 0, max: 255 })},${randomiseDistance({ min: 0, max: 255 })})`
}

// TODO: add settings for color (randomise or color array)

class HanoiTower {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  gameMode: GameMode = 'Normal'
  isWin: boolean = false
  modalIsWin: boolean = false

  columns: (typeof MAX_COLUMNS)[number] = MAX_COLUMNS[0]
  countLayers: number = LAYERS_COUNT[7]

  columnsInit: (typeof MAX_COLUMNS)[number] = MAX_COLUMNS[0]
  countLayersInit: number = LAYERS_COUNT[7]

  rearrangementCount = 0
  private initTowerLayers: HanoiTowerLayer[] = []
  towerLayers: HanoiTowerLayer[] = []

  #draggedLayoutId: string | null = null
  draggedLayoutSize: { width: number; height: number } | null = null

  statusSidebar: boolean = false

  babyMode: boolean = false
  rainbowMode: boolean = false

  closeModalWin() {
    this.modalIsWin = false
  }

  changeGameMode(gameMode: GameMode) {
    this.gameMode = gameMode
    if (!this.brickHasBeenMoved) {
      this.startNewGame()
    }
  }

  get brickHasBeenMoved() {
    return this.rearrangementCount !== 0
  }

  changeStatusBabyMode(status?: boolean) {
    this.babyMode = status || !this.babyMode
  }

  changeStatusRainbowMode(status?: boolean) {
    this.rainbowMode = status || !this.rainbowMode
    this.coloredBrickRainbow()
  }

  coloredBrickRainbow() {
    if (this.rainbowMode) {
      const layers = this.towerLayers

      layers.sort((b, a) => b.size - a.size)
      this.towerLayers = layers.map((elem, index) => {
        return { ...elem, color: rainbowColor(index, layers.length) }
      })
    } else {
      this.towerLayers = this.initTowerLayers
    }
  }

  get heightStand() {
    return (this.countLayers + 1) * 1.75 + 'rem'
  }

  changeStatusSidebar(status?: boolean) {
    this.statusSidebar = status || !this.statusSidebar
  }

  changeDraggedLayoutId(id: string | null) {
    this.#draggedLayoutId = id
  }

  changeDraggedLayoutSize(value: { width: number; height: number } | null) {
    this.draggedLayoutSize = value
  }

  firstLayoutInColumn(id: string, column: number) {
    const sortedColumn = this.getLayersFromColumn({ column })
    const isUpperLayout = sortedColumn[0].id === id

    return isUpperLayout
  }

  get requiredMinRearrangementBasedOnSettings() {
    if (this.columns > 3) {
      return null
    }
    return Math.pow(2, this.countLayers) - 1
  }

  get draggedLayout() {
    return this.towerLayers.find((elem) => elem.id === this.#draggedLayoutId)
  }

  get percentLayerWidth() {
    const min = 15
    const max = 100
    const percent = (max - min) / this.countLayers
    return percent
  }

  #initTower(layers: HanoiTowerLayer[]) {
    this.initTowerLayers = layers
    this.towerLayers = layers
  }

  getLayersFromColumn({ column }: { column: number }) {
    return this.towerLayers.filter((elem) => elem.column === column).sort((b, a) => a.position - b.position)
  }

  generateLayerTower() {
    if (this.gameMode === 'Free') {
      this.randomiseLayerFreeGameMode()
    } else {
      this.generateLayerNormalGameMode()
    }
  }

  generateLayerNormalGameMode() {
    const layers: HanoiTowerLayer[] = []
    for (let i = 0; i < this.countLayers; i++) {
      layers.push({
        id: uuidv4(),
        color: randomiseColor(),
        column: 0,
        position: i,
        size: i
      })
    }
    this.#initTower(layers)
    if (this.rainbowMode) {
      this.coloredBrickRainbow()
    }
  }

  randomiseLayerFreeGameMode() {
    const layers: HanoiTowerLayer[] = []
    // TODO: randomise
    const settings = {
      positions: Array(this.countLayers)
        .fill(null)
        .map((_, index) => index)
    }

    for (let i = 0; i < this.countLayers; i++) {
      const position = randomiseDistance({ min: 0, max: settings.positions.length - 1 })
      const col = randomiseDistance({ min: 0, max: this.columns })

      settings.positions = settings.positions.filter((elem) => elem !== position)
      layers.push({
        id: uuidv4(),
        color: randomiseColor(),
        column: col,
        position: position,
        size: i
      })
    }
    this.#initTower(layers)

    if (this.rainbowMode) {
      this.coloredBrickRainbow()
    }
  }

  changeInitColumns({ column }: { column: (typeof MAX_COLUMNS)[number] }) {
    this.columnsInit = column
    if (!this.brickHasBeenMoved) {
      this.startNewGame()
    }
  }

  changeInitLayers({ countLayers }: { countLayers: number | string }) {
    if (isNaN(Number(countLayers))) {
      return
    }
    const value = +countLayers
    const numberExists = LAYERS_COUNT.find((elem) => elem === value)
    if (!numberExists) {
      return
    }
    this.countLayersInit = value
    if (!this.brickHasBeenMoved) {
      this.startNewGame()
    }
  }

  resetCurrentLayers() {
    this.isWin = false
    this.modalIsWin = false
    this.rearrangementCount = 0
    this.towerLayers = this.initTowerLayers
  }

  startNewGame() {
    this.isWin = false
    this.modalIsWin = false
    this.columns = this.columnsInit
    this.countLayers = this.countLayersInit
    this.generateLayerTower()
    this.rearrangementCount = 0
  }

  changeColumnLayer({ column, idLayer }: { column: number; idLayer: string }) {
    if (this.gameMode === 'Free') {
      this.changeColumnLayerFreeMode({ column, idLayer })
    } else {
      this.changeColumnLayerNormalMode({ column, idLayer })
    }
    this.detectWin()
  }

  #breakLayerWithSameColumn({ column, idLayer }: { column: number; idLayer: string }) {
    const targetLayer = this.towerLayers.find((elem) => elem.id === idLayer)
    if (!targetLayer) {
      return true
    }
    if (targetLayer.column === column) {
      return true
    }
    return false
  }

  changeColumnLayerFreeMode({ column, idLayer }: { column: number; idLayer: string }) {
    let pos = 0

    const initReduce = this.towerLayers.find((elem) => elem.column === column)?.position

    if (this.#breakLayerWithSameColumn({ column, idLayer })) {
      return
    }

    if (typeof initReduce !== 'undefined') {
      const maxPositionInColumn = this.towerLayers.reduce(
        (acc, layer) => (layer.column === column && layer.position > acc ? layer.position : acc),
        initReduce
      )

      pos = maxPositionInColumn + 1
    } else {
      pos = 0
    }

    this.towerLayers = this.towerLayers.map((elem) => (elem.id === idLayer ? { ...elem, column, position: pos } : elem))
    this.rearrangementCount = this.rearrangementCount + 1
    return null
  }

  changeColumnLayerNormalMode({ column, idLayer }: { column: number; idLayer: string }) {
    const columnLayers = this.towerLayers.filter((elem) => elem.column === column)
    const maxPosition = columnLayers.reduce((prev, current) => (prev > current.position ? prev : current.position), -1)
    const maxSize = columnLayers.reduce((prev, current) => (prev > current.size ? prev : current.size), -1)
    const targetLayer = this.towerLayers.find((elem) => elem.id === idLayer)

    if (!targetLayer) {
      console.log('Not found layer')
      return null
    }
    if (this.#breakLayerWithSameColumn({ column, idLayer })) {
      return
    }
    if (maxSize > targetLayer.size) {
      console.log('Target layer bigger then bottom block')
      return null
    }
    this.towerLayers = this.towerLayers.map((elem) => (elem.id === idLayer ? { ...elem, column, position: maxPosition + 1 } : elem))
    this.rearrangementCount = this.rearrangementCount + 1
    return null
  }

  detectWin() {
    let isWin = false
    if (this.gameMode === 'Free') {
      isWin = !!this.detectWinFreeMode()
    } else {
      isWin = !!this.detectWinNormalMode()
    }
    if (isWin) {
      this.modalIsWin = true
      this.isWin = true
    }
  }

  //FIXME: repeat code
  detectWinNormalMode() {
    const layers = this.towerLayers
    let isFirstColumn = false
    let isInOneColumn = true
    let wrongPosition = false
    const layersColumn = layers[0].column
    let position = -1

    for (let i = 0; i < layers.sort((b, a) => b.position - a.position).length; i++) {
      if (layers[i].column === 0) {
        isFirstColumn = true
        break
      }
      if (layers[i].column !== layersColumn) {
        isInOneColumn = false
        break
      }

      if (layers[i].position !== position + 1) {
        wrongPosition = true
        break
      } else {
        position += 1
      }
    }
    if (isFirstColumn || !isInOneColumn || wrongPosition) {
      return
    }
    return true
  }

  detectWinFreeMode() {
    const layers = this.towerLayers

    let isInOneColumn = true
    let wrongPosition = false
    const layersColumn = layers[0].column
    let position = -1

    for (let i = 0; i < layers.sort((b, a) => b.position - a.position).length; i++) {
      if (layers[i].column !== layersColumn) {
        isInOneColumn = false
        break
      }

      if (layers[i].position !== position + 1) {
        wrongPosition = true
        break
      } else {
        position += 1
      }
    }
    if (!isInOneColumn || wrongPosition) {
      return
    }
    return true
  }
}

export const HanoiTowerGame = new HanoiTower()
HanoiTowerGame.generateLayerTower()
