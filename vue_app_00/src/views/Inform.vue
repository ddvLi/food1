<template>
  <div id="informt">
    <div class="form-top">
      <div>
        <span @click="Returnto" class="iconfont icon-xiangzuojiantou ssspan"></span>
      </div>
        <ul>
          <li @click="bttng(i)" v-for="(e,i) of list" :key="i" :class="nent==i ? 'active01':''">
            <a :class="nent==i ? 'active01':''" href="javascript:;">{{e}}</a>
          </li>
        </ul>
      
    </div>
    <mt-tab-container v-model="active01">
        <mt-tab-container-item id="tabb1">
          <div class="ppt_01" @click="skip">
            <div>
            <span>表单提交成功</span>
            <span>2天前</span>
            </div>
            <div>
              <div><span><img src="../../public/images/bd009.png"></span></div>
              <div><span>意见反馈</span></div>
            </div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tabb2">
          <div>
            <div>
            <span></span>
            <span></span>
            </div>
            <div>
              <div><span><img src=""></span></div>
              <span></span>
            </div>
          </div>
        </mt-tab-container-item>
      
    </mt-tab-container>   
    

  </div>
</template>

<script>
import Myheader from "../components/Myheader.vue"
export default {
      data(){
        return{
          active01:"tabb1",
          list:["系统消息","互动消息"],
          nent:0,
  }
      },
      methods: {
       bttng(i){
          this.nent=i
          if(i==0){
            this.active01="tabb1";
          }else{
            this.active01="tabb2"
          }
        },
         skip(){
          this.$router.push("./Inform02")
        },
        Returnto(){
          this.$router.push("./PersonalCenter")
        }
      },
    components:{
    "myheader":Myheader
  }  
      
}
</script>

<style scoped>
a{color:#000}
.active01{
  border-bottom: 2px solid #55B737;
  color:#55B737;
}
a{text-decoration: none;}
ul{list-style: none;margin: 0;padding: 0;}
#informt{
  width: 100%;
  height: 665px;
  background: #edeeef;
}
.form-top{
  width: 100%;
  height: 45px;
  background: #f6f7f8;
  display: flex;
}
.form-top>ul{
  width: 70%;
  display: flex;
  justify-content: space-around;
  line-height: 45px;
  
  
}
.form-top>ul>li>a{
  font-size:17px;
  border-bottom: none;
}

.form-top>div:first-child{/*返回按钮*/
  display: inline-block;
  }
  .ssspan{
    font-size:20px;
    padding:0 10px;
    line-height: 45px;
    box-sizing: border-box;
  }

  .ppt_01{
    margin: 16px 10px 0;
    height: 120px;
    background: #fff;
    border-radius: 4px;
  }
  .ppt_01>div:last-child>div:first-child>span:first-child>img{width: 30px;height: 30px;}
  .ppt_01>div:last-child>div:first-child{
    display: inline-block;
    width: 60px;height: 60px;
    background:#9dd64b;
    border-radius: 50%;
    text-align: center;
    line-height: 77px;
    }
    .ppt_01>div:first-child{
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      box-sizing: border-box;
    }
    .ppt_01>div:first-child>span:first-child{font-size:16px;color: #55B737;}
    .ppt_01>div:first-child>span:last-child{font-size: 12px;color: #ACACAC;}
    .ppt_01>div:last-child{
      display: flex;
      justify-content: flex-start;
      padding: 5px 14px;
      box-sizing: border-box;
    }
    .ppt_01>div:last-child>div:last-child>span{padding: 5px;}
</style>