import Vue from "vue";
// import VueRouter from 'vue-router'
import Router from "vue-router";
import firebase from "firebase/app";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "home" */ "../components/Login.vue"),
    },
    {
      path: "/selector",
      name: "Selector",
      component: () => import("../components/Selector.vue"),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/selectorDetail/:id",
      name: "selectorDetail",
      props: true,
      component: () => import("../components/selectorDetails.vue"),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: '/indicators',
      name: 'indicators',
      component: () => import('../components/Indicators.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: "/processes",
      name: "processes",
      component: () => import("../components/Processes.vue"),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/processDetails/:igc",
      name: "processDetails",
      props: true,
      component: () => import("../components/ProcessDetails.vue"),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/applicantDetails/:id",
      name: "applicantDetails",
      props: true,
      component: () => import("../components/ApplicantsDetails.vue"),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: '/user',
      name: 'user',
      component: () => import('../components/userRegister.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: "/secondCall",
      name: "secondCall",
      component: () => import("../components/CallUser.vue"),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: "/analitica",
      name: "Analitica",
      component: () => import("../components/Analitica.vue"),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next("/");
        } else {
          next();
        }
      }, 
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('../components/Management.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: () => import('../components/AccountService.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/referrals',
      name: 'referrals',
      component: () => import('../components/ReferralsAdmin.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: "/referralsDetails/:data",
      name: "referralsDetails",
      props: true,
      component: () => import("../components/ReferralsDetails.vue"),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next("/");
        } else {
          next();
        }
      },
    },
    {
      path: '/reports',
      name: 'reports',
      component: () => import('../components/Reports.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('../components/Home.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
    {
      path: '/assistance',
      name: 'assistance',
      component: () => import('../components/AssistanceAdmin.vue'),
      meta: { reqAuth: true },
      beforeEnter: (to, from, next) => {
        if (!firebase.auth().currentUser) {
          next('/')
        } else {
          next()
        }
      },
    },
  ],
});
// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// })

// export default router
