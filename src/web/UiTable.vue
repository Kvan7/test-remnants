<template>
  <table>
    <thead>
      <tr>
        <th v-for="column in normalizedColumns" :key="column.key">
          {{ column.label }}
        </th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
        <td v-for="column in normalizedColumns" :key="column.key">
          {{ row[column.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

type Row = Record<string, number | string | boolean | null | number[]>

type Column =
  | string
  | {
      key: string
      label?: string
    }

export default defineComponent({
  props: {
    rows: {
      type: Array as () => Row[],
      required: true,
    },
    columns: {
      type: Array as () => Column[],
      required: true,
    },
  },
  setup(props) {
    const normalizedColumns = computed(() =>
      props.columns.map((c) =>
        typeof c === 'string'
          ? { key: c, label: c }
          : {
              key: c.key,
              label: c.label ?? c.key,
            },
      ),
    )
    return { normalizedColumns }
  },
})
</script>
