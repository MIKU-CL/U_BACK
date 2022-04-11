<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="willAdd">添加</el-button>

    <!-- 列表 -->
    <list-vue @willEdit="willEdit" ></list-vue>

    <!-- 弹框 -->
    <!-- 2.3 父传子 传递info  -->
    <form-vue :info="info"  ref="form"></form-vue>

    
  </div>
</template>
<script>
import listVue from "./components/list.vue";
import formVue from "./components/form.vue";
import {toggle} from "../../mixins/mixins"
export default {
  components: {
    listVue,
    formVue,
  },
  mixins:[toggle], 
  
};
</script>
<style scoped lang="less">
@import "../../less/index.less";
</style>