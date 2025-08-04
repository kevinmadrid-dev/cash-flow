<template>
  <div class="movements">
    <div class="header">
      <h2 class="title">Historial</h2>

      <span class="count" v-if="movements.length">
        {{ movements.length }} movimiento{{ movements.length !== 1 ? 's' : '' }}
      </span>
    </div>

    <div class="content" v-if="movements.length">
      <MovementCard
        v-for="movement in movements"
        :key="movement.id"
        :id="movement.id"
        :title="movement.title"
        :description="movement.description"
        :amount="movement.amount"
        :time="movement.time"
        @remove="handleRemove"
      />
    </div>

    <div class="empty-state" v-else>
      <p>No hay movimientos registrados</p>

      <span>Agrega tu primer movimiento para comenzar</span>
    </div>
  </div>
</template>

<script setup>
  import { toRefs, defineProps, defineEmits } from 'vue'
  import MovementCard from './MovementCard.vue'

  const props = defineProps({
    movements: {
      type: Array,
      required: true,
      default: () => [],
    },
  })

  const { movements } = toRefs(props)

  const emit = defineEmits(['remove'])

  const handleRemove = id => {
    emit('remove', id)
  }
</script>

<style scoped>
  .movements {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 16px;
    box-sizing: border-box;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
  }

  .title {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  .count {
    font-size: 0.9rem;
    color: #666;
    background-color: #f0f0f0;
    padding: 4px 8px;
    border-radius: 12px;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    text-align: center;
    color: #666;
  }

  .empty-state p {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
    font-weight: 500;
  }

  .empty-state span {
    font-size: 0.9rem;
    opacity: 0.8;
  }
</style>

<style scoped>
  .movements {
    max-height: 100%;
    padding: 0 8px;
    margin-bottom: 14px;
  }

  .title {
    margin: 8px 16px 24px 16px;
    color: var(--brand-blue);
  }

  .content {
    max-height: 68vh;
    display: flex;
    flex-direction: column;
    gap: 8px;
    overflow-y: scroll;
  }
</style>
