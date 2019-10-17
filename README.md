# vue-admin-template
**里面封装了几个比较常用的插件，分页插件、vue-aliplayer方法，资源树的懒加载，Json-editor,parseplatform**
## 1.vue 中使用parseplatform
  在vue中安装parse   
  npm install parse --save(在本地安装)  
  parse需要初始化用户名以及权限   
 ### 1.1首先在App.vue初始化时引入
 import Parse from 'parse'   
 Parse.initialize("****(库名称)", "webapi","HZlora2017");   
 Parse.serverURL ='url'后台url
