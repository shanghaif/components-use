<template>
    <div class="onlinetest">
        <div class="ninthtab1">
            <h4 style="margin:0 0 10px;">在线调试</h4>
            <el-form :inline="true" :model="devicesForm" class="demo-form-inline" size="small">
              <el-form-item label="选择设备:">
                <el-select v-model="devicesForm.product" placeholder="请选择产品" @change="selectProduct">
                  <el-option v-for="(item,index) in product" :label="item.attributes.name" :value="item.id" :key="index"></el-option>
                </el-select>
                 <el-select v-model="devicesForm.devices" placeholder="请选择设备" filterable @change="selectDevices" @blur="selectBlur">
                  <el-option v-for="(item,index) in devices" :label="item.attributes.devaddr" :value="item.attributes.devaddr" :key="index"></el-option>
                </el-select>
              </el-form-item>
               <el-form-item>
                <el-button type="primary" @click="connectDevice">启动设备</el-button>
              </el-form-item>
              <div>
                  <el-form-item label="选择属性:">
                <el-select v-model="devicesForm.wmxmb" placeholder="请选择调试功能">
                  <el-option v-for="(item,index) in productProperties" :label="item.name" :key="index" :value="item.identifier"></el-option>
                </el-select>
                 <el-select v-model="devicesForm.zlfs" placeholder="指令方式">
                  <el-option label="设置" :value="'thing/'+devicesForm.product+'/${'+devicesForm.devices+'}'"></el-option>
                  <el-option label="获取" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="sendTopic">发送指令</el-button>
              </el-form-item>
              </div>
              
            </el-form>
          </div>
    </div>
</template>
<script>
import Parse from 'parse'
import {
  Websocket,
  sendInfo,
  TOPIC_EMPTY,
  MSG_EMPTY,
  DISCONNECT_MSG,
} from "@/utils/wxscoket.js";
var  productSecret=''
var arr=[]
export default {
   name:'OnlineTest',
   data() {
      return {
          productProperties:[],
          product:[],
          devices:[],
          devicesForm:{
              product:'',
              devices:'',
              wmxmb:'',
              zlfs:''
          },
          deviceid:''
      }
   },
   mounted() {
       this.getProduct()
       if(this.$route.query){
           this.deviceid = this.$route.query.deviceid
           var Devices = Parse.Object.extend('Devices')
           var devices = new Parse.Query(Devices)
           devices.find().then(response=>{
               this.devices = response
               response.map(items=>{
                   if(this.deviceid==items.id){
                       this.devicesForm.devices = items.attributes.devaddr
                       this.devicesForm.product = items.attributes.product.id
                       productSecret = items.attributes.product.attributes.productSecret
                       if(items.attributes.product.attributes.thing.properties){
                           this.productProperties = items.attributes.product.attributes.thing.properties
                       }else{
                           this.productProperties = []
                       }
                       
                   }
               }) 
           })
       }   
   },
   methods: {
       getProduct(){
           var Product = Parse.Object.extend('Product')
           var product = new Parse.Query(Product)
           product.find().then(resultes=>{
               this.product = resultes
           })
       },
       selectProduct(val){
           var Devices = Parse.Object.extend('Devices')
           var devices = new Parse.Query(Devices)
           devices.equalTo('product',val)
           this.product.map(item=>{
               if(item.id==val){
                   productSecret = item.attributes.productSecret
               }
           })
           devices.find().then(response=>{
               this.devices = response
           })
       },
       selectDevices(val){
           var Devices = Parse.Object.extend('Devices')
           var devices = new Parse.Query(Devices)
           devices.equalTo('devaddr',val)
           devices.find().then(object=>{
               this.productProperties = object[0].attributes.product.attributes.thing.properties
           })
       },
       connectDevice(){
            
            // if(arr.indexOf('thing/'+this.devicesForm.product+'/${'+this.devicesForm.devices+'}')==0){
                
            // }else if(arr.indexOf('thing/'+this.devicesForm.product+'/${'+this.devicesForm.devices+'}')==-1){
                Websocket.cInfo.clientId = 'sw1111_'+this.devicesForm.devices
                Websocket.cInfo.userName = this.devicesForm.product
                Websocket.cInfo.password = productSecret
                Websocket.subInfo = {
                    topic: 'thing/'+this.devicesForm.product+'/${'+this.devicesForm.devices+'}', 
                    qos: 2,
                };
                Websocket.newClient();
                Websocket.connect();
                Websocket.recive = function(Msg){
                console.log(Msg)
                }
                var topic='thing/'+this.devicesForm.product+'/${'+this.devicesForm.devices+'}'
                arr.push(topic)
            // }
            
       },
       sendTopic(){
           console.log(this.devicesForm.devices)
           var info={
               topic:this.devicesForm.zlfs+'/post',
               text:'',
               qos:1
           }
            Websocket.sendMessage(info, function(res){
                if(res.result){
                    console.log('发送成功')
                }
            })
       },
       selectBlur(e){
           this.devicesForm.devices =e.target.value
       }
   }
}
</script>
<style lang="scss" scoped>
.onlinetest{
    height: 100%;
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    .ninthtab1,.ninthtab2{
    height:350px;
    background:white;
    width:100%;
    margin-bottom:10px;
    padding:10px;
    box-sizing: border-box;
    }
}
</style>
