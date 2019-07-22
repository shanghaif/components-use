<template>
    <div class="resource1" style="border-left:38px solid #1579bf">
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
              <span style="padding-left: 4px;">{{node.label}}</span>
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
            label: "name"
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
     console.log(this.data)
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
                      obj.alias = items.attributes.alias
                      obj.leaf = items.attributes.leafnode
                      obj.icon = items.attributes.org_type
                      this.data.push(obj);
                    });
                     return resolve(this.data);
                  },
                  error => {
                    resolve([])
                  }
                );
                 console.log(this.data)
               
                }else{
                  this.data=[]
                var Department = Parse.Object.extend("Department");
                var department = new Parse.Query(Department);
                department.equalTo('ParentId',node.data.objectId)
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
                      obj.alias = items.attributes.alias
                      obj.leaf = items.attributes.leafnode
                      obj.icon = items.attributes.org_type
                      this.data.push(obj);
                    });
                     return resolve(this.data);
                  },
                  error => {
                    resolve([])
                  }
                );
        
            }
            },
        handleNodeClick(row) {
            this.$emit('meterdetail',row)
        },
        // append(data){
        //     console.log(data)
        // },
//         renderContent(h, {
// 				node,
// 				data,
// 			}) {
// 				return h('span', {
// 					style: {
// //						color: "red",
// 					},
// 					//这里添加hover事件
// 					on: {
// 						'mouseenter': () => {
//                             data.is_show = true;
// 						},
// 						//鼠标离开
// 						'mouseleave': () => {
// 							data.is_show = false;
// 						}
// 					}
// 				}, [
// 					h('span', {
// 						//显示名称
// 					}, node.label),
// 					h('span', {
// 						style: {
// 							display: data.is_show ? '' : 'none',
// 						},
// 					}, [
// 						//添加
// 						h('el-button', {
// 							props: {
// 								type: 'text',
// 								size: 'small',
// 							},
// 							style: {
//                                 marginLeft:"10px",
// 							},
// 							on: {
// 								click: () => {
//                                     event.stopPropagation()
//                                     // this.append(data)
//                                     this.$emit('change',data)
// 								}
// 							}
// 						}, "添加"),
// 						h('el-button', {
// 							props: {
// 								type: 'text',
// 								size: 'small',
// 							},
// 							style: {

// 							},
// 							on: {
// 								click: () => {
//                                     event.stopPropagation()
// 									// this.amend(data)
// 								}
// 							}
// 						}, "修改"),
// 						h('el-button', {
// 							props: {
// 								type: 'text',
// 								size: 'small',
// 							},
// 							style: {
// 							},
// 							on: {
// 								click: () => {
//                                     event.stopPropagation()
// 									console.log(data)
// 								}
// 							}
// 						}, "删除"),
// 					]),
// 				]);
// 		}  
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

