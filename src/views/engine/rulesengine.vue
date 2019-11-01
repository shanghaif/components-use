<template>
    <div class="rulesengine">
        <div class="engintable">
            <div class="engineheader">
                <h3>规则</h3>
                <el-button type="primary" icon="el-icon-plus" style="float:right;margin:19px 0" size="small" @click="addEngine">新建</el-button>
            </div>
            <el-table
            :data="engineData"
            style="width: 100%;text-align:center">
            <el-table-column
                prop="date"
                label="ID"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="name"
                label="触发事件"
                align="center"
                >
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                label="SQL">
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                label="响应动作">
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                label="已命中">
            </el-table-column>
            <el-table-column
                prop="address"
                align="center"
                label="操作">
            </el-table-column>
            </el-table>
            <div class="block">
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 30, 50]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
   data() {
      return {
          engineData:[],
          pagesize:10,
          start:0,
          total:0
      }
   },
   mounted() {
   },
   methods: {
    //分页
    handleSizeChange(val){

    },
    handleCurrentChange(val){

    },
    addEngine(){
        this.$router.push({
            path:'/rules_engine/addengine',
            query:{
                title:'新增'
            }
        })
    }
   }
}
</script>
<style lang="scss" scoped>
.rulesengine{
  height: 100%;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  .engintable{
      width:100%;
      height:auto;
      .engineheader{
          h3{
              float:left;
          }
      }
      .block{
          margin-top:20px;
      }
  }
}
</style>
