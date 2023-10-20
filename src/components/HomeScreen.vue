<template>
  <LayoutScreen>
    <template #header>
      <HeaderScreen />
    </template>

    <template #resume>
      <HeaderScreen></HeaderScreen>
    </template>
  </LayoutScreen>
</template>

<script setup>
import LayoutScreen from "@/components/LayoutScreen.vue"
import HeaderScreen from "@/components/HeaderScreen.vue"
</script>

<style scoped></style>
