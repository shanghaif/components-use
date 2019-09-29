<template>
    <div class="resource1" style="border-left:38px solid #1579bf;padding-left:10px;">
        <div>
            <el-input v-model="search" placeholder="" style="width:150px"></el-input>
            <el-button type="primary" @click="search" size="mini">搜索</el-button>
            <el-button type="primary" @click="reset" size="mini">重置</el-button>
            <el-tree
              :props="defaultProps"
              :expand-on-click-node="false"
              :highlight-current="true" 
              lazy
              :load="getOrgList"
              @node-click="handleNodeClick"
              style="margin-top:20px;"
            >
             <span slot-scope="{ node,data}">
              <img :src='imgsrc' style="width:20px;height:20px;" v-if="data.icon=='集中器'">
              <img :src='imgsrc1' style="width:20px;height:20px;" v-else-if="data.icon=='省电力公司'">
              <img :src='imgsrc2' style="width:20px;height:20px;" v-else-if="data.icon=='供电局'">
              <img :src='imgsrc3' style="width:20px;height:20px;" v-else-if="data.icon=='变压器'">
              <img :src='imgsrc4' style="width:20px;height:20px;" v-else-if="data.icon=='线路'">
              <img :src='imgsrc5' style="width:20px;height:20px;" v-else-if="data.icon=='电表'">
               <span style="padding-left: 4px;" v-if="data.icon=='集中器'">(集中器){{node.label}}</span>
              <span style="padding-left: 4px;" v-else-if="data.icon=='电表'">(电能表){{node.label+'[pn:'+data.pn+']'}}</span>
              <span style="padding-left: 4px;" v-else>{{node.label}}</span>
            </span>
            </el-tree>
        </div>
    </div>
