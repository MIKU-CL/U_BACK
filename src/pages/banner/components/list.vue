<template>
  <div>
    <!-- 
          data 表格数据
          default-expand-all 默认展开所有
          :tree-props="{children:"用哪个字段来判断数据是否有下一级"}"
       -->
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px; margin-top: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="轮播图编号" sortable> </el-table-column>
      <el-table-column prop="title" label="轮播图标题"></el-table-column>

      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$pre + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqbannerdelete } from "../../../http/api";
import { successAlert } from "../../../utils/alert";

export default {
  props: ["list"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),

    // 2.5点了编辑
    willEdit(id) {
      this.$emit("willEdit", id);
    },
    // 6.1删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点了确定的逻辑
          reqbannerdelete({ id: id }).then((res) => {
            if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.$emit("init");
          }
          });
        })
        .catch(() => {
          //点了取消的逻辑
        });
    },
  },
};
</script>
<style scoped lang="less">
@import "../../../less/index.less";
img {
  width: 60px;
  height: 60px;
}
</style>