<template>
  <div id="meter_reading">
    <div class="menu">
      <Resource
        style="width:340px;max-height:850px;overflow:scroll;flex-shrink:0;"
        :data="data"
        @lookdata="getRows"
      />
    </div>
    <div class="content">
      <el-form ref="form" :model="form">
        <el-form-item label="集中器地址">
          <el-input v-model="form.vcaddr_web"></el-input>
        </el-form-item>
        <el-form-item label="电能表地址">
          <el-input v-model="form.addr_web"></el-input>
        </el-form-item>
        <el-form-item label="任务模板">
          <el-select v-model="form.task_value" placeholder="请选择任务模板">
            <el-option
              v-for="item in form.task"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据类型">
          <el-select
            v-model="form.data_type_value"
            placeholder="请选择数据类型"
            @change="handleDateChange"
          >
            <el-option
              v-for="item in form.data_type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采集时间">
          <el-date-picker
            v-model="form.day_time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-if="form.data_type_value==1"
          ></el-date-picker>
          <el-date-picker
            v-model="form.month_time"
            type="monthrange"
            range-separator="至"
            start-placeholder="开始月份"
            end-placeholder="结束月份"
            v-else-if="form.data_type_value==2"
          ></el-date-picker>
          <el-time-picker
            is-range
            v-model="form.hour_time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            v-else-if="form.data_type_value==3"
          ></el-time-picker>
          <el-time-picker
            is-range
            v-model="form.minute_time"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            v-else-if="form.data_type_value==4"
          ></el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query" size="mini">查询</el-button>
          <el-button type="primary" @click="reset" size="mini">重置</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="table" height="650" border style="width: 100%">
        <el-table-column prop="freeze_time" label="冻结时间" width="150"></el-table-column>
        <el-table-column prop="addr_web" label="电能表地址" width="130"></el-table-column>
        <el-table-column prop="vcaddr_web" label="集中器地址" width="130"></el-table-column>
        <el-table-column prop="task" label="任务模板" width="100"></el-table-column>
        <el-table-column prop="data_type" label="数据类型" width="150"></el-table-column>
        <el-table-column prop="forward_power_total" label="正向有功电能总" width="120"></el-table-column>
        <!-- <el-table-column prop="inversion_power_total" label="反向有功电能总" width="120"></el-table-column> -->
        <el-table-column prop="forward_work_rate_1" label="正向有功费率1(尖)" width="130"></el-table-column>
        <el-table-column prop="forward_work_rate_2" label="正向有功费率2(峰)" width="130"></el-table-column>
        <el-table-column prop="forward_work_rate_3" label="正向有功费率3(平)" width="130"></el-table-column>
        <el-table-column prop="forward_work_rate_4" label="正向有功费率4(谷)" width="130"></el-table-column>
        <el-table-column prop="gather_time" label="采集时间" width="110"></el-table-column>
      </el-table>
      <PagingQuery
        :pager="pager"
        @setPager="getinformation"
        @query="setup"
        @now_drive="setup2"
        @alldrive="getdeive"
      />
    </div>
  </div>
</template>

