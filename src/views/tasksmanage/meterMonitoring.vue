<template>
    <div id="monitoring">
        <div class="menu">
            <Resource
            style="width:340px;max-height:850px;overflow:scroll;flex-shrink:0;"
            :data="data"
            />
        </div>
        <div class="content">
            <div class="form">
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item label="终端类型">
                        <el-select v-model="form.terminal_type" @change="handleTypeChange" placeholder="请选择终端类型">
                            <el-option label="集中器" value=1></el-option>
                            <el-option label="电能表" value=2></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="终端型号">
                        <el-select v-model="form.terminal_model" @change="handleModelChange" placeholder="请选择终端型号">
                            <el-option label="单相智能电表" value="1" :disabled="form.terminal_type==1"></el-option>
                            <el-option label="三相只能电表" value="2" :disabled="form.terminal_type==1"></el-option>
                            <el-option label="电力集中器" value="3" :disabled="form.terminal_type==2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="终端地址">
                        <el-input v-model="form.terminal_addr" placeholder="请选择终端地址"></el-input>
                    </el-form-item>
                    <el-form-item label="在线状态">
                        <el-select v-model="form.isOnline" placeholder="请选择在线状态">
                            <el-option label="全部" value="1"></el-option>
                            <el-option label="在线" value="2"></el-option>
                            <el-option label="离线" value="3"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="query">查询</el-button>
                        <el-button type="primary" @click="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="detail" v-if="form.terminal_type=='2'">
                <div class="operation">
                    <div class="summarize">
                        <el-card shadow="hover">
                            <div slot="header">
                                <span>运行概况</span>
                            </div>
                            <ul class="con">
                                <li>台区总数：<span><strong>{{operation.courts_sum}}</strong>个</span></li>
                                <li>集中器总数：<span><strong>{{operation.concentrator_sum}}</strong>台</span></li>
                                <li>电能表总数：<span><strong>{{operation.electric_sum}}</strong>台</span></li>
                                <li>单相电能表总数：<span><strong>{{operation.single_electric_sum}}</strong>台</span></li>
                                <li>三相电能表总数：<span><strong>{{operation.three_electric_sum}}</strong>台</span></li>
                                <li>当日冻结电量合计：<span><strong>{{operation.freeze_day}}</strong>KWh</span></li>
                                <li>当日用电总量：<span><strong>{{operation.day_sum}}</strong>KWh</span></li>
                                <li>当月冻结电量合计：<span><strong>{{operation.freeze_month}}</strong>KWh</span></li>
                                <li>当月用电总量：<span><strong>{{operation.month_sum}}</strong>KWh</span></li>
                            </ul>
                        </el-card>
                    </div>
                    <div class="statistics">
                        <el-card shadow="hover">
                            <div slot="header">
                                <span>状态统计</span>
                            </div>
                            <ul class="con">
                                <li ref="pie1" style="height:120px;"></li>
                                <li ref="pie2" style="height:120px;"></li>
                                <li ref="pie3" style="height:120px;"></li>
                                <li ref="pie4" style="height:120px;"></li>
                            </ul>
                        </el-card>
                    </div>
                </div>
                <ul class="table">
                    <li v-for="item of surfaces" :key="item.id">
                        <div class="img">
                            <svg-icon icon-class="electricEnergyMeter1" v-if="item.img==1"></svg-icon>
                            <svg-icon icon-class="electricEnergyMeter2" v-else></svg-icon>
                        </div>
                        <div class="info">
                            <p>{{item.name}}:<span :class="[item.status?'normal':'offLine']">({{item.addr}})</span></p>
                            <p>pn值:{{item.pn}}<span :class="[item.status?'normal':'offLine']">{{item.status | Online}}</span></p>
                            <div>
                                <p>当日冻结电量：<span :class="[item.status?'normal':'offLine']">{{item.freeze_day}}KWh</span></p>
                                <p>当月冻结电量：<span :class="[item.status?'normal':'offLine']">{{item.freeze_month}}KWh</span></p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="detail" v-if="form.terminal_type=='1'">
                <div class="operation">
                    <div class="summarize">
                        <el-card shadow="hover">
                            <div slot="header">
                                <span>运行概况</span>
                            </div>
                            <ul class="con">
                                <li>台区总数asd：<span><strong>{{operation.courts_sum}}</strong>个</span></li>
                                <li>集中器总数：<span><strong>{{operation.concentrator_sum}}</strong>台</span></li>
                                <li>电能表总数：<span><strong>{{operation.electric_sum}}</strong>台</span></li>
                                <li>单相电能表总数：<span><strong>{{operation.single_electric_sum}}</strong>台</span></li>
                                <li>三相电能表总数：<span><strong>{{operation.three_electric_sum}}</strong>台</span></li>
                                <li>当日冻结电量合计：<span><strong>{{operation.freeze_day}}</strong>KWh</span></li>
                                <li>当日用电总量：<span><strong>{{operation.day_sum}}</strong>KWh</span></li>
                                <li>当月冻结电量合计：<span><strong>{{operation.freeze_month}}</strong>KWh</span></li>
                                <li>当月用电总量：<span><strong>{{operation.month_sum}}</strong>KWh</span></li>
                            </ul>
                        </el-card>
                    </div>
                    <div class="statistics">
                        <el-card shadow="hover">
                            <div slot="header">
                                <span>状态统计</span>
                            </div>
                            <ul class="con">
                                <li ref="pie1" style="height:120px;"></li>
                                <li ref="pie2" style="height:120px;"></li>
                                <li ref="pie3" style="height:120px;"></li>
                                <li ref="pie4" style="height:120px;"></li>
                            </ul>
                        </el-card>
                    </div>
                </div>
                <ul class="table">
                    <li class="con" v-for="item of surfaces2" :key="item.id">
                        <div class="img">
                            <svg-icon icon-class="electricEnergyMeter3"></svg-icon>
                        </div>
                        <div class="info">
                            <p>{{item.name}}({{item.addr}}){{item.status | Online}}</p>
                            <p>所属台区：{{item.courts}}</p>
                            <p>终端地址：{{item.terminal_addr}}</p>
                            <div>
                                <p>主站连接状态：{{item.master_station_status | Master}}</p>
                                <p>本地时钟：{{item.time}}</p>
                            </div>
                            <div>
                                <div style="width:50%">
                                    <p>在线电表：{{item.online}}/{{operation.electric_sum}}</p>
                                    <p>当日电量:{{operation.day_sum}}kwh</p>
                                </div>
                                <div style="width:50%">
                                    <p>当日抄表情况:{{item.online}}/{{operation.electric_sum}}</p>
                                    <p>成功率：{{item.success}}</p>
                                    <p>上报率：{{item.reported}}</p>
                                </div>
                            </div>
                            <div>
                                <p>告警记录：{{item.warning}}</p>
                                <p style="margin-right:60px;">事件记录：{{item.incident}}</p>
                            </div>
                            <div>
                                <p>重要告警：{{item.imp_warning}}</p>
                                <p style="margin-right:60px;">重点事件：{{item.imp_incident}}</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <el-pagination v-if="form.terminal_type=='2'" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
            </el-pagination>
            <el-pagination v-if="form.terminal_type=='1'" @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="page2" :page-sizes="pageSizes2" :page-size="pageSize2" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal2">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import Resource from "@/components/resource";
