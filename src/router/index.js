import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import store from '../store'

export let IndexRoutes = [
  {
    path: "menu",
    component: () => import("../pages/menu/menu.vue"),
    meta: {
      title: "菜单管理"
    },

  },
  {
    path: "role",
    component: () => import("../pages/role/role.vue"),
    meta: {
      title: "角色管理"
    }
  },
  {
    path: "manage",
    component: () => import("../pages/manage/manage.vue"),
    meta: {
      title: "管理员管理"
    }
  },
  {
    path: "cate",
    component: () => import("../pages/cate/cate.vue"),
    meta: {
      title: "商品分类"
    }
  },
  {
    path: "specs",
    component: () => import("../pages/specs/specs.vue"),
    meta: {
      title: "商品规格"
    }
  },
  {
    path: "goods",
    component: () => import("../pages/goods/goods.vue"),
    meta: {
      title: "商品管理"
    }
  },
  {
    path: "vip",
    component: () => import("../pages/vip/vip.vue"),
    meta: {
      title: "会员管理"
    }
  },
  {
    path: "banner",
    component: () => import("../pages/banner/banner.vue"),
    meta: {
      title: "轮播图管理"
    }
  },
  {
    path: "seckill",
    component: () => import("../pages/seckill/seckill.vue"),
    meta: {
      title: "秒杀活动"
    }
  },
]

IndexRoutes.forEach(item => {
  //路由独享守卫
  item.beforeEnter = (to, from, next) => {
    let menus_url = store.getters.userInfo.menus_url;
    if (menus_url.includes("/" + item.path)) {
      next();
    } else {
      next("/");
    }
  }

});


const routes = [
  {
    path: "/login",
    component: () => import("../pages/login/login.vue")
  },
  {
    path: "/",
    component: () => import("../pages/index/index.vue"),
    // 配置二级路由规则 
    children: [
      {
        path: "",
        component: () => import("../pages/home/home.vue")
      },
      ...IndexRoutes
    ]
  },
]

const router = new VueRouter({
  routes
})

//登录拦截
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next()
    return
  }
  if (store.getters.userInfo.token) {
    next()
  } else {
    next("/login")
  }


})

export default router
