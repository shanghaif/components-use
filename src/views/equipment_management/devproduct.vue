<template>
    <div class="devproduct">
        <h3>{{$t('route.产品管理')}}</h3>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane :label="$t('product.myproduct')+'('+total+')'" name="first">
                <div class="prosecond">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item>
                        <el-input v-model="formInline.productname" :placeholder="$t('product.searchproductname')"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="searchProduct(0)">{{$t('developer.search')}}</el-button>
                    </el-form-item>
                    <el-form-item style="float:right;text-align:right">
                        <el-button type="primary" @click="dialogFormVisible=true">{{$t('product.createproduct')}}</el-button>
                    </el-form-item>
                    </el-form>
                    <div class="protable">
                        <el-table
                            :data="proTableData"
                            style="width: 100%">
                            <el-table-column
                                prop="id"
                                label="ProductID"
                                >
                            </el-table-column>
                            <el-table-column
                                :label="$t('product.productname')"
                                >
                                <template slot-scope="scope">
                                   <span>{{scope.row.attributes.name}}</span>
                                </template>
                            </el-table-column>
                             <el-table-column
                                :label="$t('product.productgrouping')"
                                >
                                <template slot-scope="scope">
                                   <span>{{scope.row.attributes.devType}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('product.nodetype')"
                                >
                                <template slot-scope="scope">
                                   <span v-if="scope.row.attributes.nodeType==1">{{$t('product.gateway')}}</span>
                                   <span v-if="scope.row.attributes.nodeType==0">{{$t('product.equipment')}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('product.classification')"
                                >
                                <template slot-scope="scope">
                                   <span>{{scope.row.CategoryKey}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                
                                :label="$t('product.addingtime')"
                                >
                                <template slot-scope="scope">
                                   <span>{{utc2beijing(scope.row.createdAt)}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                :label="$t('developer.operation')"
                                width="250"
                                >
                                <template slot-scope="scope">
                                    <el-link type="primary" :underline="false" icon="el-icon-view" @click="deviceToDetail(scope.row)">{{$t('product.details')}}</el-link>
                                   <el-popover placement="top" width="300" :ref="`popover-${scope.$index}`">
                                        <p>确定删除这个{{scope.row.name}}产品吗？</p>
                                        <div style="text-align: right; margin: 0">
                                        <el-button
                                            size="mini"
                                            @click="scope._self.$refs[`popover-${scope.$index}`].doClose()"
                                        >{{$t('developer.cancel')}}</el-button>
                                        <el-button type="primary" size="mini" @click="makeSure(scope)">{{$t('developer.determine')}}</el-button>
                                        </div>
                                        <el-link
                                        slot="reference"
                                        :underline="false"
                                        icon="el-icon-delete"
                                        type="danger"
                                     >{{$t('developer.delete')}}</el-link>
                                     </el-popover>
                                      <el-link
                                        :underline="false"
                                        icon="el-icon-attract"
                                        @click="GoTodevices(scope.row)"
                                        type="primary"
                                     >{{$t('product.equipment')}}</el-link>
                                </template>
                            </el-table-column>
                            </el-table>
                    </div>
                    <div class="elpagination" style="margin-top:20px;">
                    <el-pagination
                        @size-change="productSizeChange"
                        @current-change="productCurrentChange"
                        :page-sizes="[10, 20, 30, 50]"
                        :page-size="length"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total"
                    ></el-pagination>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <div class="prodialog">
            <el-dialog :title="$t('product.createproduct')" :visible.sync="dialogFormVisible" width="40%" top="5vh"
        :before-close="handleClose">
        <div class="content">
            <!--产品信息-->
            <div class="contentone">
                <div style="display:flex;">
                    <span>{{$t('product.productinformation')}}</span>
                    <p style="height:1px;width:auto;border-top:1px dashed #dddddd;flex-grow:2;margin:10px;"></p>
                </div>
                
                <el-form :model="form" :rules="rules" ref="ruleForm">
                    <el-form-item :label="$t('product.productname')" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                      <el-form-item :label="$t('product.productidentification')" prop="devType">
                    <el-input v-model="form.devType" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('product.classification')" prop="category">
                    <el-cascader
                        v-model="form.category"
                        :options="treeData"
                        @change="handleChange">
                    </el-cascader>
                    </el-form-item>
                </el-form>
            </div>
            <!--节点类型-->
            <div class="contenttwo" style="margin-top:20px;">
                <div style="display:flex;">
                    <span>{{$t('product.nodetype')}}</span>
                    <p style="height:1px;width:auto;border-top:1px dashed #dddddd;flex-grow:2;margin:10px;"></p>
                </div>
                
                <el-form :model="form" :rules="rules" ref="ruleForm">
                    <el-form-item :label="$t('product.nodetype')" prop="nodeType">
                    <el-radio-group v-model="form.nodeType" >
                        <el-radio :label="0">{{$t('product.equipment')}}</el-radio>
                        <el-radio :label="1">{{$t('product.gateway')}}</el-radio>
                    </el-radio-group>
                    </el-form-item>
                    <!-- <el-form-item label="是否接入网关" v-show="form.resource=='网关'">
                   <el-radio-group v-model="form.isshow">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                    </el-radio-group>
                    </el-form-item> -->
                </el-form>
            </div>
            <!--连网方式-->
             <div class="contentthird" style="margin-top:20px;">
                <div style="display:flex;">
                    <span>{{$t('product.networkinganddescription')}}</span>
                    <p style="height:1px;width:auto;border-top:1px dashed #dddddd;flex-grow:2;margin:10px;"></p>
                </div>
                <el-form :model="form" :rules="rules" ref="ruleForm">
                    <el-form-item :label="$t('product.networking')" prop="netType">
                     <el-select v-model="form.netType" :placeholder="$t('product.selectgateway')">
                        <el-option label="WiFi" value="WIFI"></el-option>
                        <el-option :label="$t('product.honeycomb')+'(2G/3G/4G)'" value="CELLULAR"></el-option>
                        <el-option :label="$t('product.ethernet')" value="ETHERNET"></el-option>
                        <el-option label="LoRaWAN" value="LORA"></el-option>
                        <el-option :label="$t('product.ethernet')" value="OTHER"></el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item :label="$t('developer.describe')" prop="desc">
                        <el-input type="textarea" v-model="form.desc"></el-input>
                    </el-form-item>
                </el-form>
            </div>
        </div>
                
                <div slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="submitForm('ruleForm')">{{$t('developer.determine')}}</el-button>
                    <el-button @click="dialogFormVisible = false">{{$t('developer.cancel')}}</el-button>
                    
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
let Base64 = require("js-base64").Base64;
import { getIndustry } from "@/api/applicationManagement"
import Parse from 'parse'
import { setTimeout } from 'timers';
export default {
   data() {
      return {
          length:10,
          total:0,
          start:0,
          activeName:'first',
          formInline:{
              productname:''
          },
          productIdentifier:'',
          proTableData:[],
          formLabelWidth:'80px',
          dialogFormVisible:false,
          form:{
              name:'',
              category:'',
              nodeType:0,
              desc:'',
              netType:'',
              devType:''
          },
          rules:{
              name: [
                    { required: true, message: '请输入产品', trigger: 'blur' },
                ],
                devType: [
                    { required: true, message: '请输入产品标识，用于区分不同设备', trigger: 'blur' },
                ],
                category:[
                    { required: true, message: '请选择所属分类', trigger: 'change' }
                ],
                 nodeType: [
                    { required: true, message: '请选择节点类型', trigger: 'change' }
                ],
                netType: [
                    { required: true, message: '请选择联网方式', trigger: 'change' }
                ],
          },
          option:[],
          ruleoptions:[],
          
      }
   },
   computed:{
       treeData() {
        let cloneData = JSON.parse(JSON.stringify(this.option)); // 对源数据深度克隆
        return cloneData.filter(father => {
            let branchArr = cloneData.filter(
            child => father.id == child.parentid
            ); //返回每一项的子级数组
            branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
            return father.parentid == 0; //返回第一层
        });
        }
   },
   mounted() {
       this.Industry()
       this.getRole()
   },

   methods: {
       utc2beijing(utc_datetime) {
            // 转为正常的时间格式 年-月-日 时:分:秒
            var date = new Date(+new Date(utc_datetime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
            return date; // 2017-03-31 16:02:06
        },
       getRole() {
       this.ruleoptions=[]
        var roles = Parse.Object.extend("_Role");
        var query = new Parse.Query(roles);
        query.find().then(resultes => {
            resultes.map(item => {
            var obj = {};
            obj.objectId = item.id;
            obj.alias = item.attributes.alias;
            obj.name = item.attributes.name;
            this.ruleoptions.push(obj);
            });
        });
       },
       searchProduct(start){
           if(start==0){
               this.start=0
           }
           this.productIdentifier = this.$route.query.product
            var Product = Parse.Object.extend('Product')
            var product = new Parse.Query(Product)
            if(this.formInline.productname!=''){
                product.equalTo('name',this.formInline.productname)
            }
            if(this.productIdentifier){
                 product.equalTo('devType',this.productIdentifier)
            }
            product.ascending('-updatedAt')
            product.skip(this.start)
            product.limit(this.length)
            product.count().then(count=>{
                this.total = count
                     product.find().then(resultes=>{
                if(resultes){
                    resultes.map(items=>{
                       
                        this.option.map(category=>{
                         
                            if(items.attributes.category==category.value){
                                items.CategoryKey = category.label
                            }
                        })
                    })
                    this.proTableData = resultes
                   
                }
            })
            },error=>{
                this.$message({
                    type:'error',
                    message:error.message
                })
            })
           
       },
       handleClose(){
           this.dialogFormVisible=false
       },
       Industry(){
           this.option=[]
            getIndustry({limit:1000,where:{type:"category"}}).then(res=>{
                if(res){
                    res.results.map(items=>{
                        var obj={}
                        obj.value = items.data.CategoryKey
                        obj.label = items.data.CategoryName
                        obj.id = items.data.Id
                        obj.parentid = items.data.SuperId
                        this.option.push(obj) 
                    })
                   this.searchProduct()
                }
            }).catch(error=>{
                this.$message({
                    type:'error',
                    message:error.error
                })
            })
        },
        // distinct(a, b) {
        //     let arr = a.concat(b);
        
        //     return arr.filter((item, index)=> {
        //         return arr.indexOf(item.id) === index
        //          console.log(arr)
        //     })
           
        // },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var ranNum = Math.ceil(Math.random() * 25)
            var productSecret = Base64.encode(String.fromCharCode(65+ranNum)+Math.ceil(Math.random()*10000000)+Number(new Date()))
            var Product = Parse.Object.extend('Product')
            var product = new Product()
            var acl = new Parse.ACL();
            this.ruleoptions.map(items => {
            acl.setRoleReadAccess(items.name, true);
            acl.setRoleWriteAccess(items.name, true);
            });
            product.set('ACL',acl)
            product.set('nodeType',this.form.nodeType)
            product.set('netType',this.form.netType)
            product.set('dynamicReg',false)
            product.set('category',this.form.category[this.form.category.length-1]),
            product.set('name',this.form.name)
            product.set('devType',this.form.devType)
            product.set('desc',this.form.desc)
            product.set('topics',[])
            product.set('productSecret',productSecret)
            product.save().then(res=>{
                if(res){
                    this.$message({
                        type:'success',
                        message:'创建成功'
                    })
                    this.dialogFormVisible = false
                    this.$refs['ruleForm'].resetFields();
                    this.searchProduct()
                }
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      deviceToDetail(row){
          this.$router.push({
              path:'/roles/detailproduct',
              query:{
                  id:row.id,
                  CategoryKey:row.attributes.category
              }
          })
      },
    GoTodevices(row){
         this.$router.push({
             path:'/roles/thing',
             query:{
                 productid:row.id
             }
         })
    },
      /*el-popover点击关闭*/
    makeSure(scope) {
      // 可以在这里执行删除数据的回调操作.......删除操作 .....
      var Product = Parse.Object.extend('Product')
      var product = new Parse.Query(Product)
      product.get(scope.row.id).then(resultes=>{
          resultes.destroy().then(response=>{
              if(response){
                  this.$message({
                      type:'success',
                      message:'删除成功'
                  })
                  scope._self.$refs[`popover-${scope.$index}`].doClose();
                  this.searchProduct()
              }
          },error=>{
              this.$message({
                  type:'error',
                  message:error.message
              })
          })
      })
      
    },
    productSizeChange(val) {
      this.length = val;
      this.searchProduct()
    },
    productCurrentChange(val) {
      this.start = (val - 1) * this.length;
      this.searchProduct()
        },
    }
}
</script>
<style scoped>
.devproduct{
    height:100%;
    width:100%;
    padding:20px;
    box-sizing: border-box;
}
</style>
<style>
.devproduct .el-tabs__header {
  margin: 0;
}
.devproduct .el-tabs__item{
    font-size:16px;
    margin-top:20px;
    margin:0;
    height: 50px;
    line-height: 50px;
    font-family: auto;
}
.devproduct .el-tabs__content{
    background:#f4f4f4;
    padding:20px;
    box-sizing: border-box;
}
.devproduct .el-tab-pane{
    background:#ffffff;
}
.devproduct .procontent,.devproduct .prosecond{
    width:100%;
    padding: 20px 10px;
    box-sizing:border-box;
}
.devproduct .el-dialog{
    margin-top:5vh;
}
.devproduct .el-dialog .el-dialog__header{
    border-bottom:1px solid #cccccc
}
.devproduct .el-dialog .el-cascader,.devproduct .el-dialog .el-select{
    width:100%;
}
.devproduct .el-dialog .el-form{
    padding:0 10px;
    box-sizing:border-box;
}
.devproduct .el-dialog .el-form .el-form-item{
    margin-bottom:5px;
    
}
.devproduct .el-dialog .el-form .el-form-item__content{
    margin-left:10px;
    clear: both;
}
</style>

