<template>
    <div id="addApp">
        <div class="head">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/roles/applicationManagement' }">应用管理</el-breadcrumb-item>
                <el-breadcrumb-item>{{content.title}}</el-breadcrumb-item>
            </el-breadcrumb>
            <el-button type="primary" plain @click="handleClickBack" size="small">返回应用管理</el-button>
        </div>
        
        <div class="form">
            
            <div class="title">
                <p style="color:#f00;">*为必须填</p>
            </div>
            
            <el-form ref="form" :model="form" label-width="120px">
                <!-- 应用名称 -->
                <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">
                     <el-form-item label="应用名称" 
                prop="name"
                :rules="[
                    { required: true, message: '应用名称不能为空'},
                ]">
                    <el-input v-model="form.name" placeholder="请填写应用名称"></el-input>
                </el-form-item>
                 <!-- 应用链接 -->
                 <el-form-item label="应用链接"
                prop="productIdentifier"
                :rules="[
                    { required: true, message: '应用链接不能为空'},
                ]">
                    <el-input v-model="form.productIdentifier" placeholder="例：vcon" class="link">
                        <template slot="prepend">{{host}}</template>
                    </el-input>
                     <!-- 所属行业 -->
                </el-form-item>
                 <el-form-item label="所属行业" 
                prop="category"
                :rules="[
                    { required: true, message: '请选择所属行业',trigger: 'blur'},
                ]">
                    <el-cascader ref="category" :options="treeData"  v-model="form.category" placeholder="请选择所属行业" clearable></el-cascader>
                </el-form-item>
                 <!-- 应用描述 -->
                 <el-form-item label="应用描述">
                    <el-input type="textarea" :rows="4" v-model="form.des" maxlength="300" show-word-limit placeholder="请输入应用描述信息"></el-input>
                </el-form-item>
                    </div>
                </el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                <!-- 应用图片 -->
                <el-form-item label="应用图片">
                    <el-upload
                        class="upload-demo"
                        ref="upload"
                        action="/iotapi/upload"
                        :file-list="form.fileList"
                        :auto-upload="false"
                        list-type="picture"
                        :limit="1"
                        :on-success="handleSuccess">
                        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                        
                        <span v-show="form.img != ''">路径:{{form.img}}</span>
                        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                   

                </el-form-item>
               
               
                <!-- 版权信息 -->
                    <el-form-item label="版权信息">
                        <el-input type="textarea" :rows="3" v-model="form.copyright" maxlength="300" show-word-limit placeholder="请填写版权信息"></el-input>
                    </el-form-item>
                    <el-form-item label="面板地址">
                         <el-input placeholder="面板地址" v-model="form.dashboard">
                                <template slot="prepend">http://</template>
                                <el-button slot="append" type="primary" style="background:#409eff;color:#ffffff;border-radius:1px 1px 1px 0" @click="open12">预览</el-button>
                        </el-input>
                        
                    </el-form-item>
                    </div>
                </el-col>
                </el-row>
                <!-- 分割 -->
                <el-divider><b>应用配置</b></el-divider>
                <el-row>
                <el-col :span="12"><div class="grid-content bg-purple">
                    <el-form-item label="应用接入规模"
                prop="scale"
                :rules="[
                    { required: true, message: '请选择应用接入规模',trigger: 'change'},
                ]">
                    <el-select v-model="form.scale" clearable placeholder="预计接入设备数量">
                        <el-option v-for="item in form.scaleDate" :key="item.id" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                 <!-- Token有效时间 -->
                <el-form-item label="Token有效时间">
                    <el-input controls-position="left" v-model="form.time" type="number" :min="1" placheholder="请输入Token有效时间">
                        <template slot="append">秒</template>
                    </el-input>
                    
                </el-form-item>
                    </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-form-item label="App Secret">
                    <el-input v-model="form.secret">
                        <el-button slot="append" icon="el-icon-refresh-right" @click="handleClickRefresh"></el-button>
                    </el-input>
                </el-form-item>
                </div></el-col>
                </el-row>
                <!-- 应用接入规模 -->
                
                <!-- App Secret -->
                
            </el-form>
            <div class="btns">
                <el-button v-show="page=='add'" type="primary" @click="handleClickSubmit">提交</el-button>
                <el-button v-show="page=='update'" type="primary" @click="handleClickUpdate">修改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
