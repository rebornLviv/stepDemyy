import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home'
import Settings from '@/components/Settings'
import UserCoures from '@/components/UserCourses'
import firebase from 'firebase'
import { homeResolver } from '../../resolvers/homeResolver'
import profileResolver from '../../resolvers/profileResolver'
import { lessonResolver} from '../../resolvers/lessonResolver'
import teacherResolver from '../../resolvers/teacherResolver'
import topLessonsResolver from '../../resolvers/topLessonsResolver'
import { courseResolver } from '../../resolvers/courseResolver'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: homeResolver
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
     beforeEnter:courseResolver,
    component: () => import('@/components/Course'),
  },
  {
    meta: {
      requiresAuth: true
    },
    path: '/courses/:cid/:lid',
    name: 'lesson',
    beforeEnter:lessonResolver,
    component: () => import('@/components/Lesson'),
   
  },
  {
    meta: {
      requiresAuth: true
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/components/Profile'),
    children: [{
        path: '/profile/settings',
        component: Settings,
        beforeEnter:profileResolver
      },
      {
        path: '/profile/courses',
        component: UserCoures,
        beforeEnter: profileResolver
      }
    ]
  },
  {
    path: '/teachers',
    name: 'teachers',
    beforeEnter:teacherResolver,
    component: () => import('@/components/Teachers')
  },
  {
    path: '/lessons',
    name: 'lessons',
    beforeEnter:topLessonsResolver,
    component: () => import('@/components/Lessons')
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next, store) => {
  if (to.matched.some(rec => rec.meta.requiresAuth)) {
   firebase.auth().onAuthStateChanged(user => {
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