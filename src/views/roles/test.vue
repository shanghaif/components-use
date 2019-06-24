<template>
  <div class="test">
    <div class="search">
      <el-input placeholder="请输入内容" v-model="search" clearable></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left:20px;"
      >搜 索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="add()">新 增</el-button>
    </div>
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.topname" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in parentmenu"
              :key="item.value"
              :label="item.attributes.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单路径">
          <el-input v-model="form.menuroad"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="standardName">确 定</el-button>
      </span>
    </el-dialog>
    <tree-table
      :key="key"
      :default-expand-all="defaultExpandAll"
      :data="data"
      :columns="columns"
      border
      style="margin-top:20px;"
      >
      <template slot="scope" slot-scope="{scope}">
        <el-tag>{{ scope.row.parentMenu}}</el-tag>
      </template>
      <template slot="operation" slot-scope="{scope}">
        <el-button size="mini" type="success" icon="el-icon-edit" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </tree-table>
    <!--编辑菜单-->
    <el-dialog title="编辑菜单" :visible.sync="MenuEdit">
      <el-form :model="MenuForm">
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="MenuForm.name" autocomplete="off" style="width:300px;"></el-input>
        </el-form-item>
         <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="MenuForm.url" autocomplete="off" style="width:300px;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="MenuEdit = false">取 消</el-button>
        <el-button type="primary" @click="updatemenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import treeTable from "@/components/TreeTable";
