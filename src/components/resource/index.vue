<template>
    <div class="resource">
        <div>
            <el-input v-model="search" placeholder="请输入客户姓名搜索" style="width:150px"></el-input>
            <el-button type="primary" @click="searchuser" size="mini">搜索</el-button>
            <el-button type="primary" @click="resetuser" size="mini">重置</el-button>
            <el-tree
              :data="treeData"
              :props="defaultProps"
              :expand-on-click-node="false"
              :highlight-current="true"
              default-expand-all
              style="margin-top:20px;"
              @node-click="handleNodeClick"
            >
             <span slot-scope="{ node,data}">
              <img :src='imgsrc' style="width:20px;height:20px;" v-if="data.icon=='集中器'">
              <img :src='imgsrc1' style="width:20px;height:20px;" v-else-if="data.icon=='省电力公司'">
              <img :src='imgsrc2' style="width:20px;height:20px;" v-else-if="data.icon=='供电局'">
              <img :src='imgsrc3' style="width:20px;height:20px;" v-else-if="data.icon=='变压器'">
              <img :src='imgsrc4' style="width:20px;height:20px;" v-else-if="data.icon=='线路'">
              <span style="padding-left: 4px;">{{node.label}}</span>
            </span>
            </el-tree>
            <!--添加的dialog-->
        </div>
    </div>
</template>
<script>
// import Parse from 'parse'
export default {
   name:'Resource',
   props:['data'],
   data() {
      return {
        search:'',
         defaultProps: {
            children: "children",
            label: "name"
      },
      imgsrc: require("../../imgages/Artboard5.png"),
      imgsrc1:require("../../imgages/Artboard1.png"),
      imgsrc2:require("../../imgages/Artboard4.png"),
      imgsrc3:require("../../imgages/Artboard3.png"),
      imgsrc4:require("../../imgages/Artboard2.png"),
      }
   },
   watch:{
       
   },
   computed: {
    treeData() {
      // console.log(this.data)
      let cloneData = JSON.parse(JSON.stringify(this.data)); // 对源数据深度克隆
      return cloneData.filter(father => {
        let branchArr = cloneData.filter(
          child => father.objectId == child.ParentId
        ); //返回每一项的子级数组
        branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
        return father.ParentId == 0; //返回第一层
      });
    },
  },
   mounted() {
    //  console.log(this.data);
   },
   methods: {
      handleNodeClick(row) {
          this.$emit('lookdata',row);
          // console.log(row);
      },
     searchuser(){
       this.$emit('username',this.search)
     },
     resetuser(){
       this.search=''
       this.$emit('resetusername',this.search)
     }
        // handleNodeClick(row) {
        //     this.$emit('lookdata',row)
        // },
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
.resource .el-input__inner{
height: 26px;
border-radius: 0;
line-height: 26px;
width: 150px;
}
</style>