import Parse from 'parse'
import {utc2beijing} from '@/utils/index'
export default {
    data(){
        return {
            data:[],
            // 表单信息
            form:{
                terminal_type:"2",//终端类型
                terminal_addr:"",//终端地址
                terminal_model:"1",//终端型号
                isOnline:""//在线状态
            },
            // 电表信息
            // electric:{
            //     img:[1,2],//电表图片
            //     name:["单相智能电表","三相智能电表"],//电表名字
            //     addr:["123","32432"],//电表地址
            //     pn:["1.0","0.5"],//电表pn值
            //     status:[true,false],//电表状态
            //     freeze_day:[500,5000],//冻结日
            //     freeze_month:[5005,5065]//冻结月
            // },
            // 集中器信息
            concentrator:{
                img:"",//集中器图片
                name:"",//集中器名称
                addr:"",//集中器地址
                status:"",//集中器状态
                courts:"",//所属台区
                terminal_addr:"",//终端地址
                master_station_status:"",//主站状态
                time:"",//本地时钟
                online:"",//在线电表
                success:"",//成功率
                reported:"",//上报率
                warning:"",//告警记录
                incident:"",//事件记录
                imp_warning:"",//重要告警
                imp_incident:""//重要事件
            },
            // 运行信息
            operation:{
                courts_sum:"256",//台区总数
                concentrator_sum:"256",//集中器总数
                electric_sum:"35000",//电能表总数
                single_electric_sum:"17000",//单相电能表总数
                three_electric_sum:"18000",//三相电能表总数
                freeze_day:"50000",//当日冻结电量合计
                day_sum:"10000",//当日用电总量
                freeze_month:"12000",//当月冻结电量合计
                month_sum:"12000"//当月用电总量
            },
            // 分页
            page:1,//当前页
            pageSize:10,//每页数量
            pageSizes:[10,20,50],//分页数组
            pageTotal:100,//总数
            surfaces:[//电能表数据
                {id:1,img:1,name:"单相智能电表",addr:"12a1111111111",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:2,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:true,freeze_day:400,freeze_month:4000},
                {id:12,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:32,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:true,freeze_day:400,freeze_month:4000},
                {id:14,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:22,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
                {id:123,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:2432,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:true,freeze_day:400,freeze_month:4000},
                {id:4231,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:322,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
                {id:2341,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:3242,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
                {id:12324,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:2324,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
                {id:13242,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:33242,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
                {id:3214,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:23252,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
                {id:132523,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:2435432,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
                {id:4435231,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:343522,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
                {id:2345341,img:1,name:"单相智能电表",addr:"123",pn:"1.0",status:true,freeze_day:500,freeze_month:5000},
                {id:3243542,img:2,name:"三相智能电表",addr:"123",pn:"2.0",status:false,freeze_day:400,freeze_month:4000},
            ],
            surfaces2:[//集中器数据
                {id:1,img:3,name:"电力集中器",addr:"156116",status:true,courts:"阳光",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"99.53%", reported:"99.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
                {id:2,img:3,name:"电力集中器",addr:"156116",status:true,courts:"阳光",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"99.53%", reported:"99.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
                {id:3,img:3,name:"电力集中器",addr:"156116",status:true,courts:"阳光",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"99.53%", reported:"99.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
                {id:4324,img:3,name:"电力集中器",addr:"156116",status:true,courts:"阳光",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"99.53%", reported:"99.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
                {id:3244,img:3,name:"电力集中器",addr:"156reg116",status:true,courts:"阳光",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"99.53%", reported:"99.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
                {id:4432,img:3,name:"电力集中器",addr:"fewf156116",status:true,courts:"阳egfew光",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"99.53%", reported:"99.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
                {id:434,img:3,name:"电力集中器",addr:"15ewf6116",status:true,courts:"huio",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"99.53%", reported:"99.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
                {id:2344,img:3,name:"电力集中器",addr:"15trh6116",status:true,courts:"阳光",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"58.53%", reported:"85.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
                {id:4343,img:3,name:"电力集中器",addr:"156dfg116",status:true,courts:"阳光",terminal_addr:"172.163.203.1",master_station_status:true,time:"2019-7-10",online:210,success:"98.53%", reported:"98.53%",warning:120, incident:100,imp_warning:20, imp_incident:30},
            ],
            page2:1,
            pageSize2:12,
            pageSizes2:[15,30,45],
            pageTotal2:50,
            // 饼状图数据
            data1:["已覆盖","未覆盖"],
            data2:["在线","离线"],
            data3:["成功","失败"],
            data4:["及时","超时"],
            value1:[
                {value:92.5, name:'已覆盖',itemStyle:{color:"#0CA394"}},
                {value:7.5, name:'未覆盖',itemStyle:{color:"#D73948"}},
            ],
            value2:[
                {value:92.5, name:'在线',itemStyle:{color:"#0CA394"}},
                {value:7.5, name:'离线',itemStyle:{color:"#D73948"}},
            ],
            value3:[
                {value:92.5, name:'成功',itemStyle:{color:"#0CA394"}},
                {value:7.5, name:'失败',itemStyle:{color:"#D73948"}},
            ],
            value4:[
                {value:92.5, name:'及时',itemStyle:{color:"#0CA394"}},
                {value:7.5, name:'超时',itemStyle:{color:"#D73948"}},
            ]
        }
    },
    mounted(){
        this.pie_data();
        this.getTree();
    },
    methods:{
        query(){//查询
            
        },
        reset(){//重置
            this.form.terminal_type="";
            this.form.terminal_addr="";
            this.form.terminal_model="";
            this.form.isOnline="";
        },
        // 饼状图
        pie_chart(el,title,data,value){
            let pie=this.$echarts.init(el);
            pie.setOption({
                title : {
                    text: title,
                    x:'center',
                    textStyle:{
                        fontSize: '15',
                        fontWeight: 'bold'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data
                },
                series: [
                    {
                        name:'台区覆盖率',
                        type:'pie',
                        radius: ['40%', '60%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '13',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data:value
                    }
                ]
            },true)
        },
        pie_data(){
            this.pie_chart(this.$refs.pie1,"台区覆盖率",this.data1,this.value1);
            this.pie_chart(this.$refs.pie2,"终端在线率",this.data2,this.value2);
            this.pie_chart(this.$refs.pie3,"抄表成功率",this.data3,this.value3);
            this.pie_chart(this.$refs.pie4,"超标及时率",this.data4,this.value4);
        },
        // 分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        handleSizeChange2(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange2(val) {
            console.log(`当前页: ${val}`);
        },
        // 切换类型
        handleTypeChange(){
            console.log(2);
            if (this.form.terminal_type=="1"){
                this.form.terminal_model="3";
            }else {
                this.form.terminal_model="1";
            }
        },
        // 切换型号
        handleModelChange(){
            let arr=[];
            if (this.form.terminal_model=="1"){
                for (let i=0;i<this.surfaces.length;i++){
                    if (this.surfaces[i].name=="单相智能电表"){
                        arr.push(this.surfaces[i]);
                    }
                }
                this.surfaces=arr;
            }else {
                for (let i=0;i<this.surfaces.length;i++){
                    if (this.surfaces[i].name=="三相智能电表"){
                        arr.push(this.surfaces[i]);
                    }
                }
                console.log(arr);
                this.surfaces=arr;
            }
        },
        // 获取资源树
        getTree(){
            var Department = Parse.Object.extend("Department");
            var department = new Parse.Query(Department);
                department.limit(10000);
                department.find().then(
                resultes => {
                this.data=[]
                resultes.map(items => {
                    var obj = {};
                    items.createtime = utc2beijing(items.attributes.createdAt)
                    obj.name = items.attributes.name,
                    obj.ParentId = items.attributes.ParentId;
                    obj.objectId = items.id;
                    obj.createtime = items.createtime;
                    obj.icon = items.attributes.org_type;
                    obj.is_show = false;
                    this.data.push(obj);
                });
                },
                error => {
                    if (error.code == "209") {
                        this.$message({
                        type: "warning",
                        message: "登陆权限过期，请重新登录"
                        });
                        this.$router.push({
                        path: "/login"
                        });
                    }
                }
            );
        },
    },
    // 过滤器
    filters:{
        // 在线和离线
        Online(value){
            if (value){
                return "运行正常"
            }else {
                return "设备离线"
            }
        },
        // 主站连接状态
        Master(value){
            if (value){
                return "已连接"
            }else {
                return "未连接"
            }
        }
    },
    components:{Resource},
}
</script>



<style lang="scss" scoped>
#monitoring {
    display:flex;
    margin-top: 20px;
    .menu {
        width: 20%
    }
    .content {
        width:80%;
        .el-form {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            /deep/.el-form-item {
                width: 20%;
                .el-input {
                    width: 150px;
                }
                input {
                    height: 26px;
                }
                .el-form-item__content {
                    margin:0 !important;
                    button {
                        height: 26px;
                        line-height: 26px;
                        padding:0 10px;
                    }
                }
            }
        }
        .detail {
            display: flex;
            .operation {
                // width:250px;
                .summarize {
                    width: 250px;
                }
                .summarize,.statistics {
                    margin-top:10px;
                    /deep/.el-card {
                        font-size: 16px;
                        .el-card__header {
                            padding: 5px 10px;
                            color:#fff;
                            background-color: #1063A7;
                        }
                        .el-card__body {
                            padding: 2px 10px;
                            li {
                                padding: 2px 0;
                                span {
                                    float: right;
                                    strong {
                                        color:#45FFFF;
                                        font-weight: normal;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .table {
                padding: 0;
                margin-left: 1rem;
                list-style: none;
                li {
                    width: 300px;
                    display: flex;
                    border:1px solid #DFDFDF;
                    height: 120px;
                    margin: 0 0.5rem 0.5rem 0;
                    float:left;
                    .img {
                        width: 25%;
                        margin:20px 0 0 -8px;
                        border-right:1px solid #DFDFDF;
                        svg {
                            font-size: 80px;
                        }
                    }
                    // 电能表信息
                    .info {
                        width: 85%;
                        font-size: 13px;
                        padding: 18px 5px;
                        div {
                            display: flex;
                        }
                        p {
                            margin:0;
                            padding-bottom: 15px;
                            span {
                                float: right;
                                margin-right:2rem;
                            }
                        }
                    }
                }
                // 集中器信息
                li.con {
                    height: 240px;
                    width: 400px;
                    .img {
                        width: 35%;
                        margin:30px 10px 10px -35px;
                        svg {
                            font-size: 180px;
                        }
                    }
                    .info {
                        div {
                            flex-wrap: wrap;
                            justify-content: space-between;
                        }
                        p {
                            padding-bottom: 8px;
                        }
                    }
                }
            }
        }
    }
}
.resource {
    height: 100vh;
}
// 正常样式
.normal {
    color:#92C250;
}
// 离线样式
.offLine {
    color:#DF2232;
}
</style>

<style>
.el-select-dropdown.el-popper:not(4) {
    top:130px !important;
}
.el-card .con {
    font-size: 14px;
    list-style: none;
    padding: 0;
}
.el-pagination {
    margin: 20px 0;
    text-align: center;
}
</style>