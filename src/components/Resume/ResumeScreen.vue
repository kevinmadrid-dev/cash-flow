<template>
  <main>
    <p>{{ viewLabel }}</p>
    <h2>{{ valueAmount }}</h2>

    <div class="graphic">
      <slot name="graphic"></slot>
    </div>

    <div class="action">
      <slot name="action"></slot>
    </div>
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

//Función para convertir el valor a formato moneda
const currencyFormatter = new Intl.NumberFormat("es-PE", {
  style: "currency",
  currency: "PEN"
})

//Función para mostrar el valor dinero
const viewAmount = computed(() => {
  return props.amount !== null ? props.amount : props.totalAmount
})

//Función para mostrar el label
const viewLabel = computed(() => {
  return props.label !== null ? props.label : props.totalLabel
})

//Función para retornar el valor dinero en formato moneda
const valueAmount = computed(() => {
  return currencyFormatter.format(viewAmount.value)
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
