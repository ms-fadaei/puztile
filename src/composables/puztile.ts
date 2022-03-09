import { Tile } from '~/types'

export function initPuztile(size: number) {
  const puztile = ref<Tile[]>(new Array(size * size).fill(''))
  const moves = ref(0)
  const blankTilePos = { x: size - 1, y: size - 1 }

  // init game stats/variables
  // use for restarting game also
  function init() {
    blankTilePos.x = blankTilePos.y = size - 1

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
      correctY: getY(+labels[index] - 1, size),
      correctX: getX(+labels[index] - 1, size),
      isCorrect: isTileCorrect(labels[index], index),
    }))
  }

  // init game status
  init()

  // isWon: is puzzle solved?
  const isWon = computed(() => {
    return puztile.value.every((tile) => tile.isCorrect)
  })

  async function move(index: number) {
    const x = getX(index, size)
    const y = getY(index, size)

    // blank tiles candidates
    const candidates = [
      { x: x - 1, y: y },
      { x: x + 1, y: y },
      { x: x, y: y - 1 },
      { x: x, y: y + 1 },
    ]

    // find the blank tile in candidates
    const blankTileFound = candidates.some((c) => c.x === blankTilePos.x && c.y === blankTilePos.y)

    // if blank tile is found
    // swap the blank tile with the tile to be moved
    // and update the `isCorrect` (tile status) property of the moved tile
    if (blankTileFound) {
      // add movement count
      moves.value++

      const blankTileIndex = getIndex(blankTilePos.x, blankTilePos.y, size)

      // swap tiles
      const tile = puztile.value[index]
      puztile.value[index] = puztile.value[blankTileIndex]
      puztile.value[blankTileIndex] = tile

      // revalidate isCorrect property
      tile.isCorrect = blankTilePos.y === tile.correctY && blankTilePos.x === tile.correctX

      // update blank tile position
      blankTilePos.y = y
      blankTilePos.x = x
    } else if (x === blankTilePos.x || y === blankTilePos.y) {
      // move aligned tiles together
      let neighborIndex: number
      if (x === blankTilePos.x) {
        const neighborDirection = Math.sign(blankTilePos.y - y)
        neighborIndex = getIndex(x, y + neighborDirection, size)
      } else {
        const neighborDirection = Math.sign(blankTilePos.x - x)
        neighborIndex = getIndex(x + neighborDirection, y, size)
      }

      // recursive call
      await move(neighborIndex) // propagate the movement to to neighbor tile
      await delay(125) // wait for animation
      move(index) // move current tile now
    }
  }

  function moveWithArrows(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        if (blankTilePos.y - 1 >= 0) move(getIndex(blankTilePos.x, blankTilePos.y - 1, size))
        break
      case 'ArrowDown':
        if (blankTilePos.y + 1 < size) move(getIndex(blankTilePos.x, blankTilePos.y + 1, size))
        break
      case 'ArrowLeft':
        if (blankTilePos.x - 1 >= 0) move(getIndex(blankTilePos.x - 1, blankTilePos.y, size))
        break
      case 'ArrowRight':
        if (blankTilePos.x + 1 < size) move(getIndex(blankTilePos.x + 1, blankTilePos.y, size))
        break
    }
  }

  return {
    puztile,
    isWon,
    move,
    moves,
    moveWithArrows,
    restart: init,
  }
}

function isTileCorrect(label: string, index: number) {
  return label === '' || label === String(index + 1)
}

function getY(index: number, size: number) {
  return Math.floor(index / size)
}

function getX(index: number, size: number) {
  return index % size
}

function getIndex(x: number, y: number, size: number) {
  return y * size + x
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
