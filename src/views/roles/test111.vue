
<template>
  <div class="menu">
    <h2>菜单管理</h2>
    <div class="top">
      <el-button style="float:right;margin:-20px 20px 0px 0px;" type="success" plain @click="init(data)">新增一级菜单</el-button>
      <!-- <el-button style="float:right;margin:-20px 20px 0px 0px;" type="success" plain @click="getCheckedNodes">分配权限</el-button> -->
    </div>
    <div class="block" style="width:50%">
    <el-tree
      :data="data"
      show-checkbox
      node-key="key"
      defaultProps
      ref="tree"
      accordion
      :render-content="renderContent"
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span>
          <el-button
            type="text"
            size="max"
            style="margin-left:100px"
            @click="() => append(data)">
            添加权限
          </el-button>
          <el-button
            type="text"
            size="max"
            @click="() => remove(node, data)">
            删除权限
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
    <el-dialog
      title="添加权限"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
     <el-form :inline="true"  class="demo-form-inline">
        <el-form-item label="菜单名称">
          <el-input v-model="first" placeholder="菜单名称"></el-input>
        </el-form-item>
         <el-form-item label="资源链接">
          <el-input v-model="url" placeholder="资源链接"></el-input>
        </el-form-item>
      </el-form>
     
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="append(item)">确 定</el-button>
      </span>
    </el-dialog>
    <!--单个分配-->
  <el-dialog title="分配角色" :visible.sync="roleacl">
    <el-table :data="rolelist" @selection-change="handleSelectionChange" ref="multipleTable">
       <el-table-column
          type="selection"
          width="55">
       </el-table-column>
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
      <el-button type="primary" @click="addMenuacl">确 定</el-button>
    </div>
  </el-dialog>
<!--批量分配-->
<!-- <el-dialog title="分配角色" :visible.sync="allroleacl">
    <el-table :data="allrolelist" @selection-change="allhandleSelectionChange" ref="allmultipleTable">
       <el-table-column
          type="selection"
          width="55">
       </el-table-column>
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
      <el-button @click="allroleacl = false">取 消</el-button>
      <el-button type="primary" @click="alladdMenuacl">确 定</el-button>
    </div>
  </el-dialog> -->


  </div>
</template>

