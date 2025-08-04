<template>
  <div class="graphic-container">
    <svg
      @touchstart="tap"
      @touchmove="tap"
      @touchend="unTap"
      viewBox="0 0 300 200"
      class="chart-svg"
    >
      <!-- Línea de referencia (Monto 00) -->
      <line
        stroke="var(--border-medium)"
        stroke-width="1"
        stroke-dasharray="5,5"
        x1="0"
        :y1="zero"
        x2="300"
        :y2="zero"
      />

      <!-- Etiqueta para la línea de referencia -->
      <text
        v-if="amounts.length > 0"
        x="5"
        :y="zero - 5"
        font-size="10"
        fill="var(--text-muted)"
      >
        Balance: 0
      </text>

      <!-- Línea del gráfico -->
      <polyline
        v-if="amounts.length > 0"
        fill="none"
        stroke="var(--primary)"
        stroke-width="3"
        :points="points"
      />

      <!-- Círculos en los puntos -->
      <circle
        v-for="(amount, index) in amounts"
        :key="index"
        :cx="getPointX(index)"
        :cy="PixelAmount(amount)"
        r="4"
        :fill="amount >= 0 ? 'var(--success)' : 'var(--danger)'"
        :stroke="amount >= 0 ? 'var(--success)' : 'var(--danger)'"
        stroke-width="2"
      />

      <!-- Pointer interactivo -->
      <line
        v-show="showPointer"
        stroke="var(--success)"
        stroke-width="2"
        :x1="pointer"
        y1="0"
        :x2="pointer"
        y2="200"
      />
    </svg>

    <div class="chart-info">
      <p class="chart-label">{{ chartLabel }}</p>

      <div v-if="amounts.length === 0" class="no-data">
        <p>Sin movimientos en los últimos 30 días</p>

        <p class="no-data-subtitle">
          Agrega tu primer movimiento para ver el gráfico de evolución
        </p>
      </div>

      <div v-else class="chart-summary">
        <p class="period-info">Evolución de balance - Últimos 30 días</p>

        <div class="date-range" v-if="dateRange">
          <span class="date-start">{{ dateRange.start }}</span>
          <span class="date-separator">→</span>
          <span class="date-end">{{ dateRange.end }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, toRefs, defineProps, computed } from 'vue'

  const props = defineProps({
    amounts: {
      type: Array,
      default: () => [],
    },
    chartDates: {
      type: Array,
      default: () => [],
    },
  })

  const { amounts, chartDates } = toRefs(props)

  const PixelAmount = amount => {
    if (amounts.value.length === 0) return 100

    const min = Math.min(...amounts.value)
    const max = Math.max(...amounts.value)

    // Si todos los valores son iguales
    if (min === max) return 100

    const amountAbs = amount + Math.abs(min)
    const minMax = Math.abs(max) + Math.abs(min)

    return 200 - (amountAbs * 160) / minMax - 20 // Margen de 20px arriba y abajo
  }

  const zero = computed(() => {
    return PixelAmount(0)
  })

  const points = computed(() => {
    if (amounts.value.length === 0) return ''

    const total = amounts.value.length

    return amounts.value
      .reduce((points, amount, i) => {
        const x = (280 / Math.max(total - 1, 1)) * i + 10 // Margen de 10px a los lados
        const y = PixelAmount(amount)
        return `${points} ${x},${y}`
      }, '')
      .trim()
  })

  const getPointX = index => {
    if (amounts.value.length === 0) return 0
    const total = amounts.value.length
    return (280 / Math.max(total - 1, 1)) * index + 10
  }

  const chartLabel = computed(() => {
    const count = amounts.value.length
    if (count === 0) return 'Sin movimientos en los últimos 30 días'
    if (count === 1) return '1 movimiento registrado'
    return `${count} movimientos registrados`
  })

  const dateRange = computed(() => {
    if (chartDates.value.length === 0) return null

    const dates = chartDates.value.map(date => new Date(date))
    const startDate = new Date(Math.min(...dates))
    const endDate = new Date(Math.max(...dates))

    const formatDate = date => {
      return new Intl.DateTimeFormat('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }).format(date)
    }

    return {
      start: formatDate(startDate),
      end: formatDate(endDate),
    }
  })

  const showPointer = ref(false)
  const pointer = ref(0)

  const tap = ({ target, touches }) => {
    if (amounts.value.length === 0) return

    showPointer.value = true
    const elementWidth = target.getBoundingClientRect().width
    const elementX = target.getBoundingClientRect().x
    const touchX = touches[0].clientX
    pointer.value = ((touchX - elementX) * 300) / elementWidth
  }

  const unTap = () => {
    showPointer.value = false
  }
</script>

<style scoped>
  .graphic-container {
    width: 100%;
    padding: 1rem;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-light);
  }

  .chart-svg {
    width: 100%;
    height: 200px;
    border-radius: var(--radius-md);
    background: linear-gradient(
      135deg,
      var(--bg-primary) 0%,
      var(--bg-secondary) 100%
    );
  }

  .chart-info {
    margin-top: 1rem;
    text-align: center;
  }

  .chart-label {
    margin: 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .no-data {
    padding: 2rem 1rem;
    text-align: center;
  }

  .no-data p {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: var(--text-secondary);
  }

  .no-data-subtitle {
    font-size: 0.875rem !important;
    color: var(--text-muted) !important;
  }

  .chart-summary {
    text-align: center;
  }

  .period-info {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 500;
  }

  .date-range {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: var(--text-muted);
  }

  .date-separator {
    color: var(--primary);
    font-weight: 600;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .graphic-container {
      padding: 0.75rem;
    }

    .chart-svg {
      height: 150px;
    }

    .no-data {
      padding: 1.5rem 0.5rem;
    }
  }
</style>
