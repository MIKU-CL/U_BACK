<template>
  <div>
    <el-container class="page">
      <el-aside width="200px">
        <!-- 侧边栏 -->
        <el-menu
          unique-opened
          default-active="1-1"
          class="el-menu-vertical-demo"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <div v-for="item in userInfo.menus" :key="item.id">
            <el-submenu v-if="item.children" :index="item.id + ''">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item
                  v-for="i in item.children"
                  :key="i.id"
                  :index="i.url"
                  >{{ i.title }}</el-menu-item
                >
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item v-else :index="item.url">
              <i class="el-icon-s-finance"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div>
            <span>{{ userInfo.username }}</span>
            <el-button @click="logout">退出登录</el-button>
          </div>
        </el-header>
        <el-main>
          <el-breadcrumb
            separator-class="el-icon-arrow-right"
            v-if="$route.meta.title"
          >
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
          <router-view class="second-con"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },

  mounted() {},
  methods: {
    ...mapActions({
      changeUserInfo: "changeUserInfo",
    }),
    //退出登录
    logout() {
      this.changeUserInfo({});
      this.$router.push("/login");
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.el-aside {
  background: @primary;
}
.el-header {
  background-color: @header-color;
  span {
    color: #fff;
    line-height: 44px;
    margin-right: @margin;
  }
}
.page {
  height: 100vh;
}
/deep/.el-menu,
/deep/.el-submenu,
/deep/.el-menu-item:focus,
/deep/.el-menu-item:hover,
/deep/.el-submenu__title:focus,
/deep/ .el-submenu__title:hover {
  background: @primary;
}
.second-con {
  padding-top: @padding;
}
</style>