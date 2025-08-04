<template>
  <div class="action-container">
    <div class="action-header">
      <h3>Nuevo Movimiento</h3>

      <p>Registra tus ingresos y gastos de forma rápida</p>
    </div>

    <form @submit.prevent="handleSubmit" class="movement-form">
      <div class="form-grid">
        <div class="field">
          <label for="title">Título</label>

          <input
            id="title"
            type="text"
            v-model="title"
            :class="{ error: getError('title') }"
            placeholder="Ej: Compra supermercado"
          />

          <span v-if="getError('title')" class="error-message">
            {{ getError('title') }}
          </span>
        </div>

        <div class="field">
          <label for="amount">Monto</label>

          <input
            id="amount"
            type="number"
            v-model.number="amount"
            :class="{ error: getError('amount') }"
            placeholder="0.00"
            step="0.01"
            min="0"
          />

          <span v-if="getError('amount')" class="error-message">
            {{ getError('amount') }}
          </span>
        </div>
      </div>

      <div class="field">
        <label for="description">Descripción del movimiento</label>

        <textarea
          id="description"
          v-model="description"
          :class="{ error: getError('description') }"
          rows="4"
          placeholder="Describe tu movimiento..."
        ></textarea>

        <span v-if="getError('description')" class="error-message">
          {{ getError('description') }}
        </span>
      </div>

      <div class="field">
        <label>Tipo de movimiento</label>

        <div class="radio-group">
          <label class="radio-label">
            <input
              type="radio"
              v-model="movementType"
              value="Ingreso"
              :class="{ error: getError('movementType') }"
            />

            <span class="radio-text">
              <span>Ingreso</span>
            </span>
          </label>

          <label class="radio-label">
            <input
              type="radio"
              v-model="movementType"
              value="Egreso"
              :class="{ error: getError('movementType') }"
            />

            <span class="radio-text">
              <span>Egreso</span>
            </span>
          </label>
        </div>

        <span v-if="getError('movementType')" class="error-message">
          {{ getError('movementType') }}
        </span>
      </div>

      <div class="action">
        <button type="submit" :disabled="isSubmitting" class="submit-button">
          <span v-if="isSubmitting">Guardando...</span>

          <span v-else>Agregar movimiento</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
  import { ref, defineEmits } from 'vue'
  import { useFormValidation } from '@/composables/useFormValidation'

  const title = ref('')
  const amount = ref(0)
  const description = ref('')
  const movementType = ref('Ingreso')
  const isSubmitting = ref(false)

  const emit = defineEmits(['create'])

  // Composables
  const { validateMovementForm, getError, clearErrors } = useFormValidation()

  const resetForm = () => {
    title.value = ''
    amount.value = 0
    description.value = ''
    movementType.value = 'Ingreso'
    clearErrors()
  }

  const handleSubmit = async () => {
    try {
      isSubmitting.value = true

      const formData = {
        title: title.value,
        amount: amount.value,
        description: description.value,
        movementType: movementType.value,
      }

      // Validar formulario
      const isValid = validateMovementForm(formData)

      if (!isValid) {
        isSubmitting.value = false
        return
      }

      // Emitir evento
      emit('create', formData)

      // Resetear formulario
      resetForm()
    } catch (error) {
      console.error('Error submitting form:', error)
    } finally {
      isSubmitting.value = false
    }
  }
</script>

<style scoped>
  .action-container {
    padding: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
    background: var(--bg-card);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }

  .action-header {
    text-align: center;
    margin-bottom: 2rem;
  }

  .action-header h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.5rem;
    color: var(--primary);
    font-weight: 600;
  }

  .action-header p {
    margin: 0;
    color: var(--text-secondary);
    font-size: 0.9rem;
  }

  .movement-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 100%;
    max-width: 100%;
  }

  .form-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
  }

  label {
    font-weight: 600;
    color: var(--text-primary);
    font-size: 0.875rem;
  }

  input,
  textarea {
    padding: 0.75rem;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    font-size: 1rem;
    transition: var(--transition);
    background: var(--bg-primary);
    width: 100%;
    max-width: 100%;
  }

  input:focus,
  textarea:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgb(37 99 235 / 0.1);
  }

  input.error,
  textarea.error {
    border-color: var(--danger);
    box-shadow: 0 0 0 3px rgb(239 68 68 / 0.1);
  }

  input[type='number'] {
    text-align: left;
  }

  /* Ocultar flechas del input number */
  input[type='number']::-webkit-outer-spin-button,
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;
  }

  textarea {
    resize: vertical;
    min-height: 100px;
  }

  .radio-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    width: 100%;
  }

  .radio-label {
    display: flex;
    align-items: center;
    padding: 0.75rem;
    border: 1px solid var(--border-light);
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: var(--transition);
    background: var(--bg-primary);
    width: 100%;
  }

  .radio-label:hover {
    border-color: var(--primary);
    background: var(--bg-secondary);
  }

  .radio-label input[type='radio'] {
    margin: 0;
    margin-right: 0.5rem;
    width: auto;
  }

  .radio-text {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
  }

  .radio-icon {
    font-size: 1.2rem;
  }

  input[type='radio'] {
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    border: 2px solid var(--primary);
    border-radius: 50%;
    position: relative;
    cursor: pointer;
  }

  input[type='radio']:checked::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 0.6rem;
    height: 0.6rem;
    background: var(--primary);
    border-radius: 50%;
  }

  input[type='radio'].error {
    border-color: var(--danger);
  }

  .error-message {
    color: var(--danger);
    font-size: 0.75rem;
    margin-top: 0.25rem;
  }

  .action {
    margin-top: 1rem;
    width: 100%;
  }

  .submit-button {
    width: 100%;
    padding: 1rem;
    background: var(--primary);
    color: white;
    border: none;
    border-radius: var(--radius-md);
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    box-shadow: var(--shadow-md);
  }

  .submit-button:hover:not(:disabled) {
    background: var(--primary);
    transform: translateY(-1px);
    box-shadow: var(--shadow-lg);
  }

  .submit-button:disabled {
    background: var(--gray-400);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  /* Responsive Design */
  @media (min-width: 768px) {
    .action-container {
      padding: 2rem;
    }

    .form-grid {
      grid-template-columns: 2fr 1fr;
    }

    .action-header h3 {
      font-size: 1.75rem;
    }

    .action-header p {
      font-size: 1rem;
    }
  }

  @media (max-width: 480px) {
    .action-container {
      padding: 1rem;
      margin: 0.5rem;
      border-radius: var(--radius-lg);
      max-width: calc(100vw - 1rem);
    }

    .radio-group {
      grid-template-columns: 1fr;
    }

    .radio-label {
      justify-content: center;
    }

    .form-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
