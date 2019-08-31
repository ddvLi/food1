//1:在router.js 引入组件
import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./views/HelloWorld.vue"
//首页
import Index from "./views/Index.vue"
//活动
import Event from "./views/Event.vue"
//我的(个人中心)
import PersonalCenter from "./views/PersonalCenter.vue"
import PersonalCenter_update from "./views/PersonalCenter_update.vue"
//商品列表(主食&你任性吃、快餐、早餐、下午茶、最美最优惠、你下单我买单)
import Foots from "./views/Foots.vue"
//商品详情
import FootDetails from "./views/FootDetails.vue"
//联系我们(商铺介绍)
import ContactUs from "./views/ContactUs.vue"
//意见反馈
import Opention from "./views/Opention.vue"
//社区(你最喜欢的口味、你最期待的菜色、你喜欢蒸的炒的)
import Community from "./views/Community.vue"
//文章详情(走近美食)
import Article from "./views/Article.vue"
//登录
import Login from "./views/Login.vue"
//收货地址
import Address from "./views/Address.vue"
//购物车
import Car from "./views/Car.vue"
//商品购买
import Buy from "./views/Buy.vue"
//系统通知
import Inform from "./views/Inform.vue"
//我的订单
import MyOrder from "./views/MyOrder.vue"
//优惠卷
import Coupons from "./views/Coupons.vue"
import Myheader from "./components/Myheader.vue"
import Carshow from "./views/Carshow.vue"
import Home from  "./Home.vue"
import Community2 from './views/Community2.vue'
//互动消息子组件
import Inform02 from "./views/Inform02.vue"
import Staple from "./views/Staple.vue"
//2:为组件指定访问路径
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/Home',component:Home, meta:{title: '首页',keepAlive: false } },
    {path: '/Carshow',component:Carshow, meta:{title: '2',keepAlive: true } },
    {path:'/Myheader',component:Myheader, meta:{title: '3',keepAlive: true } },
    {path:'/',component:HelloContainer, meta:{title: '',keepAlive: false } },
    {path:'/Index',component:Index, meta:{title: '首页',keepAlive: true } },
    {path:'/Event',component:Event, meta:{title: '活动',keepAlive: true } },
    {path:'/PersonalCenter',component:PersonalCenter, meta:{title: '个人中心',keepAlive: true } },
    {path:'/PersonalCenter_update',component:PersonalCenter_update, meta:{title: '个人中心',keepAlive: true } },
    {path:'/Foots',component:Foots, meta:{title: '',keepAlive: true } },
    {path:'/FootDetails/:pid',component:FootDetails, meta:{title: '商品详情',keepAlive: true } },
    {path:'/ContactUs',component:ContactUs, meta:{title: '联系我们',keepAlive: true } },
    {path:'/Opention',component:Opention, meta:{title:'意见反馈',keepAlive: true } },
    {path:'/Community',component:Community, meta:{title: '社区',keepAlive: true } },
    {path:'/Article',component:Article, meta:{title: '走进美食',keepAlive: true } },
    {path:'/Login',component:Login,keepAlive: false },
    {path:'/Address',component:Address, meta:{title: '收货地址',keepAlive: true } },
    {path:'/Car',component:Car, meta:{title: '购物车',keepAlive: true } },
    {path:'/Buy',component:Buy, meta:{title: '结算中心',keepAlive: true } },
    {path:'/Inform',component:Inform, meta:{title: '系统通知',keepAlive: true } },
    {path:'/MyOrder',component:MyOrder, meta:{title: '我的订单',keepAlive: true } },
    {path:'/Coupons',component:Coupons, meta:{title: '优惠卷',keepAlive: true } },
    {path:'/Community2', component:Community2, meta:{title: '社区',keepAlive: true } },
    {path:'/Inform02', component:Inform02 , meta:{title: '',keepAlive: false } },
    {path:'/Staple/:fpid',component:Staple,}
  ]
})
