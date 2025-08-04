<template>
  <div class="movement" :class="{ expense: isExpense, income: !isExpense }">
    <div class="content">
      <h4>{{ title }}</h4>

      <p class="description">{{ description }}</p>

      <span class="date">{{ formattedDate }}</span>
    </div>

    <div class="action">
      <button
        class="delete-btn"
        @click="handleRemove"
        :disabled="isRemoving"
        aria-label="Eliminar movimiento"
      >
        <img src="../../assets/trash-icon.svg" alt="Delete icon" />
      </button>

      <p :class="{ red: isExpense, green: !isExpense }" class="amount">
        {{ formattedAmount }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import { toRefs, defineProps, defineEmits, computed, ref } from 'vue'
  import { useCurrency } from '@/composables/useCurrency'

  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
  })

  const { id, title, description, amount, time } = toRefs(props)

  const emit = defineEmits(['remove'])
  const isRemoving = ref(false)

  // Composables
  const { formatCurrency } = useCurrency()
  const isExpense = computed(() => amount.value < 0)

  const formattedAmount = computed(() => {
    return formatCurrency(Math.abs(amount.value))
  })

  const formattedDate = computed(() => {
    if (!time.value) return ''

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(time.value)
  })

  // Methods
  const handleRemove = async () => {
    try {
      isRemoving.value = true
      emit('remove', id.value)
    } catch (error) {
      console.error('Error removing movement:', error)
    } finally {
      setTimeout(() => {
        isRemoving.value = false
      }, 1000)
    }
  }
</script>

<style scoped>
  .movement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    box-sizing: border-box;
    margin-bottom: 8px;
    transition: all 0.3s ease;
    border-left: 4px solid transparent;
  }

  .movement.income {
    background-color: rgba(16, 185, 129, 0.1);
    border-left-color: var(--success);
  }

  .movement.expense {
    background-color: rgba(239, 68, 68, 0.1);
    border-left-color: var(--danger);
  }

  .movement:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .movement .content {
    flex: 1;
    margin-right: 16px;
  }

  .movement .action {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-direction: column;
    gap: 8px;
  }

  h4 {
    margin: 0 0 4px 0;
    padding: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
  }

  .description {
    margin: 0 0 4px 0;
    padding: 0;
    color: #666;
    font-size: 0.9rem;
  }

  .date {
    font-size: 0.8rem;
    color: #999;
  }

  .delete-btn {
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .delete-btn:hover:not(:disabled) {
    background-color: rgba(239, 68, 68, 0.1);
  }

  .delete-btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  .delete-btn img {
    width: 16px;
    height: 16px;
  }

  .amount {
    margin: 0;
    padding: 0;
    font-weight: 600;
    font-size: 1.1rem;
  }

  .red {
    color: var(--danger);
  }

  .green {
    color: var(--success);
  }
</style>
