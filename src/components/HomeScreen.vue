<template>
  <LayoutScreen>
    <template #header>
      <HeaderScreen />
    </template>

    <template #resume>
      <ResumeScreen
        :totalLabel="'Ahorro total'"
        :label="vLabel"
        :totalAmount="totalAmount"
        :amount="vAmount"
      >
        <template #graphic>
          <GraphicScreen :amounts="amounts" />
        </template>

        <template #action>
          <ActionScreen @create="create" />
        </template>
      </ResumeScreen>
    </template>

    <template #movements>
      <MovementsScreen :movements="vMovements" @remove="remove" />
    </template>
  </LayoutScreen>
</template>

<script setup>
import { computed, reactive, onMounted } from "vue"

import LayoutScreen from "./LayoutScreen.vue"
import HeaderScreen from "./Header/HeaderScreen.vue"
import ResumeScreen from "./Resume/ResumeScreen"
import GraphicScreen from "./Resume/GraphicScreen"
import ActionScreen from "./Resume/ActionScreen.vue"
import MovementsScreen from "./Movements/MovementsScreen"

let vLabel = null
let vAmount = null
let vMovements = reactive([])

const amounts = computed(() => {
  const lastDays = vMovements
    .filter((x) => {
      const today = new Date()
      const oldDate = today.setDate(today.getDate() - 30)

      return x.time > oldDate
    })
    .map((y) => y.amount)

  return lastDays.map((x, i) => {
    const lastMovements = lastDays.slice(0, i)

    return (
      x +
      lastMovements.reduce((suma, movement) => {
        return suma + movement
      }, 0)
    )
  })
})

const totalAmount = computed(() => {
  return vMovements.reduce((suma, m) => {
    return suma + m.vMovements
  }, 0)
})

onMounted(() => {
  const savedMovements = JSON.parse(localStorage.getItem("vMovements"))

  if (Array.isArray(savedMovements)) {
    savedMovements.forEach((m) => {
      vMovements.push({ ...m, time: new Date(m.time) })
    })
  }
})

const create = (movement) => {
  vMovements = [...vMovements, movement]

  save()
}

const remove = (id) => {
  const index = vMovements.findIndex((m) => m.id === id)

  vMovements = (prev) => {
    prev.splice(index, 1)
    return [...prev]
  }

  console.log(vMovements)
  console.log(index)

  save()
}

const save = () => {
  localStorage.setItem("vMovements", JSON.stringify(vMovements))
}
</script>

<style scoped></style>
