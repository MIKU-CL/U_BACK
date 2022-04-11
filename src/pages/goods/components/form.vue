<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品编辑'"
      :visible.sync="info.isshow"
      @closed="closed"
      @opened="opened"
      @close="close"
    >
      <div>form:{{ form }}</div>
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="120px">
          <el-select
            v-model="form.first_cateid"
            placeholder="请选择一级分类"
            @change="changeFirtCateId"
          >
            <!-- 11.5遍历一级分类  -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid" placeholder="请选择二级分类">
            <!-- 遍历二级列表 -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <!-- 图片  11.7 封装上传文件的组件   -->
          <upload-img
            v-if="info.isshow"
            @sendImg="form.img = $event"
            ref="upload"
          ></upload-img>
        </el-form-item>
        <div>form:{{ form }}</div>
        <div>规格展示列表arr:{{ arr }}</div>
        <el-form-item label="商品规格" label-width="120px">
          <el-select
            v-model="form.specsid"
            placeholder="请选择商品规格"
            @change="changeSpecsId"
          >
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品属性" label-width="120px">
          <el-select
            v-model="form.specsattr"
            placeholder="请选择商品属性"
            multiple
          >
            <el-option
              v-for="item in arr"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
        <el-form-item label="商品描述" label-width="120px">
          <!-- 编辑器  -->
          <!-- 加上了v-if，此刻，弹框消失的时候，编辑没有了，编辑器里面的内容也没有了 -->
          <div id="editor" v-if="info.isshow"></div>
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
  reqcatelist,
  reqgoodsadd,
  reqgoodsedit,
  reqgoodsinfo,
} from "../../../http/api";
import E from "wangeditor";

import { successAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  mixins: [formCancel],
  data() {
    return {
      // 11.1初始化表单数据
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      },
      // 二级分类展示的列表
      secondCateList: [],
      // 规格属性的展示列表
      arr: [],
    };
  },
  computed: {
    ...mapGetters({
      // 11.2一级分类列表
      cateList: "cate/list",
      // 规格列表
      specsList: "specs/list",
    }),
  },
  mounted() {
    // 11.4 请求一级分类列表
    this.reqCateList();
    // 请求规格列表
    this.reqSpecsList(true);
  },
  methods: {
    ...mapActions({
      // 11.3获取一级分类列表的方法
      reqCateList: "cate/reqList",
      // 11.8 取出仓库的规格列表
      reqSpecsList: "specs/reqList",
      reqList: "goods/reqList", //商品列表
      reqTotal: "goods/reqTotal", //商品总数
    }),

    // 弹框打开结束
    opened() {
      // 创建编辑器
      this.editor = new E("#editor");
      this.editor.create();
      // 给编辑器赋值
      this.editor.txt.html(this.form.description);
    },
    // 添加 弹框准备关闭，将编辑器内容存到form.descrition
    close(){
      if(this.info.isAdd){
        this.form.description=this.editor.txt.html()
      }
    }, 
    //11.6修改了一级分类的id
    changeFirtCateId() {
      // ①清空二级分类的值
      this.form.second_cateid = "";
      //②根据一级分类，获取二级分类的列表
      this.getSecondList();
    },
    // 根据一级分类，获取二级分类的列表
    async getSecondList() {
      let res = await reqcatelist({ pid: this.form.first_cateid });
      if (res.data.code == 200) {
        this.secondCateList = res.data.list;
      }
    },

    // 11.9商品规格发生了改变
    changeSpecsId() {
      // 清空规格属性列表
      this.form.specsattr = [];
      // 根据目前form.specsid 的值，找specsList中哪条数据的id和form.specsid 一样，要这条数据的attrs ,展示到页面
      this.getArr();
    },
    // 计算规格属性列表
    getArr() {
      let obj = this.specsList.find((item) => item.id === this.form.specsid); //{attrs:[]} undefined
      this.arr = obj ? obj.attrs : [];
    },

    // 清空表单数据
    empty() {
      // 11.1初始化表单数据
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
      // 二级分类展示的列表
      this.secondCateList = [];
      // 规格属性的展示列表
      this.arr = [];
      // 修改uplodImg中的imgUrl
      this.$refs.upload.changeImgUrl("");
    },

    checkData() {
      return new Promise((resolve, reject) => {
        //验证

        resolve();
      });
    },
    // 5.4点了添加
    add() {
      this.checkData().then(() => {
        // 由于页面需要specsattr是数组，后端需要他是string,所以需要一个新的变量给后端传值。
        // let data=this.form //如果用=，和没有写一样，因为对象是引用类型 ❌
        // let data = JSON.parse(JSON.stringify(this.form)); //如果使用拷贝，用了JSON.stringify(),specsattr处理ok,但是文件丢失 ❌
        /* let data = { ...this.form }; //可以实现specsattr的转化，也可以拷贝对象
        data.specsattr = this.form.specsattr.join(",");
        */

        // 将form发送给后端
        reqgoodsadd({
          ...this.form,
          specsattr: this.form.specsattr.join(","),
          // 商品描述
          description: this.editor.txt.html(),
        }).then((res) => {
          if (res.data.code === 200) {
            // ①弹成功
            successAlert(res.data.msg);

            // ②清除表单数据
            this.empty();
            // ③关闭弹框
            this.info.isshow = false;
            // // ④刷新列表
            this.reqList();
            // // 请求总数
            this.reqTotal();
          }
        });
      });
    },

    // 7.4编辑
    getOne(id) {
      reqgoodsinfo({ id: id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          // 补id
          this.form.id = id;
          // 根据一级分类id请求二级展示列表
          this.getSecondList();
          // 给图片赋值
          this.$refs.upload.changeImgUrl(this.$pre + this.form.img);
          // 规格属性
          this.form.specsattr = this.form.specsattr.split(",");
          // 计算规格属性列表
          this.getArr();

          /*
          弹框弹出来动画结束（2s），创建editor
          请求数据回来（1s 3s），赋值，此刻editor没有

          请求：
          1s,判断有没有编辑器，没有，不赋值， 创建好编辑器赋值
          3s,创建好编辑器赋值(""), 判断编辑器，有编辑器，赋值("123")
          
          
          */
          // 给编辑器赋值
          if (this.editor) {
            this.editor.txt.html(this.form.description);
          }
        }
      });
    },
    // 8.1修改
    edit() {
      this.checkData().then(() => {
        // 发修改的请求
        reqgoodsedit({
          ...this.form,
          specsattr: this.form.specsattr.join(","),
          // 商品描述
          description: this.editor.txt.html(),
        }).then((res) => {
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