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
    {name:"首页",path:'/Home',component:Home},
    {path: '/Carshow',component:Carshow},
    {path:'/Myheader',component:Myheader},
    {path:'/',component:HelloContainer},
    {name:"首页",path:'/Index',component:Index},
    {name:"活动",path:'/Event',component:Event},
    {name:"个人中心",path:'/PersonalCenter',component:PersonalCenter},
    {name:"个人中心",path:'/PersonalCenter_update',component:PersonalCenter_update},
    {name:"商品列表",path:'/Foots',component:Foots},
    {name:"商品详情",path:'/FootDetails',component:FootDetails},
    {name:"优惠卷",path:'/ContactUs',component:ContactUs},
    {name:"意见反馈",path:'/Opention',component:Opention},
    {name:"美食社区",path:'/Community',component:Community},
    {name:"走进美食",path:'/Article',component:Article},
    {name:"购物车",path:'/Login',component:Login},
    {name:"收获地址",path:'/Address',component:Address},
    {name:"购物车",path:'/Car',component:Car},
    {name:"订单结算",path:'/Buy',component:Buy},
    {name:"系统通知",path:'/Inform',component:Inform},
    {name:"购物车",path:'/MyOrder',component:MyOrder},
    {name:"优惠卷",path:'/Coupons',component:Coupons},
    {path:'/Community2', component:Community2},
    {path:'/Inform02', component:Inform02 },
    {name:"主食",path:'/Staple/:fpid',component:Staple}
  ]
})
