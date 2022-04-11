<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '分类添加' : '分类编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
    >
      <div>form:{{ form }}</div>
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择菜单地址">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="图片" label-width="120px">
          <!-- 上传文件 -->
          <div class="my-upload">
            <h3 class="plus">+</h3>
            <input
              v-if="info.isshow"
              class="ipt"
              type="file"
              @change="changeFile"
            />
            <img v-if="imgUrl" :src="imgUrl" alt="" />
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
import { reqcateadd, reqcateedit, reqcateinfo } from "../../../http/api";
import { formCancel } from "../../../mixins/mixins";
import { errorAlert, successAlert } from "../../../utils/alert";
import path from "path";

export default {
  props: ["info"],
  mixins: [formCancel],
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  mounted() {},
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),

    //上传文件
    changeFile(e) {
      let file = e.target.files[0];

      let imgArr = [".png", ".jpeg", ".gif", ".jpg", ".svg"];
      let extname = path.extname(file.name);

      if (!imgArr.includes(extname)) {
        errorAlert("请上传正确的图片格式文件");
        return;
      }
      if (file.size >= 2 * 1024 * 1024) {
        errorAlert("图片最大2M");
        return;
      }
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //清空表单
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    // 添加
    add() {
      //发请求
      reqcateadd(this.form).then((res) => {
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
    },
    // 编辑
    getOne(id) {
      reqcateinfo({ id: id }).then((res) => {
        if (res.data.code === 200) {
          this.form = res.data.list;
          this.form.id = id;
          // 给图片赋值
          this.imgUrl = this.$pre+this.form.img;
        }
      });
    },
    //修改
    edit() {
      reqcateedit(this.form).then((res) => {
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
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../../less/index.less";
.my-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed @primary;
  border-radius: @margin;
  position: relative;
  overflow: hidden;
  .plus {
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 100px;
    color: @primary;
  }
  .ipt {
    width: 100%;
    height: 100%;
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    z-index: 2;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>