import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import NotFound from "./views/NotFound.vue";

import Mappedstd from "@/views/Mappedstd.vue";
import Video from "@/views/Video.vue"
/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  { path: "/", component: Home, meta: { title: "Home" } },

  {
    meta: {
      title: "Login",
      formScreen: true,
    },
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    component: Video,
    path: "/video",
    meta: {
      title:"video encryp"
    }
  },

  { path: "/:path(.*)", component: NotFound },
];
