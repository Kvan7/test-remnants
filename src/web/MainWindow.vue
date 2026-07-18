<template>
  <div class="flex h-full w-full flex-col gap-2 p-8">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold text-primary-600">Weight Table</h1>
      <button v-if="selection === 'weights'" @click="clearSelection">Clear Selection</button>
    </div>
    <ui-table
      :rows="weights"
      @row-dblclick="selectWeightRow"
      :selectedIndex="selection === 'weights' ? selectedIndex : null"
      defaultSortColumn="HighlightedRune"
      defaultSortOrder="asc"
    />

    <hr class="border-secondary-200" />
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold text-primary-600">Rewards / Recipe Table</h1>
      <button v-if="selection === 'rewards'" @click="clearSelection">Clear Selection</button>
    </div>
    <ui-table
      :rows="rewards"
      @row-dblclick="selectRewardRow"
      :selectedIndex="selection === 'rewards' ? selectedIndex : null"
      defaultSortColumn="_index"
      defaultSortOrder="desc"
    />
    <hr class="border-secondary-200" />
    <h1 class="text-2xl font-bold text-primary-600">Finder</h1>
    <div class="h-16 w-32 border"></div>
  </div>
</template>

<script lang="ts">
import { REWARDS, WEIGHTS } from '@/assets/data';
import { computed, defineComponent, shallowRef } from 'vue';
import UiTable from './UiTable.vue';

export default defineComponent({
  components: {
    UiTable,
  },
  setup() {
    const startingRewards = REWARDS as unknown as Record<string, unknown>[];
    const startingWeights = WEIGHTS as unknown as Record<string, unknown>[];

    const selection = shallowRef<null | 'weights' | 'rewards'>(null);
    const selectedIndex = shallowRef<number | null>(null);

    const rewards = computed(() => {
      if (selection.value !== 'weights') {
        return startingRewards;
      }

      const {
        HighlightedRune: rune,
        RecipeRuneCount: maxRuneCount,
        HighlightedRuneSlot: slot,
      } = startingWeights.find((i) => i._index === selectedIndex.value!)!; // use find since sorting may change

      return startingRewards.filter((rew) => {
        const runes = rew.Runes as string[];
        return (
          runes.length <= (maxRuneCount as number) &&
          runes.at((slot as number) - 1) === (rune as string)
        );
      });
    });

    const weights = computed(() => {
      if (selection.value !== 'rewards') {
        return startingWeights;
      }
      // use find since i may change the sorting
      return (
        startingRewards.find((i) => i._index === selectedIndex.value!)!.RuneWeights as number[]
      ).map((r) => startingWeights[r]!);
    });

    return {
      rewards,
      weights,
      selection,
      selectedIndex,
      clearSelection() {
        selection.value = null;
        selectedIndex.value = null;
      },
      selectRewardRow(rowIndex: number) {
        selection.value = 'rewards';
        selectedIndex.value = rowIndex;
      },
      selectWeightRow(rowIndex: number) {
        selection.value = 'weights';
        selectedIndex.value = rowIndex;
      },
    };
  },
});
</script>
