<template>
  <div class="metersearch">
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
          @node-click="handleNodeClick"
        />
      </el-col>
      <el-col :xs="24" :sm="24" :md="20" :lg="20" :xl="20">
        <div class="topsearch">
          <el-input placeholder="请输入内容" v-model="metersearch" style="margin-left:30px;width:300px">
            <el-button slot="append" icon="el-icon-search" @click="getinformation()"></el-button>
          </el-input>
          <el-button
            type="primary"
            icon="el-icon-plus"
            style="margin-right:20px;
        float:right"
            @click="addhubiaometer"
          >新增</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData3"
          tooltip-effect="dark"
          style="width:100%;margin-top:30px;text-align:center;"
          highlight-current-row
          class="tb-edit"
          border
        >
          <!-- <el-table-column type="selection" align="center"></el-table-column> -->
          <el-table-column label="集中器地址" align="center" width="180">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.vcaddr_web"
                placeholder="请输入内容"
                disabled
                @change="handleEdit(scope.row)"
              ></el-input>
              <span>{{scope.row.vcaddr_web}}</span>
            </template>
          </el-table-column>
          <el-table-column label="电表地址" align="center" width="200">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.addr_web"
                placeholder="请输入内容"
                disabled
                @change="handleEdit(scope.row)"
              ></el-input>
              <span>{{scope.row.addr_web}}</span>
            </template>
          </el-table-column>
          <el-table-column label="Ⅱ采地址" align="center" width="200">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.deveui"
                placeholder="请输入内容"
                @change="handleEdit(scope.row)"
              ></el-input>
              <span>{{scope.row.deveui}}</span>
            </template>
          </el-table-column>
          <el-table-column label="台区" align="center" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.tq"
                placeholder="请输入内容"
                @change="handleEdit(scope.row)"
              ></el-input>
              <span>{{scope.row.tq}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户编号" align="center" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.yhabh"
                placeholder="请输入内容"
                @change="handleEdit(scope.row)"
              ></el-input>
              <span>{{scope.row.yhabh}}</span>
            </template>
          </el-table-column>
          <el-table-column label="pn" align="center" width="100">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.pn"
                placeholder="请输入内容"
                @change="handleEdit(scope.row)"
              ></el-input>
              <span>{{scope.row.pn}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户名称" align="center">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.yhmc"
                placeholder="请输入内容"
                @change="handleEdit(scope.row)"
              ></el-input>
              <span>{{scope.row.yhmc}}</span>
            </template>
          </el-table-column>
          <el-table-column label="用户地址" align="center" show-overflow-tooltip width="200">
            <template slot-scope="scope">
              <el-input
                size="small"
                v-model="scope.row.yhdz"
                placeholder="请输入内容"
                @change="handleEdit(scope.row)"
              ></el-input>
              <span>{{scope.row.yhdz}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
                    label="通道类型"
                    align="center"
                    >
                    <template slot-scope="scope">
                        <span v-if="scope.row.usercase==1">载波通道</span>
                        <span v-if="scope.row.usercase!=1">虚拟通道</span>
                    </template>
          </el-table-column>-->
          <el-table-column prop label="操作" width="200" align="center">
            <template slot-scope="scope">
              <!-- <el-button size="mini" @click="ammeterdetail(scope.row)">电表详情</el-button> -->
              <el-button size="mini" type="success" @click="editorMeter(scope.row)">保 存</el-button>
              <el-button size="mini" type="danger" @click="deleteMeter(scope.row)">删 除</el-button>
              <!-- <el-button 
                        size="mini"
                        @click="gotodetail(scope.row)"
                        >
                            查看任务
              </el-button>-->
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 25, 50, 100]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            style="margin-top:30px;"
          ></el-pagination>
        </div>
      </el-col>
    </el-row>
    <!--新增框-->
    <el-dialog title="新增户表" :visible.sync="addmeter" width="50%">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="省份">
          <el-input v-model="ruleForm.province" placeholder="请输入省份"></el-input>
        </el-form-item>
        <el-form-item label="市级">
          <el-input v-model="ruleForm.city" placeholder="请输入市"></el-input>
        </el-form-item>
        <el-form-item label="用户编号" prop="yhabh">
          <el-input v-model="ruleForm.yhabh"></el-input>
        </el-form-item>
        <el-form-item label="出厂编号" prop="ccbh">
          <el-input v-model="ruleForm.ccbh"></el-input>
        </el-form-item>
        <el-form-item label="表地址" prop="addr">
          <el-input v-model="ruleForm.addr"></el-input>
        </el-form-item>
        <el-form-item label="集中器地址" prop="vcaddr">
          <el-input v-model="ruleForm.vcaddr" :min="12" :max="12"></el-input>
        </el-form-item>
        <el-form-item label="pn值" prop="pn">
          <el-input v-model="ruleForm.pn" type="number" :min="0"></el-input>
        </el-form-item>
        <el-form-item label="部门选择" prop="departmentid">
          <el-cascader
            style="width:100%;"
            placeholder="请选择部门"
            v-model="ruleForm.departmentid"
            :props="treeprops"
            :options="treeData"
            auto-complete="off"
            clearable
            :show-all-levels="false"
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addmeter = false" style="float:left">关 闭</el-button>
        <el-button @click="submitForm('ruleForm')" style="float:right" type="primary">确 认</el-button>
      </span>
    </el-dialog>
    <!--创建弹窗-->

    <!-- <el-dialog title="电表详情" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div>
        <p>
          <span>集中器地址：</span>
          <span>{{meterdetail.attributes.vcaddr}}</span>
        </p>
        <p>
          <span>信息点标识PN：</span>
          <span>{{meterdetail.attributes.pn}}</span>
        </p>
        <p>
          <span>电表地址：</span>
          <span>{{meterdetail.attributes.addr}}</span>
        </p>
        <p>
          <span>用户编号：</span>
          <span>{{meterdetail.attributes.jldbh}}</span>
        </p>
        <p>
          <span>用户地址：</span>
          <span>{{meterdetail.attributes.yhdz}}</span>
        </p>
        <p>
          <span>用户类别：</span>
          <span>{{meterdetail.attributes.yhlb}}</span>
        </p>
        <p>
          <span>供电单位：</span>
          <span>{{meterdetail.attributes.gddw}}</span>
        </p>
        <p>
          <span>出厂编号：</span>
          <span>{{meterdetail.attributes.ccbh}}</span>
        </p>
        <p>
          <span>生产厂商：</span>
          <span>{{meterdetail.attributes.sccj}}</span>
        </p>
        <p>
          <span>设备类型：</span>
          <span>{{meterdetail.attributes.sblx}}</span>
        </p>
        <p>
          <span>通信规约：</span>
          <span>{{meterdetail.attributes.txgy}}</span>
        </p>
        <p>
          <span>台区：</span>
          <span>{{meterdetail.attributes.tq}}</span>
        </p>
        <p>
          <span>地理位置：</span>
          <span>{{meterdetail.attributes.province+meterdetail.attributes.city}}</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" style="float:left">关 闭</el-button>
      </span>
    </el-dialog>-->
  </div>
</template>
<script>
import {
  timestampToTime,
  getmetersearch,
  getmeterinfo,
  gettables1
} from "@/api/login";
import { addmeterforuser } from "@/api/filemanage";
import Parse from "parse";
// import SizeSelect from '@/components/SizeSelect';
var arr = [];
export default {
  data() {
    var validatevcaddr = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入地址"));
      } else {
        if (!/^\w{12}$/.test(value)) {
          callback(new Error("长度必须为是十二位"));
        }
        callback();
      }
    };
    return {
      treeprops: {
        value: "objectId",
        label: "name"
      },
      deptName: "",
      metersearch: "",
      start: 0,
      pagesize: 10,
      total: 0,
      tableData3: [],
      multipleSelection: [],
      vcaddr: "",
      draw: 1,
      addr: "",
      dialogVisible: false,
      meterdetail: {
        attributes: {}
      },
      node: null,
      data: [],
      defaultProps: {
        children: "children",
        label: "name"
      },
      departmentid: [],
      gridData: [],
      meterdialog: false,
      addmeter: false,
      ruleForm: {
        yhabh: "",
        ccbh: "",
        pn: 0,
        addr: "",
        vcaddr: "",
        country: "",
        province: "",
        city: "",
        departmentid: [],
        organization: "",
        mode: "vconcentrator",
        version: "v1"
      },
      rules: {
        yhabh: [{ required: true, message: "请输入用户编号", trigger: "blur" }],
        ccbh: [{ required: true, message: "请输入出厂编号", trigger: "blur" }],
        addr: [{ validator: validatevcaddr, required: true, trigger: "blur" }],
        vcaddr: [
          { validator: validatevcaddr, required: true,  trigger: "blur" }
        ],
        pn: [{ required: true, message: "请输入pn值", trigger: "blur" }],
        departmentid: [
          {
            type: "array",
            required: true,
            message: "请选择具体部门",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    treeData() {
      let cloneData = JSON.parse(JSON.stringify(this.data)); // 对源数据深度克隆
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(
          child => father.objectId == child.ParentId
        ); //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
        return father.ParentId == 0; //返回第一层
      });
    }
  },
  mounted() {
    // this.getinformation(this.pagesize,this.start);
    this.getDepartment();
  },
  methods: {
    editorMeter(row) {
      this.$confirm('此操作将修改此条记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'success'
        }).then(() => {
          var Yhmx = Parse.Object.extend("Smartmeter");
          var query = new Parse.Query(Yhmx);
          query.get(row.objectId).then(object => {
            object.set('yhabh',row.yhabh);
            object.set('vcaddr_web',row.vcaddr_web);
            object.set('deveui',row.deveui);
            object.set('tq',row.tq)
            object.set('yhmc',row.yhmc)
            object.set('pn',parseInt(row.pn))
            object.set('addr_web',row.addr_web)
            object.set('yhdz',row.yhdz)
            object.save().then(resultes=>{
              this.$message({
                  type: "success",
                  message: "修改成功!"
                });
                this.getDepartment();
            },error=>{
              console.log(error)
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          });          
        });
         
    },
    handleEdit(row) {
      console.log(row);
    },
    addhubiaometer() {
      this.addmeter = true;
    },
    deleteMeter(row) {
      this.$confirm("此操作将永久删除此户表关系, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          var Yhmx = Parse.Object.extend("Smartmeter");
          var query = new Parse.Query(Yhmx);
          query.get(row.objectId).then(object => {
            object.destroy().then(
              response => {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
                this.getDepartment();
              },
              error => {
                console.error("Error while deleting User", error);
              }
            );
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // console.log(row)
    },
    queryList(json, arr) {
      for (let i = 0; i < json.length; i++) {
        let sonList = json[i].children;
        if (!sonList) {
          arr.push(json[i].objectId);
        } else {
          arr.push(json[i].objectId);
          this.queryList(sonList, arr);
        }
      }
      return arr
    },
    submitForm(formName) {
      console.log(this.ruleForm.departmentid)
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.organization = this.ruleForm.departmentid[
            this.ruleForm.departmentid.length - 1
          ];
          addmeterforuser(this.ruleForm).then(resultes => {
            if(resultes.result==true){
               this.$message({
              message: "新增/成功",
              type: "success"
            })
            this.addmeter = false 
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      if(arr.length==0){
         this.yhmxFordepartment(this.pagesize, this.start, this.departmentid);
      }else{
         this.yhmxFordepartment(this.pagesize, this.start, arr);
      }
     
    },
    handleCurrentChange(val) {
      this.start = (val - 1) * 10;
      if(arr.length==0){
         this.yhmxFordepartment(this.pagesize, this.start, this.departmentid);
      }else{
         this.yhmxFordepartment(this.pagesize, this.start, arr);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    yhmxFordepartment(pagesize, start, departments) {
      this.tableData3 = [];
      // this.departmentid=[]
      var Yhmx = Parse.Object.extend("Smartmeter");
      var query = new Parse.Query(Yhmx);
      query.limit(pagesize);
      query.skip(start);
      query.containedIn("organization", departments);
      query.count().then(count => {
        if (count) {
          this.total = count;
          query.find().then(results => {
            results.map(items => {
              var obj = {};
              obj.objectId = items.id;
              obj.vcaddr_web = items.attributes.vcaddr_web;
              obj.addr_web = items.attributes.addr_web;
              obj.deveui = items.attributes.deveui;
              obj.tq = items.attributes.tq;
              obj.yhabh = items.attributes.yhabh;
              obj.yhmc = items.attributes.yhmc;
              obj.yhdz = items.attributes.yhdz;
              obj.pn = items.attributes.pn;
              this.tableData3.push(obj);
              // this.departmentid.push(items.id)
            });
          });
        } else {
          this.total = 0;
        }
      });
    },
    //搜索框
    getDeptDatas() {},
    //树型控件点击事件
    handleNodeClick(row) {
      var row1 = [];
      arr = [];
      row1.push(row);
      console.log(row1)
      this.queryList(row1, arr);
      setTimeout(this.yhmxFordepartment(this.pagesize, this.start, arr),1000)
      
    },
    //得到树形控件
    getDepartment() {
      this.departmentid=[]
      this.data=[]
      
      var Department = Parse.Object.extend("Department");
      var department = new Parse.Query(Department);
      // var departmentid=[]
      department
        .find()
        .then(
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
              this.data.push(obj);
              this.departmentid.push(items.id);
            });
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
        )
        .then(res => {
          this.yhmxFordepartment(this.pagesize, this.start, this.departmentid);
        });
    },
    //   searchformeter(){
    //       gettables1(this.metersearch,this.start,this.length,++this.draw).then(res=>{
    //        if(res.result==true){
    //           this.tableData3 = res.data
    //           this.total = res.recordsFiltered
    //        }
    //     }).catch(error=>{
    //         console.log(error)
    //     })
    //   },
    getinformation() {
      // var Yhmx = Parse.Object.extend("yhmx");
      // var yhmx = new Parse.Query(Yhmx);
      // yhmx.limit(this.pagesize);
      // yhmx.skip(this.start);
      // yhmx.include(this.metersearch)
      // yhmx.count().then(count => {
      //   if (count) {
      //       yhmx.find().then(res => {
      //     this.tableData3 = res;
      //      this.total = res.length;
      //   });
      //   }
      // });
      //        getmetersearch(this.metersearch,this.start,this.length,this.draw).then((res)=>{
      //          res.data.map((item)=>{
      //                item.vctime = timestampToTime(item.vctime)
      //            })
      //            this.tableData3 = res.data
      //            this.total =Number(res.recordsTotal)
      //    }).catch(error=>{
      //        console.log(error)
      //    })
    },
    // ammeterdetail(val) {
    //   // this.addr=val
    //    var Yhmx= Parse.Object.extend("yhmx");
    //    var query = new Parse.Query(Yhmx);
    //    query.get(val.objectId).then(resultes=>{
    //        this.meterdetail = resultes
    //        console.log(this.meterdetail)
    //        this.dialogVisible=true
    //    })
    // getmeterinfo(this.node,this.addr).then(res=>{
    //     if(res.result==true){
    //         this.meterdetail = res.info
    //
    //     }
    // })
    // },
    handleClose() {
      this.dialogVisible = false;
    },
    gotodetail() {
      this.$router.push({ path: "/devicemanage/meterdetail" });
    }
  }
};
</script>
<style scoped>
.metersearch {
  background: #ffffff;
  padding-left: 20px;
  padding-top: 20px;
  margin-top: 20px;
  box-sizing: border-box;
  min-height: 875px;
}
</style>
<style>
.metersearch .el-table th {
  background: #fafafa;
  color: #666666;
  font-weight: 600;
}
.metersearch .el-dialog__body {
  background: #f5f5f5;
}
.metersearch .el-dialog__footer {
  padding-bottom: 50px;
}
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #cccccc;
}
.metersearch .tb-edit .el-input {
  display: none;
}
.metersearch .tb-edit .current-row .el-input {
  display: block;
}
.metersearch .tb-edit .current-row .el-input + span {
  display: none;
}
</style>
