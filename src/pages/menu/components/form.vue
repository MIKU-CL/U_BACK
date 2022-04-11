<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <div>form:{{ form }}</div>
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select
            v-model="form.pid"
            placeholder="请选择上级菜单"
            @change="changePid"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" disabled :label="1">目录</el-radio>
          <el-radio v-model="form.type" disabled :label="2">菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          label-width="120px"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择菜单图标">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择菜单地址">
            <el-option
              v-for="item in IndexRoutes"
              :key="item.path"
              :label="item.meta.title"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
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
import { reqmenuadd, reqmenuedit, reqmenuinfo } from "../../../http/api";
import { formCancel } from "../../../mixins/mixins";
import { IndexRoutes } from "../../../router/index";
import { successAlert } from "../../../utils/alert";
export default {
  props: ["info", "list"],
  mixins: [formCancel],
  data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
      icons: [
        "el-icon-setting",
        "el-icon-s-goods",
        "el-icon-help",
        "el-icon-upload",
        "el-icon-camera-solid",
      ],
      IndexRoutes,
    };
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
  methods: {
    ...mapActions({}),

    //清空表单
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    // 添加
    add() {
      reqmenuadd(this.form).then((res) => {
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
    changePid() {
      //如果上级菜单是顶级菜单，则菜单类型为目录
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    getOne(id) {
      reqmenuinfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
        }
      });
    },
    edit() {
      reqmenuedit(this.form).then((res) => {
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