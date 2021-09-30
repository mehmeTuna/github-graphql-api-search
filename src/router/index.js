import { createRouter, createWebHistory } from "vue-router";
import RepositorySearch from "@/views/RepositorySearch.vue";
import RegisterToken from "@/views/RegisterToken";

const routes = [
  {
    path: "/register-token",
    name: "RegisterToken",
    component: RegisterToken,
  },
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

router.beforeEach((to, from, next) => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken && to.name !== "RegisterToken") {
    next({
      name: "RegisterToken",
    });
    return;
  }

  return next();
});
export default router;
