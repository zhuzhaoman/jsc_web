import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Layout from '@/layout'
import chartsRouter from './modules/charts'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/deviceSearch',
    meta: { title: '设备管理', icon: 'device-management' },
    children: [
      {
        path: 'deviceSearch',
        component: () => import('@/views/device/device-info'),
        name: 'deviceSearch',
        meta: { title: '设备信息查询', icon: 'device-search'}
      },
      {
        path: 'domain-message/domainSearch',
        component: () => import('@/views/device/domain-message/domain-search'),
        name: 'domainSearch',
        meta: { title: '域信息查询', icon: 'domain-search', noCache: true }
      }
    ]
  },
  {
    path: '/interface',
    component: Layout,
    redirect: '/interface/flow-message/realTimeFlowSearch',
    meta: { title: '端口管理', icon: 'device-management' },
    children: [
      {
        path: 'flow-message',
        meta: { title: '流量信息查询', icon: 'device-management' },
        component: () => import('@/views/interface/index'),
        redirect: '/interface/flow-message/realTimeFlowSearch',
        children: [
          {
            path: 'realTimeFlowSearch',
            component: () => import('@/views/interface/flow-message/real-time-flow-search'),
            name: 'realTimeFlowSearch',
            meta: { title: '实时流量查询', icon: 'device-search', noCache: true}
          },
          {
            path: 'historyFlowSearch',
            component: () => import('@/views/interface/flow-message/history-flow-search'),
            name: 'historyFlowSearch',
            meta: { title: '历史流量查询', icon: 'domain-search', noCache: true }
          }
        ]
      },
      {
        path: 'port-message/portSearch',
        component: () => import('@/views/interface/port-message/port-search'),
        name: 'portSearch',
        meta: { title: '端口状态查询', icon: 'domain-search', noCache: true }
      }
    ]
  },
  {
    path: '/guide',
    component: Layout,
    redirect: '/guide/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/guide/index'),
        name: 'Guide',
        meta: { title: 'Guide', icon: 'guide', noCache: true }
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  chartsRouter,
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },

    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/clipboard/index'),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
