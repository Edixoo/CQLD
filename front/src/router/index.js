import { route } from 'quasar/wrappers'
import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import * as jwtDecode from 'jwt-decode';
// import { is } from 'quasar';


/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE)
  });

  Router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('userToken') !== null;
    console.log(isAuthenticated);
    const token = localStorage.getItem('userToken');
    let userRole = null;

    if (token) {
      const decodedToken = jwtDecode.jwtDecode(token);
      userRole = decodedToken.role;
      if (userRole)console.log(userRole + " userName : " + decodedToken.username);
    }

    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!isAuthenticated) {
        console.log(1);
        next({ path: '/login' });
      } else if (to.meta.role && userRole !== to.meta.role) {
        console.log(2);
        next({ path: '/' });
      } else {
    
        console.log(3);
        
        next();
      }
    } else {
      console.log(4);
     
      next();
    }
  });

  return Router
})
