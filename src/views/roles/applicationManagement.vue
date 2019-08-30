<template>
    <div id="application">
            <h3>应用管理</h3>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="label" name="app">
                    <div class="form">
                        <div class="search">
                            <el-input v-model="name" placeholder="请输入应用名称"></el-input>
                            <el-button type="primary" @click="getAppMange(0)">搜索</el-button>
                        </div>
                        <el-button type="primary" @click="handleClickAdd">新增应用</el-button>
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
                            label="应用标识">
                        </el-table-column>
                        <el-table-column
                            prop="title"
                            label="应用名称">
                        </el-table-column>
                        <el-table-column
                            prop="scale"
                            label="服务规模"
                            sortable>
                        </el-table-column>
                        <el-table-column
                            prop="category"
                            label="所属行业">
                        </el-table-column>
                        <el-table-column
                            prop="creation_time"
                            label="创建时间">
                        </el-table-column>
                        <el-table-column
                            prop="operation"
                            label="操作"
                            >
                            <template slot-scope="scope">
                                <el-button @click="handleClickUpdate(scope)" type="text" size="small">编辑</el-button>
                                <el-button @click="handleClickLook(scope)" type="text" size="small">密钥</el-button>
                                <el-button type="text" size="small" @click="handleClickVisit(scope)">访问</el-button>
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
        }
    },
    created(){
        this.getAppMange();
    },
    methods:{
        // 访问
        handleClickVisit(scope){
            let index=scope.$index;
            let productIdentifier=this.tableData[index].productIdentifier;
            let url=window.location.origin+"/iot/"+productIdentifier+"/#/login";
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
            // padding: 0 15px;
            // th{
            //     text-align: center;
            // }
            .el-divider {
                background-color:#409EFF;
                width:2px;
            }
        }
    }
    
}
</style>
