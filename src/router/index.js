import Vue from 'vue'
import App from '../App.vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import store from '../store/index'
import * as fb from 'firebase'
import Settings from '@/components/Settings'
import UserCoures from '@/components/UserCourses'
import Course from '@/components/Courses'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: async (to, from, next) => {
      // ...
      setTimeout(()=>{
        router.app.$store.dispatch('getAllLessons').then(

          ()=>{
            router.app.$store.dispatch('getTopLessons').then(
              ()=>{
                next()
              }

            )
            
          }
        )


      },1000)
      
    }
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '@/components/Login')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '@/components/Register')
  },
  {
    path: '/recover',
    name: 'recover',
    component: () => import('@/components/Recover')


  },
  {
    path: '/courses/:id',
    name: 'course',
   
    component: () => import('@/components/Course'),
  },
  {
    meta: {
      requiresAuth: true
    },
    path: '/courses/:id/:id',
    name: 'lesson',
    component: () => import('@/components/Lesson'),
    beforeRouteEnter (to, from, next) {
    
      router.app.$store.dispatch()
    }

  },
  {
    meta: {
      requiresAuth: true
    },
        path:'/profile',
        name:'profile',
        component: () => import ('@/components/Profile'),
        children:[
          {
            path:'/profile/settings',
            component: Settings,
            async beforeEnter(to, from, next){
              await  router.app.$store.dispatch('getUserPhoto')  
            await  router.app.$store.dispatch('getUserName')
            await  router.app.$store.dispatch('getUserBirthDay')
              next()
            }
          },
          {
            path:'/profile/courses',
            component: UserCoures,
            async  beforeEnter(to, from, next){
           await  router.app.$store.dispatch('getMyCourses')
              next()
            }
          }
        ]
      
      }
    

  


]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next, store) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
    fb.auth().onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        next();
      } else {
        next({
          name: "home"
        });
        router.app.$store.dispatch('setError', 'You must be loged in to attend a course');
      }

    });
  } else next();
});

export default router