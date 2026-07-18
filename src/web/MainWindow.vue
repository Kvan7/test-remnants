<template>
  <div class="flex h-full w-full flex-col gap-2 p-8">
    <h1 class="text-2xl font-bold text-primary-600">Finder</h1>
    <div class="h-16 w-32 border"></div>
    <hr />
    <h1 class="text-2xl font-bold text-primary-600">Weight Table</h1>
    <ui-table :rows="weights" />

    <hr />
    <h1 class="text-2xl font-bold text-primary-600">Rewards / Recipe Table</h1>
    <ui-table :rows="rewards" />
  </div>
</template>

<script lang="ts">
import { REWARDS, WEIGHTS } from '@/assets/data';
import { defineComponent } from 'vue';
import UiTable from './UiTable.vue';

export default defineComponent({
  components: {
    UiTable,
  },
  setup() {
    return {
      rewards: REWARDS as unknown as Record<string, unknown>[],
      weights: WEIGHTS as unknown as Record<string, unknown>[],
    };
  },
});
</script>
