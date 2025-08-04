<template>
  <LayoutScreen>
    <template #header>
      <HeaderScreen />
    </template>

    <template #resume>
      <ResumeScreen
        :totalLabel="'Ahorro total'"
        :label="summaryLabel"
        :totalAmount="totalAmount"
        :amount="summaryAmount"
      >
        <template #graphic>
          <GraphicScreen :amounts="amounts" :chartDates="chartDates" />
        </template>
      </ResumeScreen>
    </template>

    <template #movements>
      <MovementsScreen :movements="movements" @remove="handleRemoveMovement" />
    </template>

    <template #action>
      <ActionScreen @create="handleCreateMovement" />
    </template>
  </LayoutScreen>
</template>

<script setup>
  import { computed } from 'vue'
  import { useMovements } from '@/composables/useMovements'

  import LayoutScreen from './LayoutScreen.vue'
  import HeaderScreen from './Header/HeaderScreen.vue'
  import ResumeScreen from './Resume/ResumeScreen.vue'
  import GraphicScreen from './Resume/GraphicScreen.vue'
  import ActionScreen from './Resume/ActionScreen.vue'
  import MovementsScreen from './Movements/MovementsScreen.vue'

  // Composables
  const {
    movements,
    totalAmount,
    totalIncomes,
    totalExpenses,
    amounts,
    chartDates,
    createMovement,
    removeMovement,
  } = useMovements()

  // Computed properties para el resumen
  const summaryLabel = computed(() => {
    const income = totalIncomes.value
    const expense = totalExpenses.value

    if (income > expense) {
      return 'Ganancia del mes'
    } else if (expense > income) {
      return 'Pérdida del mes'
    } else {
      return 'Sin cambios'
    }
  })

  const summaryAmount = computed(() => {
    return Math.abs(totalIncomes.value - totalExpenses.value)
  })

  // Métodos
  const handleCreateMovement = movementData => {
    try {
      createMovement(movementData)
    } catch (error) {
      console.error('Error creating movement:', error)
    }
  }

  const handleRemoveMovement = id => {
    try {
      const success = removeMovement(id)
      if (!success) {
        console.warn('Movement not found:', id)
      }
    } catch (error) {
      console.error('Error removing movement:', error)
    }
  }
</script>

<style scoped></style>
