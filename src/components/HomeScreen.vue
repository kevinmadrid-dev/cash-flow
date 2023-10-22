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
        <template #graphic>Graphic</template>
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
import LayoutScreen from "./LayoutScreen.vue"
import HeaderScreen from "./HeaderScreen.vue"
import ResumeScreen from "./Resume/ResumeScreen"
import ActionScreen from "./ActionScreen.vue"
import MovementsScreen from "./Movements/MovementsScreen"

let vLabel = null
let vAmount = null
let vMovements = [
  {
    id: 0,
    title: "Movimiento 01",
    description: "lorem ipsum dolor sit amet",
    amount: -1000
  },
  {
    id: 1,
    title: "Movimiento 02",
    description: "lorem ipsum dolor sit amet",
    amount: 1000
  },
  {
    id: 2,
    title: "Movimiento 03",
    description: "lorem ipsum dolor sit amet",
    amount: -1000
  },
  {
    id: 3,
    title: "Movimiento 04",
    description: "lorem ipsum dolor sit amet",
    amount: 1000
  },
  {
    id: 4,
    title: "Movimiento 05",
    description: "lorem ipsum dolor sit amet",
    amount: 1000
  },
  {
    id: 5,
    title: "Movimiento 06",
    description: "lorem ipsum dolor sit amet",
    amount: 1000
  },
  {
    id: 6,
    title: "Movimiento 07",
    description: "lorem ipsum dolor sit amet",
    amount: 1000
  }
]
</script>

<style scoped></style>
