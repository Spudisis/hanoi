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

  gameMode: GameMode = 'Free'

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

  changeGameMode(gameMode: GameMode) {
    this.gameMode = gameMode
  }

  get brickHasBeenMoved() {
    return this.rearrangementCount !== 0
  }

  changeStatusBabyMode(status?: boolean) {
    this.babyMode = status || !this.babyMode
  }

  changeStatusRainbowMode(status?: boolean) {
    this.rainbowMode = status || !this.rainbowMode
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

  randomiseLayerTower() {
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
        color: this.rainbowMode ? rainbowColor(i, this.countLayers - 1) : randomiseColor(),
        column: col,
        position: position,
        size: i
      })
    }
    this.#initTower(layers)
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
    this.rearrangementCount = 0
    this.towerLayers = this.initTowerLayers
  }

  startNewGame() {
    this.columns = this.columnsInit
    this.countLayers = this.countLayersInit
    this.randomiseLayerTower()
    this.rearrangementCount = 0
  }

  changeColumnLayer({ column, idLayer }: { column: number; idLayer: string }) {
    let pos = 0

    const initReduce = this.towerLayers.find((elem) => elem.column === column)?.position

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
  }
}

export const HanoiTowerGame = new HanoiTower()
HanoiTowerGame.randomiseLayerTower()
