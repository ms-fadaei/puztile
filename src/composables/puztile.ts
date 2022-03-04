import { Tile } from '~/types'

export function initPuztile(size: number) {
  const puztile = ref<Tile[]>(new Array(size * size).fill(''))
  const movementCount = ref(0)
  const blankTilePos = { x: size - 1, y: size - 1 }

  // init game stats/variables
  // use for restarting game also
  function init() {
    movementCount.value = 0
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

  function move(index: number) {
    const x = getX(index, size)
    const y = getY(index, size)

    // blank tiles candidates
    const candidates = []

    for (let i = 0; i < size; i++) {
      candidates.push({ x: x + i, y: y })
      candidates.push({ x: x - i, y: y })
      candidates.push({ x: x, y: y + i })
      candidates.push({ x: x, y: y - i })
    }

    // find the blank tile in candidates
    const blankTileFound = candidates.some((c) => c.x === blankTilePos.x && c.y === blankTilePos.y)

    // if blank tile is found
    // swap the blank tile with the tile to be moved
    // and update the `isCorrect` (tile status) property of the moved tile
    if (blankTileFound) {
      // Calculate the distance between blank tile and selected tile
      const distance = Math.sqrt((x - blankTilePos.x) ** 2 + (y - blankTilePos.y) ** 2);
      // add movement count
      movementCount.value = movementCount.value + distance

      const blankTileIndex = blankTilePos.y * size + blankTilePos.x

      // swap tiles
      const tile = puztile.value[index]
      const blankTile = puztile.value[blankTileIndex]
      ///// if selected tile is the left side the blankTile
      if (x < blankTilePos.x) {
        for (let i = distance; i > 0; i--) {
          puztile.value[index + i] = puztile.value[index + i - 1]
        }
      }
      ///// if selected tile is above the blankTile
      else if (y < blankTilePos.y) {
        for (let i = distance; i > 0; i--) {
          puztile.value[index + size * i] = puztile.value[index + size * (i - 1)]
        }
      }
      ///// if selected tile is the right side the blankTile
      else if (x > blankTilePos.x) {
        for (let i = distance; i > 0; i--) {
          puztile.value[index - i] = puztile.value[index - i + 1]
        }
      }
      else {
        //if > blankTilePos.y
        ///// if selected tile is under the blankTile
        for (let i = distance; i > 0; i--) {
          puztile.value[index - size * i] = puztile.value[index - size * (i - 1)]

        }
      }
      puztile.value[index] = blankTile


      // revalidate isCorrect property
      tile.isCorrect = blankTilePos.y === tile.correctY && blankTilePos.x === tile.correctX

      // update blank tile position
      blankTilePos.y = y
      blankTilePos.x = x
    }
  }

  function moveWithArrows(e: KeyboardEvent) {
    switch (e.key) {
      case 'ArrowUp':
        if (blankTilePos.y - 1 >= 0) move(blankTilePos.y * size + blankTilePos.x - size)
        break
      case 'ArrowDown':
        if (blankTilePos.y + 1 < size) move(blankTilePos.y * size + blankTilePos.x + size)
        break
      case 'ArrowLeft':
        if (blankTilePos.x - 1 >= 0) move(blankTilePos.y * size + blankTilePos.x - 1)
        break
      case 'ArrowRight':
        if (blankTilePos.x + 1 < size) move(blankTilePos.y * size + blankTilePos.x + 1)
        break
    }
  }

  return {
    puztile,
    isWon,
    move,
    movementCount,
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
