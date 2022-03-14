import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import Vehicles from "../views/Vehicles.vue";
import VehicleTypes from "../views/VehicleTypes.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/vehicles",
    name: "vehicles",
    component: Vehicles,
  },
  {
    path: "/vehicle-types",
    name: "vehicle-types",
    component: VehicleTypes,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