<script>
import { getMeterDate, getMeterListDate } from "@/api/meterReading";
import Resource from "@/components/resource";
import Parse from "parse";
import { utc2beijing } from "@/utils/index";
import PagingQuery from "@/components/Pagination";
import {gettables} from "@/api/login";
import { eventBus } from '@/api/eventBus';
export default {
  components: { Resource,PagingQuery },
  data() {
    return {
      pager: {
        count: 0,
        page: 1,
        rows: 25,
        name:"抄表结果展示",
        pages:[25,50,75]
      },
      draw:1,
      data: [],
      vcaddr:'',
      tableData3:[],
      objId:"",
      obj:{//对应字段
        frozendate:"冻结时间",
        addr:"电能表地址",
        vcaddr:"集中器地址",
        task:"任务模板",
        datatype:"数据类型",
        count:"正向有功电能总",
        rate1:"正向有功费率(尖)",
        rate2:"正向有功费率(峰)",
        rate3:"正向有功费率(平)",
        rate4:"正向有功费率(谷)",
        date:"采集时间"
      },
      // 表格加载
      loading: true,
      form: {
        vcaddr_web: "", //集中器地址
        addr_web: "", //电能表地址
        task: [
          //任务模板
          { value: 1, label: "日冻结抄表任务" },
          { value: 2, label: "月冻结抄表任务" },
          { value: 3, label: "小时抄表任务" },
          { value: 4, label: "15分钟抄表任务" }
        ],
        task_value: 1,
        data_type: [
          //数据类型
          { value: 1, label: "历史日数据" },
          { value: 2, label: "历史月数据" },
          { value: 3, label: "小时抄表数据" },
          { value: 4, label: "分钟抄表数据" }
        ],
        data_type_value: 1,
        day_time: [
          new Date().toLocaleDateString(),
          new Date().toLocaleDateString()
        ], //日时间
        month_time: "", //月时间
        hour_time: "", //小时时间
        minute_time: "" //分钟时间
      },
      // 表格
      table: [
        {
          freeze_time: "sad",
          addr_web: "2016-05-03",
          vcaddr_web: "asf",
          task: "王小虎",
          data_type: "上海市",
          forward_power_total: "123",
          inversion_power_total: "3",
          forward_work_rate_1: "234",
          forward_work_rate_2: "45",
          forward_work_rate_3: "345",
          forward_work_rate_4: "345",
          gather_time: "234"
        }
      ]
    };
  },
  methods: {
    // 查询
    query() {
      // let type=this.form.data_type_value;
      // let start,end;
      // if (type==1){
      //     start=this.StartTime(this.form.day_time);
      //     end=this.EndTime(this.form.day_time);
      // }else if (type==2){
      //     start=this.StartTime(this.form.month_time);
      //     end=this.EndTime(this.form.month_time);
      // }else if (type==3){
      //     start=this.StartTime(this.form.hour_time);
      //     end=this.EndTime(this.form.hour_time);
      // }else {
      //     start=this.StartTime(this.form.minute_time);
      //     end=this.EndTime(this.form.minute_time);
      // }
      // console.log(start,end);
      getMeterDate(0, 25, "4ED1811D4F1E", 0, 123123132123).then(res => {
        let r = res.results;
        this.pager.count=r.length;
        let obj = {};
        this.table = [];
        for (let i = 0; i < r.length; i++) {
          obj.addr_web = r[i].addr;
          obj.freeze_time = r[i].frozendate;
          obj.forward_power_total = r[i].data.count;
          obj.forward_work_rate_1 = r[i].data.rate1;
          obj.forward_work_rate_2 = r[i].data.rate2;
          obj.forward_work_rate_3 = r[i].data.rate3;
          obj.forward_work_rate_4 = r[i].data.rate4;
          obj.gather_time = r[i].date;
          this.table.push(obj);
        }
        // console.log(obj);
        // console.log(this.table);
        this.loading = false;
      });
    },
    // 获取开始时间
    StartTime(time) {
      let start = new Date(time[0]).getTime();
      return start;
    },
    // 获取结束时间
    EndTime(time) {
      let end = new Date(time[1]).getTime();
      return end;
    },
    // 重置
    reset() {
      this.form.vcaddr_web = "";
      this.form.addr_web = "";
      this.form.task_value = 1;
      this.form.data_type_value = 1;
      this.form.month_time = "";
      this.form.day_time = [
        new Date().toLocaleDateString(),
        new Date().toLocaleDateString()
      ];
      this.form.month_time = "";
      this.form.hour_time = "";
      this.form.minute_time = "";
    },
    // 数据和任务关联
    handleDateChange() {
      this.form.task_value = this.form.data_type_value;
    },
    // 获取资源树
    getTree() {
      var Department = Parse.Object.extend("Department");
      var department = new Parse.Query(Department);
      department.limit(10000);
      department.find().then(
        resultes => {
          this.data = [];
          resultes.map(items => {
            var obj = {};
            items.createtime = utc2beijing(items.attributes.createdAt);
            (obj.name = items.attributes.name),
              (obj.ParentId = items.attributes.ParentId);
            obj.objectId = items.id;
            obj.createtime = items.createtime;
            obj.icon = items.attributes.org_type;
            obj.is_show = false;
            this.data.push(obj);
          });
        },
        error => {
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
    },
    // 获取树id
    getRows(row) {
      // console.log(row);
      // 默认取所有信息
      console.log(row);
      this.objId=row.objectId;
      getMeterListDate(this.pager.page-1, this.pager.rows, this.objId, 946659661, 7258093261).then(res => {
        console.log(res.results);
        console.log(res)
        this.pager.count=res.count;
        console.log(this.pager.count)
        let r = res.results;
        this.table = [];
        for (let i = 0; i < r.length; i++) {
          let obj = {};
          obj.addr_web = r[i].addr;
          obj.vcaddr_web = r[i].vcaddr;
          obj.data_type = r[i].datatype;
          obj.forward_power_total = r[i].data.count;
          obj.forward_work_rate_1 = r[i].data.rate1;
          obj.forward_work_rate_2 = r[i].data.rate2;
          obj.forward_work_rate_3 = r[i].data.rate3;
          obj.forward_work_rate_4 = r[i].data.rate4;
          obj.freeze_time = new Date(r[i].frozendate*1000).toLocaleDateString();
          obj.gather_time = new Date(r[i].date*1000).toLocaleDateString();
          obj.inversion_power_total = r[i].data.NotCount;
          obj.task_value = r[i].task;
          // 是否为空，是的话显示-
          obj.inversion_power_total = this.isNot(obj.inversion_power_total);
          obj.gather_time = this.isNot(obj.gather_time);
          obj.addr_web = this.isNot(obj.addr_web);
          obj.vcaddr_web = this.isNot(obj.vcaddr_web);
          obj.forward_power_total = this.isNot(obj.forward_power_total);
          obj.forward_work_rate_1 = this.isNot(obj.forward_work_rate_1);
          obj.forward_work_rate_2 = this.isNot(obj.forward_work_rate_2);
          obj.forward_work_rate_3 = this.isNot(obj.forward_work_rate_3);
          obj.forward_work_rate_4 = this.isNot(obj.forward_work_rate_4);
          obj.task = this.isNot(obj.task);
          // console.log(obj);
          this.table.push(obj);
        }
        // console.log(this.pager.page);
        // console.log(this.pager.rows);
        this.loading = false;
      });
    },
    // 判断是否为空
    isNot(value) {
      if (value == undefined) {
        return "-";
      } else {
        return value;
      }
    },
    // 分页
    setup(item) {
      this.getinformation(item);
      console.log(item);
    },
    getinformation(item) {
      console.log(item);
      if (item) {
        this.pager.page = item.page;
        this.pager.rows = item.rows;
      }
      // 获取数据
      getMeterListDate(this.pager.page-1, this.pager.rows, this.objId, 946659661, 7258093261)
        .then(res => {
            console.log(res.results);
            let r=res.results;
            this.table = [];
            for (let i = 0; i < r.length; i++) {
              let obj = {};
              obj.addr_web = r[i].addr;
              obj.vcaddr_web = r[i].vcaddr;
              obj.data_type = r[i].datatype;
              obj.forward_power_total = r[i].data.count;
              obj.forward_work_rate_1 = r[i].data.rate1;
              obj.forward_work_rate_2 = r[i].data.rate2;
              obj.forward_work_rate_3 = r[i].data.rate3;
              obj.forward_work_rate_4 = r[i].data.rate4;
              obj.freeze_time = new Date(r[i].frozendate*1000).toLocaleDateString();
              obj.gather_time = new Date(r[i].date*1000).toLocaleDateString();
              obj.inversion_power_total = r[i].data.NotCount;
              obj.task_value = r[i].task;
              // 是否为空，是的话显示-
              obj.inversion_power_total = this.isNot(obj.inversion_power_total);
              obj.gather_time = this.isNot(obj.gather_time);
              obj.addr_web = this.isNot(obj.addr_web);
              obj.vcaddr_web = this.isNot(obj.vcaddr_web);
              obj.forward_power_total = this.isNot(obj.forward_power_total);
              obj.forward_work_rate_1 = this.isNot(obj.forward_work_rate_1);
              obj.forward_work_rate_2 = this.isNot(obj.forward_work_rate_2);
              obj.forward_work_rate_3 = this.isNot(obj.forward_work_rate_3);
              obj.forward_work_rate_4 = this.isNot(obj.forward_work_rate_4);
              obj.task = this.isNot(obj.task);
              // console.log(obj);
              this.table.push(obj);
            }
        })
        .catch(error => {
          console.log(error);
        });
    },
    setup2(item) {
      // console.log(item)
      this.get_now(item);
    },
    get_now(data){
       getMeterListDate(this.pager.page-1,this.pager.rows,this.objId,946659661, 7258093261)
        .then(res => {
          // console.log(res);
          console.log(this.pager.name);
          eventBus.$emit('drive',{json:res.results,obj:this.obj,name:this.pager.name});
        })
        .catch(error => {
          console.log(error);
        });
    },
    getdeive(data){
      // console.log(this.pager.rows*(data.end-data.start+1));
      getMeterListDate(data.start,this.pager.rows*(data.end-data.start+1),this.objId,946659661, 7258093261)
        .then(res => {
          // console.log(res);
          console.log(this.pager.name);
          eventBus.$emit('drive',{json:res.results,obj:this.obj,name:this.pager.name});
        })
    }
  },
  mounted() {
    this.getTree();
    this.getinformation();
  }
};
</script>

<style lang="scss" scoped>
#meter_reading {
  background: #fff;
  display: flex;
  justify-content: space-between;
  .menu {
    width: 20%;
  }
  .content {
    width: 80%;
    padding: 20px;
    .el-form {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .el-form-item {
        display: flex;
        flex-wrap: wrap;
        width: 25%;
        &:nth-child(5) {
          width: 40%;
        }
        /deep/input {
          height: 26px;
        }
        /deep/.el-date-editor {
          width: 400px;
          height: 26px;
          line-height: 26px;
          .el-range-input {
            margin-left: 2%;
          }
          i,
          span {
            line-height: 20px;
          }
          input {
            height: 24px;
          }
        }
      }
    }
    /deep/.el-table {
      th,
      td {
        text-align: center;
        height: 35px;
        font-size: 12px;
        padding: 0;
      }
    }
  }
}
.resource {
  height: 100vh;
  margin-top: 10px;
}
</style>
