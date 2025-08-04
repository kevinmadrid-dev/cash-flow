<template>
  <Suspense>
    <template #default>
      <HomeScreen />
    </template>

    <template #fallback>
      <SplashScreen />
    </template>
  </Suspense>
</template>

<script setup>
  import { defineAsyncComponent } from 'vue'
  import SplashScreen from '@/components/SplashScreen.vue'

  const HomeScreen = defineAsyncComponent(
    () =>
      new Promise(resolve => {
        setTimeout(() => {
          resolve(import('@/components/HomeScreen.vue'))
        }, 2500)
      })
  )
</script>

<style>
  :root {
    --primary: #2563eb;
    --success: #10b981;
    --danger: #ef4444;

    --gray-50: #f9fafb;
    --gray-100: #f3f4f6;
    --gray-200: #e5e7eb;
    --gray-300: #d1d5db;
    --gray-400: #9ca3af;
    --gray-500: #6b7280;
    --gray-600: #4b5563;
    --gray-700: #374151;
    --gray-800: #1f2937;
    --gray-900: #111827;

    --text-primary: var(--gray-900);
    --text-secondary: var(--gray-600);
    --text-muted: var(--gray-400);

    --bg-primary: #ffffff;
    --bg-secondary: var(--gray-50);
    --bg-card: #ffffff;

    --border-light: var(--gray-200);
    --border-medium: var(--gray-300);

    --radius-sm: 6px;
    --radius-md: 8px;
    --radius-lg: 12px;
    --radius-xl: 16px;

    --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
    --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);

    --transition: all 0.2s ease;
  }

  * {
    box-sizing: border-box;
  }

  html {
    overflow-x: hidden; /* Prevenir scroll horizontal */
  }

  html,
  body,
  #app {
    min-height: 100vh;
    margin: 0;
    padding: 0;
    font-family:
      -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
      Arial, sans-serif;
    color: var(--text-primary);
    background-color: var(--bg-primary);
    line-height: 1.6;
    max-width: 100vw;
    overflow-x: hidden; /* Prevenir scroll horizontal */
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--gray-300);
    border-radius: 2px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--primary);
  }

  /* Utilidades globales */
  .container {
    max-width: 100%;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .text-success {
    color: var(--success) !important;
  }

  .text-danger {
    color: var(--danger) !important;
  }

  .text-primary {
    color: var(--primary) !important;
  }

  * {
    max-width: 100%;
  }

  img,
  video,
  iframe {
    max-width: 100%;
    height: auto;
  }
</style>