let Base64 = require("js-base64").Base64;
import { getIndustry,Upload,addApp,handleZero,updateApp } from "@/api/applicationManagement";
export default {
    data(){
        return {
            imageUrl:false,
            host:window.location.origin+"/lot/",
            // 表单
            form:{
                name:"",//应用名称
                options:[],//所属行业
                category:"",//中文所属行业
                number:"",//应用编号
                code:"",//应用授权码
                scale:"",//应用接入规模
                dashboard:'',
                scaleDate:[
                    {id:0,value:500,label:"500"},
                    {id:1,value:5000,label:"5000"},
                    {id:2,value:50000,label:"5万"},
                    {id:3,value:500000,label:"50万"},
                    {id:4,value:5000000,label:"500万"},
                    {id:5,value:50000000,label:"5000万"},
                    {id:6,value:100000000,label:"1亿"}
                ],
                productIdentifier:"",//应用链接
                fileList:[],//上传列表
                img:"",//上传图片路径
                copyright:"",//版权信息
                desc:"",//应用描述
                time:90,//Token有效时间
                secret:"",//App Secret
            },
            sessionToken:'',
            file:"",
            page:"",
            // 页面内容，传值变化
            content:{
                title:"",
                objectId:""
            },
            // 参数
            argu:{},
            Notification:''
        }
    },
     computed:{
       treeData() {
        let cloneData = JSON.parse(JSON.stringify(this.form.options)); // 对源数据深度克隆
        return cloneData.filter(father => {
            let branchArr = cloneData.filter(
            child => father.id == child.parentid
            ); //返回每一项的子级数组
            branchArr.length > 0 ? (father.children = branchArr) : ""; //如果存在子级，则给父级添加一个children属性，并赋值
            return father.parentid == 0; //返回第一层
        });
        }
   },
    created(){
        this.Industry();
        this.randomSecret();
        this.sessionToken = sessionStorage.getItem('token');
    },
    mounted(){
        this.estiPage();
    },
    methods:{
        // 刷新secret
        handleClickRefresh(){
            this.randomSecret();
        },
        // 产生随机secrets
        randomSecret(){
            let ranNum = Math.ceil(Math.random() * 25)
            this.form.secret=Base64.encode(String.fromCharCode(65+ranNum)+Math.ceil(Math.random()*10000000)+Number(new Date()));
        },
        // 判断页面
        estiPage(){
            this.argu=this.$route.query;
            console.log(this.argu);
            this.content.title=this.argu.title;
            this.page=this.argu.page;
            if (this.page=="update"){
                this.form.name=this.argu.name;
                this.form.scale=handleZero(this.argu.scale);
                this.form.secret=this.argu.secret;
                this.form.productIdentifier=this.argu.productIdentifier;
                this.content.objectId=this.argu.objectId;
                this.form.category = this.argu.category.split('/')
                if(this.argu.dashboard){
                    this.form.dashboard = this.argu.dashboard.substr(7)
                }else{
                    this.form.dashboard=''
                }   
                
                if(this.argu.logo!=''){
                     this.form.fileList.push({
                    name:'logo.png',
                    url:this.argu.logo
                    })
                }
               
            }
        },
        // 返回
        handleClickBack(){
            this.$router.push({path:"/roles/applicationManagement"});
        },
        // 上传图片
        submitUpload() {
            this.$refs.upload.submit();
        },
        // 改变文件
        handleChangeFile(e){
            let file=e.target.files[0];
            let type=file.name.substr(-3);
            if (file.size/1024>500){
                this.$message.error('上传图片大小不能超过500KB!');
            }else if (type!="png" && type!="jpg"){
                this.$message.error('上传图片格式不正确，必须是png或jpg格式！');
            }else {
                this.file=file;
            }
        },
        // 上传成功
        handleSuccess(response, file, fileList){
            this.form.img=response.path;
            this.$message({
                message: '上传成功！',
                type: 'success'
            });
            document.getElementsByClassName('el-upload-list__item.is-success')[0].setAttribute('display','block')
             document.getElementsByClassName('el-icon-close')[0].setAttribute('display','none')
        },
        // 上传失败
        handleError(err, file, fileList){
            this.$message({
                message: '上传失败！',
                type: 'error'
            });
        },
        // 判断是否可以提交
        isSubmit(){
            if (this.form.name==""  || this.$refs.category.currentValue.length==0 || this.form.scale=="" || this.form.productIdentifier==""){
                this.$message.error('有必填项没有填写，无法提交！');
                return false;
            }else {
                return true;
            }
        },
        // 提交
        handleClickSubmit(){
            if (!this.isSubmit()){
                return;
            }
            let obj={};
            obj.name=this.form.name;
            obj.category=this.form.category.join('/');
            obj.scale=this.form.scale;
            obj.productIdentifier=this.form.productIdentifier;
            obj.copyright=this.form.copyright;
            obj.desc=this.form.desc;
            obj.img=this.form.img;
            obj.secret=this.form.secret;
            obj.expires=this.form.time;
            if(this.form.dashboard!=''){
                obj.dashboard = "http://"+this.form.dashboard
            }else{
                obj.dashboard=''
            }
            addApp(obj).then(res=>{
                // console.log(res);
                if (res.objectId){
                    this.$message({
                        message: '添加成功！',
                        type: 'success'
                    });
                    this.$router.push({path:"/roles/applicationManagement"})
                }else {
                    this.$message.error('添加失败'+res.error);
                }
            }).catch(error=>{
                this.$message.error('添加失败'+error.error);
            })
        },
        // 修改
        handleClickUpdate(){
            console.log(this.form.dashboard)
            if (!this.isSubmit()){
                return;
            }
            let id=this.argu.objectId;
            let obj={};
            obj.name=this.form.name;
            obj.category=this.form.category.join('/');
            obj.scale=parseInt(this.form.scale);
            obj.productIdentifier=this.form.productIdentifier;
            obj.copyright=this.form.copyright;
            obj.desc=this.form.desc;
            obj.img=this.form.img;
            obj.secret=this.form.secret;
            obj.expires=this.form.time;
            if(this.form.dashboard!=''){
                obj.dashboard = "http://"+this.form.dashboard
            }else{
                obj.dashboard=''
            }
            
            console.log(obj);
            updateApp(id,obj).then(res=>{
              
                if (res.updatedAt){
                    this.$message({
                        message: '修改成功！',
                        type: 'success'
                    });
                    this.$router.push({path:"/roles/applicationManagement"})
                }else {
                    this.$message.error('修改失败'+res.error);
                }
            })
        },
        // 获取行业信息
        Industry(){
            this.form.options=[]
            getIndustry({limit:1000,where:{type:"category"}}).then(res=>{
                 if(res){
                    res.results.map(items=>{
                        var obj={}
                        obj.value = items.data.CategoryName
                        obj.label = items.data.CategoryName
                        obj.id = items.data.Id
                        obj.parentid = items.data.SuperId
                        this.form.options.push(obj) 
                    })
                    console.log()
                }
            }).catch(error=>{
                this.$message({
                    type:'error',
                    message:error.error
                })
            })
        },
        open12() {
        this.Notification=this.$notify({
          title: '面板预览',
          dangerouslyUseHTMLString: true,
          duration:0,
          type:'success',
          message: `<div><iframe
                src='http://${this.form.dashboard}'
                width="1000"
                height="400"
                frameborder="0"
      ></iframe></div>`
        });
      },
      
    },
    beforeDestroy(){
        if(this.Notification){
            this.Notification.close()
        }
        
    }
}
</script>

<style lang="scss" scoped>
#addApp {
    width: 100%;
    margin:0 auto;
    padding:20px;
    .head {
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
    }
    .form {
        border:3px solid #F7F7F7;
        padding: 10px 30px;
        .title {
            text-align: right;
            margin: 10px 0;
        }
        .el-form {
                // display: flex;
                // flex-wrap: wrap;
                // justify-content: space-between;
                .el-col-12{
                    padding:20px;
                     @media screen and (max-width: 1100px) {
                    width:100%;
                    }
                }
            .el-form-item {
                /deep/ .el-slider__marks-text {
                    width: 30px;
                    margin-top: 5px;
                }
                /deep/ .el-cascader{
                    width:100%
                }
                /deep/ .el-select{
                    width:100%;
                }
                /deep/ .el-input-number{
                    width:100%;
                }
            }
        }
    }
    .btns {
        margin-top: 40px;
        text-align: center;
    }
}
</style>
<style>
.el-upload-list__item.is-success .el-upload-list__item-status-label{
    display:none;
}
.el-upload-list__item .el-icon-close{
    display:block;
}
.el-notification{
width:1000px;
}
</style>
