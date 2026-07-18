<template>
  <div class="flex flex-col">
    <div>
      <div class="row">
        <div class="label">Recipe Rune Count</div>
        <div class="btn-input">
          <button
            v-for="count in counts"
            :key="count"
            class="btn"
            @click="selectedCount = count"
            :class="{ '!hover:bg-accent-950 !bg-accent-900': selectedCount === count }"
          >
            {{ count }}
          </button>
        </div>
      </div>
      <div class="row">
        <div class="label">Highlighted Rune</div>
        <div class="btn-input">
          <button
            v-for="rune in runes"
            :key="rune"
            class="btn"
            :class="{ '!hover:bg-accent-950 !bg-accent-900': rune === selectedRune }"
            @click="selectedRune = rune"
          >
            {{ rune }}
          </button>
        </div>
      </div>

      <div class="row">
        <div class="label">Highlighted Rune Slot</div>
        <div class="btn-input">
          <button
            v-for="slot in slots"
            :key="slot"
            class="btn"
            :class="{ '!hover:bg-accent-950 !bg-accent-900': selectedSlot === slot }"
            @click="selectedSlot = slot"
          >
            {{ slot }}
          </button>
        </div>
      </div>
    </div>
    <div>Result Count: {{ result.length }}</div>
    <ui-table :rows="result" />
  </div>
</template>

<script lang="ts">
import { EXPEDITION_2_RUNES, REMNANTS } from '@/assets/data';
import { computed, defineComponent, shallowRef } from 'vue';
import UiTable from './UiTable.vue';

export default defineComponent({
  components: {
    UiTable,
  },
  setup() {
    const selectedRune = shallowRef<string>('');
    const selectedSlot = shallowRef<number>(1);
    const selectedCount = shallowRef<number>(2);

    const result = computed(() => {
      const weights =
        REMNANTS.recipes[`${selectedRune.value}|${selectedSlot.value}|${selectedCount.value}`];
      if (!weights) {
        return [];
      }
      const rawRewards = weights.map((id) => REMNANTS.rewards[id]!);
      return rawRewards;
    });

    return {
      runes: EXPEDITION_2_RUNES,
      slots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      counts: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      selectedRune,
      selectedSlot,
      selectedCount,
      result,
    };
  },
});
</script>

<style lang="postcss">
.label {
  @apply min-w-64 font-bold text-secondary-200 underline;
}

.btn-input {
  @apply flex flex-row flex-wrap;
}

div.row {
  @apply mb-2 flex flex-row;
}
</style>
