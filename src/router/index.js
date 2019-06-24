import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login',component: () => import('@/views/login/index'), hidden: true},
  { path: '/pumplogin',component: () => import('@/views/login/pumplogin'), hidden: true},
  { path: '/register',component: () => import('@/views/register/register'), hidden: true},
  { path: '/phonelogin',component: () => import('@/views/login/phonesms'), hidden: true},
  { path: '/404', component: () => import('@/views/404'), hidden: true},
  { path: '/userinfo', 
  component: () => import('@/views/user/userinfo'), 
  component: Layout, 
  hidden: true},

  {
    path: '',
    component: Layout,
    redirect: '/dashboard',
    name: '首页',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      name:'首页',
      meta: { title: '首页', icon: 'devicemanage' },
    }]
  },
  //  主站菜单
  // {
  //   path: '/mainstation',
  //   component: Layout,
  //   redirect: '/mainstation/writeparameter',
  //   name: '主站菜单',
  //  
  //   meta: { title: '主站菜单', icon: 'zhuzhan' },
  //   children: [
  //     {
  //       path: 'writeparameter',
  //       name: '写参数',
  //       component: () => import('@/views/mainstation/writeparameter'),
  //       meta: { title: '写参数', icon: 'xieshuju' }
  //     },
  //     {
  //       path: 'allterminal',
  //       name: '批量终端召测',
  //       component: () => import('@/views/mainstation/allterminal'),
  //       meta: { title: '批量终端召测', icon: 'piliang' }
  //     },
  //     {
  //       path: 'readparameter',
  //       name: '读参数',
  //       component: () => import('@/views/mainstation/readparameter'),
  //       meta: { title: '读参数', icon: 'dushuju' },
  //     },
     
  //   ]
  // },
  //档案管理
  {
    path: '/filemanage',
    component: Layout,
    redirect: '/filemanage/index',
    name: '档案管理',
    meta: { title: '档案管理', icon: 'file' },
    alwaysShow:true,
    children: [
      // {
      //   path: 'index',
      //   name: '户表关系导入',
      //   component: () => import('@/views/filemanage/index'),
      //   meta: { title: '户表关系导入', icon: 'hubiao' }
      // },
      {
        path: 'metersearch',
        name: '档案维护',
        component: () => import('@/views/devicemanage/metersearch'),
        meta: { title: '档案维护', icon: 'meter' }
      }
    ]
  },
  // {
  //   path: '/installation',
  //   component: Layout,
  //   redirect: '/installation/',
  //   name:'终端管理',
  //   meta: { title: '终端管理', icon: 'test' },
  //   children: [
  //     // {
  //     //   path: 'log',
  //     //   name: '日志查询',
  //     //   component: () => import('@/views/installation/log'),
  //     //   meta: { title: '日志查询', icon: 'log' }
  //     // },
  //     {
  //       path: 'oneterminal',
  //       name: '参数管理',
  //       component: () => import('@/views/mainstation/test'),
  //       meta: { title: '参数管理', icon: 'danzhongduan' }
  //     },
  //     // {
  //     //   path: 'mainstationvalue',
  //     //   name: '数据管理',
  //     //   component: () => import('@/views/mainstation/jia'),
  //     //   meta: { title: '数据管理', icon: 'danzhongduan'}
  //     // },
  //     {
  //       path: 'lora',
  //       name: '通讯模块控制',
  //       component: () => import('@/views/installation/lora'),
  //       meta: { title: '通讯模块控制', icon: 'lora' }
  //     }
  //   ]
  // },
  {
    path: '/tasksmanage',
    component: Layout,
    name:'数据采集管理',
    redirect: '/tasksmanage/tasklist',
    meta: { title: '数据采集管理', icon: 'tasks' },
   
    children: [
      {
        path: 'tasklist',
        name: '定制任务管理',
        component: () => import('@/views/tasksmanage/tasklist'),
        meta: { title: '定制任务管理', icon: 'tasklist' }
      },
      {
        path: 'schedule',
        name: '任务进度',
        component: () => import('@/views/tasksmanage/taskschedule'),
        hidden: true
      },
      {
        path: 'history',
        name: '采集质量分析',
        component: () => import('@/views/tasksmanage/index'),
        meta: { title: '采集质量分析', icon: 'history' }
      },
      {
        path: 'taskmeterdetail',
        name: '实时进度',
        component: () => import('@/views/tasksmanage/taskmeterdetail'),
        hidden: true
      },
      {
        path: 'meterdetail',
        name: '任务进度',
        component: () => import('@/views/tasksmanage/meterdetail'),
        meta: { title: '任务进度' },
        hidden: true
      },
      {
        path: 'readnow',
        name: '单终端召测',
        component: () => import('@/views/mainstation/jia'),
        meta: { title: '单终端召测', icon: 'dangqianshuju' }
      },
      {
        path: 'allterminal',
        name: '批量数据召测',
        component: () => import('@/views/mainstation/allterminal'),
        meta: { title: '批量数据召测', icon: 'piliang' }
      },
    ]
  },
  {
    path: '/readmeter',
    component: Layout,
    redirect: '/readmeter',
    name: '集抄集收查询',
    meta: { title: '集抄集收查询', icon: 'devicemanage' },
    alwaysShow:true,
    children:[
      {
        path: 'historystatistical',
        name: '抄表数据查询',
        component: () => import('@/views/statistical/statistical'),
        meta: { title: '抄表数据查询', icon: 'statisticalhistory' }
      }
    ]
  },
  {
    path: '/devicemanage',
    component: Layout,
    redirect: '/devicemanage',
    name: '虚拟设备管理',
    meta: { title: '虚拟设备管理', icon: 'devicemanage' },
    children: [
      {
        path: 'concentrator',
        name: '集中器',
        component: () => import('@/views/devicemanage/concentrator'),
        meta: { title: '集中器', icon: 'concentrator' }
      },
      {
        path: 'devsreport',
        name: '采集器',
        component: () => import('@/views/devicemanage/devsreport'),
        meta: { title: '采集器', icon: 'devsreport' }
      },
      {
        path: 'devicepump',
        component: () => import('@/views/devicemanage/devicepump'),
        name:'采证设备列表',
        meta: { title: '采证设备列表', icon: 'devpump' }
      },
      {
        path: 'testbedpump',
        component: () => import('@/views/devicemanage/testbedpump'),
        name:'测试台体',
        meta: { title: '测试台体', icon: 'testbedpump' }
      },
      {
        path: 'condetail',
        name: '集中器详情',
        component: () => import('@/views/devicemanage/condetail'),
        meta: { title: '集中器详情' },
        hidden: true
      },
      {
        path: 'devsdetail',
        name: 'Ⅱ采详情',
        component: () => import('@/views/devicemanage/devsdetail'),
        meta: { title: 'Ⅱ采详情' },
        hidden: true
      },
      {
        path: 'meterdetail',
        name: '智能电表详情',
        component: () => import('@/views/devicemanage/meterdetail'),
        meta: { title: '智能电表详情' },
        hidden: true
      },
      {
        path: 'perception',
        name: '智能感知',
        component: () => import('@/views/devicemanage/perception'),
        meta: { title: '智能感知',icon:'ganzhi' }
      }
    ]
  },
  {
    path: '/connectmanage',
    component: Layout,
    redirect: '/connectmanage/report',
    name: '虚拟设备检测',
    alwaysShow:true,
    meta: { title: '虚拟设备检测', icon: 'connect' },
   
    children: [
      // {
      //   path: 'connectlist',
      //   name: '连接列表',
      //   component: () => import('@/views/connectmanage/connectlist'),
      //   meta: { title: '连接列表', icon: 'list' }
      // },
      {
        path: 'report',
        name: '主站连接监测',
        component: () => import('@/views/connectmanage/report'),
        meta: { title: '主站连接监测', icon: 'report' }
      }
    ]
  },
  
  
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/',
  //   name:'菜单测试',
  //   meta: { title: '菜单测试', icon: 'test' },
  //  
  //   children: [
  //     {
  //       path: 'testmenu',
  //       name: '菜单测试',
  //       component: () => import('@/views/test1/menu/index'),
  //       meta: { title: '测试菜单', icon: 'test' }
  //     }
  //   ]
  // },
  {
    path: '/inspection',
    component: Layout,
    redirect: '/inspection/',
    name:'检验列表',
    meta: { title: '检验列表', icon: 'pumptest' },
    alwaysShow:true,
    children: [
      {
        path: 'index',
        name: '检测任务',
        component: () => import('@/views/testpumplist/pumplist/Inspection'),
        meta: { title: '检测任务', icon: 'history' }
      },
      {
        path: 'reportdetail',
        name: '任务详情',
        component: () => import('@/views/testpumplist/pumplist/reportdetail'),
        hidden:true
      },
      {
        path: 'console_evidence',
        name: '取证详情',
        component: () => import('@/views/testpumplist/pumplist/drawingcurver'),
        hidden:true
      },
      {
        path: 'controller_evidence',
        name: '控制器取证',
        component: () => import('@/views/testpumplist/pumplist/drawing_curver'),
        hidden:true
      },
      {
        path: 'live_evidence',
        name: '摄像头取证',
        component: () => import('@/views/testpumplist/pumplist/nowlive'),
        meta: { title: '摄像头取证', icon: 'pumptest' },
        // hidden:true
      }
    ]
  },
  {
    path: '/reportmodule',
    component: Layout,
    redirect: '/reportmodule/index',
    name:'检验标准',
    alwaysShow:true,
     meta: {
     title: '检验标准',
     icon: 'nested'
   },
    children: [
      {
        path: 'index',
        component: () => import('@/views/reportModule/index'),
        name:'检测标准',
        meta: { title: '检测标准', icon: 'link' }
      },
      {
        path: 'module',
        component: () => import('@/views/reportModule/module'),
        hidden:true,
        name:'报告模板',
        meta: { title: '报告模板', icon: 'link' }
      }
    ]
  },
  {
    path: '/flat',
    component: Layout,
    redirect: '/flat/index',
    name: '设备搜寻',
    meta: { title: '设备搜寻', icon: 'zhuzhan' },
    children: [
      {
        path: 'index',
        name: '搜寻设备',
        component: () => import('@/views/flat/index'),
        meta: { title: '搜寻设备', icon: 'dushuju' },
      },
     
    ]
  },
  // {
  //   path: '/sysmanage',
  //   component: Layout,
  //   redirect: '/sysmanage/',
  //   name:'系统管理',
  //   meta: { title: '系统管理', icon: 'system' },
  //   children: [
  //     {
  //       path: 'webscoket',
  //       name: 'webscoket',
  //       component: () => import('@/views/systemmanage/websocket'),
  //       meta: { title: 'Webscoket', icon: 'websocket' }
  //     },
  //     {
  //       path: 'lora',
  //       name: 'lora',
  //       component: () => import('@/views/installation/lora'),
  //       meta: { title: 'lora', icon: 'websocket' }
  //     },
  //     {
  //       path: 'appmanage',
  //       name: '插件管理',
  //       component: () => import('@/views/systemmanage/appmarage'),
  //       meta: { title: '插件管理', icon: 'appmanage' }
  //     },
  //     {
  //       path: 'nodelist',
  //       name: '节点列表',
  //       component: () => import('@/views/systemmanage/nodelist'),
  //       meta: { title: '节点列表', icon: 'nodelist' }
  //     }
  //   ]
  // },
  {
    path: '/dataanalysis',
    component: Layout,
    redirect: '/dataanalysis/index1',
    name:'数据分析',
    alwaysShow:true,
     meta: {
     title: '数据分析',
     icon: 'department'
   },
    children: [
      {
        path: 'index1',
        component: () => import('@/views/dataanalysis/index1'),
        name:'行业分析',
        meta: { title: '行业分析', icon: 'link' }
      },
      {
        path: 'index2',
        component: () => import('@/views/dataanalysis/index2'),
        name:'质量比对',
        meta: { title: '质量比对', icon: 'link' }
      },
      {
        path: 'index3',
        component: () => import('@/views/dataanalysis/index3'),
        name:'远程检测',
        meta: { title: '远程检测', icon: 'link' }
      }
    ]
  },
  {
    path: '/roles',
    component: Layout,
    redirect: '/roles',
    name:'系统管理',
    meta: { title: '系统管理', icon: 'rolemanage' },
    children:[
      {
        path: 'structure',
        name: '用户管理',
        component: () => import('@/views/roles/structure'),
        meta: { title: '用户管理', icon: 'usermanage' }
      },
      {
        path: 'roles',
        name: '角色管理',
        component: () => import('@/views/roles/rolelist/roles'),
        meta: { title: '角色管理', icon: 'adminmanage' }
      },
      {
        path: 'rolescontrol',
        name: '权限管理',
        component: () => import('@/views/roles/rolelist/rolescontrol'),
        meta: { title: '权限管理', icon: 'quanxian' }
      },
      {
        path: 'editroles',
        name: '添加角色',
        hidden:true,
        component: () => import('@/views/roles/rolelist/addroles'),
        // meta: { title: '添加角色', icon: 'adminmanage' }
      },
      // {
      //   path: 'user',
      //   name: '用户管理',
      //   component: () => import('@/views/roles/user'),
      //   meta: { title: '用户管理', icon: 'usermanage' }
      // },
      {
        path: 'adduser',
        name: '新增用户',
        hidden:true,
        component: () => import('@/views/roles/adduser/adduser'),
      },
      // {
      //   path: 'menu',
      //   name: '菜单管理',
      //   component: () => import('@/views/roles/test111'),
      //   meta: { title: '菜单管理', icon: 'menumanage' }
      // },
      {
        path: 'edituser',
        name: '编辑用户',
        hidden:true,
        component: () => import('@/views/roles/adduser/edituser'),
      },
      {
        path: 'menu',
        name: '菜单管理',
        component: () => import('@/views/roles/test'),
        meta: { title: '菜单管理', icon: 'menu' }
      },
      {
        path: 'department',
        name: '部门管理',
        component: () => import('@/views/roles/department/department'),
        meta: { title: '部门管理', icon: 'department' }
      },
      // {
      //   path: 'departmentforuser',
      //   name: '岗位管理',
      //   component: () => import('@/views/roles/departmentforuser'),
      //   meta: { title: '岗位管理', icon: 'gangwei' }
      // },
    ]
  },
  // {
  //   path: 'external-link',
  //   component: Layout,
  //   name: '开发者平台',
  //   meta: { title: '开发者平台', icon: 'department' },
  //   children: [
  //     {
  //       path: 'http://ci.iotn2n.com:18083',
  //       name: '数蛙iot平台',
  //       // component: () => import('@/views/developer/developer'),
  //       meta: { title: '数蛙iot平台', icon: 'report' }
  //     },
  //     {
  //       path: 'http://prod.iotn2n.com:5080/swagger/',
  //       name: '文档中心',
  //       // component: () => import('@/views/developer/developer'),
  //       meta: { title: '文档中心', icon: 'report' }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
