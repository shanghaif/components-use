<template>
  <div class="consoleevidece">
    <el-tabs type="border-card">
      <el-tab-pane label="特性曲线">
          <div style="border-bottom:1px solid #cccccc;">
               <div id="echarts" style="width:100%;height:400px;">

                </div>
                <div style="width:100%;text-align:center;margin-bottom:20px;">
                    <el-button type="primary" @click="Getdata">采 集</el-button>
                </div>
          </div>
       
        <div id="bottom" style="width:100%;height:400px;margin-top:20px;display:flex;">
          <div id="bottomleft" style="width:70%;height:100%;"></div>
          <div id="bottomright" style="width:30%;height:100%;">
               <div class="caozuo">
              <el-button type="success" @click="updatedcurver">绘 图</el-button>
              <el-button type="success" @click="supportdata">提 交</el-button>
            </div>
               <el-table
                :data="Dataavange"
                 border
                style="width: 100%;margin-top:10px;height:100%">
                <el-table-column
                  prop="flow"
                  :label='"流量\n(m³/h)"'
                  >
                </el-table-column>
                <el-table-column
                  prop="head"
                  :label='"扬程\n(m)"'
                  >
                </el-table-column>
                <el-table-column
                  prop="power"
                  :label='"输入功率\n(kW)"'>
                </el-table-column>
                <el-table-column
                  prop="effect"
                  :label='"机组效率\nη(%)"'>
                </el-table-column>
                 <el-table-column
                  label="操作">
                  <template slot-scope="scope">
                   <el-button type="danger" @click="deletedata(scope.$index)">删 除</el-button>
                  </template>
                </el-table-column>
              </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="测试监控">
        <el-button type="primary" @click="Getimgdata">查看图片</el-button>
          <el-table
                :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                style="width: 100%;margin-top:10px;">
            <el-table-column
                prop="flow"
                label="流量"
                >
            </el-table-column>
            <el-table-column
                prop="head"
                label="扬程"
               >
            </el-table-column>
            <el-table-column
                prop="power"
                label=功率>
            </el-table-column>
            <el-table-column
                prop="power_factor"
                label=功率因数>
            </el-table-column>
            <el-table-column
                prop="pressure_in"
                label=进口压力>
            </el-table-column>
            <el-table-column
                prop="pressure_out"
                label=出口压力>
            </el-table-column>
            <el-table-column
                prop="current"
                label=电流>
            </el-table-column>
            <el-table-column
                prop="effect"
                label=机组效率>
            </el-table-column>
            <el-table-column
                prop="speed"
                label=转速>
            </el-table-column>
             <el-table-column
                label=传输时间>
                <template slot-scope="scope">
                 <span>{{timestampToTime(scope.row.timestamp)}}</span>
                </template>
            </el-table-column>
            </el-table>
            <div class="block" style="margin-top:15px;">
              <el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[1,5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
              </el-pagination>
            </div>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import {Pumpcurverdata, getaveragedata,CloundFile} from '@/api/devicescontrol/index'
import { Supporttask } from '@/api/historytask';
import {Parse} from 'parse'
var origindata = [];
var selectdata = [];
var timer=null
var xaxis = []
var yaxisflow = []//流量
var yaxishead = []//扬程
var yaxiseffect = []//效率
var yaxisepower = []//功率
var arr1=[],arr2=[],arr3=[],arr7=[],arr5=[],arr6=[]
export default {
  data() {
    return {
      currentPage: 1, // 当前页码
      total: 20, // 总条数
      pageSize: 10 ,// 每页的数据条数
      myChart: null,
      myChart1: null,
      tableData:[],
      Dataavange:[],
      reportId:'',
      tasknameid:''
    };
  },
  mounted() {
    this.reportId = this.$route.query.reportId
    this.tasknameid = this.$route.query.tasknameid
    this.Getecharts();
    this.Getecharts2()
    this.init();
    timer=null
   this.getcurvedata()
    window.clearInterval(this.timer)
    this.setTimer()
  },
  methods: {
     timestampToTime(timestamp) {
      var date = new Date(timestamp * 1000) 
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate()+1 <= 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
      var h = (date.getHours()+1 <= 10 ? '0'+(date.getHours()) : date.getHours())  + ':';
      var m = (date.getMinutes()+1 <= 10 ? '0'+(date.getMinutes()) : date.getMinutes())  + ':';
      var s = (date.getSeconds()+1 <= 10 ? '0'+(date.getSeconds()) : date.getSeconds());
      return Y+M+D+h+m+s;
    },
     setTimer(){
      this.timer = window.setInterval(() => {
        this.getcurvedata();
      }, 10000);
      
    },
    getcurvedata(){
       xaxis = []//时间
      yaxisflow = []//流量
      yaxishead = []//扬程
      yaxiseffect = []//效率
      yaxisepower = []//功率
     Pumpcurverdata(this.reportId,'capture_line_chart','curve').then(res=>{
       this.tableData = res.reverse()
      origindata = res
       res.map(item=>{
              xaxis.push(this.timestampToTime(item.timestamp).substring(11,19))
              yaxiseffect.push(item.effect)
              yaxisepower.push(item.power)
              yaxisflow.push(item.flow)
              yaxishead.push(item.head)
       })
       this.Getecharts(xaxis, yaxisflow, yaxishead, yaxiseffect, yaxisepower)
     })
    },
     handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.currentPage = 1;
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
        },
    init() {
      //关键三
      setTimeout(() => {
        window.addEventListener("resize", () => {
          this.myChart.resize();
          this.myChart1.resize()
        });
      }, 20);
    },

    Getecharts(time, y1, y2, y3, y4) {
      setTimeout(() => {
        let Echarts = document.getElementById("echarts");
        this.myChart = this.$echarts.init(Echarts);
        var colors = ["#5793f3", "#2F4F4F", "#675bba", "#ff4500"];
        this.myChart.setOption({
          color: colors,
          calculable: true,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              show: true,
              type: "cross",
              lineStyle: {
                type: "dashed",
                width: 1
              }
            }
          },
          toolbox: {
            feature: {
              dataView: { show: false, readOnly: true }
            }
          },
          brush: {
            toolbox: ["lineX", "clear"],
            xAxisIndex: 0
          },
          grid: {
            left: "10%"
          },
          legend: {
            data: ["流量m3/h", "扬程m", "效率%", "功率/kW"],
            orient: "horizontal"
          },
          xAxis: [
            {
              type: "category",
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  type: "solid"
                }
              },
              boundaryGap: false,
              axisLabel: {
                formatter: "{value}",
                rotate:45
              },
              data: time,
              splitNumber:15
            }
          ],
          yAxis: [
            {
              type: "value",
              position: "left",
              min: 0,
              max: 0.5,
              splitNumber: 5,
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: "{value}"
              }
            },
            {
              type: "value",
              position: "left",
              min: 0,
              max: 20,
              offset: 40,
              splitNumber: 5,
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: "{value}"
              }
            },
            {
              type: "value",
              position: "left",
              min: 0,
              max: 10,
              splitNumber: 5,
              offset: 80,
              axisLine: {
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: "{value}"
              }
            },
            {
              type: "value",
              position: "left",
              min: 0,
              max: 0.35,
              offset: 120,
              splitNumber: 5,
              axisLine: {
                lineStyle: {
                  color: colors[3]
                }
              },
              axisLabel: {
                formatter: "{value}"
              }
            }
          ],
          series: [
            {
              name: "流量m3/h",
              type: "line",
              data: y1,
              smooth: 0.5,
              symbol: "circle",
              yAxisIndex: 0,
              tooltip: true
            },
            {
              name: "扬程m",
              type: "line",
              data: y2,
              smooth: 0.5,
              yAxisIndex: 1,
              tooltip: true
            },
            {
              name: "效率%",
              type: "line",
              data: y3,
              smooth: 0.5,
              yAxisIndex: 2,
              tooltip: true
            },
            {
              name: "功率/kW",
              type: "line",
              data: y4,
              yAxisIndex: 3,
              smooth: 0.5,
              tooltip: true
            }
          ]
        });
        this.myChart.on("brushSelected", function(params) {
          var mainSeries = params.batch[0].areas;
          var selectedItems = []; //选中区域的横纵标
          for (var i = 0; i < mainSeries.length; i++) {
            if (
              mainSeries[i].coordRange &&
              mainSeries[i].coordRange.length > 0
            ) {
              for (var j = 0; j < mainSeries[i].coordRange.length; j++) {
                selectedItems.push(mainSeries[i].coordRange[j]);
              }
            }
          }
          selectdata = selectedItems;
        });
      }, 0);
    },
    Getimgdata(){
                var PumpData = Parse.Object.extend('PumpData');
                var query = new Parse.Query(PumpData);
                query.equalTo('data.title', '测试监控')
                query.equalTo('type', 'screenshot')
                query.equalTo('reportId', this.reportId)
                query.ascending('-createdAt')
                query.limit(1)
                query.find().then((resultes) => {
                    console.log(resultes)
                    var objectid = resultes[0].attributes.data.data
                    CloundFile(objectid).then(resultes=>{
                      window.open(resultes.url)
                    }).catch(error=>{
                      console.log(error)
                    })
                })
    },
    Getdata(){
      if(selectdata.length==0){
        this.$message({
          type: "warning",
          message: "请勾选区域!"
        });
      }else{
        var start =  origindata[selectdata[1]].timestamp
        var end = origindata[selectdata[0]].timestamp
         getaveragedata(this.reportId,'capture_line_chart',start,end).then(resultes=>{
           this.Dataavange.push(resultes)
         })
      }
    },
    deletedata(index){
      this.Dataavange.splice(index,1)
    },
    updatedcurver(){
      for (var i = 0; i < this.Dataavange.length; i++) {
                    arr1 = []
                    arr2 = []
                    arr3 = []
                    arr1.push(this.Dataavange[i].flow, this.Dataavange[i].head)
                    arr5.push(arr1)
                    arr2.push(this.Dataavange[i].flow, this.Dataavange[i].power)
                    arr6.push(arr2)
                    arr3.push(this.Dataavange[i].flow, this.Dataavange[i].effect)
                    arr7.push(arr3)
                }

                arr5.sort(function (a, b) {
                    if (a[0] < b[0]) {
                        return -1
                    }
                    if (a[0] > b[0]) {
                        return 1
                    }
                })
                arr6.sort(function (a, b) {
                    if (a[0] < b[0]) {
                        return -1
                    }
                    if (a[0] > b[0]) {
                        return 1
                    }
                })
                arr7.sort(function (a, b) {
                    if (a[0] < b[0]) {
                        return -1
                    }
                    if (a[0] > b[0]) {
                        return 1
                    }
                })
                this.Getecharts2(arr5, arr6, arr7)

    },
    supportdata(){
      this.$confirm('此操作只可提交一次, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
         
          var PumpData = Parse.Object.extend('PumpData')
                var pumpdata = new PumpData()
                pumpdata.set('data', { 'type': 'curve', "data":this.Dataavange, 'source': 'capture_line_chart' })
                pumpdata.set('type', 'capture_line_chart')
                var Report = Parse.Object.extend('Report')
                var report = new Report()
                report.set('objectId', this.reportId)
                pumpdata.set('reportId', report)
                pumpdata.set('itemId', this.tasknameid.toString())
                pumpdata.save().then(result => {
                    this.Dataavange = []
                     this.$message({
                      type: 'success',
                      message: '提交成功'
                    }); 
                },
                    (error => {
                        console.log(error)
                    })
                )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
       
    },
    Getecharts2(head, power, effect) {
      setTimeout(() => {
        let Echarts = document.getElementById("bottomleft");
        this.myChart1 = this.$echarts.init(Echarts);
        var colors = ['#5793f3', '#d14a61', '#675bba'];
        this.myChart1.setOption({
          color: colors,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              show: true,
              type: "cross",
              lineStyle: {
                type: "dashed",
                width: 1
              }
            }
          },

          toolbox: {
            show: true,
            feature: {
              saveAsImage: { show: true }
            }
          },

          grid: {
            left: "15%"
          },
          xAxis: [
            {
              type: "value",
              axisTick: {
                alignWithLabel: true,
                show: true,
                interval: 10
              },
              splitLine: {
                show: true
              },
              boundaryGap: false,
              min: 0,
              max: 0.51,
              splitNumber: 51,
              axisLabel: {
                textStyle: {
                  color: function(value, index) {
                    return index % 10 == 0 ? "black" : "none";
                  }
                }
              },
              name: "Q(m³/h)",
              nameTextStyle: {
                color: "red",
                padding: [10, -5, 0, 0]
              }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "H(m)",
              min: 0,
              max: 20,
              splitNumber: 5,
              position: "left",
              axisLine: {
                lineStyle: {
                  color: colors[0]
                }
              },
              axisLabel: {
                formatter: "{value}"
              },
         },
            {
              type: "value",
              name: "P(kW)",
              min: 0,
              max: 0.35,
              splitNumber: 5,
              position: "left",
              offset: 50,
              splitLine: {
                show: false
              },
              axisLine: {
                lineStyle: {
                  color: colors[1]
                }
              },
              axisLabel: {
                formatter: "{value}"
              },
              
            },
            {
              type: "value",
              name: "η(%)",
              min: 0,
              max: 10,
              splitNumber: 5,
              splitLine: {
                show: false
              },
              position: "right",
              axisLine: {
                lineStyle: {
                  color: colors[2]
                }
              },
              axisLabel: {
                formatter: "{value}"
              },
            }
          ],
          series: [
            { 
              name: "扬程",
              type: "line",
              smooth: true,
              yAxisIndex: 0,
              data: head
            },

            {
              name: "功率",
              type: "line",
              smooth: true,
              yAxisIndex: 1,
              data: power
            },
            {
              name: "效率",
              type: "line",
              smooth: true,
              yAxisIndex: 2,
              data: effect
            }
          ]
        });
      },0);
    }
  },
  beforeDestroy(){
      window.clearInterval(this.timer)
      this.timer = null
    
  }
};
</script>
<style scoped>
.consoleevidece {
  width: 100%;
  min-height: 875px;
  padding: 20px;
  box-sizing: border-box;
  background: #ffffff;
}
</style>
<style>
.consoleevidece .el-tabs__item {
  width: 200px;
  text-align: center;
}
.consoleevidece .el-table .cell{
  white-space:pre-line;
}
</style>