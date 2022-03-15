<template>
  <div id="app">
    <TabMenu :model="items" :exact="false" />
    <h1 class="text-8xl">FUCK</h1>
    <router-view />
  </div>
</template>

<script lang="ts">
import TabMenu from "primevue/tabmenu";

export default {
  name: "app",
  components: { TabMenu },
  data() {
    return {
      items: [
        { label: "Home", to: "/" },
        {
          label: "Vehicles",
          to: "/vehicles",
        },
        {
          label: "Vehicletypes",
          to: "/vehicle-types",
        },
      ],
    };
  },
};
</script>

<style></style>
