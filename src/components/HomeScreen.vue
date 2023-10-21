<template>
  <LayoutScreen>
    <template #header>
      <HeaderScreen />
    </template>

    <template #resume>
      <ResumeScreen />
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
</script>

<style scoped></style>
