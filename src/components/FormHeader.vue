<script setup>
import CompromisLogo from '@compromis/blobby/components/logos/CompromisLogo.vue'
</script>

<template>
  <header class="header">
    <div class="header-logo"><compromis-logo class="logo" />Finances</div>
    <h1 class="text-5xl">Full de liquidació</h1>
  </header>
</template>

<style lang="scss" scoped>
  :deep(.compromis-logo) {
    height: 2rem;
  }

  .header {
    padding: 2rem 0;

    h1 {
      font-weight: 500;
      color: var(--gray-600);
      margin-top: 2rem;
      font-size: var(--text-xl);
    }

    &-logo {
      display: flex;
      align-items: center;
      gap: .5rem;
      color: var(--gray-700);
      font-size: 1.25rem;
    }
  }
</style>