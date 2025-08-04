<template>
  <div class="splashscreen">
    <img src="@/assets/cashflow-icon.svg" alt="Logo" />

    <h1>CashFlow</h1>
  </div>
</template>

<script setup></script>

<style scoped>
  .splashscreen {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100vh;
  }

  h1 {
    color: var(--brand-blue);
  }

  h1 span {
    color: var(--brand-green);
  }
</style>
