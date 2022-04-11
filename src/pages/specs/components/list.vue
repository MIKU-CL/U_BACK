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
      <el-table-column prop="id" label="规格编号" sortable> </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable>
      </el-table-column>
      <el-table-column label="规格属性" sortable>
        <template slot-scope="scope">
          <el-tag v-for="item in scope.row.attrs" :key="item">{{
            item
          }}</el-tag>
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

    <!-- 分页 -->
    <el-pagination layout="prev, pager, next" background :total="total" :page-size="size" @current-change="changePage"> </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqspecsdelete } from "../../../http/api";
import { successAlert } from "../../../utils/alert";

export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      total: "specs/total",
      size: "specs/size",
    }),
  },
  mounted() {
    this.reqList();
    this.reqTotal()
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal:"specs/reqTotal",
      changePage:"specs/changePage"
    }),

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
          reqspecsdelete({ id: id }).then((res) => {
            if (res.data.code === 200) {
              //   弹成功
              successAlert(res.data.msg);
              // 重新请求列表
              this.reqList();
              //请总数
              this.reqTotal()
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