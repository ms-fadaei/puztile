import { Ref } from 'vue'

let cells: Ref<string[][]>

export function initCells(rows: number, cols: number) {
  cells = ref(
    Array(rows)
      .fill('')
      .map(() => Array(cols).fill(''))
  )
}

export function useCells() {
  return cells
}

export function useCellValue(row: number, col: number) {
  const value = cells.value[row - 1][col - 1]

  if (!value.startsWith('=')) {
    const valueInNumber = Number(value)

    if (value === '' || Number.isNaN(valueInNumber)) {
      return value
    } else {
      return valueInNumber
    }
  }

  const formula = value
    .substring(1)
    .replace(/([a-zA-Z]+)([0-9]+)/g, `useCellValue($2, "$1".toLowerCase().charCodeAt(0) - 96)`)

  try {
    const getCellValue = new Function('useCellValue', `return ${formula}`)
    return getCellValue(useCellValue)
  } catch (e) {
    return `Error: ${(e as Error).message}`
  }
}