</template>
<script>
import Parse from 'parse'
export default {
   name:'Resource1',
//    props:['data'],
   data() {
      return {
      imgsrc: require("../../imgages/Artboard5.png"),
      imgsrc1:require("../../imgages/Artboard1.png"),
      imgsrc2:require("../../imgages/Artboard4.png"),
      imgsrc3:require("../../imgages/Artboard3.png"),
      imgsrc4:require("../../imgages/Artboard2.png"),
      imgsrc5:require("../../imgages/Artboard6.png"),
      search:'',
        defaultProps: {
          isLeaf: 'leaf',
          children: "children",
          label: "name",
      },
      data:[],
      }
   },
   watch:{
       
   },
   computed: {
    // treeData() {
    //   console.log(this.data)
    //   let cloneData = JSON.parse(JSON.stringify(this.data)); // 对源数据深度克隆
    //   return cloneData.filter(father => {
    //     let branchArr = cloneData.filter(
    //       child => father.objectId == child.ParentId
    //     ); //返回每一项的子级数组
    //     branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
    //     return father.ParentId == 0; //返回第一层
    //   });
    // },
  },
   mounted() {
   },
   methods: {
     search(){
       this.$emit('user',this.search)
     },
     reset(){
       this.search=''
       this.$emit('reset',this.search)
     },
     getOrgList(node,resolve) {
               if (node.level === 0) {
                 this.data=[]
                var Department = Parse.Object.extend("Department");
                var department = new Parse.Query(Department);
                department.equalTo('ParentId','0')
                department.find().then(
                  resultes => {
                    resultes.map(items => {
                      var obj = {};
                      items.createtime = new Date(
                        items.attributes.createdAt
                      ).toLocaleDateString();
                      (obj.name = items.attributes.name),
                        (obj.ParentId = items.attributes.ParentId);
                      obj.objectId = items.id;
                      obj.level = items.attributes.level;
                      obj.createtime = items.createtime;
                      obj.alias = items.attributes.alias;
                      obj.leaf = items.attributes.leafnode;
                      obj.icon = items.attributes.org_type;
                      obj.isvcon =false
                      this.data.push(obj);
                    });
                     return resolve(this.data);
                  },
                  error => {
                    resolve([])
                     if(error.code=='209'){
                      this.$message({
                      type: "warning",
                      message: "登陆权限过期，请重新登录"
                      });
                      this.$router.push({
                        path:'/login'
                      })
                    }else if(error.code==119){
                        this.$message({
                          type:'error',
                          message:'没有操作权限'
                        })
                      }
                  }
                );
               
                }else if(node.level !== 0&&node.data.icon!=='集中器'&&node.data.isvcon==false){
                  this.data=[]
                var Department = Parse.Object.extend("Department");
                var department = new Parse.Query(Department);
                department.equalTo('ParentId',node.data.objectId)
                department.ascending('org_type')
                department.limit(10000)
                department.find().then(
                  resultes => {
                    resultes.map(items => {
                      var obj = {};
                      items.createtime = new Date(
                        items.attributes.createdAt
                      ).toLocaleDateString();
                      (obj.name = items.attributes.name),
                        (obj.ParentId = items.attributes.ParentId);
                      obj.objectId = items.id;
                      obj.level = items.attributes.level;
                      obj.createtime = items.createtime;
                      obj.alias = items.attributes.alias;
                      if(items.attributes.leafnode==true){
                        obj.isvcon =true 
                        // obj.leaf = false;
                      }else{
                        obj.isvcon =false
                        // obj.leaf =true;
                      }
                      obj.leaf = false;
                      obj.icon = items.attributes.org_type;
                      this.data.push(obj);
                    });
                     return resolve(this.data);
                  },
                  error => {
                    resolve([])
                    if(error.code=='209'){
                      this.$message({
                      type: "warning",
                      message: "登陆权限过期，请重新登录"
                      });
                      this.$router.push({
                        path:'/login'
                      })
                    }else if(error.code==119){
                        this.$message({
                          type:'error',
                          message:'没有操作权限'
                        })
                      }
                  }
                );
        
            }else if(node.level !== 0&&node.data.icon!=='集中器'&&node.data.isvcon==true){
              this.data=[]
              var Vcon = Parse.Object.extend('Vcon')
              var vcon = new Parse.Query(Vcon)
             var Department = Parse.Object.extend("Department");
                var department = new Department();
                department.id = node.data.objectId
              var devobjectId = [];
                devobjectId.push(node.data.objectId);
                vcon.equalTo("organization", department)
                vcon.limit(10000)
                vcon.find().then(resultes=>{
                  resultes.map(items=>{
                    var obj={}
                      items.createtime = new Date(
                        items.attributes.createdAt
                      ).toLocaleDateString();
                      obj.objectId = items.id;
                      obj.createtime = items.createtime;
                      obj.level = items.attributes.level;
                      obj.alias = items.attributes.vcaddr;
                      obj.leaf = true;
                      obj.icon = '集中器';
                      obj.isvcon=true
                      obj.name = items.attributes.vcaddr
                      this.data.push(obj);        
                      if (items.attributes.jsondata.cur_status) {
                        obj.cur_status = items.attributes.jsondata.cur_status;
                      } else {
                        obj.cur_status = 0;
                      }
                  })
                  return resolve(this.data);
                })
            }
            // else if(node.level !== 0 && node.data.icon==='集中器'){
            //   this.data=[]
            //   console.log(node.data.name)
            //     var devobjectId = [];
            //     devobjectId.push(node.data.objectId);
            //   var Smartmeter = Parse.Object.extend("Smartmeter");
            //   var smartmeter = new Parse.Query(Smartmeter);
            //   smartmeter.containedIn("organization", devobjectId)
            //   smartmeter.greaterThan("pn",0);
            //   smartmeter.ascending("pn");
            //   smartmeter.limit(10000);
            //   smartmeter.find().then(resultes=>{
            //      resultes.map(items => {
            //           var obj = {};
            //           items.createtime = new Date(
            //             items.attributes.createdAt
            //           ).toLocaleDateString();
            //           obj.objectId = items.id;
            //           obj.createtime = items.createtime;
            //           obj.alias = items.attributes.addr_web;
            //           obj.name = items.attributes.addr_web;
            //           obj.icon = '电表';
            //           obj.pn = items.attributes.pn;
            //           obj.leaf = true;
            //           if (items.attributes.jsondata.cur_status) {
            //             obj.cur_status = items.attributes.jsondata.cur_status;
            //           } else {
            //             obj.cur_status = 0;
            //           }
            //           this.data.push(obj);
            //         });
            //          return resolve(this.data);
            //   },error=>{
            //           resolve([])
            //         if(error.code=='209'){
            //           this.$message({
            //           type: "warning",
            //           message: "登陆权限过期，请重新登录"
            //           });
            //           this.$router.push({
            //             path:'/login'
            //           })
            //         }else if(error.code==119){
            //             this.$message({
            //               type:'error',
            //               message:'没有操作权限'
            //             })
            //           }
            //   })
            // }
            },
        handleNodeClick(row) {
            this.$emit('meterdetail',row);
        },
   }
}
</script>
<style>
.resource1 .el-input__inner{
  height: 26px;
  border-radius: 0;
  line-height: 26px;
  width: 150px;
}
</style>