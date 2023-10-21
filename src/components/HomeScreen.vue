<template>
  <LayoutScreen>
    <template #header>
      <HeaderScreen />
    </template>

    <template #resume>
      <ResumeScreen
        :totalLabel="'Ahorro total'"
        :label="label"
        :totalAmount="9999"
        :amount="amount"
      />
    </template>

    <template #movements>
      <MovementsScreen />
    </template>
  </LayoutScreen>
</template>

<script setup>
import LayoutScreen from "./LayoutScreen.vue"
import HeaderScreen from "./HeaderScreen.vue"
import ResumeScreen from "./Resume/ResumeScreen"
import MovementsScreen from "./MovementsScreen"

let label = null
let amount = null
</script>

<style scoped></style>
