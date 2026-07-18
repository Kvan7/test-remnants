<template>
  <div class="max-h-[40vh] overflow-auto border border-secondary-800">
    <table class="w-full border-collapse text-left text-sm">
      <thead class="z-2 sticky top-0 bg-primary-800">
        <tr class="border-b border-secondary-500 text-accent-200">
          <th
            v-for="column in normalizedColumns"
            :key="column.key"
            class="cursor-pointer whitespace-nowrap px-2 py-1 font-bold"
            :class="{
              'flex flex-row justify-between': sortColumn === column.key,
            }"
            @click="chooseSort(column.key)"
          >
            <div>{{ column.label }}</div>
            <div v-if="sortColumn === column.key" class="font-extrabold text-accent-950">
              <span v-if="sortOrder === 'asc'">^</span>
              <span v-if="sortOrder === 'desc'">v</span>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, rowIndex) in sortedRows"
          :key="rowIndex"
          class="odd:bg-background-lighter whitespace-nowrap border-b border-secondary-500 last:border-b-0 even:bg-background hover:bg-primary-900"
          @dblclick="$emit('row-dblclick', row._index !== undefined ? row._index : rowIndex)"
          :class="{
            '!bg-accent-900': (row._index !== undefined ? row._index : rowIndex) === selectedIndex,
          }"
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
import { computed, defineComponent, shallowRef } from 'vue';

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
    selectedIndex: {
      type: Object as () => number | null,
      default: null,
    },
    defaultSortColumn: {
      type: String as () => string | null,
      default: null,
    },
    defaultSortOrder: {
      type: String as () => 'asc' | 'desc' | null,
      default: null,
    },
  },
  emits: ['row-dblclick'],
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

    const sortOrder = shallowRef<null | 'asc' | 'desc'>(props.defaultSortOrder);
    const sortColumn = shallowRef<null | string>(props.defaultSortColumn);
    const sortedRows = computed(() => {
      if (!sortColumn.value || !sortOrder.value) {
        return props.rows;
      }
      const column = normalizedColumns.value.find((c) => c.key === sortColumn.value)!;
      return props.rows.toSorted((a, b) => {
        const aVal = a[column.key];
        const bVal = b[column.key];
        if (aVal === bVal) {
          return 0;
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          if (aVal < bVal) {
            return sortOrder.value === 'asc' ? -1 : 1;
          }
          return sortOrder.value === 'asc' ? 1 : -1;
        }
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          if (aVal < bVal) {
            return sortOrder.value === 'asc' ? -1 : 1;
          }
          return sortOrder.value === 'asc' ? 1 : -1;
        }
        return sortOrder.value === 'asc' ? 1 : -1;
      });
    });

    return {
      normalizedColumns,
      sortedRows,
      sortColumn,
      sortOrder,
      chooseSort(column: string) {
        sortColumn.value = column;
        if (sortOrder.value === 'asc') {
          sortOrder.value = 'desc';
        } else if (sortOrder.value === 'desc') {
          sortOrder.value = null;
        } else {
          sortOrder.value = 'asc';
        }
      },
    };
  },
});
</script>
