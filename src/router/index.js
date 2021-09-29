import { createRouter, createWebHistory } from "vue-router";
import RepositorySearch from "../views/RepositorySearch.vue";

const routes = [
  {
    path: "/",
    name: "RepositorySearch",
    component: RepositorySearch,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
