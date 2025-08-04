import { computed } from 'vue'

// Composable para formatear moneda
export function useCurrency(locale = 'es-PE', currency = 'PEN') {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  })

  const formatCurrency = amount => {
    if (typeof amount !== 'number') {
      return formatter.format(0)
    }
    return formatter.format(amount)
  }

  const formatAmount = computed(() => amount => {
    return formatCurrency(amount)
  })

  return {
    formatCurrency,
    formatAmount,
  }
}
