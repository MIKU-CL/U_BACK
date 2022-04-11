<template>
  <div class="login">
    <div class="con">
      <h3 class="text-center">登录</h3>
      <el-input v-model="form.username" clearable placeholder="请输入账号"></el-input>
      <el-input
        v-model="form.password"
        clearable
        placeholder="请输入密码"
        show-password
      ></el-input>
      <div class="text-center">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { requserlogin } from '../../http/api';
import { successAlert } from '../../utils/alert';
export default {
  props: [],
  data() {
    return {
      form:{
        username:"",
        password:"",
      }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {
    
  },
  methods: {
    ...mapActions({
      changeUserInfo:"changeUserInfo"
    }),

    login(){
      requserlogin(this.form).then(res=>{
        if(res.data.code==200){
          this.changeUserInfo(res.data.list);
          //弹成功
          successAlert(res.data.msg)
          //跳转页面
          this.$router.push("/");
          
        }
      })
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";

.login {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, @light, @primary);
  .con {
    width: 350px;
    background: #fff;
    padding: @padding;
    border-radius: @padding;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    h3{
      margin: @margin 0;
    }
  }
  .el-input {
    margin-bottom: @margin;
  }
}
</style>