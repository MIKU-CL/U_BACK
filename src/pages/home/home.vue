<template>
  <div class="home">
    <!-- 折线图 -->
    <div id="line"></div>
    <!-- 柱形图 -->
    <div id="bar"></div>
    <!-- 饼状图 -->
    <div id="pie"></div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
//引入 ECharts
import * as echarts from "echarts";
// 基于准备好的dom，初始化echarts实例

export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  mounted() {
    this.reqList();
  },
  watch: {
    list: {
      handler() {
        this.doLine();
        this.doBar();
        this.doPie();
      },
      deep: true,
    },
  },
  methods: {
    ...mapActions({
      reqList: "cate/reqList",
    }),
    //折线图
    doLine() {
      var myChart = echarts.init(document.getElementById("line"));
      let lineOptions = {
        title: {
          text: "分类—子类数量",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["子类数量"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.list.map((item) => item.catename),
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "子类数量",
            type: "line",
            stack: "Total",
            data: this.list.map((item) =>
              item.children ? item.children.length : 0
            ),
          },
        ],
      };
      myChart.setOption(lineOptions);
    },
    //柱形图
    doBar() {
      var myChart = echarts.init(document.getElementById("bar"));
      let barOptions = {
        title: {
          text: "子类数量",
        },
        legend: {},
        tooltip: {},
        dataset: {
          source: [],
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.list.map((item) => item.catename),
        },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            name: "子类数量",
            type: "bar",
            data: this.list.map((item) =>
              item.children ? item.children.length : 0
            ),
          },
        ],
      };
      myChart.setOption(barOptions);
    },
    //饼状图
    doPie() {
      var myChart = echarts.init(document.getElementById("pie"));
      let pieOptions = {
        title: {
          text: "子类数量",
          left: "center",
        },
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: "vertical",
          left: "left",
        },
        series: [
          {
            name: "子类数量",
            type: "pie",
            radius: "50%",
            data: this.list.map((item) => {
              return {
                name: item.catename,
                value: item.children ? item.children.length : 0,
              };
            }),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
      myChart.setOption(pieOptions);
    },
  },
};
</script>
<style lang="less" scoped>
@import "../../less/index.less";
.home {
  overflow: hidden;
}
#line,
#bar,
#pie {
  float: left;
  width: 48%;
  height: 370px;
  margin: @margin;
  border: 1px solid #ccc;
}
</style>