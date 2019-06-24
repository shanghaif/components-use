<template>
  <div class="menu">
    <div class="search">
      <el-input placeholder="请输入内容" v-model="search" clearable></el-input>
      <el-button
        type="primary"
        icon="el-icon-search"
        style="margin-left:20px;"
        @click="gettable"
      >搜 索</el-button>
      <el-button type="primary" icon="el-icon-plus" @click="add()">新 增</el-button>
    </div>
    <!--菜单table-->
    <!-- <div class="menutable">
       <tree-table :key="key" :default-expand-all="defaultExpandAll" :data="data" :columns="columns" border>
      <template slot="scope" slot-scope="{scope}">
        <el-tag>{{ scope.row.parentMenu}}</el-tag>
      </template>
      <template slot="operation" slot-scope="{scope}">
        <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </tree-table>
    </div> -->
    <el-dialog title="新增" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
         <el-form-item label="菜单类型">
          <el-radio-group v-model="form.resource">
            <el-radio label="目录"></el-radio>
            <el-radio label="菜单"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" v-if="form.resource=='菜单'">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="目录名称" v-if="form.resource=='目录'">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select v-model="form.topname" placeholder="请选择" style="width:100%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addmenus">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {Parse} from 'parse'
import treeTable from '@/components/TreeTable'
export default {
  data() {
    return {
      search: "",
      dialogVisible: false,
      tableData: [],
       form: {
          name: '',
          resource: '目录',
          topname:'',
          rolename:''
        },
        parent:'0',
        current:'',
        options:[],
        data:[],
        key:1,
        columns: [
        {
          label: 'Checkbox',
          checkbox: true
        },
        {
          label: '',
          key: 'name',
          expand: true
        },
        {
          label: 'ID',
          key: 'id',
          width: 200,
          align: 'left'
        },
        {
          label: '上级菜单',
          key: 'scope'
        },
        {
          label: '操作',
          key: 'operation'
        }
      ],
    };
  },
  mounted() {
  },
  methods: {
    searchvalue() {

    },
    add() {
      this.dialogVisible = true;
       var Menu = Parse.Object.extend("Menu");
       var menu = new Parse.Query(Menu);
       menu.equalTo('parentId',0)
       menu.find().then(results=>{
         console.log(results)
       })
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleClose(){
      this.dialogVisible=false
    },
    addmenus(){
            var Object = Parse.Object.extend("Menu");
            var object = new Object();
            var acl = new Parse.ACL();
              object.set("name", this.form.name);
              object.set("parentId",this.parent);
              object.set("ACL", acl);
              object.save().then(object => {
                this.centerDialogVisible = false;
            })
              .catch(console.log("error"));
    },
      gettable() {
        this.tableData = [];
        var menu = Parse.Object.extend("Menu");
        var menu = new menu();
      
            query.find().then(results => {
              this.tableData = results;
            });
    },

    handleEdit(index, row) {
       console.log(index, row);
    },
        handleDelete(index, row) {
       console.log(index, row);
    },
  }
   
};
</script>
<style scoped>
.menu {
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
