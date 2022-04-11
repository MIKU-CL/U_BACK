<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表 -->
    <list-vue @willEdit="willEdit" :list="list" @init="init"></list-vue>
    <!-- 弹框 -->
    <form-vue :info="info" :list="list" @init="init" ref="form"></form-vue>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import listVue from "./components/list.vue";
import formVue from "./components/form.vue";
import { reqbannerlist } from "../../http/api";
import { toggle } from "../../mixins/mixins";
export default {
  components: {
    listVue,
    formVue,
  },
  props: [],
  mixins: [toggle],
  data() {
    return {
      list: [],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    //发请求
    this.init();
  },
  methods: {
    ...mapActions({}),
    //重新渲染
    init() {
      reqbannerlist().then((res) => {
        if (res.data.code == 200) {
          console.log(this.list);
          this.list = res.data.list ? res.data.list : [];
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
</style>