# vue-admin-template
**里面封装了几个比较常用的插件，分页插件、vue-aliplayer方法，资源树的懒加载，Json-editor,parseplatform**
## 1.vue 中使用parseplatform
  在vue中安装parse   
  npm install parse --save(在本地安装)  
  parse需要初始化用户名以及权限   
 ### 1.1首先在App.vue初始化时引入
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
   然后在页面直接引用就可以了
   ### 1.2 库图片
   ![Parse](http://chuantu.xyz/t6/702/1571304946x1031866013.png)
   
