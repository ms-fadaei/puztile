import { Tile } from '~/types'

export function initPuztile(size: number) {
  // eslint-disable-next-line prettier/prettier
  const puztile = ref<Array<Array<Tile>>>(new Array(size).fill(null).map(() => new Array(size).fill(null)))
  const numbers = new Array(size * size - 1).fill(null).map((_, i) => i + 1)

  puztile.value.forEach((row, y) => {
    row.forEach((_, x) => {
      if (y === size - 1 && x === size - 1) return

      const label = numbers.splice(Math.floor(Math.random() * numbers.length), 1)[0]
      row[x] = {
        label: String(label),
        correctX: Math.floor((label - 1) % size),
        correctY: Math.floor((label - 1) / size),
        isCorrect: false,
      }
    })
  })

  puztile.value[size - 1][size - 1] = {
    label: '',
    correctX: size - 1,
    correctY: size - 1,
    isCorrect: true,
  }

  const isWon = computed(() => {
    return puztile.value.every((row) => row.every((tile) => tile?.isCorrect))
  })

  return {
    puztile,
    isWon,
  }
}
