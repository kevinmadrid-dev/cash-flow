<template>
  <div class="layout">
    <header class="header">
      <slot name="header"></slot>
    </header>

    <main class="main-content">
      <section class="resume-section">
        <slot name="resume"></slot>
      </section>

      <!-- Navegación de tabs -->
      <nav class="tabs-navigation">
        <button
          :class="['tab-button', { active: activeTab === 'movements' }]"
          @click="setActiveTab('movements')"
        >
          Historial
        </button>

        <button
          :class="['tab-button', { active: activeTab === 'add' }]"
          @click="setActiveTab('add')"
        >
          Agregar movimiento
        </button>
      </nav>

      <!-- Contenido de las tabs -->
      <section class="tab-content">
        <div v-show="activeTab === 'movements'" class="movements-tab">
          <slot name="movements"></slot>
        </div>
        <div v-show="activeTab === 'add'" class="add-tab">
          <slot name="action"></slot>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const activeTab = ref('movements')

  const setActiveTab = tab => {
    activeTab.value = tab
  }
</script>

<style scoped>
  .layout {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background: var(--bg-secondary);
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
  }

  /* Header */
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--border-color);
    padding: 1rem;
    box-shadow: var(--shadow-sm);
  }

  /* Contenido principal */
  .main-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 0 1rem;
    gap: 1.5rem;
  }

  /* Sección de resumen */
  .resume-section {
    background: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    margin-top: 1rem;
    overflow: hidden;
  }

  /* Navegación de tabs */
  .tabs-navigation {
    display: flex;
    background: var(--bg-card);
    border-radius: var(--radius-lg);
    padding: 0.5rem;
    box-shadow: var(--shadow-sm);
    margin-bottom: 1rem;
    border: 1px solid var(--border-light);
  }

  .tab-button {
    flex: 1;
    padding: 0.875rem 1rem;
    border: none;
    border-radius: var(--border-radius);
    background: transparent;
    color: var(--text-secondary);
    font-weight: 500;
    font-size: 0.95rem;
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .tab-button:hover {
    background: var(--bg-secondary);
    color: var(--text-primary);
  }

  .tab-button.active {
    background: transparent;
    color: var(--primary);
    font-weight: 600;
  }

  /* Contenido de tabs */
  .tab-content {
    background: white;
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    min-height: 400px;
    margin-bottom: 2rem;
  }

  .movements-tab,
  .add-tab {
    padding: 1.5rem;
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .main-content {
      padding: 0 0.75rem;
      gap: 1rem;
    }

    .header {
      padding: 0.75rem;
    }

    .resume-section {
      margin-top: 0.5rem;
    }

    .tab-button {
      padding: 0.75rem 0.5rem;
      font-size: 0.875rem;
    }

    .movements-tab,
    .add-tab {
      padding: 1rem;
    }
  }

  @media (max-width: 480px) {
    .main-content {
      padding: 0 0.5rem;
    }

    .tab-button {
      padding: 0.625rem 0.375rem;
      font-size: 0.8rem;
    }

    .tabs-navigation {
      padding: 0.25rem;
    }
  }

  /* Desktop mejoras */
  @media (min-width: 1024px) {
    .main-content {
      gap: 2rem;
    }

    .resume-section {
      margin-top: 1.5rem;
    }

    .tab-content {
      min-height: 500px;
    }
  }
</style>
