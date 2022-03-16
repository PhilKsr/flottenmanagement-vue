<template>
  <div id="app">
    <div>
      <TabMenu :model="items" />
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import TabMenu from "primevue/tabmenu";

export default Vue.extend({
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
});
</script>

<style></style>