<script>
let id = 35
import { Parse } from 'parse'
export default {
  data () {
    return {
      multipleSelection: [],
      rolelist:[],
      roleacl:false,
      allmultipleSelection: [],
      allrolelist:[],
      allroleacl:false,
      item: {},
      nid: '',
      dialogVisible: false,
      addadmin: {},
      first: '',
      url: '',
      form: {
        region: '',
        options: []
      },
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      orderresultes:[],
      objectId:'',
      originrole:[],
      menurole:[]
    }
  },
  methods: {
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
                 label:item.attributes.name,
                 parentId:item.attributes.parentId,
                 objectId:item.id,
                 children:[]
               })
             }
           })
          //  console.log(this.data)
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
      // console.log(this.orderresultes)
      this.orderresultes.map(children=>{
        this.data.map(item=>{
          if(children.attributes.parentId==item.objectId){
            item.children.push({
              id:children.attributes.orderBy,
              label:children.attributes.name,
              parentId:children.attributes.parentId,
              objectId:children.id,
              children:[]
            })
          }
        })
      })
      // console.log(this.data)
    },
    // alladdMenuacl(){
    //     var Menu = Parse.Object.extend("Menu");
    //     var menu = new Parse.Query(Menu)
    //     var acl = new Parse.ACL();
    //     var _this=this
       
    //       _this.allrolelist.map(items=>{
    //          setTimeout(function(){
    //        menu.get(items.id).then(object=>{
    //       _this.allmultipleSelection.map(item=>{
    //       acl.setRoleReadAccess(item.attributes.name, true);
    //       acl.setRoleWriteAccess(item.attributes.name, true);
    //       object.set('ACL',acl)
    //       })
    //       object.save().then(res=>{
    //          _this.$message({
    //           type: "success",
    //           message: "添加成功!"
    //         });
    //         _this.allroleacl=false
    //         _this.getMenu()
    //       },
    //       (error=>{
    //         console.log(error)
    //       })
    //       )
    //     })
    //     },100)
    //    })
        
        
        
    // },
    init (data) {
      this.item = data
      this.dialogVisible = true
      this.first = ''
    },
    getCheckedNodes () {
      this.menurole=[]
       this.$refs.tree.getCheckedNodes().map(item=>{
         this.menurole.push(item.objectId)
       })
      this.allroleacl=true
        var roles = Parse.Object.extend("_Role");
        var query = new Parse.Query(roles);
        var Menu = Parse.Object.extend("Menu");
        var menu = new Parse.Query(Menu)
       query.find().then(resultes=>{
        this.allrolelist = resultes;
       })
    },
    editoracl(data){
      this.objectId = data.objectId
      this.roleacl=true
      this.rolelist=[]
      this.originrole=[]
       var roles = Parse.Object.extend("_Role");
       var query = new Parse.Query(roles);
        var Menu = Parse.Object.extend("Menu");
        var menu = new Parse.Query(Menu)
       query.find().then(resultes=>{
        this.rolelist = resultes;
        menu.get(this.objectId).then(res=>{
            var _this=this
            var rootrole = res.attributes.ACL.permissionsById
            Object.keys(rootrole).forEach(function(key){
              if(key=='*'){
                _this.originrole.push(key)
              }else{
                _this.originrole.push(key.substring(5))
              }
            });
            for(let i=0;i<this.rolelist.length;i++){
              if(this.originrole.includes(this.rolelist[i].attributes.name)){
                  this.$refs.multipleTable.toggleRowSelection(this.rolelist[i],true)
              }
            }
          })
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      // console.log(this.multipleSelection)
      },
      allhandleSelectionChange(val){
        this.allmultipleSelection=val
      },
      addMenuacl(){
        var Menu = Parse.Object.extend("Menu");
        var menu = new Parse.Query(Menu)
       
        menu.get(this.objectId).then(object=>{
          let acl = new Parse.ACL();
          this.multipleSelection.map(item=>{
          acl.setRoleReadAccess(item.attributes.name, true);
          acl.setRoleWriteAccess(item.attributes.name, true);
          object.set('ACL',acl)
          })
          object.save().then(res=>{
             this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.roleacl=false
            this.getMenu()
          },
          (error=>{
            console.log(error)
          })
          )
        })
      },
    append (data) {
      // console.log(data)
      
      // 添加一级权限菜单
      if (data.length >= 0) {
        console.log(this.item)
        const newChild = { id: id++, label: this.first, children: [], parentId: '0', resourceUrl: this.url,parentMenu:'顶级菜单' }
        // this.item.push(newChild)
        this.addadmin = newChild
      } else {
        console.log(this.item)
        const newChild = { id: id++, label: this.first, children: [], parentId: this.item.objectId, resourceUrl: this.url,parentMenu:this.item.label }
        // this.item.children.push(newChild)
        this.addadmin = newChild
      }
        var Menu = Parse.Object.extend("Menu");
        var menu = new Menu();
      
        menu.set('orderBy',this.addadmin.id)
        menu.set('name',this.addadmin.label)
        menu.set('parentId',this.addadmin.parentId)
        menu.set('group',this.addadmin.parentMenu)
        menu.set('url',this.url)
        acl.setRoleReadAccess('root',true);
        acl.setRoleWriteAccess('root',true);
        acl.setRoleReadAccess('admin',true);
        acl.setRoleWriteAccess('admin',true);
        menu.save().then(resultes=>{
          this.$message({
              type: "success",
              message: "添加成功!"
            });
            this.getMenu()
        })
      this.dialogVisible = false
      this.addadmin = []
    },
    remove (node, data) {
      console.log(data)
      if(data.children.length>=1){
         this.$message({
            type: "warning",
            message: "请先删除此菜单中的子菜单!"
          });
      }else{
         var Menu = Parse.Object.extend("Menu");
          var menu = new Parse.Query(Menu);
          menu.get(data.objectId).then(resultes=>{
            resultes.destroy().then(res=>{
              this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getMenu()
          })
        })
      }
    },

    renderContent (h, { node, data, store }) {
      return (
        <span class='custom-tree-node'>
          <span>{node.label}</span>
          <span>
            <el-button size='max' style='margin-left:100px' type='text' on-click={ () => this.init(data)}>新增菜单</el-button>
            <el-button size='max' type='text' on-click={ () => this.remove(node, data) }>删除菜单</el-button>
             <el-button size='max' type='text' on-click={ () => this.editoracl(data)}>分配角色</el-button>
          </span>
        </span>)
    },
    handleClose () {
      this.dialogVisible = false
    },
  },
  mounted () {
    this.getMenu()
    console.log(Parse.User.current())
  }
}

</script>
<style  scoped>
.menu{
  width: 100%;
  min-height: 875px;
  padding: 20px;
   margin-top:20px;
  box-sizing: border-box;
  background: #ffffff;
}

</style>
<style>
</style>
