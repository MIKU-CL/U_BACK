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
      <el-table-column prop="id" label="商品编号" sortable> </el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        sortable
      ></el-table-column>
      <el-table-column prop="price" label="商品价格" sortable></el-table-column>
      <el-table-column
        prop="market_price"
        label="市场价格"
        sortable
      ></el-table-column>
      <el-table-column label="图片" sortable>
        <template slot-scope="scope">
          <img :src="$pre + scope.row.img" alt="" />
        </template>
      </el-table-column>
      <el-table-column label="是否新品" sortable>
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.isnew == 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
        </template>
      </el-table-column>
      <el-table-column label="是否热卖" sortable>
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.ishot == 1">是</el-button>
          <el-button type="info" v-else>否</el-button>
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
      <el-table-column prop="name" label="操作" sortable width="180">
        <template slot-scope="scope">
          <el-button type="primary" @click="willEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size="size"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqgoodsdelete, reqspecsdelete } from "../../../http/api";
import { successAlert } from "../../../utils/alert";

export default {
  props: [],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
    }),
  },
  mounted() {
    this.reqList();
    this.reqTotal();
  },
  methods: {
    ...mapActions({
      reqList: "goods/reqList",
      reqTotal: "goods/reqTotal",
      changePage: "goods/changePage",
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
          reqgoodsdelete({ id: id }).then((res) => {
            if (res.data.code === 200) {
              //   弹成功
              successAlert(res.data.msg);
              // 重新请求列表
              this.reqList();
              //请总数
              this.reqTotal();
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