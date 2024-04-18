import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import { App } from '@/app/app'

// import { WeightedGraph } from './dijkstra'

// const countLayers = 4
// const countColumn = 3

// const Layers = [
//   { size: 1, column: 3 },
//   { size: 2, column: 1 },
//   { size: 3, column: 3 },
//   { size: 4, column: 2 }
// ].sort((b, a) => b.size - a.size)

// type fractalT = { layers: typeof Layers; variants: fractalT[] }

// const currentLayerPath = Layers.reduce((acc, elem) => acc + elem.column, '')

// let fractalPaths: { path: string; connect: string[] }[] = [
//   {
//     path: currentLayerPath,
//     connect: []
//   }
// ]

// const fractal: fractalT = {
//   layers: Layers,
//   variants: []
// }

// const findVariants = (layers: typeof Layers) => {
//   const res: fractalT[] = []

//   // если нет состояния в путях, то добавляем
//   const path = layers.reduce((acc, elem) => acc + elem.column, '')
//   const targetLayer = fractalPaths.find((elem) => elem.path === path)
//   if (!targetLayer) {
//     fractalPaths.push({ path, connect: [] })
//   }

//   for (let i = 0; i < countLayers; i++) {
//     for (let j = 0; j < countLayers; j++) {
//       if (j === i) continue
//       if (
//         !(
//           (layers[i].size > layers[j].size || 0 === i) &&
//           !layers.find((elem) => layers[i].column === elem.column && elem.size > layers[i].size)
//         )
//       ) {
//         continue
//       }

//       for (let k = 1; k < countColumn + 1; k++) {
//         // если выше айтема лежит что-то в той же колонке
//         if (layers.find((elem) => elem.size > layers[i].size && elem.column === k)) {
//           continue
//         }
//         const size = layers[i].size
//         const col = k

//         // start: детектим победу
//         const layersNew = layers.map((elem) => (elem.size === size ? { size: elem.size, column: col } : elem))
//         const newPathConnect = layersNew.reduce((acc, elem) => acc + elem.column, '')

//         if (newPathConnect === path) {
//           continue
//         }

//         let skip = false
//         // делаем новые пути фрактала
//         const newFractalPaths = fractalPaths.map((elem) => {
//           if (elem.path === path) {
//             // если новый путь уже есть в текущем, то будет скипать

//             if (elem.connect.includes(newPathConnect)) {
//               skip = true
//               return elem
//             } else {
//               //иначе добавляем и в следующий раз скипаем
//               elem.connect.push(newPathConnect)
//               return elem
//             }
//           } else {
//             return elem
//           }
//         })
//         fractalPaths = newFractalPaths

//         if (skip) {
//           continue
//         }

//         res.push({
//           layers: layersNew,
//           variants: []
//         })
//       }
//     }
//   }

//   if (!res) {
//     return []
//   }
//   const newRes = res.map((elem): fractalT => {
//     const variants = findVariants(elem.layers)
//     return { ...elem, variants }
//   })
//   return newRes
// }

// fractal.variants = findVariants(Layers)

// type OutputReturn = { n: string; z: OutputReturn[] }

// const output = (fractal: fractalT): OutputReturn => {
//   return {
//     n: fractal.layers.reduce((acc, current) => acc + current.column, ''),
//     z: fractal.variants.map((elem) => output(elem))
//   }
// }

// const clgUser = output(fractal)

// const dejkstra = new WeightedGraph()

// fractalPaths.forEach((elem) => {
//   dejkstra.addVertex(elem.path)
// })

// fractalPaths.forEach((elem) => {
//   elem.connect.forEach((path) => {
//     dejkstra.addEdge(elem.path, path, 1)
//   })
// })

// console.log(fractalPaths)

// console.log(dejkstra.Dijkstra(currentLayerPath, '2222'))

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
