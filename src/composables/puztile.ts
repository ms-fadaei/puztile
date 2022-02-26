import { Tile } from '~/types'

export function initPuztile(size: number) {
  const labels = new Array(size * size - 1)
    .fill(null)
    .map((_, i) => String(i + 1))
    .sort(() => Math.random() - 0.5)
  labels.push('')

  const puztile = ref<Array<Array<Tile>>>(
    new Array(size).fill('').map((_, y) =>
      new Array(size).fill('').map((_, x) => ({
        label: labels[y * size + x],
        correctX: x,
        correctY: y,
        isCorrect: isTileCorrect(labels[y * size + x], y * size + x),
      }))
    )
  )

  const isWon = computed(() => {
    return puztile.value.every((row) => row.every((tile) => tile.isCorrect))
  })

  function moveTitle(x: number, y: number) {
    const candidates = [
      { x: x - 1, y: y, label: puztile.value[y][x - 1]?.label },
      { x: x + 1, y: y, label: puztile.value[y][x + 1]?.label },
      { x: x, y: y - 1, label: puztile.value[y - 1]?.[x].label },
      { x: x, y: y + 1, label: puztile.value[y + 1]?.[x].label },
    ]
    const blankTile = candidates.find((candidate) => candidate.label === '')

    if (blankTile) {
      const tile = puztile.value[y][x]
      puztile.value[y][x] = puztile.value[blankTile.y][blankTile.x]
      puztile.value[blankTile.y][blankTile.x] = tile
      tile.isCorrect = tile.correctX === blankTile.x && tile.correctY === blankTile.y
    }
  }

  return {
    puztile,
    isWon,
    moveTitle,
  }
}

function isTileCorrect(label: string, index: number) {
  return label === '' || label === String(index + 1)
}
