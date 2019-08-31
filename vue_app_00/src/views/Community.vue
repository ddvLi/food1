<template>
<div id="fuye">
  <div>
    <!-- 搜索框 -->
      <div class="ssk_01">
        <div class="ssk_02">
          <span class="iconfont icon-sousuo ssk_03"></span>
          <input type="text" placeholder="搜索" maxlength="64">
        </div>
          <div class="ssk_04">
          <span @click="sbtn" class="iconfont icon-lingdang-copy-copy-copy ssk_05"></span>
          <span class="iconfont icon-geren-copy ssk_06"></span>
          </div>
      </div>
    </div>
    <!-- 主题 -->
    <div class="ztkd">
      <div class="ztbj01">
        
        <div class="zttp_02"><img src="../../public/images/file_5910440c43e5b.png"></div>
        <div>
          <p>你最期待的菜色</p>
          <p>
            <label>
              话题
              <span>10</span>
            </label>
            <label>
              回复
              <span>8</span>
            </label>
          </p>
        </div>
      </div>
    </div>
    <div class="qb_01">
      <div>
        <span>全部</span>
      </div>
    </div>
    <!-- 评论区 -->
  <div>  
    <div class="plqy_11">
      <div class="plqy_12">
        <div> 
          <div><img src="../../public/images/0.jpg"></div>
          <div>
            <p>兜兜里有糖</p>
            <p>2017-11-02</p>
          </div>
        </div>
        <p>大王叫我来巡山</p>
        <div>
          <p>你在哪里</p>
          <div><img class="ckml_01" src="../../public/images/59533a79f1da3wx-file.jpg"></div>
        </div>
      </div>
    </div>
        <div class="ckml_02">
          <span class="ckml_03">
            <i class="iconfont icon-fenxiang"></i>
            <span>分享</span>
          </span>
          <span class="ckml_03">
            <i class="iconfont icon-zhengyan"></i>
            <span>17</span>
          </span>
          <span class="ckml_03">
            <i @click="commentbutn"  class="iconfont icon-pinglun"></i>
            <span>2</span>
          </span>
          <span class="ckml_03">
            <i @click="commentbutn3" class="iconfont icon-buoumaotubiao16"></i>
            <span>{{box}}</span>
          </span>
        </div>
        <!-- 没有更多 -->
        <div class="mygd_01">
          <span>没有更多了</span>
        </div>
  
  </div>    
    <!-- 评论框 -->
  <div v-show="kmpk" class="frame">  
    <div class="Comment-box">
      <div>
        <span @click="commentbutn2">取消</span>
        <span>发表</span>
      </div>
      <div>
        <textarea placeholder="我也来说几句..." maxlength="64" minlength="5"></textarea>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import Myheader from "../components/Myheader.vue"
export default {
    data(){
      return{
        kmpk:false,
        box:0
      }
    },
    methods:{
      commentbutn3(){
        this.box++
        this.$toast("点赞成功")
      },
      commentbutn2(){
        this.kmpk=false
      },
      commentbutn(){
        this.kmpk=true
      },
      sbtn(){
        this.$router.push("Community2")
      }
    },
  components:{
    "myheader":Myheader
  }
}
</script>

<style scoped>
#fuye{
 background: #eee;
}
  .ssk_01{
    width: 100%;
    height: 45px;
    background: #eee;
    padding:4px 20px 4px 17px;
    box-sizing: border-box;
    display:flex;
  }
  .ssk_02{
    width: 75%;
    height: 32px;
    border:1px solid #eee;
    border-radius: 5px;
    background: #fff;
    
    }
    .ssk_03{
      width: 30px;
      height: 30px;
      font-size: 20px;
      
      
    }
    div>input{
      width: 185px;
      height: 30px;
      border:0; 
      outline: none;
    }
    .ssk_04{
      width: 25%;
      display: flex;
      justify-content:center;
    }
    .ssk_04>span{
      font-size:33px;
      color:#05B7F8;
    }
    div.ssk_04>span:first-child{margin-left: 10px;}
    div.ssk_04>span:last-child{margin-left:10px;}
  /* 主题 */
  .ztkd{
    width: 100%;
    height: 100px;
   
  }
  .ztbj01{
    width: 100%;
    height: 100%;
    background:rgba(0, 0, 0, 0.5) url("../../public/images/file_5910440c43e5b.png") no-repeat;
    background-size:400px 330px; 
    display: flex;
    flex-wrap: nowrap;
  }
  .zttp_02>img{
    width: 80px;
    height: 80px;
    margin: 10px;
  }
 .ztbj01>div:nth-child(2)>p{
   color: #fff;
   font-size:14px;
   margin-left:5px;
 }
 /* 全部 */
 .qb_01{
   width: 100%;height: 41px;
   margin-top:10px;
   background: #fff;
  
   }
   .qb_01>div{
     width: 100%;
     font-size:14px;
     line-height: 41px;
     padding: 0 20px;
     color:#00b6f8;
     font-weight: bold;
   }
   /* 评论区 */
  .plqy_11{
    width: 100%;height: 100%;
     margin-top:10px;
     background: #fff;
     padding:20px;
     box-sizing: border-box;
  }
  .plqy_12>div:first-child{
    display: flex;
  }
  .plqy_12>div:first-child>div:first-child>img{
    width: 50px;height: 50px;
    border-radius: 50%;
  }
  .plqy_12>div:first-child>div:last-child>p{margin:0; margin-bottom: 10px;}
  .plqy_12>div:first-child>div:last-child{margin-left: 10px;}
  .plqy_12>div:first-child>div:last-child>p:last-child{font-size:12px;color:#959595;font-weight:540;}
  .ckml_01{width: 80px;height: 120px;}
  /* 按钮 */
  .ckml_02{
    width: 100%;height: 35px;
    background: #fff;
    /* margin-top:10px; */
    border:1px solid #EBEBEB;
    display: flex;
    justify-content: space-around;
    line-height: 35px;
    }
    .ckml_02>span{
      display: flex;
      justify-content:center;
    }
    .ckml_02>span:not(last-child){
      width:24.5%;
      border-right:1px solid #EBEBEB;
     }
  .ckml_03{
    /* border-right: 1px solid #eee; */
    box-sizing: border-box;
    font-size:12px;
    color: #999;
    padding: 0 5px;
  }
  .ckml_03>span{margin-left: 3px;}
  .mygd_01{
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 14px;
    color: #949494;
    }

    /* 评论框 */
    .Comment-box{
      width: 100%;
      height: 160px;
      background: #fff;
    }
    .Comment-box>div:first-child{
      width: 100%;
      line-height: 40px;
      display: flex;
      justify-content:space-between;
      padding: 0 15px;
      box-sizing: border-box;
      color:#999;
    }
    .Comment-box>div:last-child{
      padding: 0 15px 15px;
      box-sizing: border-box;
    }
    .Comment-box>div:last-child>textarea{
        width: 80%;
        height: 50px;
        list-style: none;
        border-radius: 3px;
        font-size:12px;
        border: none;
    }
    .frame{
      width: 100%;
      height: 100%;
      background:rgba(0, 0, 0, .3);
      position: absolute;
      top:0px;
      left:0px;
      display: flex;
      flex-direction:column-reverse;
    }
</style>