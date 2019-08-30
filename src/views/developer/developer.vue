<template>
    <div class="developer">
        <el-button class="typebutton" type="primary" @click="Goto(2)">树蛙高并发全连接平台</el-button>
        <el-button class="typebutton" type="primary" @click="Goto(1)">文档中心</el-button>
    </div>
</template>
<script>
export default {
   data() {
      return {
      }
   },
   mounted() {
   },
   methods: {
       Goto(value){
           if(value==2){
               window.open('http://ci.iotn2n.com:18083')
           }else{
               window.open('http://prod.iotn2n.com:5080/swagger/')
           }
           
       }
   }
}
</script>
<style scoped>
.developer{
     background:#ffffff;
    padding-left:20px;
    padding-top:20px;
    box-sizing: border-box;
    min-height:800px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.typebutton{
    height:300px;
    width:300px;
    line-height:300px;
    text-align:center;
    margin:100px 200px;
    font-size:20px;
}
</style>
