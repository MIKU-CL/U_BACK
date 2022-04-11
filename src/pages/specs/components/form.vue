<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '规格添加' : '规格编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <div>form:{{ form }}</div>
      <div>arr:{{ arr }}</div>
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in arr"
          :key="index"
        >
          <div class="line">
            <el-input v-model="item.val" autocomplete="off"></el-input>
            <el-button
              type="primary"
              v-if="index == 0"
              @click="arr.push({ val: '' })"
              >新增规格属性</el-button
            >
            <el-button type="danger" v-else @click="arr.splice(index, 1)"
              >删除</el-button
            >
          </div>
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
import { reqspecsadd, reqspecsedit, reqspecsinfo } from "../../../http/api";

import { errorAlert, successAlert } from "../../../utils/alert";
import path from "path";
export default {
  props: ["info"],
  mixins: [formCancel],
  data() {
    return {
      // 5.1 初始化表单数据
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      // 规格属性
      arr: [
        {
          val: "",
        },
        {
          val: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({
      reqList: "specs/reqList",
      reqTotal: "specs/reqTotal",
    }),

    // 清空表单数据
    empty() {
      this.form = {
        specsname: "",
        attrs: "",
        status: 1,
      };
      // 规格属性
      this.arr = [
        {
          val: "",
        },
        {
          val: "",
        },
      ];
    },

    checkData() {
      return new Promise((resolve, reject) => {
        //验证
        if (this.form.specsname === "") {
          errorAlert("规格名称不能为空");
          return;
        }
        if (this.arr.some((item) => item.val == "")) {
          errorAlert("规格属性不能为空");
          return;
        }

        // [ { "val": "2" }, { "val": "2" }, { "val": "3" } ]-->['2','2','3']
        let newArr = Array.from(new Set(this.arr.map((item) => item.val))); //如果新数组比旧数组的长度小，就代表有重复
        if (newArr.length < this.arr.length) {
          errorAlert("规格属性不能重复");
          return;
        }
        resolve();
      });
    },
    // 5.4点了添加
    add() {
      this.checkData().then(() => {
        // arr=[ { "val": "1" }, { "val": "2" }, { "val": "3" } ]-(map)->['1','2','3']-(join(','))->'1,2,3'
        this.form.attrs = this.arr.map((item) => item.val).join(",");

        // 将form发送给后端
        reqspecsadd(this.form).then((res) => {
          if (res.data.code === 200) {
            // ①弹成功
            successAlert(res.data.msg);

            // ②清除表单数据
            this.empty();
            // ③关闭弹框
            this.info.isshow = false;
            // ④刷新列表
            this.reqList();
            // 请求总数
            this.reqTotal();
          }
        });
      });
    },

    // 7.4编辑
    getOne(id) {
      reqspecsinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list[0];
          // form."attrs": [ "白色", "黑色" ]---->[{val:"白色"},{val:"黑色"}]
          this.arr = this.form.attrs.map((item) => ({ val: item }));
        }
      });
    },
    // 8.1修改
    edit() {
      this.checkData().then(() => {
        this.form.attrs = this.arr.map((item) => item.val).join(",");
        // 发修改的请求
        reqspecsedit(this.form).then((res) => {
          if (res.data.code === 200) {
            // ①弹成功
            successAlert(res.data.msg);

            // ②清除表单数据
            this.empty();
            // ③关闭弹框
            this.info.isshow = false;
            // ④刷新列表
            this.reqList();
          }
        });
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