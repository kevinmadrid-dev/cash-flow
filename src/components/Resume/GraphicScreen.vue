<template>
  <div>
    <svg @touchstart="tap" @touchmove="tap" @touchend="unTap" viewBox="0 0 300 200">
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
        v-show="showPointer"
        stroke="var(--brand-green)"
        stroke-width="2"
        :x1="pointer"
        y1="0"
        :x2="pointer"
        y2="200"
      />
    </svg>

    <p>Últimos 30 días</p>
  </div>
</template>

<script setup>
import { ref, toRefs, defineProps, computed } from "vue"

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
  }, `0 ${zero.value}`)
})

const showPointer = ref(false)
const pointer = ref(0)

const tap = ({ target, touches }) => {
  showPointer.value = true

  const elementWidth = target.getBoundingClientRect().width
  const elementX = target.getBoundingClientRect().x
  const touchX = touches[0].clientX

  pointer.value = ((touchX - elementX) * 300) / elementWidth
}

const unTap = () => {
  showPointer.value = false
}
</script>

<style scoped>
svg {
  width: 100%;
}

p {
  text-align: center;
}
</style>
