0 <template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px; margin-top: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="角色编号" sortable> </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable></el-table-column>
      
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
import { reqroledelete } from '../../../http/api';
import { successAlert } from '../../../utils/alert';
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
    willEdit(id) {
      this.$emit("willEdit",id);
    },
    //删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        reqroledelete({ id:id }).then((res) => {
          if (res.data.code == 200) {
            successAlert(res.data.msg);
            this.$emit("init");
          }
        });
      })
      .catch(() => {
        
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>