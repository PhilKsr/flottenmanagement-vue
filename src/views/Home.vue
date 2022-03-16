<template>
  <DataTable :value="vehicleTypes" responsiveLayout="scroll">
    <Column field="name" header="Fahrzeugtyp"></Column>
    <Column field="vehicle" header="Fahrzeug"></Column>
  </DataTable>
</template>

<script lang="ts">
import Vue from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { getVehicleTypes } from "@/lib/apiCallHelpers";

export default Vue.extend({
  components: { DataTable, Column },
  data() {
    return {
      vehicleTypes: null,
    };
  },
  async created() {
    const initialTypes = await getVehicleTypes();
    this.vehicleTypes = initialTypes;
  },
});
</script>
