import { ref, computed, onMounted } from 'vue'

// Composable para manejar los movimientos financieros
export function useMovements() {
  const movements = ref([])
  const isLoading = ref(false)

  // Computed properties
  const totalAmount = computed(() => {
    return movements.value.reduce((suma, movement) => {
      return suma + movement.amount
    }, 0)
  })

  const incomes = computed(() => {
    return movements.value.filter(movement => movement.amount > 0)
  })

  const expenses = computed(() => {
    return movements.value.filter(movement => movement.amount < 0)
  })

  const totalIncomes = computed(() => {
    return incomes.value.reduce((suma, movement) => {
      return suma + movement.amount
    }, 0)
  })

  const totalExpenses = computed(() => {
    return expenses.value.reduce((suma, movement) => {
      return suma + Math.abs(movement.amount)
    }, 0)
  })

  // Obtener balance acumulado para el gráfico (últimos 30 días)
  const amounts = computed(() => {
    // Filtrar movimientos de los últimos 30 días
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentMovements = movements.value.filter(
      movement => new Date(movement.time) >= thirtyDaysAgo
    )

    // Ordenar movimientos por fecha
    const sortedMovements = [...recentMovements].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    )

    // Calcular balance progresivo
    let runningBalance = 0
    return sortedMovements.map(movement => {
      runningBalance += movement.amount
      return runningBalance
    })
  })

  // Obtener fechas de los movimientos para el gráfico
  const chartDates = computed(() => {
    // Filtrar movimientos de los últimos 30 días
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const recentMovements = movements.value.filter(
      movement => new Date(movement.time) >= thirtyDaysAgo
    )

    // Ordenar movimientos por fecha
    const sortedMovements = [...recentMovements].sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    )

    return sortedMovements.map(movement => movement.time)
  })

  // Métodos
  const loadMovements = () => {
    try {
      isLoading.value = true
      const savedMovements = localStorage.getItem('movements')

      if (savedMovements) {
        const parsedMovements = JSON.parse(savedMovements)
        if (Array.isArray(parsedMovements)) {
          movements.value = parsedMovements.map(movement => ({
            ...movement,
            time: new Date(movement.time),
          }))
        }
      }
    } catch (error) {
      console.error('Error loading movements:', error)
      movements.value = []
    } finally {
      isLoading.value = false
    }
  }

  const saveMovements = () => {
    try {
      localStorage.setItem('movements', JSON.stringify(movements.value))
    } catch (error) {
      console.error('Error saving movements:', error)
    }
  }

  const createMovement = movementData => {
    const newMovement = {
      id: Date.now(),
      title: movementData.title,
      description: movementData.description,
      amount:
        movementData.movementType === 'Egreso'
          ? -Math.abs(movementData.amount)
          : Math.abs(movementData.amount),
      time: new Date(),
      type: movementData.movementType,
    }

    movements.value.push(newMovement)
    saveMovements()

    return newMovement
  }

  const removeMovement = id => {
    const index = movements.value.findIndex(movement => movement.id === id)

    if (index !== -1) {
      movements.value.splice(index, 1)
      saveMovements()
      return true
    }

    return false
  }

  const clearAllMovements = () => {
    movements.value = []
    saveMovements()
  }

  // Cargar movimientos al montar
  onMounted(() => {
    loadMovements()
  })

  return {
    // Estado
    movements,
    isLoading,

    // Computed
    totalAmount,
    incomes,
    expenses,
    totalIncomes,
    totalExpenses,
    amounts,
    chartDates,

    // Métodos
    createMovement,
    removeMovement,
    clearAllMovements,
    loadMovements,
    saveMovements,
  }
}
