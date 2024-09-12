<template>
  <Suspense>
    <template #default>
      <HomeScreen />
    </template>

    <template #fallback>
      <SplashScreen />
    </template>
  </Suspense>
</template>

<script setup>
import { defineAsyncComponent } from "vue"
import SplashScreen from "@/components/SplashScreen.vue"

const HomeScreen = defineAsyncComponent(
  () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("@/components/HomeScreen.vue"))
      }, 2500)
    })
)
</script>

<style>
* {
  --brand-grey: #c4c4c4;
  --brand-green: #04b500;
  --brand-blue: #0689b0;
}

html,
body,
.app {
  min-height: 100vh;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
