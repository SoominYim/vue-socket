import { createWebHistory, createRouter } from "vue-router";
import SignUp from "./view/SignUp";
const routes = [
  {
    path: "/",
    name: "home",
  },
  {
    path: "/join",
    name: "SignUp",
    component: SignUp,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
