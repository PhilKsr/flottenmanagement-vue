<template>
  <DataTable :value="vehicleTypes" responsiveLayout="scroll">
    <Column field="name" header="Fahrzeugtyp"></Column>
    <Column field="vehicle" header="Fahrzeug" v-model="vehicles"> </Column>
  </DataTable>
</template>

<script lang="ts">
import Vue from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { getVehicles, getVehicleTypes } from "@/lib/apiCallHelpers";

export default Vue.extend({
  components: { DataTable, Column },
  data() {
    return {
      vehicleTypes: null,
      vehicles: null,
    };
  },
  async created() {
    const initialTypes = await getVehicleTypes();
    this.vehicleTypes = initialTypes;
    const initialVehicles = await getVehicles();
    this.vehicles = initialVehicles;
  },
});
</script>
