<template>
    <div id="application">
            <h3>{{$t('application.applicationmanagement')}}</h3>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="$t('application.myapplication')" name="app">
                    <div class="form">
                        <div class="search">
                            <el-input v-model="name" :placeholder="$t('application.applicationname')"></el-input>
                            <el-button type="primary" @click="getAppMange(0)">{{$t('application.search')}}</el-button>
                        </div>
                        <el-button type="primary" @click="handleClickAdd">{{$t('application.newapplication')}}</el-button>
                    </div>
                    <el-table
                    :data="tableData"
                    style="width:100%;"
                    >
                        <el-table-column
                            type="selection">
                        </el-table-column>
                        <el-table-column
                            prop="productIdentifier"
                            :label="$t('application.applicationidentification')">
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            :label="$t('application.applicationname')">
                        </el-table-column>
                        <el-table-column
                            prop="scale"
                            :label="$t('application.scaleofservice')"
                            sortable>
                        </el-table-column>
                        <el-table-column
                            prop="category"
                            :label="$t('application.industrytype')">
                        </el-table-column>
                        <el-table-column
                            prop="creation_time"
                            :label="$t('application.createtime')">
                        </el-table-column>
                        <el-table-column
                            prop="operation"
                            :label="$t('developer.operation')"
                            >
                            <template slot-scope="scope">
                                <el-popover placement="top" width="300" :ref="`popover-${scope.$index}`">
                                        <p>确定删除这个{{scope.row.name}}应用吗？</p>
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
                                <el-button @click="handleClickUpdate(scope)" type="text" size="small" icon="el-icon-edit">{{$t('developer.edit')}}</el-button>
                                <el-button @click="handleClickLook(scope)" type="text" size="small" icon="el-icon-key">{{$t('application.secretkey')}}</el-button>
                                <el-button type="text" size="small" @click="handleClickVisit(scope)" >{{$t('application.visit')}}<i class="el-icon-arrow-right"></i></el-button>
                                <el-button type="text" size="small" @click="Gotoproduct(scope)">{{$t('application.detail')}}<i class="el-icon-right"></i></el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="page.currentPage"
                        :page-sizes="page.pageSizes"
                        :page-size="page.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="page.total">
                    </el-pagination>
                </el-tab-pane>
            </el-tabs>
    </div>
</template>

