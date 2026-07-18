<template>
  <div id="app" class="bg-background text-text">
    <MyHeader />
    <MainWindow />
    <MyFooter />
  </div>
</template>
<script setup lang="ts">
import MainWindow from './web/MainWindow.vue';
import MyFooter from './web/MyFooter.vue';
import MyHeader from './web/MyHeader.vue';
</script>

<style lang="postcss">
@tailwind base;
@tailwind components;
@tailwind utilities;

a {
  @apply text-primary-600 underline hover:text-primary-500;
}
</style>
