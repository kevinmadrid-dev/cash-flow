<template>
  <div>
    <svg viewBox="0 0 300 200">
      <line
        stroke="var(--brand-grey)"
        stroke-width="2"
        x1="0"
        :y1="zero"
        x2="300"
        :y2="zero"
      />

      <polyline
        fill="none"
        stroke="var(--brand-blue)"
        stroke-width="2"
        :points="points"
      />

      <line
        stroke="var(--brand-green)"
        stroke-width="2"
        x1="200"
        y1="0"
        x2="200"
        y2="300"
      />
    </svg>

    <p>Últimos 30 días</p>
  </div>
</template>

<script setup>
import { defineProps, toRefs, computed } from "vue"

const props = defineProps({
  amounts: {
    type: Array,
    default: () => []
  }
})

const { amounts } = toRefs(props)
const PixelAmount = (amount) => {
  const min = Math.min(...amounts.value)
  const max = Math.max(...amounts.value)

  const amountAbs = amount + Math.abs(min)
  const minMax = Math.abs(max) + Math.abs(min)

  return 200 - ((amountAbs * 100) / minMax) * 2
}

const zero = computed(() => {
  return PixelAmount(0)
})

const points = computed(() => {
  const total = amounts.value.length

  return amounts.value.reduce((points, amount, i) => {
    const x = (300 / total) * (i + 1)
    const y = PixelAmount(amount)

    return `${points} ${x},${y}`
  }, "0, 100")
})
</script>

<style scoped>
svg {
  width: 100%;
}

p {
  text-align: center;
}
</style>
