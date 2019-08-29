<template>
    <div> 
        <!-- 第一个轮播图 -->
       <div class="div-swipe" > 
           <mt-swipe :auto="6000">
                <mt-swipe-item><img src="../../public/images/file_591163e6b1ef5.png"></mt-swipe-item>
                <mt-swipe-item><img src="../../public/images/file_591163ea5227c.png" ></mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 第二部分 -->
        <div class="div-ul">
         <ul>
             <li @click="staple(1)"><img src="../../public/images/file_591031e24a7b1.png" alt=""><p>主食</p> </li>
             <li @click="staple(2)"><img src="../../public/images/file_59103615d2052.png" alt=""><p>快餐</p></li>
             <li @click="staple(3)"><img src="../../public/images/file_59112b612dad7.png" alt=""><p>早餐</p></li>
             <li @click="staple(4)"><img src="../../public/images/file_5911316bc03ea.png" alt=""><p>下午</p></li>
         </ul>
        </div>
        <!-- 第三部分轮播图 -->
        <div class="div-swipe1">
             <mt-swipe :auto="8000">
                <mt-swipe-item><img src="../../public/images/file_5912aafde2231.png"></mt-swipe-item>
                <mt-swipe-item><img src="../../public/images/file_59102b946b0f1.png" ></mt-swipe-item>
            </mt-swipe>
        </div>
<!-- 第四部分 -->
        <div class="ele-container">
            <div class="ele-child1">
              <div class="ele-child1-q">你下单我买单</div>
              <div class="ele-child1-w">更多惊喜等你拿</div>   
              <div class="ele-child1-e"><img src="../../public/images/file_59104409abcda.png" alt=""> </div>
            </div>
            <div class="ele-child2">
                <div class="child2">
                    <div class="child2-q">自己美食</div>
                    <div class="child2-w">更懂美食</div>  <div class="child2-e"><img src="../../public/images/file_5910440c43e5b.png" alt=""> </div>
                </div>
                <div class="child3">
                    <div class="child3-q">你任性吃</div>
                    <div class="child3-w">好吃到停不下来</div>   
                    <div class="child3-e"><img src="../../public/images/file_591044112077c.png" alt=""></div>
                </div>
            </div> 
        </div>  
    <!-- 五部分图片 -->
    <div class="div5-img"> 
        <img src="../../public/images/file_5912b685a92d2 .png" alt="">
    </div>
    <div>
        <p>
            <span  class="p-span-q"></span>
            <span class="p-span-w">最美味最优惠</span>  
        </p>   
    </div>
    <!-- 引进foots组件    -->
    <foots></foots>
    <div class="mb"></div>
    <!-- <foots v-for="(item,i) of list.data"
                :key="i" 
                :imgurl="require('../../public/images/file_59f0533a40813.png')" 
                :title="item.title" 
                :price="item.price" 
                :sales="itme.sales"></foots> 
         -->
    </div>
</template>
<script>
import Foots from "./Foots.vue"
// import mlist from "../json/Slist.json"
export default {
    data(){
        return{
            // list:mlist

        }
    },
  methods: {
    //   跳转主食
      staple(fpid){
          this.$router.push(`/Staple/${fpid}`)
          },
  
},
 components:{
     "foots":Foots
 }
}
</script>
<style scoped>
.mb{
    height: 60px;
}
.div-swipe{  
    height:170px;
}
.div-swipe img{
    width:100%;
    height: 170px; 

}
/* 第2部分 */
.div-ul{
    padding:13px 34px 0;
    background:#fff;

}
.div-ul>ul{
 list-style: none;
 display:flex;
 justify-content:space-between;
 padding: 0;
 
}
.div-ul>ul>li>p{
margin:0px;
}
.div-ul>ul>li img{
    width:38px;
    height:38px;
}
/* 第三部分 */
.div-swipe1{
    height: 70px;
}
.div-swipe1 img{
    height: 70px;
    width: 100%;

}

.mint-search .mint-searchbar{
    padding:1px 5px;
    background: #f00;
}
/* <!-- 第四部分 --> */
.ele-container{
    height: 160px;
    width: 100%;
     margin:8px auto 0px; 
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
}
.ele-container .ele-child1{
    width:43%;
    height: 160px;
    border:1px solid rgb(34, 34, 34,0.07 );
    background-color: transparent;
    text-align: center;

}
.ele-container>.ele-child1 .ele-child1-q{
color: rgb(155,222,86);
font-size:15px;
font-weight: bold;
padding-top: 10px;


}
.ele-container>.ele-child1 .ele-child1-w{
   border-width: 2px; 
   color: rgb(102, 102, 102);
   font-size: 13px;
   padding:8px 0 12px;
}

.ele-container>.ele-child1 .ele-child1-e img{
  width:80px;
  height:80px;
  
}

.ele-container>.ele-child2{
  border:1px solid rgb(34, 34, 34,0.07 );
  width:55%;
  position: relative;
  
}
.ele-container>.ele-child2>.child2{
    height: 80px;
    border-bottom: 1px solid rgb(102, 102, 102, 0.2);
}
.ele-container>.ele-child2>.child2>.child2-q{
color: rgb(255,112,112);
font-size:15px;
font-weight: bold;
padding-top: 10px;
}
.ele-container>.ele-child2>.child2>.child2-w{
    border-width: 2px;

   color: rgb(102, 102, 102);
   font-size: 13px;
   padding:8px 0 12px;
}
.ele-container>.ele-child2>.child2>.child2-e img{
    width:60px;
    height:60px;
    position:absolute;
    top:7px;
    left:95px;
    
}
.ele-container>.ele-child2>.child3{
    height:80px;
    }
.ele-container>.ele-child2>.child3>.child3-q{
color: rgb(89,206,219);
font-size:15px;
font-weight: bold;
padding-top: 10px;
}
.ele-container>.ele-child2>.child3>.child3-w{
    border-width: 2px;

   color: rgb(102, 102, 102);
   font-size: 13px;
   padding:8px 0 12px;
}
.ele-container>.ele-child2>.child3>.child3-e img{
    width:60px;
    height:60px;
    position:absolute;
    top:92px;
    left:95px;
    }
    /* 5部分 */
.div5-img{
    margin-top:10px;
}
.div5-img img{
height: 70px;
width:100%;
   } 
   /* 第六分部 */
   div>p>.p-span-q{
       display:inline-block;
       width: 5px;
       height:12px;
       background-color:rgb(249,174,15);
       align-content: center;
        
      }
div>p>.p-span-w{
       display:inline-block;
       padding-left:10px;
       color: rgb(102, 102, 102);
        font-size: 14px;
        align-content: center;
        
       }

</style>