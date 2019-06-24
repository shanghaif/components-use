<template>
  <div class="structure">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <div class="head-container">
          <el-input
            v-model="deptName"
            clearable
            placeholder="输入部门名称搜索"
            prefix-icon="el-icon-search"
            style="width: 100%;"
            class="filter-item"
            @input="getDeptDatas"
          />
        </div>
        <el-tree
          :data="treeData"
          :props="defaultProps"
          :expand-on-click-node="false"
          :highlight-current="true"
          default-expand-all
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <!-- <eHeader/> -->
        <!--表格渲染-->
        <el-input
          v-model="query.value"
          clearable
          placeholder="输入关键字搜索"
          style="width: 200px;"
          class="filter-item"
        />
        <el-select
          v-model="query.type"
          clearable
          placeholder="类型"
          class="filter-item"
          style="width: 130px"
        >
          <el-option
            v-for="item in structure"
            :key="item.value"
            :label="item.name"
            :value="item.id"
          />
        </el-select>
        <el-select
          v-model="query.enabled"
          clearable
          v-for="item in structure"
          :key="item.value"
          :label="item.name"
          :value="item.id"
          placeholder="状态"
          class="filter-item"
          style="width: 90px"
        >
          <el-option/>
        </el-select>
        <el-button class="filter-item"  type="primary" icon="el-icon-search">搜索</el-button>
        <el-button class="filter-item"  type="primary" icon="el-icon-circle-plus" @click="adduser">新增用户</el-button>
        <el-table v-loading="loading" :data="dataforuser" size="small" style="width: 100%;">
          <el-table-column  label="用户名">
            <template slot-scope="scope">
              <div>{{scope.row.attributes.username}}</div>
            </template>
          </el-table-column>
         <el-table-column  label="电话">
            <template slot-scope="scope">
              <div>{{scope.row.attributes.phone}}</div>
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="邮箱">
             <template slot-scope="scope">
              <div>{{scope.row.attributes.email}}</div>
            </template>
          </el-table-column>
          <el-table-column label="部门">
            <template slot-scope="scope">
              <div>{{ scope.row.departmentname}}</div>
            </template>
          </el-table-column>
          
          <el-table-column :show-overflow-tooltip="true" label="创建日期">
            <template slot-scope="scope">
              <span>{{new Date(scope.row.createdAt).toLocaleDateString()}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="300">
            <template slot-scope="scope">
              <el-button type="success" size="small"  @click="handleEditor(scope.row)">编辑</el-button>
              <el-button type="danger" size="small"  @click="handleDetele(scope.row)">删除</el-button>
              <el-button size="mini" type="primary" @click="editorrole(scope.row.id)">分配角色</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <el-pagination
          :total="total"
          style="margin-top: 8px;"
          layout="total, prev, pager, next, sizes"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[1,5,10]"
          :page-size="pagesize"
        />
      </el-col>
      <!--分配角色-->
      <el-dialog title="分配角色" :visible.sync="roleacl">
      <el-table :data="rolelist" @selection-change="handleSelectionChange" ref="multipleTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.attributes.desc}}</span>
          </template>
        </el-table-column>
        <el-table-column label="ID" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleacl = false">取 消</el-button>
        <el-button type="primary" @click="adduseracl">确 定</el-button>
      </div>
    </el-dialog>
    </el-row>
  </div>
</template>
<script>
import Parse from 'parse'
var arr=[]
var arr1=[]
export default {
  data() {
    return {
      
      height: document.documentElement.clientHeight - 180 + "px;",
      delLoading: false,
      sup_this: this,
      loading: false,
      deptName: "",
      depts: [],
      deptId: null,
      structure: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      data:[],
      dataforuser:[],
      total: 0,
      query: {
        value: "",
        type: "",
        enabled: ""
      },
      tableData:[],
      pagesize:10,
      start:0,
      departmentid:[],
      userlist:[],
      rolelist:[],
      objectId:'',
      roleacl:false,
      multipleSelection:[]
    };
  },
  computed: {
    treeData(){
          let cloneData = JSON.parse(JSON.stringify(this.data))    // 对源数据深度克隆
          return cloneData.filter(father=>{               
            let branchArr = cloneData.filter(child=>father.objectId == child.ParentId)    //返回每一项的子级数组
            branchArr.length>0 ? father.children = branchArr : ''   //如果存在子级，则给父级添加一个children属性，并赋值
            return father.ParentId==0;      //返回第一层
          });
        },
  },
  mounted() {
    this.getDepartment()
  },
  methods: {
    queryList(json,arr) {
    for (let i = 0; i < json.length; i++) {
        let sonList = json[i].children;
        if (!sonList) {
            arr.push(json[i].objectId);
        } else {
          arr.push(json[i].objectId)
            this.queryList(sonList, arr);
        }
    }
    this.userFordepartment(this.pagesize,this.start,arr)
    return arr;
},
 editorrole(id) {
      this.userrolelist = [];
      this.objectId = id;
      this.roleacl = true;
      var User = Parse.Object.extend("_User");
      var user = new Parse.Query(User);
      user.find(this.objectId).then(resultes => {
        var Role = Parse.Object.extend("_Role");
        var query = new Parse.Query(Role);
        var user = new User();
        query.addAscending("createdAt");
        query.find().then(resultes => {
          this.rolelist = resultes;
          user.set("objectId", this.objectId);
          query.equalTo("users", user);
          query.find().then(result => {
            console.log(result);
            result.map(item=>{
              resultes.map((roleitem,index)=>{
                if(item.id==roleitem.id){
                  this.$refs.multipleTable.toggleRowSelection(this.rolelist[index],true)
                }
              })
            })
            
          });
        });
      });
    },
    adduseracl() {
      var roles = Parse.Object.extend("_Role");
      var query = new Parse.Query(roles);
      var User = Parse.Object.extend("_User");
      var user = new Parse.Query(User);
      user.get(this.objectId).then(object => {
        this.multipleSelection.map(item => {
          query.get(item).then(resultes => {
            var relation = resultes.relation("users");
            object.set("objectId", this.objectId);
            relation.add(object);
            resultes.save().then(resulte => {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.roleacl = false;
            });
          });
        });
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  //编辑
   handleEditor(row){

   },
   //删除
   handleDetele(row){
     console.log(row)
     this.$confirm('此操作将永久删除此用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           var User= Parse.Object.extend("_User");
            var user = new Parse.Query(User);
            user.get(row.id).then(object => {
              object.destroy().then(
              response => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.userFordepartment(this.pagesize,this.start,this.departmentid)
              },
              error => {
                console.log(error);
              }
            );
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
   },
    //组织架构搜索
    getDeptDatas() {},
    //组织架构点击
    handleNodeClick(row){
        var row1=[]
         arr=[]
        row1.push(row)
        this.queryList(row1,arr)
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.start = Number(val - 1) * Number(this.pagesize);
    },
    getDepartment() {
      var Department = Parse.Object.extend("Department");
      var department = new Parse.Query(Department);
      // var departmentid=[]
       department.equalTo('leafnode',false)
      department.find().then(resultes => {
      
        resultes.map(items=>{
          var obj={}
          items.createtime = new Date(items.attributes.createdAt).toLocaleDateString()
          obj.name = items.attributes.name,
          obj.ParentId = items.attributes.ParentId
          obj.objectId =items.id
          obj.level = items.attributes.level
          obj.createtime = items.createtime
          this.data.push(obj)
          this.departmentid.push(items.id)
        })
        // console.log(this.treeData)
      },
      (error=>{
           console.log(error)
           if(error.code=='209'){
             this.$message({
            type: "warning",
            message: "登陆权限过期，请重新登录"
            });
            this.$router.push({
              path:'/login'
            })
           }
         })).then(res=>{
         this.userFordepartment(this.pagesize,this.start,this.departmentid)
      })
     
    },
    userFordepartment(pagesize,start,departments){
      this.tableData = [];
      var User= Parse.Object.extend("_User");
      var query = new Parse.Query(User);
       query.limit(pagesize);
       query.skip(start);
      query.containedIn('department',departments)
      query.count().then(count => {
        if (count) {
          this.total = count;
          query.find().then(results => {
              this.tableData = results
              var Department = Parse.Object.extend("Department");
              var department = new Parse.Query(Department);
              department.find().then(resultes=>{
                this.tableData.map(items=>{
                  resultes.map(department=>{
                    if(items.attributes.department.id==department.id){
                      items.departmentname = department.attributes.name
                    }
                  })
                })
                this.dataforuser= this.tableData
              })
          });
        }else{
            this.dataforuser=[]
            this.total=0
        }
      });
    },
    adduser(){
      this.$router.push({
        path:'/roles/adduser'
      })
    }
  }
};
</script>
<style scoped>
.structure {
  width: 100%;
  min-height: 875px;
  padding: 20px;
  margin-top: 20px;
  box-sizing: border-box;
  background: #ffffff;
}
</style>
<style>
 
 .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color:#cccccc;
 }
</style>

