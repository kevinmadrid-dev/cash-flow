import { ref, computed } from 'vue'

// Composable para validación de formularios
export function useFormValidation() {
  const errors = ref({})

  const validateMovementForm = formData => {
    const newErrors = {}

    // Validar título
    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = 'El título debe tener al menos 3 caracteres'
    }

    // Validar monto
    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'El monto debe ser mayor a 0'
    }

    // Validar descripción
    if (!formData.description || formData.description.trim().length < 5) {
      newErrors.description = 'La descripción debe tener al menos 5 caracteres'
    }

    // Validar tipo de movimiento
    if (
      !formData.movementType ||
      !['Ingreso', 'Egreso'].includes(formData.movementType)
    ) {
      newErrors.movementType = 'Debe seleccionar un tipo de movimiento válido'
    }

    errors.value = newErrors
    return Object.keys(newErrors).length === 0
  }

  const clearErrors = () => {
    errors.value = {}
  }

  const hasErrors = computed(() => {
    return Object.keys(errors.value).length > 0
  })

  const getError = field => {
    return errors.value[field] || null
  }

  return {
    errors,
    validateMovementForm,
    clearErrors,
    hasErrors,
    getError,
  }
}
