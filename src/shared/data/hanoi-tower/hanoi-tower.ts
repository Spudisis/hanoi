import { WeightedGraph } from '@/dijkstra'
import { makeAutoObservable, reaction } from 'mobx'
import { v4 as uuidv4 } from 'uuid'

import { GameMode, LAYERS_COUNT, MAX_COLUMNS } from './config'

const RAINBOW_MODE_NAME_LC = 'rainbow-mode'
const ANIMATION_STATUS_NAME_LC = 'animation-status'
const BABY_MODE_NAME_LC = 'baby-mode'

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
  historyTowerLayers: { step: number; layers: HanoiTowerLayer[] }[] = []

  step: number = 0
  currentStep: number = 0

  #draggedLayoutId: string | null = null
  draggedLayoutSize: { width: number; height: number } | null = null

  statusSidebar: boolean = false

  babyMode: boolean = false
  rainbowMode: boolean = true

  isAnimatedBricksStatus = true

  holdDownMouse: NodeJS.Timeout | null = null
  holdDownMouseCbTimer: NodeJS.Timeout | null = null

  holdDownPrevStep() {
    this.holdDownMouse = setTimeout(() => {
      this.holdDownMouseCbTimer = setInterval(() => {
        this.goPrevStep()
      }, 100)
    }, 500)
  }

  holdCancelDownPrevStep() {
    if (this.holdDownMouse) {
      clearTimeout(this.holdDownMouse)
    }
    if (this.holdDownMouseCbTimer) {
      clearInterval(this.holdDownMouseCbTimer)
    }
  }

  holdDownNextStep() {
    this.holdDownMouse = setTimeout(() => {
      this.holdDownMouseCbTimer = setInterval(() => {
        this.goNextStep()
      }, 100)
    }, 500)
  }

  holdCancelDownNextStep() {
    if (this.holdDownMouse) {
      clearTimeout(this.holdDownMouse)
    }
    if (this.holdDownMouseCbTimer) {
      clearInterval(this.holdDownMouseCbTimer)
    }
  }

  changeIsAnimatedBricksStatus(status: boolean) {
    this.isAnimatedBricksStatus = status
    localStorage.setItem(ANIMATION_STATUS_NAME_LC, JSON.stringify(this.isAnimatedBricksStatus))
  }

  goPrevStep() {
    const layerBack = this.historyTowerLayers.find((elem) => elem.step === this.currentStep - 1)
    if (layerBack) {
      this.towerLayers = layerBack.layers
      this.currentStep = this.currentStep - 1
    }
  }

  goNextStep() {
    const layerNext = this.historyTowerLayers.find((elem) => elem.step === this.currentStep + 1)
    if (layerNext) {
      this.towerLayers = layerNext.layers
      this.currentStep = this.currentStep + 1
    }
  }

  get isLastStep() {
    return this.currentStep === this.step
  }

  get isFirstStep() {
    return this.currentStep === 0
  }

  changeHistoryAfterChangeColumnLayer() {
    const oldCurrentStep = this.currentStep
    const layers = this.towerLayers
    if (oldCurrentStep !== this.step) {
      const historyTowerLayersToOldCurrentStep = this.historyTowerLayers.filter((elem) => elem.step <= oldCurrentStep)
      historyTowerLayersToOldCurrentStep.push({ step: oldCurrentStep + 1, layers })

      this.historyTowerLayers = historyTowerLayersToOldCurrentStep
    } else {
      this.historyTowerLayers.push({ step: oldCurrentStep + 1, layers })
    }
    this.currentStep = oldCurrentStep + 1
    this.step = oldCurrentStep + 1
  }

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
    this.babyMode = status ?? !this.babyMode
    localStorage.setItem(BABY_MODE_NAME_LC, JSON.stringify(this.babyMode))
  }

  changeStatusRainbowMode(status?: boolean) {
    this.rainbowMode = status ?? !this.rainbowMode
    localStorage.setItem(RAINBOW_MODE_NAME_LC, JSON.stringify(this.rainbowMode))
    this.coloredBrickRainbow()
  }

  coloredBrickRainbow() {
    const layers = this.towerLayers
    layers.sort((b, a) => b.size - a.size)
    if (this.rainbowMode) {
      this.towerLayers = layers.map((elem, index) => {
        return { ...elem, color: rainbowColor(index, layers.length) }
      })
    } else {
      this.towerLayers = layers.map((elem) => {
        return { ...elem, color: this.initTowerLayers.find((initElem) => initElem.id === elem.id)?.color || elem.color }
      })
    }
  }

  get heightStand() {
    return (this.countLayers + 1) * 1.75 + 'rem'
  }

  changeDraggedLayoutId(id: string | null) {
    this.#draggedLayoutId = id
  }

  changeDraggedLayoutSize(value: { width: number; height: number } | null) {
    this.draggedLayoutSize = value
  }

  firstLayoutInColumn(id: string, column: number) {
    const sortedColumn = this.getLayersFromColumn({ column })

    if (!sortedColumn.length) return null

    return sortedColumn[0].id === id
  }

  get requiredMinRearrangementBasedOnSettings() {
    if (this.columns > 3) return null
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
    this.historyTowerLayers = [{ layers, step: 0 }]
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
      console.warn('changeInitLayers NaN count layers')
      return
    }
    const value = +countLayers
    const numberExists = LAYERS_COUNT.find((elem) => elem === value)
    if (!numberExists) {
      console.warn('changeInitLayers numberExists not found')
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

    this.historyTowerLayers = [{ step: 0, layers: this.initTowerLayers }]
    this.step = 0
    this.currentStep = 0
    this.coloredBrickRainbow()
  }

  startNewGame() {
    this.isWin = false
    this.modalIsWin = false
    this.columns = this.columnsInit
    this.countLayers = this.countLayersInit
    this.step = 0
    this.currentStep = 0
    this.historyTowerLayers = [{ step: 0, layers: [] }]
    this.generateLayerTower()
    this.rearrangementCount = 0
  }

  reset() {
    this.gameMode = 'Normal'
    this.isWin = false
    this.modalIsWin = false

    this.columns = MAX_COLUMNS[0]
    this.countLayers = LAYERS_COUNT[7]

    this.columnsInit = MAX_COLUMNS[0]
    this.countLayersInit = LAYERS_COUNT[7]

    this.rearrangementCount = 0
    this.initTowerLayers = []
    this.towerLayers = []
    this.historyTowerLayers = []

    this.step = 0
    this.currentStep = 0

    this.#draggedLayoutId = null
    this.draggedLayoutSize = null

    this.statusSidebar = false

    if (this.holdDownMouse) {
      clearTimeout(this.holdDownMouse)
    }
    this.holdDownMouse = null
    if (this.holdDownMouseCbTimer) {
      clearTimeout(this.holdDownMouseCbTimer)
    }
    this.holdDownMouseCbTimer = null
    this.generateLayerNormalGameMode()
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
      return null
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

    this.changeHistoryAfterChangeColumnLayer()
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
      console.log('Target layer bigger then bottom block', targetLayer)

      return null
    }
    this.towerLayers = this.towerLayers.map((elem) => (elem.id === idLayer ? { ...elem, column, position: maxPosition + 1 } : elem))
    this.rearrangementCount = this.rearrangementCount + 1
    this.changeHistoryAfterChangeColumnLayer()
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
    const sortedLayers = [...layers].sort((b, a) => b.position - a.position)
    let position = sortedLayers[0].position - 1

    for (let i = 0; i < sortedLayers.length; i++) {
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
    const sortedLayers = [...layers].sort((b, a) => b.position - a.position)
    let position = sortedLayers[0].position - 1

    for (let i = 0; i < sortedLayers.length; i++) {
      if (layers[i].column !== layersColumn) {
        isInOneColumn = false
        console.log('Not win, another col')
        break
      }

      if (layers[i].position !== position + 1) {
        console.log('Not win, wrong pos')
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

  handleAutoPlay() {
    const Layers = this.towerLayers.sort((b, a) => b.size - a.size).map((elem) => ({ column: elem.column, size: elem.size }))

    const currentLayerPath = Layers.reduce((acc, elem) => acc + elem.column, '')

    const fractalPaths: { [key: string]: string[] } = {}

    const maxConnectForPath = this.columns + (this.columns - MAX_COLUMNS[0]) * 2

    const pathsArray = Array(this.columns)
      .fill(null)
      .map((_, i) =>
        i > 0
          ? new Array(this.countLayers)
              .fill(null)
              .map(() => i)
              .join('')
          : null
      )

    const findVariants = (initLayers: typeof Layers) => {
      const stack: (typeof Layers)[] = [initLayers]

      while (stack.length > 0) {
        const layers = stack.pop()
        if (!layers) {
          continue
        }
        const path = layers.reduce((acc, elem) => acc + elem.column, '')
        const targetLayer = fractalPaths[path]
        if (!targetLayer) {
          fractalPaths[path] = []
        } else if (targetLayer.length === maxConnectForPath) {
          continue
        }

        for (let i = 0; i < this.countLayers; i++) {
          // если выше айтема что-то лежит
          const colCancel = layers.find((elem) => layers[i].column === elem.column && elem.size > layers[i].size)
          if (colCancel) {
            continue
          }

          for (let k = 0; k < this.columns; k++) {
            if (layers[i].column === k) {
              continue
            }
            // если в колонке лежит меньшее кольцо
            if (layers.find((elem) => elem.size > layers[i].size && elem.column === k)) {
              continue
            }
            const size = layers[i].size
            const col = k

            // типо переставили в другую колонку и узнать путь
            const layersNew = layers.map((elem) => (elem.size === size ? { size: elem.size, column: col } : elem))
            const newPathConnect = layersNew.reduce((acc, elem) => acc + elem.column, '')

            if (newPathConnect === path) {
              continue
            }

            let skip = false
            // делаем новые пути фрактала
            const targetFractalPath = fractalPaths[path]

            if (targetFractalPath.includes(newPathConnect)) {
              skip = true
            } else {
              fractalPaths[path] = fractalPaths[path].concat([newPathConnect])
            }

            if (skip) {
              continue
            }

            stack.push(layersNew)
          }
        }
      }
    }
    findVariants(Layers)

    const dejkstra = new WeightedGraph()

    Object.keys(fractalPaths).forEach((elem) => {
      dejkstra.addVertex(elem)
    })

    Object.keys(fractalPaths).forEach((elem) => {
      fractalPaths[elem].forEach((path) => {
        dejkstra.addEdge(elem, path, 1)
      })
    })

    // start find optimal path to win

    const dejkstraPaths = pathsArray.map((elem) => (elem ? (dejkstra.Dijkstra(currentLayerPath, elem) as string[]) : null))

    const paths = dejkstraPaths.reduce((acc, elem) => (!acc ? elem : elem && acc.length < elem.length ? acc : elem), dejkstraPaths[0])
    // end find optimal path to win

    if (!paths) {
      return
    }

    // console.log(dejkstra.Dijkstra(currentLayerPath, '2222222'))
    let prev: { size: number; column: number }[] = []
    paths.forEach((elem, index) => {
      const normalize = elem.split('').map((elem, index) => ({ size: index, column: +elem }))
      if (index === 0) {
        prev = normalize
        return
      }

      let newColumn: number | null = null
      let sizeChangebleLayer: number | null = null
      normalize.forEach((elem) => {
        const sameSizePrev = prev.find((prevElem) => prevElem.size === elem.size)
        if (sameSizePrev && sameSizePrev.column === elem.column) {
          return
        } else {
          newColumn = elem.column
          sizeChangebleLayer = +elem.size
        }
      })

      prev = normalize
      if (typeof sizeChangebleLayer !== 'number') {
        return
      }

      const targerLayer = this.towerLayers.find((elem) => elem.size === sizeChangebleLayer)

      if (!targerLayer) {
        return
      }

      setTimeout(() => this.changeColumnLayer({ column: newColumn || 0, idLayer: targerLayer?.id }), index * 30)
    })
  }
}

export const HanoiTowerGame = new HanoiTower()
HanoiTowerGame.generateLayerTower()

const rainbowModeFromLocalStorage = localStorage.getItem(RAINBOW_MODE_NAME_LC)

if (rainbowModeFromLocalStorage) {
  const parsedMode = JSON.parse(rainbowModeFromLocalStorage)
  if (typeof parsedMode === 'boolean') {
    const mode = parsedMode as boolean

    HanoiTowerGame.changeStatusRainbowMode(mode)
  }
}

const animationStatusFromLocalStorage = localStorage.getItem(ANIMATION_STATUS_NAME_LC)

if (animationStatusFromLocalStorage) {
  const parsedMode = JSON.parse(animationStatusFromLocalStorage)
  if (typeof parsedMode === 'boolean') {
    const mode = parsedMode as boolean
    HanoiTowerGame.changeIsAnimatedBricksStatus(mode)
  }
}

const babyModeFromLocalStorage = localStorage.getItem(BABY_MODE_NAME_LC)
if (babyModeFromLocalStorage) {
  const parsedMode = JSON.parse(babyModeFromLocalStorage)
  if (typeof parsedMode === 'boolean') {
    const mode = parsedMode as boolean
    HanoiTowerGame.changeStatusBabyMode(mode)
  }
}

// the button may become disabled, so mouseup cancel function does not work, detect it here
reaction(
  () => HanoiTowerGame.isLastStep,
  (isLastStep) => {
    if (isLastStep) {
      HanoiTowerGame.holdCancelDownNextStep()
    }
  }
)

reaction(
  () => HanoiTowerGame.isFirstStep,
  (isFirstStep) => {
    if (isFirstStep) {
      HanoiTowerGame.holdCancelDownPrevStep()
    }
  }
)
