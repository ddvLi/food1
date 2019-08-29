<template>
 <div class="page-tabbar">
    <myheader></myheader>
    
    <!--:切换面板列表index-->
    <mt-tab-container class="page-tabbar-container" v-model="active">
        <mt-tab-container-item id="index">
         <index></index>
        </mt-tab-container-item>
        <mt-tab-container-item id="event">
         <event></event>
        </mt-tab-container-item>
        <mt-tab-container-item id="personalCenter">
         <personalCenter></personalCenter>
        </mt-tab-container-item>
    </mt-tab-container>
      <!-- 底部按钮 -->
    <mt-tabbar v-model="active" fixed>
        <mt-tab-item id="index" @click.native="changeState(0)">
         <myfooter
          :selectedImage="require('../public/images/file_59101859dbacc.png')"
          :normalImage="require('../public/images/file_59101857538c8.png')"
          :focused="currentIndex[0].isSelect">
         </myfooter>
        首页   
        </mt-tab-item>
        <mt-tab-item id="event" @click.native="changeState(1)">
         <myfooter
         :normalImage="require('../public/images/file_591033ea0ad3c.png')"
         :selectedImage="require('../public/images/file_5910344f7ce53.png')"
         :focused="currentIndex[1].isSelect">
         </myfooter>
         活动
        </mt-tab-item>
        
        <mt-tab-item id="personalCenter" @click.native="changeState(2)">
          <myfooter
          :normalImage="require('../public/images/file_591018c9d9420.png')"
          :selectedImage="require('../public/images/file_591018cd8000c.png')"
          :focused="currentIndex[2].isSelect">
          </myfooter>
          我的
        </mt-tab-item>
       
    </mt-tabbar>
  
   </div>
</template>
<script>
import Myheader from "./components/Myheader.vue"
import Index from "./views/Index.vue"
import PersonalCenter from "./views/PersonalCenter.vue"
import Myfooter from "./components/Myfooter.vue"
import Event from "./views/Event.vue"

export default {
  data(){
    return {
      //面板中显示子组件id
      active:"index",
      uid:"",
      
      //创建数组保存图片焦点状态
      currentIndex:[
        {isSelect:true},
        {isSelect:false},
        {isSelect:false},
      ]
    }
  },
  methods: {  
    changeState(n){
      //函数功能:将当前参数下标
      //对应数组值修改true其它修改false
      //1:创建循环,循环数组中内容
      for(var i=0;i<this.currentIndex.length;i++){
       //2:判断如果循环下标与n相等 20
       if(n==i){
        //3:当前下标元素true 10:22
        this.currentIndex[i].isSelect=true;
       }else{
        //4:其它元素修改false
        this.currentIndex[i].isSelect=false;
       }  
      }
    },
  },
  created() {
    if(sessionStorage.getItem("uid")==null){  
      this.$router.push("/Login");
    }else{
      this.uid=sessionStorage.getItem("uid");
    }
  },
  components:{
    "myheader":Myheader,
    "index":Index,
    "personalCenter":PersonalCenter,
    "event":Event,
    "myfooter":Myfooter,
   
  }
}
</script>
<style  scoped>
/*最外层父元素Home.vue*/

.mint-tabbar.is-fixed{
 border-top:1px solid #000;
}
/*修改 tabbar 默认文字颜色*/
.mint-tabbar>.mint-tab-item{
  color:#999999;
}
/*修改默认tab选中文字样式*/
.mint-tabbar>.mint-tab-item.is-selected{
  background-color: transparent;
  color:rgb(251, 197, 49);
}

.page-wrap{
  overflow:auto;/*溢出显示轮动条*/
  padding-bottom: 60px;
}
</style>
