<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '管理员添加' : '管理员编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <div>form:{{ form }}</div>
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择菜单地址">
            <el-option 
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
            
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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

  reqrolelist,
  requseradd,
  requseredit,
  requserinfo,
} from "../../../http/api";
import { formCancel } from "../../../mixins/mixins";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  mixins: [formCancel],
  data() {
    return {
      roleList:[],
      form: {
        roleid: "",
        username: "",
        password: "",
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
    reqrolelist().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list ? res.data.list : [];
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
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };

    },
    // 添加
    add() {
      //发请求
      requseradd(this.form).then((res) => {
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
      requserinfo({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.password = "";
          
        }
      });
    },
    edit() {
      
      requseredit(this.form).then((res) => {
        if (res.data.code === 200) {
          // ①弹成功
          successAlert(res.data.msg);

          //修改的是当前用户数据，退出登录
          if (this.form.uid == this.userInfo.uid) {
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