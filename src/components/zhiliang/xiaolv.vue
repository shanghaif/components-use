<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import { debounce } from "@/utils";
import { regionData } from "element-china-area-data";

const animationDuration = 6000;

export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "250px"
    },
    regionpdata: {
      type: Object,
      default: () => {
        return {
          xdata: [],
          data: [],
          alldata: [],
          title1: "",
          title2: ""
        };
      }
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    regionpdata: {
      deep: true,
      handler(val) {
        this.initChart(val);
      }
    }
  },
  mounted() {
    this.initChart(this.regionpdata);
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize();
      }
    }, 100);
    window.addEventListener("resize", this.__resizeHandler);
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    window.removeEventListener("resize", this.__resizeHandler);
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart(regionpdata) {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        // color: ["#8EC9EB"],
        legend: {
          data: ["水泵效率η分布"],
           textStyle:{
              color:'white'
          }
        },
        tooltip: {
          trigger: "axis",
          formatter: "Temperature : <br/>{b}km : {c}°C",
         
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitLine: {
            show: false
          },
          axisLabel: {
            formatter: "{value} °C"
          }
        },
        yAxis: {
          type: "category",
          axisLine: { onZero: false },
          axisLabel: {
            formatter: "{value} km"
          },
          boundaryGap: true,
          data: ["0", "10", "20", "30", "40", "50"]
        },
        series: [
          {
            name: "水泵效率η分布",
            type: "bar",
            smooth: true,
            barCategoryGap: 25,
             barWidth: '60%',
            lineStyle: {
              normal: {
                width: 10,
                shadowColor: "white",
                shadowBlur: 10,
                shadowOffsetY: 10
              }
            },
            data: [15, 20,30,40,50]
          }
        ]
      });
    }
  }
};
</script>
