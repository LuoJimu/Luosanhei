import Vue from 'vue'
import Router from 'vue-router'
// 导入编写的组件
import AppIndex from '../components/home/AppIndex'
import Login from '../components/Login'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
// import EditBookForm from '../components/library/EditBookForm'

Vue.use(Router)

export default new Router({
  // 前端路由使用 History 模式20210120
  mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          // name: 'EditBookForm',
          // component: EditBookForm,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
    // 20210125注释
    // {
    //   path: '/index',
    //   name: 'AppIndex',
    //   component: AppIndex,
    //   // 区分页面是否需要拦截20210125
    //   meta: {
    //     requireAuth: true
    //   }
    // }
  ]
})

// 复制过来的代码20210701
// import Vue from 'vue'
// import Router from 'vue-router'
// import AppIndex from '../components/home/AppIndex'
// import Login from '../components/Login'
// import Home from '../components/Home'
//
// Vue.use(Router)
//
// export default new Router({
//   mode: 'history',
//   routes: [
//     {
//       path: '/home',
//       name: 'Home',
//       component: Home,
//       // home页面并不需要被访问
//       redirect: '/index',
//       children: [
//         {
//           path: '/index',
//           name: 'AppIndex',
//           component: AppIndex,
//           meta: {
//             requireAuth: true
//           }
//         }
//       ]
//     },
//     {
//       path: '/login',
//       name: 'Login',
//       component: Login
//     }
//   ]
// })
