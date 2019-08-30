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
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name:'首页',
    children: [{
      path: '/dashboard',
      component: () => import('@/views/dashboard/index'),
      name:'首页',
      meta: { title: '首页', icon: 'devicemanage' },
    }]
  },
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
        path: '/filemanage/metersearch',
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
    name:'采集管理',
    redirect: '/tasksmanage/tasklist',
    meta: { title: '采集管理', icon: 'tasks' },
   
    children: [
      {
        path: '/tasksmanage/tasklist',
        name: '定制任务管理',
        component: () => import('@/views/tasksmanage/tasklist'),
        meta: { title: '定制任务管理', icon: 'taskslist' }
      },
      {
        path: '/tasksmanage/schedule',
        name: '任务进度',
        component: () => import('@/views/tasksmanage/taskschedule'),
        meta: { title: '任务进度'},
        hidden: true
      },
      {
        path: '/tasksmanage/history',
        name: '采集质量分析',
        component: () => import('@/views/tasksmanage/index'),
        meta: { title: '采集质量分析', icon: 'history' }
      },
      {
        path: '/tasksmanage/taskmeterdetail',
        name: '实时进度',
        component: () => import('@/views/tasksmanage/taskmeterdetail'),
        meta: { title: '实时进度'},
        hidden: true
      },
      {
        path: '/tasksmanage/meterdetail',
        name: '任务进度',
        component: () => import('@/views/tasksmanage/meterdetail'),
        meta: { title: '任务进度' },
        hidden: true
      },
      {
        path: '/tasksmanage/readnow',
        name: '实时采集',
        component: () => import('@/views/mainstation/jia'),
        meta: { title: '实时采集', icon: 'dangqianshuju' }
      },
      {
        path:'/tasksmanage/long_control',
        name:'远程控制',
        component: ()=> import('@/views/tasksmanage/long_range_control'),
        meta: {title: '远程控制', icon:'long_control'}
      },
      // {
      //   path:'/tasksmanage/performance_monitoring',
      //   name:'运行监控',
      //   component: ()=> import('@/views/tasksmanage/performance_monitoring'),
      //   meta: {title: '运行监控', icon:'performance'}
      // },
      // {
      //   path: 'allterminal',
      //   name: '批量召测',
      //   component: () => import('@/views/mainstation/allterminal'),
      //   meta: { title: '批量召测', icon: 'piliang' }
      // },
      
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
        path: '/readmeter/historystatistical',
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
    name: '设备管理',
    meta: { title: '设备管理', icon: 'devicemanage' },
    children: [
      {
        path: '/devicemanage/concentrator',
        name: '集中器管理',
        component: () => import('@/views/devicemanage/concentrator'),
        meta: { title: '集中器管理', icon: 'concentrator' }
      },
      {
        path: '/devicemanage/devsreport',
        name: '采集器管理',
        component: () => import('@/views/devicemanage/devsreport'),
        meta: { title: '采集器管理', icon: 'devsreport' }
      },
      {
        path: '/devicemanage/smartmeter',
        name: '智能电表',
        component: () => import('@/views/devicemanage/smartmeter'),
        meta: { title: '智能电表', icon: 'smartmeter' }
      },
      {
        path: '/devicemanage/devicepump',
        component: () => import('@/views/devicemanage/devicepump'),
        name:'采证设备列表',
        meta: { title: '采证设备列表', icon: 'devpump' }
      },
      {
        path: '/devicemanage/testbedpump',
        component: () => import('@/views/devicemanage/testbedpump'),
        name:'测试台体',
        meta: { title: '测试台体', icon: 'testbedpump' }
      },
      {
        path: '/devicemanage/condetail',
        name: '集中器详情',
        component: () => import('@/views/devicemanage/condetail'),
        meta: { title: '集中器详情' },
        hidden: true
      },
      {
        path: '/devicemanage/devsdetail',
        name: 'Ⅱ采详情',
        component: () => import('@/views/devicemanage/devsdetail'),
        meta: { title: 'Ⅱ采详情' },
        hidden: true
      },
      {
        path: '/devicemanage/meterdetail',
        name: '智能电表详情',
        component: () => import('@/views/devicemanage/meterdetail'),
        meta: { title: '智能电表详情' },
        hidden: true
      },
      {
        path: '/devicemanage/generalmanage',
        name: '设备综合管理',
        component: () => import('@/views/devicemanage/generalmanage'),
        meta: { title: '设备综合管理',icon:'general' }
      },
      {
        path: '/devicemanage/sukeserver',
        name: '服务商管理',
        component: () => import('@/views/devicemanage/sukeserver'),
        meta: { title: '服务商管理',icon:'sukeserver' }
      },
      {
        path: '/devicemanage/sukezl',
        name: '指令管理',
        component: () => import('@/views/devicemanage/sukezl'),
        meta: { title: '指令管理',icon:'zhiling' }
      },
      {
        path: '/devicemanage/search_meter',
        name: '智能搜表',
        component: () => import('@/views/devicemanage/intelligent_search_meter'),
        meta: { title: '智能搜表', icon: 'searchmeter' }
      },
      {
        path: '/devicemanage/enrollment_management',
        name: '注册管理',
        component: () => import('@/views/devicemanage/enrollment_management'),
        meta: { title: '注册管理', icon: 'enrollment' }
      },
      {
        path: '/devicemanage/bulkImport',
        name: '批量导入',
        component: () => import('@/views/devicemanage/bulkImport'),
        meta: { title: '批量导入', icon: 'enrollment' }
      },
    ]
  },
  {
    path: '/connectmanage',
    component: Layout,
    redirect: '/connectmanage/report',
    name: '主站交互',
    alwaysShow:true,
    meta: { title: '主站交互', icon: 'connect' },
   
    children: [
      // {
      //   path: 'connectlist',
      //   name: '连接列表',
      //   component: () => import('@/views/connectmanage/connectlist'),
      //   meta: { title: '连接列表', icon: 'list' }
      // },
      {
        path: '/connectmanage/report',
        name: '主站连接监测',
        component: () => import('@/views/connectmanage/report'),
        meta: { title: '主站连接监测', icon: 'report' }
      }
    ]
  },
  {
    path: '/monitoring',
    component: Layout,
    name:'监控分析',
    redirect: '/monitoring',
    meta: { title: '监控分析', icon: 'tasks' },
    children:[
      {
        path: '/monitoring/meterReading',
        name: '抄表结果',
        component: () => import('@/views/monitoring/meterReading'),
        meta: { title: '抄表结果', icon: 'piliang' }
      },
      {
        path: '/monitoring/meterMonitoring',
        name: '运行监控',
        component: () => import('@/views/monitoring/meterMonitoring'),
        meta: { title: '运行监控', icon: 'piliang' }
      },
    ]
  },
  {
    path: '/inspection',
    component: Layout,
    redirect: '/inspection/',
    name:'检验列表',
    meta: { title: '检验列表', icon: 'pumptest' },
    alwaysShow:true,
    children: [
      {
        path: '/inspection/index',
        name: '检测任务',
        component: () => import('@/views/testpumplist/pumplist/Inspection'),
        meta: { title: '检测任务', icon: 'history' }
      },
      {
        path: '/inspection/reportdetail',
        name: '任务详情',
        component: () => import('@/views/testpumplist/pumplist/reportdetail'),
        meta: { title: '任务详情'},
        hidden:true
      },
      {
        path: '/inspection/console_evidence',
        name: '取证详情',
        component: () => import('@/views/testpumplist/pumplist/drawingcurver'),
        meta: { title: '取证详情'},
        hidden:true
      },
      {
        path: '/inspection/controller_evidence',
        name: '控制器取证',
        component: () => import('@/views/testpumplist/pumplist/drawing_curver'),
        meta: { title: '控制器取证'},
        hidden:true
      },
      {
        path: '/inspection/live_evidence',
        name: '摄像头取证',
        component: () => import('@/views/testpumplist/pumplist/nowlive'),
        meta: { title: '摄像头取证'},
        hidden:true
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
        path: '/reportmodule/index',
        component: () => import('@/views/reportModule/index'),
        name:'检测标准',
        meta: { title: '检测标准', icon: 'link' }
      },
      {
        path: '/reportmodule/module',
        component: () => import('@/views/reportModule/module'),
        hidden:true,
        name:'报告模板',
        meta: { title: '报告模板', icon: 'link' }
      }
    ]
  },
  // {
  //   path: '/flat',
  //   component: Layout,
  //   redirect: '/flat/index',
  //   name: '设备搜寻',
  //   meta: { title: '设备搜寻', icon: 'zhuzhan' },
  //   children: [
  //     {
  //       path: 'index',
  //       name: '搜寻设备',
  //       component: () => import('@/views/flat/index'),
  //       meta: { title: '搜寻设备', icon: 'dushuju' },
  //     },
     
  //   ]
  // },
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
     icon: 'dataany'
   },
    children: [
      {
        path: '/dataanalysis/index1',
        component: () => import('@/views/dataanalysis/index1'),
        name:'行业分析',
        meta: { title: '行业分析', icon: 'link' }
      },
      {
        path: '/dataanalysis/index2',
        component: () => import('@/views/dataanalysis/index2'),
        name:'质量比对',
        meta: { title: '质量比对', icon: 'link' }
      },
      {
        path: '/dataanalysis/index3',
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
        path: '/roles/structure',
        name: '用户管理',
        component: () => import('@/views/roles/structure'),
        meta: { title: '用户管理', icon: 'usermanage' }
      },
      {
        path: '/roles/roles',
        name: '角色管理',
        component: () => import('@/views/roles/rolelist/roles'),
        meta: { title: '角色管理', icon: 'adminmanage' }
      },
      {
        path: '/roles/rolescontrol',
        name: '权限管理',
        component: () => import('@/views/roles/rolelist/rolescontrol'),
        meta: { title: '权限管理', icon: 'rolescontrol' }
      },
      {
        path: '/roles/editroles',
        name: '添加角色',
        meta: { title: '添加角色'},
        hidden:true,
        component: () => import('@/views/roles/rolelist/addroles'),
      },
      {
        path: '/roles/application',
        name: '应用管理',
        component: () => import('@/views/roles/application'),
        meta: { title: '应用管理', icon: 'application' }
      },
      {
        path: '/roles/adduser',
        name: '新增用户',
        meta: { title: '新增用户'},
        hidden:true,
        component: () => import('@/views/roles/adduser/adduser'),
      },
      {
        path: '/roles/edituser',
        name: '编辑用户',
        meta: { title: '编辑用户'},
        hidden:true,
        component: () => import('@/views/roles/adduser/edituser'),
      },
      {
        path: '/roles/menu',
        name: '菜单管理',
        component: () => import('@/views/roles/test'),
        meta: { title: '菜单管理', icon: 'menu' }
      },
      {
        path: '/roles/department',
        name: '部门管理',
        component: () => import('@/views/roles/department/department'),
        meta: { title: '部门管理', icon: 'department' }
      },
      {
        path: '/roles/protocol',
        name: '协议管理',
        component: () => import('@/views/roles/protrol'),
        meta: { title: '协议管理', icon: 'department' }
      },
      {
        path: '/roles/applicationManagement',
        name: '应用管理',
        component: () => import('@/views/roles/applicationManagement'),
        meta: { title: '应用管理', icon: 'department' }
      },
      {
        path: '/applicationManagement/addApp',
        name: '新增应用',
        component: () => import('@/views/roles/appOperate/addApp'),
        meta: { title: '新增应用', icon: 'department' }
      },
      {
        path: '/roles/appmanage',
        name: '插件管理',
        component: () => import('@/views/systemmanage/appmarage'),
        meta: { title: '插件管理', icon: 'appmanage' }
      },
      {
        path: '/roles/thing',
        name: '设备管理',
        component: () => import('@/views/equipment_management/index'),
        meta: { title: '设备管理',icon:'device' }
      },
      {
        path: '/roles/product',
        name: '产品管理',
        component: () => import('@/views/equipment_management/devproduct'),
        meta: { title: '产品管理',icon:'product' }
      },
      {
        path: '/roles/detailproduct',
        name: '产品详情',
        component: () => import('@/views/equipment_management/proddetail'),
        meta: { title: '产品详情'},
        hidden:true
      },
      {
        path: '/roles/editdevices',
        name: '设备详情',
        component: () => import('@/views/equipment_management/editdevices'),
        meta: { title: '设备详情'},
        hidden:true
      },
      {
        path: '/roles/onlinetest',
        name: '在线调试',
        component: () => import('@/views/equipment_management/onlinetest'),
        meta: { title: '在线调试', icon:'onlinetest'}
       
      },
      {
        path: '/roles/channelManage',
        name: '服务通道管理',
        component: () => import('@/views/equipment_management/channelManage'),
        meta: { title: '服务通道管理',icon:'channelmanage' }
      },
      // 
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
