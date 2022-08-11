import router from '@/router'
import store from '@/store'

// 白名单,用户没有任何权限的时候也能访问的页面
const whiteList = ['/login']

/**
 * 路由前置守卫
 * @param {*} to 到哪里去
 * @param {*} from 从哪里来
 * @param {*} next 是否确定要去
 */
router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    // 1.如果用户已登录,则不允许进入login页面
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    // 2.如果用户未登录,只允许进入login页面
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
})
