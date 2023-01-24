<script setup>
import CompromisLogo from '@compromis/blobby/components/logos/CompromisLogo.vue'
</script>

<template>
  <header class="header">
    <compromis-logo class="logo" />
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
  }
</style>