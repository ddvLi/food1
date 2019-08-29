<template>
<div>
  <!-- 商品列表 -->
  <div class="rootstyle"  v-for="(item,i) of list " :key="i">
      <div class="leftimgtxt" >
          <img :src=" 'http://127.0.0.1:3000/'+item.ppic" class="imgstyle" @click="tzDetails"/>
            <div class="titlestyle">
              <span class="title">{{item.pname}}</span>
              <span class="price">￥{{item.pprice.toFixed(2)}}</span>
              <span class="sales">销量：{{item.salesVal}}</span>
            </div>
          <span class="cart iconfont icon-jiarugouwuche"  @click="car" :data-pid="item.pid"></span>
      </div>  
 </div>
 <mt-button   size="large"  @click="loadMore" >加载更多</mt-button> 
<!-- 购物弹出框 -->
<mt-popup v-model="popupVisible" position="bottom" >
    <div class="carshow">
      <div class="carshow-div">
        <div class="car-divq">
          <div class="car-one">
            <div class="one-img"><img :src=" 'http://127.0.0.1:3000/'+popup.ppic"></div> 
             <div class="one-p">
                <p >{{popup.pname}}</p>
                <p class="one-price">￥{{popup.pprice}}</p> 
              </div> 
            </div>
             <span class="iconfont icon-shanchu icon-span"  @click="hidden" ></span>
          </div>
            <div class="car-divw">
              <div><p>数量:</p></div> 
              <div><span class="divw-span">库存:{{popup.pcount}}</span><mt-button class="btn" @click="fbtn" v-show="jian">-</mt-button><span>{{gcount}}</span><mt-button class="btn" @click="zbtn">+</mt-button></div>
            </div>
            <div class="car-dive"><mt-button class="dive-btn" :data-pid="popup.pid" :data-pname="popup.pname" :data-ppic="popup.ppic" :data-pprice="popup.pprice" @click="addCart">加入购物车</mt-button></div>
        </div>
    </div>
  </mt-popup> 
  
    
 
 
<!-- <div class="index-foots"></div> -->
</div>
 
</template>

<script>
// import Carshow from "../views/Carshow.vue"
export default {
  data(){
    return{popupVisible:false,
      list:[],
      pno:0,
      pname:"",
      pic1:"",
      popup:{},
      gcount:1,
      gid:1,
      jian:true,
      
    }
  },
  watch:{
  popupVisible(){
    // console.log(this.popupVisible)
    if(this.popupVisible==false){
      this.gcount = 1
      // console.log(123)
    }
  }
},

methods: {
  tzDetails(){
   this.$router.push("/FootDetails");
  },

//加入购物车
   addCart(e){
  var pid=e.target.dataset.pid;
  var n=e.target.dataset.pname;
  var p=e.target.dataset.pprice;
  var m=e.target.dataset.ppic;
  var c=this.gcount;
  var gid=this.gid;
  var url="addcart"
var objs={pid:pid,pname:n,pprice:p,ppic:m,gcount:c,gid:(gid+1)};
console.log(objs);
  this.axios.get(url,{params:objs}).then(res=>{
  if(res.data.code==-1){
    this.$toast("请登录");
    this.$router.push("/Login");
    return;
   }else{this.$toast("添加成功");
      this.popupVisible=true
   }
  })
},

car(e){
    var pid = e.target.dataset.pid;
     var obj={pid:pid}
     this.axios.get("lqc",{params:obj}).then(res=>{
      this.popup = res.data.data[0];
      console.log(this.popup)
     })
    this.popupVisible=!this.popupVisible
    
  },
  fbtn(){  
  if(this. gcount>1){
    this. gcount--;
   }else{
   }
  },
zbtn(){
  var a=this.popup.pcount;
  if(this. gcount<a){
    this. gcount++;
  }else{
     this.$toast(" 没有跟多库存了！");
     
  }
},
  hidden(){
     this.popupVisible=false
 },
  foods(){
    // this.$router.push('/FootDetails');
  },
// cart(e){
//   var pid=e.target.datset.pid;
//   var n=e.target.datset.pname;
//   var p=e.target.dataset.pprice;
//   var g=e.target.dataset.gcount;
//   var url="addcart"
//   var obja={pid:pid,pname:n,pprice:p,gcount:g};
//   this.axios.get(url,{params:obja}).then(res=>{
//     if(res.data.code==-1){
//       this.$toast("请先登录在添加商品")
//     }else{
//       this.$toast("添加成功");
//     }
//   })
//   this.$router.push("/Car")  
//   },

loadMore(){
         //功能：获取商品分页数据
        //  1：发送请求
        var url= "product";
        //当前页码加1
        this.pno++;
        // 创建参数对象
        var obj={pno:this.pno};
        //发送ajax请求获取当前页内容
        this.axios.get(url,{params:obj}).then(res=>{
        //  2：获取服务器返回结果
        console.log(res.data.data);
        //  3：将返回结果保存？？
        // this.list=res.data.data;
        //拼接多页
       var rows =this.list.concat(res.data.data);
    //    将结果赋值list
       this.list=rows;
       var shao=res.data.data;
        if(shao==""){
          this.$toast("没有更多商品了!");
            return;

        }

         })
       }
   }, 
    created() {
        this.loadMore();
        // console.log("组件创建成功");
    },
}
</script>

