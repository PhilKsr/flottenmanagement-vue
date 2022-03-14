<template>
  <DataTable :value="products" responsiveLayout="scroll">
    <Column
      v-for="col of columns"
      :field="col.field"
      :header="col.header"
      :key="col.field"
    ></Column>
  </DataTable>
</template>

<script lang="ts">
export default {
  data() {
    return {
      columns: null,
      cars: null,
    };
  },
};
</script>
