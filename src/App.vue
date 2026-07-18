<template>
  <div id="app" class="min-w-screen flex min-h-screen flex-col bg-background text-text">
    <MyHeader />
    <MainWindow class="flex-1" />
    <MyFooter />
  </div>
</template>
<script setup lang="ts">
import MainWindow from './web/MainWindow.vue';
import MyFooter from './web/MyFooter.vue';
import MyHeader from './web/MyHeader.vue';
</script>

<style lang="postcss">
@import url('@fortawesome/fontawesome-free/css/all.min.css');
@import url('assets/font.css');
@tailwind base;
@tailwind components;
@tailwind utilities;

a {
  @apply text-primary-600 underline hover:text-primary-500;
}

.btn {
  @apply bg-secondary-700 text-primary-600 hover:bg-secondary-800;
  @apply px-2 py-1 font-bold;
  @apply border border-secondary-500 hover:border-secondary-600;
}
</style>
