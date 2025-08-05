<template>
  <main class="resume-main">
    <div class="summary">
      <p class="label">{{ viewLabel }}</p>

      <h2 class="amount" :class="amountClass">{{ formattedAmount }}</h2>
    </div>

    <div class="graphic-container">
      <slot name="graphic"></slot>
    </div>
  </main>
</template>

<script setup>
  import { defineProps, computed } from 'vue'
  import { useCurrency } from '@/composables/useCurrency'

  const props = defineProps({
    totalLabel: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: null,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    amount: {
      type: Number,
      default: null,
    },
  })

  // Composables
  const { formatCurrency } = useCurrency()

  // Computed properties
  const signedAmount = computed(() => {
    if (viewLabel.value?.toUpperCase().includes('PÉRDIDA')) {
      return -Math.abs(viewAmount.value)
    } else {
      return viewAmount.value
    }
  })

  const viewAmount = computed(() => {
    return props.amount !== null ? props.amount : props.totalAmount
  })

  const viewLabel = computed(() => {
    return props.label !== null ? props.label : props.totalLabel
  })

  const amountClass = computed(() => {
    const amount = signedAmount.value
    return {
      positive: amount > 0,
      negative: amount < 0,
      neutral: amount === 0,
    }
  })

  const formattedAmount = computed(() => {
    return formatCurrency(signedAmount.value)
  })
</script>

<style scoped>
  .resume-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 100%;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
    background: linear-gradient(
      135deg,
      var(--bg-primary) 0%,
      var(--bg-secondary) 100%
    );
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    position: relative;
    overflow: hidden;
  }

  .summary {
    text-align: center;
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .label {
    margin: 0 0 0.5rem 0;
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .amount {
    margin: 0;
    font-size: 2.5rem;
    font-weight: 700;
    transition: var(--transition);
    word-break: break-word;
  }

  .amount.positive {
    color: var(--success);
  }

  .amount.negative {
    color: var(--danger);
  }

  .amount.neutral {
    color: var(--text-primary);
  }

  .graphic-container {
    width: 100%;
    max-width: 100%;
    position: relative;
    z-index: 1;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
    padding: 1.5rem;
    border: 1px solid var(--border-light);
    overflow: hidden;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .resume-main {
      padding: 1.5rem 1rem;
      max-width: calc(100vw - 1rem);
      margin: 0.5rem;
    }

    .amount {
      font-size: 2rem;
    }

    .label {
      font-size: 0.8rem;
    }

    .graphic-container {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .resume-main {
      padding: 1rem 0.75rem;
      max-width: calc(100vw - 0.5rem);
      margin: 0.25rem;
    }

    .amount {
      font-size: 1.75rem;
    }

    .label {
      font-size: 0.75rem;
    }

    .summary {
      margin-bottom: 1rem;
    }

    .graphic-container {
      padding: 0.75rem;
    }
  }

  /* Desktop mejoras */
  @media (min-width: 1024px) {
    .resume-main {
      padding: 3rem 2rem;
      flex-direction: column;
      gap: 2rem;
      text-align: center;
    }

    .summary {
      text-align: center;
      margin-bottom: 1rem;
    }

    .amount {
      font-size: 3rem;
    }

    .label {
      font-size: 1rem;
    }

    .graphic-container {
      max-width: 100%;
      padding: 2rem;
    }
  }
</style>
