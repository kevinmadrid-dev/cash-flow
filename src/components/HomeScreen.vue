<template>
  <LayoutScreen>
    <template #header>
      <HeaderScreen />
    </template>

    <template #resume>
      <ResumeScreen
        :totalLabel="'Ahorro total'"
        :label="vLabel"
        :totalAmount="9999"
        :amount="vAmount"
      >
        <template #graphic>
          <GraphicScreen :amounts="amounts" />
        </template>

        <template #action>
          <ActionScreen />
        </template>
      </ResumeScreen>
    </template>

    <template #movements>
      <MovementsScreen :movements="vMovements" />
    </template>
  </LayoutScreen>
</template>

<script setup>
import { computed } from "vue"

import LayoutScreen from "./LayoutScreen.vue"
import HeaderScreen from "./Header/HeaderScreen.vue"
import ResumeScreen from "./Resume/ResumeScreen"
import GraphicScreen from "./Resume/GraphicScreen"
import ActionScreen from "./Resume/ActionScreen.vue"
import MovementsScreen from "./Movements/MovementsScreen"

let vLabel = null
let vAmount = null
let vMovements = [
  {
    id: 0,
    title: "Movimiento 01",
    description: "lorem ipsum dolor sit amet",
    amount: 100,
    time: new Date("10-23-2023")
  },
  {
    id: 1,
    title: "Movimiento 02",
    description: "lorem ipsum dolor sit amet",
    amount: 200,
    time: new Date("10-01-2023")
  },
  {
    id: 2,
    title: "Movimiento 03",
    description: "lorem ipsum dolor sit amet",
    amount: 500,
    time: new Date("10-01-2023")
  },
  {
    id: 3,
    title: "Movimiento 04",
    description: "lorem ipsum dolor sit amet",
    amount: 200,
    time: new Date("10-01-2023")
  },
  {
    id: 4,
    title: "Movimiento 05",
    description: "lorem ipsum dolor sit amet",
    amount: -400,
    time: new Date("10-01-2023")
  },
  {
    id: 5,
    title: "Movimiento 06",
    description: "lorem ipsum dolor sit amet",
    amount: -600,
    time: new Date("10-01-2023")
  },
  {
    id: 6,
    title: "Movimiento 07",
    description: "lorem ipsum dolor sit amet",
    amount: -300,
    time: new Date("10-01-2023")
  },
  {
    id: 7,
    title: "Movimiento 08",
    description: "lorem ipsum dolor sit amet",
    amount: 0,
    time: new Date("10-01-2023")
  },
  {
    id: 8,
    title: "Movimiento 09",
    description: "lorem ipsum dolor sit amet",
    amount: 300,
    time: new Date("10-01-2023")
  },
  {
    id: 9,
    title: "Movimiento 10",
    description: "lorem ipsum dolor sit amet",
    amount: 500,
    time: new Date("10-01-2023")
  }
]

const amounts = computed(() => {
  const lastDays = vMovements
    .filter((m) => {
      const today = new Date()
      const oldDate = today.setDate(today.getDate() - 30)

      return m.time > oldDate
    })
    .map((m) => m.amount)

  return lastDays.map((m, i) => {
    const lastMovements = lastDays.slice(0, i)

    return lastMovements.reduce((suma, movement) => {
      return suma + movement
    }, 0)
  })
})
</script>

<style scoped></style>
