# Components-use
**里面封装了几个比较常用的插件，分页插件、vue-aliplayer方法，资源树的懒加载，Json-editor,parseplatform**
## 1下载安装
 ```JavaScript
 安装插件
  npm install
 启动项目
  npm start(npm run dev)
  ```
  **打包**   
  ```JavaScript
  npm run build
  ```

## 2.vue 中使用parseplatform
  在vue中安装parse   
  npm install parse --save(在本地安装)  
  parse需要初始化用户名以及权限   
 ### 2.1首先在App.vue初始化时引入
 ```JavaScript
 import Parse from 'parse'   
 
 Parse.initialize("****(库名称)", "webapi","HZlora2017");   
 
  Parse.serverURL ='url'(后台url）
 ```
   这是当前公司所需要的方法说是看见this.parse不好看，导致需要用到parse的vue文件都需要引入一边，你也可以直接在main.js中直接引入
   ```JavaScript
   import parse from "parse"
   
   Vue.prototype.$parse = parse
   
   ```
    
 ## packjson.json打包命令添加
 ```JSON
  // "d": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
  // "b": "node build/build.js",
  ```
## config build.js
```JavaScript
    // 下面这行代码
   // 拿到命令行里参数，比如执行（npm run b projectA）,这个时候projectName就等于projectA
  // 有了这个变量，就可以根据这个名字来读取projectConfig里面的配置了
  let projectName = process.argv[2]

  // 下面两行代码 获取projectName后把保存起来，写入到project.js里，方便其它js文件里引入使用
  let fs = require('fs')
  fs.writeFileSync('./config/project.js', `exports.name = '${projectName}'`)

// 下面两行代码继续执行命令（npm run build），执行默认命令开始进行打包
let exec = require('child_process').execSync;
exec('npm run build', {stdio: 'inherit'});
## config dev.js
let projectName = process.argv[2]
let fs = require('fs')

fs.writeFileSync('./config/project.js', `exports.name = '${projectName}'`)

let exec = require('child_process').execSync;
exec('npm run dev', {stdio: 'inherit'});
```
## config projectconfig.js
```JavaScript
const projectName = require('./project')

const config = {
  //活动1
  projectA:{
    localPath:'./src/projects/projectA/',
    uploadPath:'/h5/test/cb/',
    outPut:'projectA'
  },
  //活动2
}

const configObj = config[projectName.name]
module.exports = configObj
//如果想修改不同的路径需要将config/index.js里面build的路径修改
 // assetsRoot: path.resolve(__dirname, '../'+projectconfig.outPut),
 const projectconfig = require('../config/projectconfig')
  index: path.resolve(__dirname, '../'+projectconfig.outPut+'/index.html'),

     // Paths
  assetsRoot: path.resolve(__dirname, '../'+projectconfig.outPut),
  //然后在修改build 内的/webpack.base.conf.js内的module.exports内部的app
  app: projectconfig.localPath+'main.js'//分项目打包
  //最后修改webpack.prod.conf.js
   template: projectconfig.localPath+'index.html',//多项目打包
```

