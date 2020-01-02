<template>
  <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import { debounce } from '@/utils'
import { format } from 'path';

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '250px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true,
      default:()=>{
            return {
              expectedData: [],
              expectedData1: [],
              actualData: [],
              title:'1'
          }
      }
    }
  },
  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },
  // 不需要watch,watch会影响首次（如果在tabs中）渲染
  // watch: {
  //   chartData: {
  //     deep: true,
  //     handler(val) {
  //        this.setOptions(val)
  //     }
  //   },
  // },
  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHandler)
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm && this.sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions({ expectedData, expectedData1,actualData,title } = {}) {
      this.chart.setOption({
        xAxis: {
          data: [1,2,4,5,6,7,8,9,10,11],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          containLabel: true
        },
        title: {
          text: title,
          textStyle:{
            color:"white"
          }
        },
        legend: {
          data: ['扬程'],
           textStyle:{
            color:'#ffffff',
            fontSize:14
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10],
          formatter: '{a} <br/>{b} : {c}万台'
        },
        yAxis: {
          type: 'value',
          min:0,
          max:100,
          interval:20,
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: "{value}%",
            textStyle: {
                color: "#fff" //坐标值得具体的颜色
           },
            nameTextStyle:{
                color:"#ffffff",
                padding:10,
                fontSize:14
            }
        }
          
        },
       
        series: [{
          name: '扬程', 
        //  symbol: 'circle',
            symbolSize: 4,
          itemStyle: {
            normal: {
              color: '#e67070',
              lineStyle: {
                color: '#FF005A',
                width: 2
              },
              areaStyle: {
                color: '#006666'
              }
            }
          },
          smooth: true,
          type: 'line',
          data: [5,15,15,15,5,8,10,16,20,50,60],
          tooltip: true,
          animationDuration: 2800,
        //   animationEasing: 'cubicInOut',
          
        },
        // {
        //   name: '数据1',
        //   symbol: 'circle',
        //   symbolSize: 4,
        //   itemStyle: {
        //     normal: {
        //       color: '#FF005A',
        //       lineStyle: {
        //         color: 'red',
        //         width: 2
        //       },
        //       areaStyle: {
        //         color: '#FF005A'
        //       }
        //     }
        //   },
        //   smooth: true,
        //   type: 'line',
        //   data: expectedData1,
        //   animationDuration: 2800,
        // //   animationEasing: 'cubicInOut'
        // }
        ]
      })
    },
    initChart() {
      setTimeout(()=>{
         this.chart = echarts.init(this.$el, 'macarons')
         this.setOptions(this.chartData)
      },1000)
     
    }
  }
}
</script>