<style scoped>
.xs{
  display: block;
}
.yc{
  display: none;
}
.rootstyle{
  display:flex;
  justify-content:space-between;
  align-items: cebter;
  position:relative;
  margin-bottom: 8px;
  background-color: rgb(255, 255, 255);
  
}
.rootstyle .leftimgtxt{
  display :flex;
  padding-left:10px;

}
/* 图片样式 */
.leftimgtxt .imgstyle{
  width:80px;
  height: 80px;;
}
/* 标题 */
.titlestyle{
  display:flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 7px;
  color: rgb(102, 102, 102);
  font-size: 14px;
}
.titlestyle>.price{
  color: #f60;
}
.titlestyle .sales{
  font-size: 12px;
  color:#a8a8a8;
}
.rootstyle .cart{
  position:absolute;
  bottom:2px;
  right:12px;
  font-size: 23px;

}
/* 空div */
.index-foots{
    height: 60px;
}
/* 购物弹出 */
.mint-popup-bottom{
    width: 100%;
}
.carshow{
    
    width: 100%;
    background: #fff;
}

.carshow-div{

width:90%;
height:184px;
margin: 0 auto;

    

}
.carshow-div .car-divq{
    height: 40%;
    display: flex;
    justify-content: space-between;
   
    
}
.carshow-div .car-divq .car-one .one-img{
    width: 85px;
    height: 85px;
    border-radius: 5px;
    border: 1px solid #dedede;
    float: left;
    margin: -45px auto 0px; 

}
.carshow-div .car-divq .car-one .one-p{
    float: left;
}
.carshow-div .car-divq .car-one .one-p>p{
    font-size:14px;
    margin:5px;
}
.carshow-div .car-divq .car-one .one-p .one-price{
    color:#ff6710;
}
.carshow-div .car-divq .car-one>div>img{
    height:100% ;
    width: 100%;
}
.carshow-div .icon-span{
    font-size: 25px;
  margin:5px 5px;
}
/*  */
 .carshow-div .car-divw{
    height: 40%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    
  
    
}  
 .carshow-div .car-divw>div>p{
     margin: 14px;
     padding-bottom: 4px;
    font-weight: bold;
    color: #373737;
 }
 .carshow-div .car-divw .divw-span{
     display: inline-block;
     margin: 10px 34px 0px 0px;
 }
 .carshow-div .car-divw .btn{
     background-color: #dedede; 
     width: 30px;
     height: 20px;
     margin: 5px;
 }
 /*  */
.carshow-div .car-dive{
    height:20%;
    background-color:#fff

    
 }
.carshow-div .car-dive .dive-btn{
    background: #f5a623;
    width: 100%;
    color:#fff;
}    
</style>