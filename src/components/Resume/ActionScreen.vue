<template>
  <button @click="showModal = !showModal">Agregar movimiento</button>

  <teleport to="#app">
    <ModalCard v-show="showModal" @viewModal="showModal = false">
      <form @submit.prevent="submit">
        <div class="field">
          <label>Título</label>
          <input type="text" v-model="title" />
        </div>

        <div class="field">
          <label>Monto</label>
          <input type="number" v-model="amount" />
        </div>

        <div class="field">
          <label>Descripción del movimiento</label>
          <textarea v-model="description" cols="30" rows="10"></textarea>
        </div>

        <div class="field">
          <label>Tipo de movimiento</label>
          <label class="radio-label">
            <input type="radio" v-model="movementType" value="Ingreso" />
            <span>Ingreso</span>
          </label>

          <label class="radio-label">
            <input type="radio" v-model="movementType" value="Egreso" />
            <span>Egreso</span>
          </label>
        </div>

        <div class="action">
          <button>Agregar movimiento</button>
        </div>
      </form>
    </ModalCard>
  </teleport>
</template>

<script setup>
import { ref, defineEmits } from "vue"
import ModalCard from "./ModalCard.vue"

const showModal = ref(false)
const title = ref("")
const amount = ref(0)
const description = ref("")
const movementType = ref("Ingreso")

const emit = defineEmits(["create"])

const submit = () => {
  showModal.value = !showModal.value

  emit("create", {
    title: title.value,
    description: description.value,
    amount: movementType.value === "Ingreso" ? amount.value : -amount.value,
    time: new Date(),
    id: new Date().getTime()
  })

  title.value = ""
  amount.value = 0
  description.value = ""
  movementType.value = "Ingreso"
}
</script>

<style scoped>
button {
  color: white;
  font-size: 1.25rem;
  background-color: var(--brand-blue);
  border: none;
  width: 100%;
  padding: 24px 60px;
  border-radius: 60px;
  box-sizing: border-box;
}

form {
  font-size: 1.24rem;
  width: 100%;
}

form .action {
  padding: 24px;
}

.field {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 16px 24px;
}

label {
  margin-bottom: 8px;
}

input,
textarea {
  font-size: 1.24rem;
  border: 2px solid var(--brand-blue);
  border-radius: 8px;
  padding: 8px;
}

input[type="number"] {
  text-align: right;
}

.radio-label {
  display: flex;
  align-items: center;
  margin-top: 8px;
}

.radio-label span {
  margin-top: 4px;
  margin-left: 8px;
}

input[type="radio"] {
  appearance: none;
  width: 1.24rem;
  height: 1.24rem;
  color: var(--brand-blue);
  border: 2px solid var(--brand-blue);
  border-radius: 50%;
}

input[type="radio"]:checked {
  background-color: var(--brand-blue);
}
</style>
