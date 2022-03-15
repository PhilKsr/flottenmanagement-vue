<template>
  <DataTable :value="vehicleTypes" responsiveLayout="scroll">
    <Column field="name" header="Fahrzeugtyp"></Column>
    <Column field="vehicle" header="Fahrzeug"></Column>
  </DataTable>
</template>

<script lang="ts">
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { getVehicleTypes } from "@/lib/apiCallHelpers";
import Vue from "vue";

export default Vue.extend({
  components: { DataTable, Column },
  data() {
    return {
      vehicleTypes: null,
    };
  },
  async created() {
    const initialTypes = await getVehicleTypes();
    console.log(initialTypes);
    this.vehicleTypes = initialTypes;
  },
});
</script>
