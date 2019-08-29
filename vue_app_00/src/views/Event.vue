<template>

  <div id="event">
    <!-- 活动页轮播图 -->
    <div class="sylb_01">
      <mt-swipe :auto="6000">
        <mt-swipe-item><img class="img1" src="../../public/images/file_5911794c5ebcb.png"></mt-swipe-item>
        <mt-swipe-item><img class="img1" src="../../public/images/file_59117952bb132.png"></mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 活动类别 -->
      <div class="ele-container">
        <div class="elment-01">
          <div @click="map_01" class="elment">
            <router-link to=""><img class="img2" src="../../public/images/file_5911780d41e94.png"></router-link>
            </div>
          <div class="elment">
            <router-link to=""><img class="img2" src="../../public/images/file_59117811ca7bb.png"></router-link>
            </div>
          <div class="elment">
            <router-link to=""><img class="img2" src="../../public/images/file_591178159a2ac.png"></router-link>
            </div>
        </div>
          <div class="elment_02">你最喜欢的口味</div>
          <div class="elment_02">你最期待的菜色</div>
          <div class="elment_02">你喜欢蒸的炒的</div>
      </div>
      <!-- 活动页文章 -->
      <div @click="map_02" class="wzy_01">
        <div class="wzy_02">
          <div class="wzy_03"><router-link to="">还有人不知道三亚是美食之都吗？</router-link></div>
          <div class="wzy_04">
            <router-link to=""><img  class="img3" src="../../public/images/file_59118839bdcc0.png"></router-link>
          </div>
          <div class="wzy_05"><router-link to="">2016-07-30&nbsp;苗子&nbsp;饭醉团长</router-link></div>
          <div class="wzy_03"><router-link to="">一篇文章让你读懂吃懂法国美食</router-link></div>
          <div class="wzy_04">
            <router-link to=""><img class="img3" src="../../public/images/file_5911883f319df.png"></router-link>
          </div>
          <div class="wzy_05"><router-link to="">2016-10-10&nbsp;苗子&nbsp;饭醉团长</router-link></div>
        </div>
      </div>
      <div class="wzy_06"><router-link to="">没有更多了</router-link></div>
        
        
  </div>
 
</template>

<script>
export default {
      data(){
        return{

        }
      },
      methods:{
        map_02(){
          this.$router.push("Article")
        },
          map_01(){
            this.$router.push("Community")
          }
      }
}
</script>

<style scoped>

/* 轮播图CSS */
.sylb_01{
  width: 100%;
  height:100px;
}
.img1{
  width: 100%;
}
/* 活动分类 */
  /* 活动router标签字体颜色跳转 */
.router-link-active {text-decoration: none;}
.wzy_03>.router-link-active{color:rgb(102, 102, 102);}
.wzy_05>.router-link-active{color: rgb(153, 153, 153);}
.wzy_06>.router-link-active{color:#949494;}

#event div.ele-container{
  position: relative;
  width: 100%;
  height: 100%;
}
#event div.elment-01{
  width: 100%;
  height: 180px;
  background:rgb(180, 167, 214);
  display: flex;
  justify-content:space-around;
  padding:12px 0;
}
div.elment-01>div.elment{
  height:100%;
  width:32%;
  background: #fff;
  /* background: url(../../public/images/file_59117627e0a58.png) no-repeat; */
  /* background-size:100px 160px; */
}
.img2{
  width: 100%;
  height: 135px;
}
.elment_02{
  float: left;
  padding: 0 6px;
  position: relative;
  top:-44px;
  color: rgb(102, 102, 102);
}
/* 活动文章 */
.wzy_01{
  position: relative;
  width: 100%;
  color:rgb(102, 102, 102);
  
}
.wzy_02{
  width: 100%;
  height: 100%;
}
.wzy_03{
  font-size:16px;
  font-weight: bold;
  padding: 15px 12px;
}
.wzy_04{
  width: 100%;
  height: 100%;
  text-align: center;
}
.img3{
  width: 93%;
  height: 100%;
}
.wzy_05{
  padding: 10px 12px;
  padding-bottom: 30px;
  color:rgb(153, 153, 153);
}
.wzy_06{
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color:#fff;
  font-size: 16px;
  color: #949494;
}



</style>