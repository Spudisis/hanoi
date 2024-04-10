import { autorun, makeAutoObservable } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import { MAX_COLUMNS, MAX_LAYERS } from './config'

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

const randomiseColor = () => {
  return `rgb(${randomiseDistance({ min: 0, max: 255 })},${randomiseDistance({ min: 0, max: 255 })},${randomiseDistance({ min: 0, max: 255 })})`
}

// TODO: add settings for color (randomise or color array)

class HanoiTower {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }
  columns: (typeof MAX_COLUMNS)[number] = MAX_COLUMNS[0]
  countLayers: (typeof MAX_LAYERS)[number] = MAX_LAYERS[7]

  rearrangementCount = 0
  private initTowerLayers: HanoiTowerLayer[] = []
  towerLayers: HanoiTowerLayer[] = []

  #draggedLayoutId: string | null = null
  draggedLayoutSize: { width: number; height: number } | null = null

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
    const min = 10
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
        color: randomiseColor(),
        column: col,
        position: position,
        size: i
      })
    }
    this.#initTower(layers)
  }

  changeInitColumns({ column }: { column: (typeof MAX_COLUMNS)[number] }) {
    this.columns = column
  }

  changeInitLayers({ countLayers }: { countLayers: (typeof MAX_LAYERS)[number] }) {
    this.countLayers = countLayers
  }

  resetCurrentLayers() {
    this.towerLayers = this.initTowerLayers
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
    this.rearrangementCount = this.rearrangementCount++
  }
}

export const HanoiTowerGame = new HanoiTower()

autorun(() => {
  HanoiTowerGame.randomiseLayerTower()
})
