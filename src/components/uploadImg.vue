<template>
  <div class="my-upload">
    <h3 class="plus">+</h3>
    <input class="ipt" type="file" @change="changeFile" />
    <img v-if="imgUrl" :src="imgUrl" alt="" />
  </div>
</template>

<script>
/*
props:无
Events :
    sendImg() 回调函数的参数就是文件
方法：
    changeImgUrl(url) 修改展示的图片的地址

*/
import path from "path";
import { errorAlert } from "../utils/alert";
export default {
  data() {
    return {
      imgUrl: "",
    };
  },
  methods: {
    //   修改imgUrl
    changeImgUrl(url) {
      this.imgUrl = url;
    },
    //选了文件
    changeFile(e) {
      let file = e.target.files[0];

      // 判断一下文件类型
      let imgArr = [".jpg", ".jpeg", ".png", ".gif", ".svg"];
      // file.name '1.1.1.1.home.png'
      // let extname=file.name.slice(file.name.lastIndexOf("."))
      let extname = path.extname(file.name);
      if (!imgArr.includes(extname)) {
        errorAlert("请上传正确的图片格式");
        return;
      }

      // file.size 983313B 1M=1024KB 1KB=1024B 1B=8b
      if (file.size >= 2 * 1024 * 1024) {
        errorAlert("图片最大2M");
        return;
      }

      // 根据文件生成一个地址，让图片展示
      this.imgUrl = URL.createObjectURL(file);

      //将文件赋值给form.img 给父组件文件
      this.$emit("sendImg", file);
    },
  },
};
</script>

<style scoped lang="less">
@import "../less/index.less";
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
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
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