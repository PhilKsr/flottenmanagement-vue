<template>
  <DataTable :value="vehicleTypes" responsiveLayout="scroll">
    <Column field="fahrzeugtyp" header="Fahrzeugtyp"></Column>
    <Column field="fahrzeuge" header="Fahrzeug"></Column>
  </DataTable>
</template>

<script lang="ts">
import Vue from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { getVehicles, getVehicleTypes } from "@/lib/apiCallHelpers";
import VehicleType from "@/types/VehicleType";
import Vehicle from "@/types/Vehicle";

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
    const initialVehicles = await getVehicles();
    const typesWithVehicles = initialTypes.map((type: VehicleType) => {
      const matchingVehicles = initialVehicles
        .filter((vehicle: Vehicle) => vehicle.fahrzeugtyp.id === type.id)
        .map((vehicle: Vehicle) => vehicle.name);
      return { fahrzeugtyp: type.name, fahrzeuge: matchingVehicles.join(", ") };
    });
    this.vehicleTypes = typesWithVehicles;
  },
});
</script>
