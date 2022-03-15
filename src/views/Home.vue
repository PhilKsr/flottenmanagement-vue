<template>
  <h1></h1>
</template>

<script lang="ts">
import { getVehicles } from "@/lib/apiCallHelpers";
export default {
  data() {
    return {
      columns: null,
      cars: null,
    };
  },
  async created() {
    const vehicles = await getVehicles();
    console.log(vehicles);
  },
};
</script>
