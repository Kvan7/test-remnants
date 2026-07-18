<template>
  <div class="max-h-[40vh] overflow-auto border border-secondary-800">
    <table class="w-full border-collapse text-left text-sm">
      <thead class="z-2 sticky top-0 bg-primary-800">
        <tr class="border-b border-secondary-500 text-accent-200">
          <th
            v-for="column in normalizedColumns"
            :key="column.key"
            class="whitespace-nowrap border-r border-secondary-500 px-2 py-1 font-bold last:border-r-0"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, rowIndex) in rows"
          :key="rowIndex"
          class="odd:bg-background-lighter whitespace-nowrap border-b border-secondary-500 last:border-b-0 even:bg-background hover:bg-primary-900"
        >
          <td
            v-for="column in normalizedColumns"
            :key="column.key"
            class="border-r border-secondary-500 px-2 py-1 last:border-r-0"
          >
            {{
              row[column.key] ||
              row[column.key] === 0 ||
              row[column.key] === true ||
              row[column.key] === false
                ? row[column.key]
                : '-'
            }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

type Column =
  | string
  | {
      key: string;
      label?: string;
    };

export default defineComponent({
  props: {
    rows: {
      type: Array as () => Record<string, unknown>[],
      required: true,
    },
    columns: {
      type: Array as () => Column[],
    },
  },
  setup(props) {
    const normalizedColumns = computed(() => {
      if (props.columns) {
        return props.columns.map((c) =>
          typeof c === 'string'
            ? { key: c, label: c }
            : {
                key: c.key,
                label: c.label ?? c.key,
              },
        );
      }
      if (!props.rows.length) {
        return [];
      }
      return Object.keys(props.rows[0]!).map((k) => ({ key: k, label: k }));
    });
    return { normalizedColumns };
  },
});
</script>