<script>
import { getApp,handleZero } from "@/api/applicationManagement"
import { utc2beijing } from "@/utils"
import Parse from 'parse'
export default {
    data(){
        return {
            // tab标题
            label:"我的应用",
            // 初始页
            activeName: 'app',
            // 查看模态框
            dialogVisible: false,
            // 应用名称
            name:"",
            // 分页
            page:{
                currentPage:0,
                pageSizes:[10,20,30],
                pageSize:10,
                total:0
            },
            // 提示文本
            description:"暂无数据",
            // 表格
            tableData: [],
            // 查看展开
            isShow:false,
            arr:[]
        }
    },
    created(){
        this.getAppMange();
        // this.gaiacl()
    },
    methods:{
        // 访问
    //     gaiacl(){
    //   var DataItem = Parse.Object.extend('DataItem')
    //   var dataitem = new Parse.Query(DataItem)
    //   dataitem.limit(1000)
    //   dataitem.select('objectId')
    //   dataitem.ascending('updatedAt')
    //   dataitem.find().then(resultes=>{
    //       resultes.map(items=>{
    //         this.arr.push(
    //            new Promise((resolve, reject) => {
    //           var DataItem = Parse.Object.extend('DataItem')
    //           var dataitem = new DataItem();
    //           var acl = new Parse.ACL();
    //           dataitem.id = items.id;
    //            acl.setRoleReadAccess("developer", true);
    //           acl.setRoleWriteAccess("developer", true);
    //            acl.setRoleReadAccess("electric", true);
    //           acl.setRoleWriteAccess("electric", true);
    //           dataitem.set('ACL',acl)
    //           return dataitem.save().then(
    //             resultes => {
    //               resolve(resultes);
    //             },
    //             error => {
    //               reject(error.message);
    //             }
    //           );
    //         })
    //         )
    //         Promise.all(this.arr).then(data => {

    //         }).catch(error=>{

    //         })
    //       })
    //   })
    // },
        handleClickVisit(scope){
            let index=scope.$index;
            let productIdentifier=this.tableData[index].productIdentifier;
            let url=window.location.origin+"/iot/"+productIdentifier+"#/login";
            window.open(url,"__blank");
        },
        // 查询应用信息
        getAppMange(start){
            if(start==0){
                this.page.currentPage=0
            }
            this.tableData=[]
            let where={}
             if (this.name){
                where.title=this.name;
            } 
            getApp({limit:this.page.pageSize,skip:this.page.currentPage,keys:'count(*)',where}).then(res=>{
              
                let r=res.results;
                this.label=`我的应用(${res.count})`;
                this.description=`获取${r.length}条数据`;
                this.page.total=res.count;
                for (let i=0;i<r.length;i++){
                    let obj={};
                    obj.name=r[i].title;
                    obj.objectId=r[i].objectId;
                    obj.productIdentifier=r[i].productIdentifier;
                    obj.scale=handleZero(r[i].scale);
                    obj.creation_time=utc2beijing(r[i].createdAt);
                    obj.end_time=utc2beijing(r[i].updatedAt);
                    obj.category=r[i].category;
                    obj.secret=r[i].secret;
                    obj.logo = r[i].logo
                    obj.title = r[i].title
                    obj.dashboard = r[i].dashboard
                    this.tableData.push(obj);
                }
            })
            // console.log(this.tableData)
        },
        handleSizeChange(val) {
           this.page.pageSize = val
           this.getAppMange()
        },
        handleCurrentChange(val) {
           this.page.currentPage = (val-1)*this.page.pageSize
           this.getAppMange()
        },
        // 查看
        handleClickLook(scope){
            let index=scope.$index;
            console.log(scope);
            let html=`
            <table
                class="mailtable"
                style="width:100%;"
                border="0"
                cellspacing="0"
                cellpadding="0"
              >
                <tr>
                    <td style="text-align:left;
                    color: #74777a;
                    font-weight: 400;
                    background: #fafafc;
                    width:200px;
                    font-weight:bold;">App Id:</td>
                    <td>${scope.row.objectId}</td>
                </tr>
                <tr ">
                     <td style="color: #74777a;
                    font-weight: 400;
                    background: #fafafc;
                    width:200px;
                    padding-top:20px;
                    font-weight:bold;">App Secret:
                    </td>
                    <td style="padding-top:20px;">${scope.row.secret}</td>
                </tr>
                </table>
            `;
            this.$alert(html, '应用详情', {
                dangerouslyUseHTMLString: true
            });
        },
        // 跳转新增
        handleClickAdd(){
            this.$router.push({path:"/applicationManagement/addApp",query:{page:"add",title:"新增应用"}},);
        },
        // 跳转修改
        handleClickUpdate(scope){
            let row=scope.row;
            console.log(row);
            this.$router.push({
                path:"/applicationManagement/addApp",
                query:{
                    page:"update",
                    title:"修改应用",
                    name:row.name,
                    scale:row.scale,
                    creation_time:row.creation_time,
                    end_time:row.end_time,
                    category:row.category,
                    productIdentifier:row.productIdentifier,
                    secret:row.secret,
                    objectId:row.objectId,
                    logo:row.logo,
                    dashboard:row.dashboard
                }
            });  
        },
        // 查询
        handleClickQuery(){
            let where={};
            if (this.name){
                where.title=this.name;
            } 
            getApp({limit:100,where}).then(res=>{
                // // 查询结束清空
                this.tableData=res.results;
                this.handleClickReset();
            }).catch(res=>{
                if (res.code == 1){
                    this.$message.error('字段不存在');
                }
            })
        },
        //删除应用
         makeSure(scope) {
      // 可以在这里执行删除数据的回调操作.......删除操作.....
      var App = Parse.Object.extend('App')
      var app = new App()
      app.id = scope.row.objectId
    //   app.get(scope.row.objectId).then(resultes=>{
          app.destroy().then(response=>{
              if(response){
                  this.$message({
                      type:'success',
                      message:'删除成功'
                  })
                  scope._self.$refs[`popover-${scope.$index}`].doClose();
                  this.getAppMange()
              }
          },error=>{
              this.$message({
                  type:'error',
                  message:error.message
              })
        //   })
      })
      
    },
    Gotoproduct(scope){
       this.$router.push({
            path:'/roles/product',
            query:{
                product:scope.row.productIdentifier
            }
       })
    }
  },
}
</script>

<style lang="scss" scoped>
#application {
    width: 100%;
    height:100%;
    padding:20px;
    box-sizing: border-box;
    margin: 0 auto;
    /deep/ .el-tabs {
        .el-tabs__header {
            margin:0;
            .el-tabs__item {
                font-size: 16px;
            }
        }
        .el-tabs__content {
            padding: 15px;
            background: #F4F4F4;
            .form {
                background: #fff;
                padding: 20px 15px;
                display: flex;
                justify-content: space-between;
                .search {
                    display: flex;
                    button {
                        margin-left: 5%;
                    }
                }
            }
        }
        .el-table {
            .el-divider {
                background-color:#409EFF;
                width:2px;
            }
            .el-button+.el-button{
                margin-left:0;
            }
        }
    }
    
}
</style>
