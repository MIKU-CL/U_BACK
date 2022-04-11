<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '会员添加' : '会员编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <div>form:{{ form }}</div>
      <el-form :model="form">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
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
        <el-button type="primary"  @click="edit">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {

  reqmemberedit,
  reqmemberinfo,
  reqmemberlist,
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
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
    }),
  },
  mounted() {
    //获取角色的数据
    reqmemberlist().then((res) => {
      if (res.data.code == 200) {
        this.roleList = res.data.list ? res.data.list : [];
      }
    });
  },
  methods: {
    ...mapActions({
    }),

    //清空表单
    empty() {
      this.form = {
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      };

    },
    
    getOne(id) {
      reqmemberinfo({ uid: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.password = "";
          
        }
      });
    },

    edit() {
      reqmemberedit(this.form).then((res) => {
        console.log(this.form);
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
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
</style>