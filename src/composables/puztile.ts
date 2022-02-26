import { Tile } from '~/types'

export function initPuztile(size: number) {
  const puztile = ref<Tile[][]>(new Array(size).fill('').map(() => new Array(size).fill('')))
  const movementCount = ref(0)

  // create shuffled labels from 1 to size * size - 1
  // and add empty label at the end
  // so the array is size * size in length
  const labels = new Array(size * size - 1)
    .fill(null)
    .map((_, i) => String(i + 1))
    .sort(() => Math.random() - 0.5)
  labels.push('')

  // create tiles with shuffled labels
  puztile.value = puztile.value.map((row, y) =>
    row.map((_, x) => ({
      label: labels[y * size + x],
      correctX: x,
      correctY: y,
      isCorrect: isTileCorrect(labels[y * size + x], y * size + x),
    }))
  )

  // isWon: is puzzle solved?
  const isWon = computed(() => {
    return puztile.value.every((row) => row.every((tile) => tile.isCorrect))
  })

  function moveTitle(x: number, y: number) {
    // blank tiles candidates
    const candidates = [
      { x: x - 1, y: y, label: puztile.value[y][x - 1]?.label },
      { x: x + 1, y: y, label: puztile.value[y][x + 1]?.label },
      { x: x, y: y - 1, label: puztile.value[y - 1]?.[x].label },
      { x: x, y: y + 1, label: puztile.value[y + 1]?.[x].label },
    ]

    // find the blank tile in candidates
    const blankTile = candidates.find((candidate) => candidate.label === '')

    // if blank tile is found
    // swap the blank tile with the tile to be moved
    // and update the `isCorrect` (tile status) property of the moved tile
    if (blankTile) {
      // add movement count
      movementCount.value++

      // swap tiles
      const tile = puztile.value[y][x]
      puztile.value[y][x] = puztile.value[blankTile.y][blankTile.x]
      puztile.value[blankTile.y][blankTile.x] = tile

      // revalidate isCorrect property
      tile.isCorrect = tile.correctX === blankTile.x && tile.correctY === blankTile.y
    }
  }

  return {
    puztile,
    isWon,
    moveTitle,
    movementCount,
  }
}

function isTileCorrect(label: string, index: number) {
  return label === '' || label === String(index + 1)
}
