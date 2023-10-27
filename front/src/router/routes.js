const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageAccueil.vue") }],
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageLogin.vue") }],
  },
  {
    path: "/register",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageRegister.vue") }],
  },
  {
    path: "/admin",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageAdmin.vue") }],
  },
  {
    path: "/contact",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageWho.vue") }],
  },
  {
    path: "/categories/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageCategorie.vue") },
    ],
  },
  {
    path: "/categories/:id/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageCategoriesUnit.vue") },
    ],
  },
  {
    path: "/create",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageCreate.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
