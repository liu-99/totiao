import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // @别名 代表src绝对路径
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/home',
    name: 'home',
    component: () => import('@/views/home'),
    redirect: '/welcome',
    children: [
      { path: '/welcome', name: 'welcome', component: () => import('@/views/welcome') }
    ]
  }
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  var userinfo =
    window.sessionStorage.getItem('userinfo')
  if (!userinfo && to.path !== '/login') {
    return next('/login')
  }
  next()
})

export default router
