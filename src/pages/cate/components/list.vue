<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px; margin-top: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="分类编号" sortable> </el-table-column>
      <el-table-column prop="catename" label="分类名称"></el-table-column>
      <el-table-column label="图片" sortable>
        <template slot-scope="scope">
          <img :src="$pre + scope.row.img" alt="" />
        </template>
      </el-table-column>

      <el-table-column label="状态" sortable>
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="操作" sortable>
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
import { reqcatedelete } from "../../../http/api";
import { successAlert } from "../../../utils/alert";
export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  mounted() {
    this.reqList();
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),

    willEdit(id) {
      this.$emit("willEdit", id);
    },
    //删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqcatedelete({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert(res.data.msg);
              this.reqList();
            }
          });
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
img {
  width: 60px;
  height: 60px;
}
</style>