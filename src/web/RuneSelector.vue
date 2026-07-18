<template>
  <div class="flex flex-col">
    <div>
      <div :class="$style.row">
        <div :class="$style.label">Recipe Rune Count</div>
        <div :class="$style['btn-input']">
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
      <div :class="$style.row">
        <div :class="$style.label">Highlighted Rune</div>
        <div :class="$style['btn-input']">
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

      <div :class="$style.row">
        <div :class="$style.label">Highlighted Rune Slot</div>
        <div :class="$style['btn-input']">
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
      <div :class="$style.row">
        <div :class="$style.label">
          <ui-checkbox class="mb-1" v-model="usePlayerLevel">Player Level</ui-checkbox>
        </div>
        <div>
          <input
            :class="[$style['num-input'], usePlayerLevel ? '' : 'hidden']"
            v-model.number="playerLevel"
            type="number"
            step="any"
          />
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
import UiCheckbox from './UiCheckbox.vue';

export default defineComponent({
  components: {
    UiTable,
    UiCheckbox,
  },
  setup() {
    const selectedRune = shallowRef<string>('');
    const selectedSlot = shallowRef<number>(1);
    const selectedCount = shallowRef<number>(2);
    const playerLevel = shallowRef<number>(100);
    const usePlayerLevel = shallowRef<boolean>(false);

    const result = computed(() => {
      const weights =
        REMNANTS.recipes[`${selectedRune.value}|${selectedSlot.value}|${selectedCount.value}`];
      if (!weights) {
        return [];
      }
      const rawRewards = weights.map((id) => REMNANTS.rewards[id]!);
      const filteredRewards = rawRewards.filter((reward) => {
        if (usePlayerLevel.value && reward.minLevel && reward.maxLevel) {
          return reward.minLevel <= playerLevel.value && reward.maxLevel >= playerLevel.value;
        }
        return true;
      });
      return filteredRewards;
    });

    return {
      runes: EXPEDITION_2_RUNES,
      slots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      counts: [2, 3, 4, 5, 6, 7, 8, 9, 10],
      playerLevel,
      usePlayerLevel,
      selectedRune,
      selectedSlot,
      selectedCount,
      result,
    };
  },
});
</script>

<style lang="postcss" module>
.label {
  @apply min-w-64 font-bold text-secondary-200 underline;
}

.btn-input {
  @apply flex flex-row flex-wrap;
}

.row {
  @apply mb-2 flex flex-row;
}

.num-input {
  @apply w-24 text-center;
  @apply bg-secondary-700 text-primary-600;
  @apply select-all;

  &:hover,
  &:focus {
    @apply bg-secondary-800;
    @apply -my-px border border-secondary-600;
  }

  &::placeholder {
    @apply text-gray-400;
  }

  &:focus {
    cursor: none;
  }
}
</style>
