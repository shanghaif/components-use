<template>
  <div class="test">
    <div class="search">
      <el-input :placeholder="$t('user.name')" v-model="search" clearable></el-input>
      <el-button type="primary" icon="el-icon-search" style="margin-left:20px;">{{$t('developer.search')}}</el-button>
      <!-- <el-button type="primary" icon="el-icon-plus" @click="dialogVisible=true">新增一级菜单</el-button> -->
    </div>
    <el-dialog :title="$t('developer.add')" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="$t('menu.menuname')">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.menupath')">
          <el-select v-model="form.menuroad" :placeholder="$t('menu.menupath')" style="width:100%">
            <el-option
              v-for="(item,index) in originmenuurl"
              :label="item.path+'--------(描述)'+item.name"
              :key="index"
              :value="item.path"
            ></el-option>
          </el-select>
          <!-- <el-input v-model="form.menuroad"></el-input> -->
        </el-form-item>
        <el-form-item :label="$t('menu.sort')">
          <el-input v-model="form.number" type="number"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.icon')">
          <el-input v-model="form.iconfont"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('developer.cancel')}}</el-button>
        <el-button type="primary" @click="standardName">{{$t('developer.determine')}}</el-button>
      </span>
    </el-dialog>
    <tree-table
      :key="key"
      :default-expand-all="defaultExpandAll"
      :data="treeData"
      :columns="columns"
      border
      style="margin-top:20px;"
    >
      <template slot="number" slot-scope="{scope}">
        <span>{{scope.row.number}}</span>
      </template>
      <template slot="showtopmenu" slot-scope="{scope}">
        <span>{{scope.row.showtopmenu}}</span>
      </template>
       <template slot="icon" slot-scope="{scope}">
         <span class="svg-container">
             <svg-icon :icon-class="scope.row.icon" />
           </span>
      </template>
      <template slot="operation" slot-scope="{scope}">
        <el-button size="mini" type="primary" icon="el-icon-plus" @click="addmenus(scope.row)">{{$t('menu.childrenmenu')}}</el-button>
        <el-button
          size="mini"
          type="success"
          icon="el-icon-edit"
          @click="handleEdit(scope.row)"
          v-if="scope.row.objectId!=0"
        >{{$t('developer.edit')}}</el-button>
        <el-button
          size="mini"
          type="danger"
          icon="el-icon-delete"
          @click="handleDelete(scope.row)"
          v-if="scope.row.objectId!=0"
        >{{$t('developer.delete')}}</el-button>
      </template>
    </tree-table>
    <!--编辑菜单-->
    <el-dialog :title="$t('developer.edit')" :visible.sync="MenuEdit">
      <el-form :model="MenuForm">
        <el-form-item :label="$t('menu.menuname')" :label-width="formLabelWidth">
          <el-input v-model="MenuForm.name" autocomplete="off" style="width:300px;"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.menupath')" :label-width="formLabelWidth">
          <el-input v-model="MenuForm.url" autocomplete="off" style="width:300px;" disabled></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.parentmenu')" :label-width="formLabelWidth">
          <el-cascader
            v-model="MenuForm.fathername"
            :options="treeData"
            :props="props"
            clearable
            :show-all-levels="false"
            change-on-select
            style="wdith:300px"
          ></el-cascader>
        </el-form-item>
        <el-form-item :label="$t('menu.sort')" :label-width="formLabelWidth">
          <el-input v-model="MenuForm.number" autocomplete="off" style="width:300px;" type="number"></el-input>
        </el-form-item>
        <el-form-item :label="$t('menu.Navigation')" :label-width="formLabelWidth">
          <el-select
            v-model="MenuForm.roles"
            multiple
            :placeholder="$t('menu.text')"
            style="width:300px;"
            @change="SelectTopmenu"
            @remove-tag="removerole"
          >
            <el-option
              v-for="item in options"
              :key="item.name"
              :label="item.alias"
              :value="item.objectId"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="MenuEdit = false">{{$t('developer.cancel')}}</el-button>
        <el-button type="primary" @click="updatemenu">{{$t('developer.determine')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
import treeTable from "@/components/TreeTable";
import data from "./data";
import { Parse } from "parse";
import { setTimeout } from "timers";
import { resolve } from "q";
import { utc2beijing } from "@/utils";
export default {
  name: "TreeTableDemo",
  components: { treeTable },
  data() {
    return {
      MenuForm: {
        name: "",
        url: "",
        // switch:false,
        roles: [],
        number: "",
        fathername: []
      },
      props: {
        value: "objectId",
        label: "name",
        children: "children"
      },
      options: [],
      formLabelWidth: "120px",
      MenuEdit: false,
      defaultExpandAll: true,
      showCheckbox: true,
      key: 1,
      columns: [
        {
          label: "Menu name",
          key: "name",
          expand: true,
          align: "left"
        },
        {
          label: "Menu path",
          key: "url",
          width: 200,
          expand:true,
          align: "center"
        },
        {
          label: "Navigation",
          key: "showtopmenu",
          expand:true,
          align: "center"
        },
        {
          label: "Index",
          key: "number",
          expand:true,
          width: 100
        },
        {
          label: "Icon",
          key: "icon",
          expand:true,
          width: 100
        },
        {
          label: "Created time",
          key: "createtime",
          align: "center"
        },
        {
          label: "Operation",
          key: "operation",
          width: 400
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
        menuroad: "",
        iconfont: "",
        number: ""
      },
      parent: "",
      current: "",
      parentmenu: [
        {
          id: "0",
          attributes: {
            name: "顶级菜单"
          }
        }
      ],
      originacl: [],
      menuid: "",
      originmenuurl: [],
      isaddmenu: true
    };
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
  computed: {
    treeData() {
      let cloneData = JSON.parse(JSON.stringify(this.data));
      var Tree = []; // 对源数据深度克隆
      Tree = cloneData.filter(father => {
        let branchArr = cloneData.filter(
          child => father.objectId == child.parent
        ); //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
        father.parent == 0 ? (father.parent = "0") : "";
        return father.parent == 0; //返回第一层
      });
      return [
        {
          name: "一级菜单",
          objectId: "0",
          children: Tree
        }
      ];
    }
  },
  mounted() {
    this.getMenu();
    this.originmenuurl = [];
    this.getoriginmenu(this.$router.options.routes);
    this.getRole();
  },
  methods: {
    getRole() {
      var roles = Parse.Object.extend("_Role");
      var query = new Parse.Query(roles);
      query.find().then(resultes => {
        resultes.map(item => {
          var obj = {};
          obj.objectId = item.id;
          obj.alias = item.attributes.alias;
          obj.name = item.attributes.name;
          this.options.push(obj);
        });
      });
    },
    SelectTopmenu(val) {
      console.log(val);
    },
    getoriginmenu(menu) {
      menu.map(items => {
        if (!items.hidden && items.path) {
          if(items.path!='/'){
               var obj = {};
              obj.path = items.path;
              obj.name = items.name;
              this.originmenuurl.push(obj);
              }
          if (items.children) {
            this.getoriginmenu(items.children);
          }
        }
      });
    },
    //编辑菜单
    menuget() {
      for (var i = 0; i < this.$router.options.routes.length; i++) {
        if (
          !this.$router.options.routes[i].hidden &&
          this.$router.options.routes[i].children
        ) {
          this.originmenuurl.push(this.$router.options.routes[i]);
        }
      }
    },
 
    updatemenu() {
      var Menu = Parse.Object.extend("Menu");
      var menu = new Parse.Query(Menu);
      var parent = new Menu();
      menu.get(this.menuid).then(resultes => {
        resultes.set("name", this.MenuForm.name);
        resultes.set("orderBy", Number(this.MenuForm.number));
        parent.id = this.MenuForm.fathername[
          this.MenuForm.fathername.length - 1
        ];
        resultes.set("parent", parent);
        resultes.save().then(res => {
          Promise.all([
            this.MenuForm.roles.map(items => this.getuseracl(resultes,items))
          ]).then(data => {
            this.$message({
              message: "修改成功",
              type: "success"
            });
             this.MenuEdit = false;
            this.menuid = "";
            this.getMenu();
           
          })
        });
      });
    },
    getuseracl(resultes,objectId) {
      var Roles = Parse.Object.extend("_Role");
      var roles = new Parse.Query(Roles);
      roles.get(objectId).then(res => {
        var relation = res.relation("menus");
        resultes.set("objectId", this.objectId);
        relation.add(resultes);
        res.save().then(result => {});
      });
    },
    //新增菜单
    removerole(val) {
      var Roles = Parse.Object.extend("_Role");
      var roles = new Parse.Query(Roles);
      var Menu = Parse.Object.extend("Menu");
      var menu = new Parse.Query(Menu);
      roles.get(val).then(res => {
        menu.get(this.menuid).then(resultes => {
          var relation = res.relation("menus");
          resultes.set("objectId", this.menuid);
          relation.remove(resultes);
          res.save().then(response => {});
        });
      });
    },
    standardName() {
      this.isaddmenu = true;
      this.data.map(item => {
        if (item.url == this.form.menuroad) {
          this.$message({
            message: "此菜单路径已被选择",
            type: "error"
          });
          this.isaddmenu = false;
          return this.isaddmenu;
        }
      });
 
      if (this.menuid == "" && this.isaddmenu) {
        var Object = Parse.Object.extend("Menu");
        var object = new Object();
        var acl = new Parse.ACL();
        object.set("name", this.form.name);
        var parent = new Object();
        parent.id = "0";
        object.set("parent", parent);
        object.set("url", this.form.menuroad);
        object.set("icon", this.form.iconfont);
        object.set("orderBy", Number(this.form.number));
        this.options.map(items => {
          acl.setRoleReadAccess(items.name, true);
          acl.setRoleWriteAccess(items.name, true);
        });
        acl.setRoleReadAccess("root", true);
        acl.setRoleWriteAccess("root", true);
        acl.setRoleReadAccess("admin", true);
        acl.setRoleWriteAccess("admin", true);
        object.set("ACL", acl);
        object.save().then(object => {
          this.$message({
            message: "新增成功",
            type: "success"
          });
 
          this.dialogVisible = false;
          this.menuid = "";
          this.getMenu();
        }),
          error => {
            console.log("error");
          };
      } else if (this.menuid != "" && this.isaddmenu) {
        var Object = Parse.Object.extend("Menu");
        var object = new Object();
        var acl = new Parse.ACL();
        object.set("name", this.form.name);
        var parent = new Object();
        parent.id = this.menuid;
        object.set("parent", parent);
        object.set("url", this.form.menuroad);
        object.set("icon", this.form.iconfont);
        object.set("orderBy", Number(this.form.number));
        this.options.map(items => {
          acl.setRoleReadAccess(items.name, true);
          acl.setRoleWriteAccess(items.name, true);
        });
        acl.setRoleReadAccess("root", true);
        acl.setRoleWriteAccess("root", true);
        acl.setRoleReadAccess("admin", true);
        acl.setRoleWriteAccess("admin", true);
        object.set("ACL", acl);
        object.save().then(object => {
          this.$message({
            message: "新增成功",
            type: "success"
          });
 
          this.dialogVisible = false;
          this.getMenu();
        }),
          error => {
            console.log("error");
          };
      }
 
      // this.parentid=obj.id;
      // this.originrole.push(obj)
    },
    reset() {
      ++this.key;
    },
    click(scope) {
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
    getParent(data2, nodeId2, arrRes) {
      data2.map(items => {
        if (items.objectId == nodeId2) {
          arrRes.push(items.objectId);
          this.getParent(data2, items.parent, arrRes);
        } else if (items.parent == 0 && items.objectId == nodeId2) {
          arrRes.push(items.objectId);
        }
      });
      if (arrRes.length >= 1 && arrRes[0] != 0) {
        arrRes.unshift("0");
      }
      //  console.log(arrRes)
      return arrRes;
    },
    //编辑菜单点击
    handleEdit(row) {
      var arr1 = [];
      this.menuid = row.objectId;
      this.objectId = row.objectId;
      var Menu = Parse.Object.extend("Menu");
      var menu = new Parse.Query(Menu);
      menu.get(row.objectId).then(resultes => {
        this.MenuEdit = true;
        this.MenuForm.name = resultes.attributes.name;
        this.MenuForm.url = resultes.attributes.url;
        this.MenuForm.number = resultes.attributes.orderBy;
        this.MenuForm.fathername = this.getParent(this.data, row.parent, arr1);
        this.MenuForm.roles = row.showobjectId;
        console.log(this.MenuForm.roles);
      });
    },
    //删除菜单
    handleDelete(row) {
      if (!row.children) {
        var Menu = Parse.Object.extend("Menu");
        var menu = new Parse.Query(Menu);
        menu.get(row.objectId).then(resultes => {
          resultes.destroy().then(res => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.getMenu();
          });
        });
      } else {
        this.$message({
          type: "warning",
          message: "请先删除此菜单中的子菜单!"
        });
      }
    },
    searchvalue() {},
    handleClose() {
      this.dialogVisible = false;
    },
    addmenus(row) {
      this.dialogVisible = true;
      this.menuid = row.objectId;
    },
    getMenu() {
      this.data = [
        {
          name: "顶级菜单",
          objectId: "0",
          parent: "111"
        }
      ];
      //  this.data=[]
      var Menu = Parse.Object.extend("Menu");
      var menu = new Parse.Query(Menu);
      menu.ascending("orderBy");
      menu.find().then(
        resultes => {
          resultes.map(items => {
            var obj = {};
            obj.name = items.attributes.name;
            obj.objectId = items.id;
            obj.icon = items.attributes.icon;
            obj.parent = items.attributes.parent.id;
            obj.createtime = utc2beijing(items.attributes.createdAt);
            obj.number = items.attributes.orderBy;
            obj.url = items.attributes.url;
            obj.isshowtop = [];
            obj.showobjectId = [];
            obj.showtopmenu = "";
            // console.log(items.attributes.navShow)
            if (items.attributes.navShow) {
              items.attributes.navShow.map(navshow => {
                var roleobj = {};
                roleobj.name = navshow.alias;
                roleobj.value = navshow.roleId;
                obj.isshowtop.push(navshow.alias);
                obj.showobjectId.push(navshow.roleId);
              });
              obj.showtopmenu = obj.isshowtop.join(",");
 
              this.data.push(obj);
            } else {
              this.data.push(obj);
            }
          });
          console.log(this.treeData);
        },
        error => {
          console.log(error);
          if (error.code == "209") {
            this.$message({
              type: "warning",
              message: "登陆权限过期，请重新登录"
            });
            this.$router.push({
              path: "/login"
            });
          }
        }
      );
    }
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
.test .el-cascader .el-input {
  width: 300px;
}
</style>