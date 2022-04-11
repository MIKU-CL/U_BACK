0 <template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px; margin-top: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="用户编号" sortable> </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable></el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        sortable
      ></el-table-column>

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
          <el-button type="primary" @click="willEdit(scope.row.uid)"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import { requserdelete } from "../../../http/api";
// import { successAlert } from "../../../utils/alert";
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
      this.$emit("willEdit", id);
    },
    
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>