<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表 -->
    <list-vue @willEdit="willEdit" :list="list" @init="init"></list-vue>
    <!-- 弹框 -->
    <form-vue :info="info" :list="list" @init="init" ref="form" ></form-vue>

    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      background
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import listVue from "./components/list.vue";
import formVue from "./components/form.vue";
import { requsercount, requserlist } from "../../http/api";
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
      //总条目数
      total: 0,
      //每页条目数
      size: 2,
      page: 1,
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
      //请求列表
      this.reqList();
      //请求总条目数
      this.reqTotal();
    },
    reqList() {
      requserlist({ page: this.page, size: this.size }).then((res) => {
        if (res.data.code == 200) {
          console.log(this.list);
          var arr = res.data.list ? res.data.list : [];
          //如果请求的数据是null，需要查看是否是第一页
          if (arr.length == 0 && this.page > 1) {
            this.page--;
            this.reqList();       
          }else{
            this.list = arr;
          }

        }
      });
    },
    reqTotal() {
      requsercount().then((res) => {
        this.total = res.data.list[0].total;
      });
    },
    changePage(page) {
      this.page = page;
      this.init();
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
</style>