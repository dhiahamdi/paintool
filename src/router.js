import { createRouter, createWebHistory } from "vue-router";
import home from "./components/home.vue";
import frontv from "./components/frontv.vue";
import backv from "./components/backv.vue";

const routes = [
  {path: "/",component: home},
  { path: "/front", component: frontv },
  { path: "/back", component: backv }
];

const router= createRouter({
    history: createWebHistory(),
    routes
})
export default router