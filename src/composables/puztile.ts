import { Tile } from '~/types'

export function initPuztile(size: number) {
  const puztile = ref<Tile[]>(new Array(size * size).fill(''))
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
  puztile.value = puztile.value.map((_, index) => ({
    label: labels[index],
    correctY: getY(+labels[index] - 1),
    correctX: getX(+labels[index] - 1),
    isCorrect: isTileCorrect(labels[index], index),
  }))

  // isWon: is puzzle solved?
  const isWon = computed(() => {
    return puztile.value.every((tile) => tile.isCorrect)
  })

  function moveTitle(index: number) {
    const x = getX(index)
    const y = getY(index)

    // blank tiles candidates
    const candidates = []

    if (x - 1 >= 0)
      candidates.push({ i: y * size + x - 1, label: puztile.value[y * size + x - 1].label })
    if (x + 1 < size)
      candidates.push({ i: y * size + x + 1, label: puztile.value[y * size + x + 1].label })
    if (y - 1 >= 0)
      candidates.push({ i: (y - 1) * size + x, label: puztile.value[(y - 1) * size + x].label })
    if (y + 1 < size)
      candidates.push({ i: (y + 1) * size + x, label: puztile.value[(y + 1) * size + x].label })

    // find the blank tile in candidates
    const blankTile = candidates.find((candidate) => candidate.label === '')

    // if blank tile is found
    // swap the blank tile with the tile to be moved
    // and update the `isCorrect` (tile status) property of the moved tile
    if (blankTile) {
      // add movement count
      movementCount.value++

      // swap tiles
      const tile = puztile.value[index]
      puztile.value[index] = puztile.value[blankTile.i]
      puztile.value[blankTile.i] = tile

      // revalidate isCorrect property
      tile.isCorrect = blankTile.i === tile.correctY * size + tile.correctX
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

function getY(index: number) {
  return Math.floor(index / 4)
}

function getX(index: number) {
  return index % 4
}
