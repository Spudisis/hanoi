import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { App } from '@/app/app'

const countLayers = 3
const countColumn = 3

const Layers = [
  { size: 1, column: 1 },
  { size: 2, column: 1 },
  { size: 3, column: 1 }
]

type fractalT = { layers: typeof Layers; prevLayers: (typeof Layers)[]; variants: fractalT[]; reject: boolean; isWin?: boolean }

// const fractalPaths: { path: { [key: string]: number }; connect: (typeof Layers)[] }[] = [
//   {
//     path: Layers.reduce((acc, elem) => acc + elem, ''),
//     connect: []
//   }
// ]

const fractal: fractalT = {
  prevLayers: [Layers],
  layers: Layers,
  variants: [],
  reject: false
}

const findVariants = (layers: typeof Layers, prevLayers: (typeof Layers)[]) => {
  const res: fractalT[] = []

  for (let i = 0; i < countLayers; i++) {
    for (let j = 0; j < countLayers; j++) {
      if (j === i) continue
      if (
        !(
          (layers[i].size > layers[j].size || 0 === i) &&
          !layers.find((elem) => layers[i].column === elem.column && elem.size > layers[i].size)
        )
      ) {
        continue
      }

      for (let k = 1; k < countColumn + 1; k++) {
        if (layers.find((elem) => elem.size > layers[i].size && elem.column === k)) {
          continue
        }
        const size = layers[i].size
        const col = k
        const l = layers.map((elem) => (elem.size === size ? { size: elem.size, column: col } : elem))
        let countTr = 0
        for (let i = 0; i < layers.length; i++) {
          if (layers[i].column === l[i].column) {
            countTr++
          }
        }

        if (countTr === layers.length) {
          continue
        }

        const rs = res.filter((fractal) => {
          const lay = fractal.layers
          let countTr = 0
          for (let i = 0; i < layers.length; i++) {
            if (lay[i].column === l[i].column) {
              countTr++
            }
          }
          if (countTr === layers.length) {
            return null
          }
          return fractal
        })
        if (rs.length !== res.length) {
          continue
        }
        const searchPrevLayer = prevLayers.filter((fractal) => {
          const lay = fractal
          let countTr = 0
          for (let i = 0; i < layers.length; i++) {
            if (lay[i].column === l[i].column) {
              countTr++
            }
          }
          if (countTr === layers.length) {
            return null
          }
          return fractal
        })
        if (searchPrevLayer.length !== prevLayers.length) {
          continue
        }
        const layersNew = layers.map((elem) => (elem.size === size ? { size: elem.size, column: col } : elem))
        let isWin = false
        let countChecked = 1
        const defColumn = layersNew[0].column
        for (let i = 1; i < layersNew.length; i++) {
          if (layersNew[i].column === defColumn) {
            countChecked += 1
            continue
          } else {
            isWin = false
            break
          }
        }
        if (countChecked === layersNew.length) {
          isWin = true
        }

        res.push({
          layers: layers.map((elem) => (elem.size === size ? { size: elem.size, column: col } : elem)),
          variants: [],
          reject: false,
          prevLayers: [...prevLayers, layers],
          isWin
        })
      }
    }
  }

  if (!res) {
    return []
  }
  const newRes = res.map((elem): fractalT => {
    if (elem.reject) return elem
    const variants = findVariants(elem.layers, [...prevLayers, layers])
    return { ...elem, variants }
  })
  return newRes
}

fractal.variants = findVariants(Layers, [])
// console.log(fractal)

type OutputReturn = { n: string; z: OutputReturn[]; isWin: boolean }

const output = (fractal: fractalT): OutputReturn => {
  return {
    n: fractal.layers.reduce((acc, current) => acc + current.column, ''),
    z: fractal.variants.map((elem) => output(elem)),
    isWin: !!fractal.isWin
  }
}

const clgUser = output(fractal)
console.log(JSON.stringify(clgUser))
// // Функция для поиска объекта с заданным статусом isWin: true
// function findWinningObjectWithPath(obj, path = []) {
//   // Проверяем, является ли текущий объект объектом
//   if (typeof obj !== 'object' || obj === null) {
//     return null // Если не объект, возвращаем null
//   }

//   // Проверяем, есть ли у текущего объекта свойство isWin и оно равно true
//   if (obj.hasOwnProperty('isWin') && obj.isWin === true) {
//     return path // Если нашли нужный объект, возвращаем его и путь до него
//   }

//   // Обходим все свойства объекта
//   for (const key in obj) {
//     // Рекурсивно вызываем эту же функцию для каждого свойства объекта
//     const result = findWinningObjectWithPath(obj[key], [...path, key])
//     // Если нашли нужный объект во вложенном свойстве, возвращаем его и путь до него
//     if (result !== null) {
//       return result
//     }
//   }

//   // Если не нашли нужный объект в текущем объекте и его свойствах, возвращаем null
//   return null
// }

// // Находим объект с isWin: true и возвращаем весь путь до него
// const path = findWinningObjectWithPath(clgUser)

// // console.log(clgUser)

// const findObj = (obj: any, path: string[]): any => {
//   if (path.length === 0) {
//     return obj
//   }

//   if (typeof obj[path[0]] !== 'undefined') {
//     const tsest = obj[path[0]]
//     path.shift()
//     return findObj(tsest, path)
//   }
// }

// console.log(findObj(clgUser, path))

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
