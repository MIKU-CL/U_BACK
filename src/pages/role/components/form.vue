<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '角色添加' : '角色编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <div>form:{{ form }}</div>
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            ref="tree"
            :data="menuList"
            show-checkbox
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="add"
          >添 加</el-button
        >
        <el-button type="primary" v-else @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqmenulist,
  reqroleadd,
  reqroleedit,
  reqroleinfo,
} from "../../../http/api";
import { formCancel } from "../../../mixins/mixins";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  mixins: [formCancel],
  data() {
    return {
      //角色列表
      menuList: [],

      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      userInfo: "userInfo",
    }),
  },
  mounted() {
    //获取角色的数据
    reqmenulist({ istree: true }).then((res) => {
      if (res.data.code == 200) {
        this.menuList = res.data.list ? res.data.list : [];
      }
    });
  },
  methods: {
    ...mapActions({
      changeUserInfo: "changeUserInfo",
    }),

    //清空表单
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    // 添加
    add() {
      //将树上的数据赋值给form.menus
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      //发请求
      reqroleadd(this.form).then((res) => {
        if (res.data.code === 200) {
          // ①弹成功
          successAlert(res.data.msg);     

          // ②清除表单数据
          this.empty();
          // ③关闭弹框
          this.info.isshow = false;
          // ④刷新列表
          this.$emit("init");
        }
      });
    },
    getOne(id) {
      reqroleinfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
          //给树赋值
          this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
        }
      });
    },
    edit() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqroleedit(this.form).then((res) => {
        if (res.data.code === 200) {
          // ①弹成功
          successAlert(res.data.msg);

          if (this.form.id == this.userInfo.roleid) {
            this.changeUserInfo({})
            this.$router.push("/login");
            return;
          }
          // ②清除表单数据
          this.empty();
          // ③关闭弹框
          this.info.isshow = false;
          // ④刷新列表
          this.$emit("init");
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>