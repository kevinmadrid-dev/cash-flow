<template>
  <main>
    <p>{{ viewLabel }}</p>
    <h2>{{ viewAmount }}</h2>
  </main>
</template>

<script setup>
import { defineProps, computed } from "vue"

const props = defineProps({
  totalLabel: {
    type: String
  },
  label: {
    type: String,
    default: null
  },
  totalAmount: {
    type: Number
  },
  amount: {
    type: Number,
    default: null
  }
})

const viewAmount = computed(() => {
  return props.amount !== null ? props.amount : props.totalAmount
})

const viewLabel = computed(() => {
  return props.label !== null ? props.label : props.totalLabel
})
</script>

<style scoped>
main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

h2,
p {
  margin: 0;
  text-align: center;
}

h2 {
  margin-top: 14px;
  color: var(--brand-green);
}

.graphic {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 48px 24px;
  box-sizing: border-box;
}
</style>
