import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import store from '../store/index'
import * as fb from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component:Home,
    beforeEnter: (to, from, next) => {
      // ...
    // store.dispatch('setCat');
     // this.$store.dispatch('setCat');
     
     setTimeout(() => {
      router.app.$store.dispatch('setCat');
     }, 100);
     
     
      console.log('setCat')
      next()
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   component: () => import(/* webpackChunkName: "about" */ '@/components/Login')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
   component: () => import(/* webpackChunkName: "about" */ '@/components/Register')
  },
  {
    path:'/recover',
    name:'recover',
    component:()=> import ('@/components/Recover')
    
    
      },
      {
        path:'/courses/:id',
    name:'course',
    beforeEnter: (to, from, next) => {
      // ...
      setTimeout(() => {
        router.app.$store.dispatch('setCourse',router.app.$route.path.replace('/courses/',''))
      }, 20);
      
      next()

    },
    component:()=> import ('@/components/Course')
      },
      {
        meta: { requiresAuth: true },
        path:'/courses/:id/:id',
    name:'lesson',
    beforeEnter (to, from, next) {
      // ...
      let course=router.app.$route.path.split('/')[2];
      console.log("Course Name",course)
      let lesson =router.app.$route.path.split('/')[3]
      console.log('Lesson Name',lesson)
      setTimeout(() => {
        router.app.$store.dispatch('setLessons',{course,lesson})
      router.app.$store.dispatch('getCurrentLesson',course) 
      }, 5000);
     
      next()

    },
    component:()=> import ('@/components/Lesson')

      }


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next,store) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    fb.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        next();
      } else {
        next({ name: "home" });
        router.app.$store.dispatch('setError','You must be loged in to attend a course');
      }
      
    });
  } else next();
});

export default router
