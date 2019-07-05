import Vue from 'vue'
import Router from 'vue-router'
import login from './views/login.vue'
import index from './views/index.vue'

// import bannerList from 'components/bannerManage/bannerList.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
      // children: [
      //   {
      //     path: '/ht/login',
      //     name: 'login',
      //     // route level code-splitting
      //     // this generates a separate chunk (about.[hash].js) for this route
      //     // which is lazy-loaded when the route is visited.
      //     component: () =>
      //       import(/* webpackChunkName: "about" */ './views/login.vue')
      //   }
      // ]
    },
    {
      path: '/ht/index',
      name: 'index',
      component: index,
      children: [
        {
          path: '/ht/index/banenrList',
          name: 'bannerList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/bannerManage/bannerList.vue'
            )
        },
        {
          path: '/ht/index/addBanner',
          name: 'addBanner',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/bannerManage/addBanner.vue'
            )
        },
        {
          path: '/ht/index/showBannerDetail/:id',
          name: 'showBannerDetail',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/bannerManage/showBannerDetail.vue'
            )
        },
        {
          path: '/ht/index/articleList',
          name: 'articleList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/articleManage/articleList.vue'
            )
        },
        {
          path: '/ht/index/addArticle',
          name: 'addArticle',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/articleManage/addArticle.vue'
            )
        },
        {
          path: '/ht/index/showArticleDetail/:id',
          name: 'showArticleDetail',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/articleManage/showArticleDetail.vue'
            )
        },
        {
          path: '/ht/index/tagList',
          name: 'tagList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/tagManage/tagList.vue'
            )
        },
        {
          path: '/ht/index/addTag',
          name: 'addTag',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/tagManage/addTag.vue'
            )
        },
        {
          path: '/ht/index/columnList',
          name: 'columnList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/columnManage/columnList.vue'
            )
        },
        {
          path: '/ht/index/addColumn',
          name: 'addColumn',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/columnManage/addColumn.vue'
            )
        },
        {
          path: '/ht/index/showColumnDetail/:id',
          name: 'showColumnDetail',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/columnManage/showColumnDetail.vue'
            )
        },
        {
          path: '/ht/index/hobbiesChannelList',
          name: 'hobbiesChannelList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/hobbiesChannelManage/hobbiesChannelList.vue'
            )
        },
        {
          path: '/ht/index/addHobbiesChannel',
          name: 'addHobbiesChannel',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/hobbiesChannelManage/addHobbiesChannel.vue'
            )
        },
        {
          path: '/ht/index/hobbiesArticleList',
          name: 'hobbiesArticleList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/hobbiesArticleManage/hobbiesArticleList.vue'
            )
        },
        {
          path: '/ht/index/hobbiesArticleDetail/:id',
          name: 'hobbiesArticleDetail',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/hobbiesArticleManage/hobbiesArticleDetail.vue'
            )
        },
        {
          path: '/ht/index/userList',
          name: 'userList',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/userManage/userList.vue'
            )
        },
        {
          path: '/ht/index/userDetail/:authorId',
          name: 'userDetail',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/userManage/userDetail.vue'
            )
        },
        {
          path: '/ht/index/editUser/:authorId',
          name: 'editUser',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () =>
            import(
              /* webpackChunkName: "about" */ 'components/userManage/editUser.vue'
            )
        }
      ]
    }
  ]
})
