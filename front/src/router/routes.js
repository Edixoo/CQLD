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
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: "/contact",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageWho.vue") }],
  },
   {
    path: "/contacteznous",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageContact.vue") }],
    meta: { requiresAuth: true, role: 'admin' }
  },
  {
    path: "/personnaldata",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PagePersonnalData.vue") }],
  },
  {
    path: "/legalnotice",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageLegalNotice.vue") }],
  },
  {
    path: "/categories/:name",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageCategorie.vue") },
    ],
  },
  {
    path: "/liens/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/PageLien.vue") },
    ],
  },
  {
    path: "/create",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageCreate.vue") }],
    meta: { requiresAuth: true, role: 'user' }
  },
  {
    path: "/edit/:id",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/PageEdit.vue") }],
    meta: { requiresAuth: true, role: 'user' }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