import data from "./data";
import { Parse } from 'parse';
export default {
  name: "TreeTableDemo",
  components: { treeTable },
  data() {
    return {
      MenuForm:{
        name:'',
        url:'',
      },
      formLabelWidth:'120px',
      MenuEdit:false,
      defaultExpandAll: false,
      showCheckbox: true,
      key: 1,
      columns: [
        {
          label: "菜单名称",
          key: "name",
          expand: true,
          align: "left"
        },
        {
          label: "ID",
          key: "objectId",
          width: 200,
          align: "center"
        },
        {
          label: "上级菜单",
          key: "scope"
        },
        {
          label: "创建时间",
          key: 'createtime',
          align: "center"
        },
        {
          label: "操作",
          key: "operation"
        }
      ],
      data: [],
      search: "",
      dialogVisible: false,
      tableData: [],
      form: {
        name: "",
        resource: "菜单",
        topname: "",
        menuroad: ""
      },
      parent: "",
      current: "",
      options: [],
      parentmenu:[{id:'0',attributes:{
        name:'顶级菜单'
      }}],
      originacl:[]
    };
    menuid:''
  },
  watch: {
    showCheckbox(val) {
      if (val) {
        this.columns.unshift({
          label: "Checkbox",
          checkbox: true
        });
      } else {
        this.columns.shift();
      }
      this.reset();
    }
  },
  mounted(){
    this.getMenu()
    console.log()
    
  },
  methods: {
    //编辑菜单
    updatemenu(){
         var Menu = Parse.Object.extend("Menu");
          var menu = new Parse.Query(Menu);
          menu.get(this.menuid).then(resultes=>{
           resultes.set('name',this.MenuForm.name)
           resultes.set('url',this.MenuForm.url)
           resultes.save().then(res=>{
             this.$message({
                message: "修改成功",
                  type: "success"
             })
             this.MenuEdit=false
             this.getMenu()
           })
        })
    },
    getuseracl(){
       var rootrole=Parse.User.current().attributes.ACL.permissionsById
       var _this = this 
       Object.keys(rootrole).forEach(function(key) {
            if (key == "*") {
              _this.originacl.push(key);
            } else if(key.indexOf('root')>-1){
              _this.originacl.push(key.substring(5));
            }
          });
    },
    standardName(){
         let obj = {};
         if(this.form.topname==0){
           obj={id:'0',attributes:{
            name:'顶级菜单'
          }}
         }else{
            obj = this.parentmenu.find((item)=>{//这里的selectList就是上面遍历的数据源
          return item.id ===this.form.topname ;//筛选出匹配数据
          });
         }
            var Object = Parse.Object.extend("Menu");
            var object = new Object();
              var acl = new Parse.ACL()
              object.set("name", this.form.name);
              object.set("parentId",obj.id);
              object.set('group',obj.attributes.name)
              // this.originacl.map(item=>{
              //   acl.setRoleReadAccess(item,true)
              //   acl.setRoleWriteAccess(item,true)
              // })
              acl.setRoleReadAccess('root',true);
              acl.setRoleWriteAccess('root',true);
              acl.setRoleReadAccess('admin',true);
              acl.setRoleWriteAccess('admin',true);
              object.save().then(object => {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                
                this.dialogVisible = false;
                this.getMenu()
            })
              ,(error=>{
                (console.log("error"));
              })
      // this.parentid=obj.id;
      // this.originrole.push(obj)
    },
    reset() {
      ++this.key;
    },
    click(scope) {
      console.log(scope);
      const row = scope.row;
      const message = Object.keys(row)
        .map(i => {
          return `<p>${i}: ${row[i]}</p>`;
        })
        .join("");
      this.$notify({
        title: "Success",
        dangerouslyUseHTMLString: true,
        message: message,
        type: "success"
      });
    },
    //编辑菜单点击
    handleEdit(row) {
      this.menuid = row.objectId
         var Menu = Parse.Object.extend("Menu");
          var menu = new Parse.Query(Menu);
          menu.get(row.objectId).then(resultes=>{
            console.log(resultes)
            this.MenuEdit = true
            this.MenuForm.name = resultes.attributes.name
            this.MenuForm.url = resultes.attributes.url
        })
    },
    //删除菜单
    handleDelete( row) {
      if(row.children.length==0){
            var Menu = Parse.Object.extend("Menu");
          var menu = new Parse.Query(Menu);
          menu.get(row.objectId).then(resultes=>{
            resultes.destroy().then(res=>{
              this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getMenu()
          })
        })
      }else{
         this.$message({
            type: "warning",
            message: "请先删除此菜单中的子菜单!"
          });
      }
    },
     searchvalue() {

    },
    add() {
      this.dialogVisible = true;
       var Menu = Parse.Object.extend("Menu");
       var menu = new Parse.Query(Menu);
       menu.equalTo('parentId','0')
       menu.find().then(results=>{
         results.map(items=>{
           this.parentmenu.push(items)
         })
       })
    },
    handleClose(){
      this.dialogVisible=false
    },
    addmenus(){
            
    },
      getMenu(){
         var Menu = Parse.Object.extend("Menu");
         var menu = new Parse.Query(Menu)
         menu.find().then(resultes=>{
           this.data=[]
           this.orderresultes = resultes
           resultes.map(item=>{
             if(item.attributes.parentId==0){
               this.data.push({
                 id:item.attributes.orderBy,
                 name:item.attributes.name,
                 parentMenu:item.attributes.group,
                 parentId:item.attributes.parentId,
                 objectId:item.id,
                 children:[],
                 createtime:new Date(item.createdAt).toLocaleDateString()
               })
             }
           })
         this.Menus()
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
         }))
          
    },
    Menus(){
      this.orderresultes.map(children=>{
        this.data.map(item=>{
          if(children.attributes.parentId==item.objectId){
            item.children.push({
              id:children.attributes.orderBy,
              name:children.attributes.name,
              parentMenu:children.attributes.group,
              parentId:children.attributes.parentId,
              objectId:children.id,
              children:[],
              createtime:new Date(children.createdAt).toLocaleDateString()
            })
          }
        })
      })
    },
  }
};
</script>

<style scoped>
.test {
  width: 100%;
  min-height: 875px;
  padding: 20px;
  box-sizing: border-box;
  background: #ffffff;
}
.option-item {
  display: inline-block;
  margin-right: 15px;
}
</style>
<style>
.test .search .el-input {
  width: 200px;
}
</style>

