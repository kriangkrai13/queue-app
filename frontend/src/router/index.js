import { createRouter, createWebHistory } from "vue-router";
import QueueDisplay from "../views/QueueDisplay.vue";
import QueueCustomer from "../views/QueueCustomer.vue";
import QueueCaller from "../views/QueueCaller.vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/display", component: QueueDisplay },
  { path: "/customer", component: QueueCustomer },
  { path: "/call", component: QueueCaller },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
