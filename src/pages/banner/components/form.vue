<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '轮播图添加' : '轮播图编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <div>form:{{ form }}</div>
      <el-form :model="form">
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <!-- 图片  11.7 封装上传文件的组件   -->
          <upload-img
            v-if="info.isshow"
            @sendImg="form.img = $event"
            ref="upload"
          ></upload-img>
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
import { formCancel } from "../../../mixins/mixins";
import {
  reqbanneradd,
  reqbanneredit,
  reqbannerinfo,
} from "../../../http/api";
import { successAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  mixins: [formCancel],
  data() {
    return {
      // 11.1初始化表单数据
      form: {
        title: "",
        img: null,
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),

    // 清空表单数据
    empty() {
      // 11.1初始化表单数据
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },

    // 5.4点了添加
    add() {
      //发请求
      reqbanneradd(this.form).then((res) => {
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

    // 7.4编辑
    // 编辑
    getOne(id) {
      reqbannerinfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
          // 给图片赋值
          this.imgUrl = this.$pre + this.form.img;
        }
      });
    },
    //修改
    edit() {
      reqbanneredit(this.form).then((res) => {
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
<style scoped lang="less">
@import "../../../less/index.less";
.line {
  display: flex;
  .el-input {
    flex: 1;
  }
}
</style>