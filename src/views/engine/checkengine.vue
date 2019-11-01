<template>
    <div class="checkengine">
        <!--基本信息-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>基本信息</span>
            </div>
            <div class="box-form">
                <el-form :model="engineform" label-width="120px">
                    <el-form-item label="触发事件:">
                        <span>{{engineform.region}}</span>
                    </el-form-item>
                    <el-form-item label="备注:">
                        <span>{{engineform.remarks}}</span>
                    </el-form-item>
                    <el-form-item label="规则SQL:">
                        <span>{{engineform.sql}}</span>
                    </el-form-item> 
                </el-form>
            </div>
        </el-card>
        <!--度量指标-->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>度量指标</span>
            </div>
            <div class="box-table">
               <el-table
                :data="engineData"
                style="width: 100%"
                :default-sort = "{prop: 'date', order: 'descending'}"
                >
                <el-table-column
                prop="address"
                label="节点"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="已命中"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="命中速度"
                sortable
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="最大命中速度"
                >
                </el-table-column>
                 <el-table-column
                prop="address"
                label="5分钟平均速度"
                >
                </el-table-column>
            </el-table>
            </div>
        </el-card>
        <!--响应动作-->
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>响应动作</span>
            </div>
             <div class="box-table">
               <el-table
                :data="engineData"
                style="width: 100%"
                >
                <el-table-column
                prop="address"
                label="类型"
                width="180"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="参数"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="度量指标"
                >
                </el-table-column>
               
            </el-table>
            </div>
         </el-card>
    </div>
</template>
<script>
export default {
   data() {
      return {
          engineform:{
              region:'',
              remarks:'',
              sql:''
          },
          engineData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
            }]
        }
   },
   mounted() {
   },
   methods: {
   }
}
</script>
<style lang="scss" scoped>
.checkengine{
  width: 100%;
  padding: 20px;
  height: 100%;
  box-sizing: border-box;
  background-color: #f6f7fb;
  /deep/ .el-card{
      color:#71737d!important;
      margin-bottom:20px;
      padding:20px;
      box-sizing: border-box;
      /deep/ .el-card__header{
      border:0;
   }
   /deep/ .el-form-item__label{
       color:#71737d!important;
       text-align:left;
   }
   /deep/ .el-form-item__content{
       color:#71737d!important;
   }
  }
  
}
</style>
