<template>
  <div>
    <div class="carshow">
      <!-- 购物车头部 -->
      <div class="car-div">
        <div>购物车列表 <span @click="edit" v-show="caredit">编辑</span><span v-show="!caredit" @click="edit">完成</span></div>
      </div>
      <!-- 删除div -->
      <div class="popup" :class="{actice:isActive}">
        <div class="car-check">
          <div>
             <span class="s-check shoppingall"  @click="all"><img src="../../public/images/checked.png" alt=""></span>全选<!-- :class="{scheck:ischeck}" -->
          </div>
          <div class="car-btn"><mt-button class="check-btn" @click="DeleteAll">删除商品</mt-button></div>
        </div>
      </div> 
      <!-- 空div上 -->
      <div style="height:48px; transition:.6s ease-out;" :class="{kong:isKong}"></div>
      <!-- 购物列表 -->
      <div class="car-ol" v-for="(item,i) of list" :key="i">
        <div class="car-oll">
          <span class="s-check s-check1 shopping" @click="delthis" :data-id="item.gid"><!-- :class="{scheck1}" -->
            <img src="../../public/images/checked.png" alt="" :data-id="item.gid">
          </span>
          <span class="ol-img">
            <img :src="'http://127.0.0.1:3000/'+item.ppic">
          </span>
          <div>
            <div class="car-title">{{item.pname}}</div>
            <p class="car-price">价格￥{{item.pprice}}</p>
          </div>
        </div>
        <div class="car-btn" style="height:80px;line-height:80px;">
          <button @click="numUp(-1,item.gid)">-</button>
          <span class="span1">{{item.gcount}}</span>
          <button  @click="numUp(+1,item.gid)">+</button>    <!--   -->
        </div>
      </div>
      <!--  -->
      <mt-tabbar fixed class="car-tabbar" v-show="show">
        <div>
          <span class="s-check s-check1 shoppingall" @click="all">
            <img src="../../public/images/checked.png" alt="">
          </span>全选
        </div>
        <div>
          <span class="tab-span">合计：￥
            <span>{{TotalPprice}}</span>
          </span>
          <mt-button class="tab-btn" @click="BuyBuyBuy">结算</mt-button>
        </div>
      </mt-tabbar>
    </div>
  </div>
</template>

<script>
import Myheader from "../components/Myheader.vue"
export default {
  data(){
    return{
      total:"￥13",
      caredit:true,
      popupVisible:false,
      isActive:false,
      isKong:false,
      show:true,
      ischeck:false,
      list:[],
      TotalPprice:0,
      span_all:{},
      shop:[],
      //scheck1:"",
    }
  },
  methods:{
    edit(){
    // this.popupVisible=!this.popupVisible
    this.caredit=!this.caredit
    this.isActive=!this.isActive
    this.isKong=!this.isKong
    this.show=!this.show
    },
    BuyBuyBuy(){
        this.$router.push({
                path:'Buy'
                })
    },
    loadCart(){
              var url="cart";
              this.axios.get(url).then(res=>{
                  if(res.data.code==-1){
                      this.$messagebox("消息","请登录").then(res=>{
                          this.$router.push("/Login");
                          return;
                      })
                  }else{
                    var list=res.data.data;
                    this.list=list;
                    /* 计算商品的总价格 */
                    for (var item of list){
                      this.TotalPprice+=(item.gcount*item.pprice)
                    }
                  }
              })
            },
            numUp(i,gid){
              var i=i;
              var gid=gid
              var url="add"
              var obj={i,gid}
              this.axios.get(url,{params:obj}).then(res=>{
                 if (res.data.code>0){
                   this.TotalPprice=0
                   this.loadCart();
                 }
              })
            },
          all(){       //点击的全选按钮
            var span_all=document.getElementsByClassName("shoppingall")
            var span_=document.getElementsByClassName("shopping")
            for (var span of span_all){
              span.onclick=function (){
                var span=this
                if (span.classList.contains("scheck1")){
                  span.classList.remove("scheck1");
                  for (var span_1 of span_){
                    span_1.classList.remove("scheck1")
                  }
                }else{
                  span.classList.add("scheck1")
                  for (var span_1 of span_){
                    span_1.classList.add("scheck1")
                  }
                }
              }
            }   //循环控制点击全选按钮控制单选按钮
          },
          delthis(){   //点击单个的按钮
            var i=0
            var span_=document.getElementsByClassName("shopping")
            this.shop=span_
            var span_all=document.getElementsByClassName("shoppingall")
            //var id=e.target.dataset.id   //获取次时的id

            for (var span of span_){
              span.onclick=function (){
                var span=this
                if (span.classList.contains("scheck1")){
                  span.classList.remove("scheck1");
                    for (var span1 of span_all){
                      span1.classList.remove("scheck1");
                    }
                }else{
                  span.classList.add("scheck1")
                }
                for (var span of span_){
                    if (span.classList.contains("scheck1")==false){
                  i++
                }
              }
              if (i==0){
                  for (var span1 of span_all){
                      span1.classList.add("scheck1");
                    }
                }
              }
            }
          },
          DeleteAll(){
            var aa=this.shop
            //创建变量保存多个商品的id值
            var str=""
            //创建循环遍历span总有变红元素的id
            for (var span of aa){
              if (span.classList.contains("scheck1")){
                // 获取data中的id值，并且赋值给str
                str+=span.getAttribute("data-id")+","
              }
            }

            if (str.length==0){
              this.$messagebox("请选择需要删除的商品")
				      return;
            }

            this.$messagebox.confirm("是否删除指定商品").then(res=>{
                var url="delAll";
                str=str.slice(0,-1)
                console.log(str)
			          var ids={ids:str}

                this.axios.get(url,{params:ids}).then(res=>{
                    this.loadCart();
                    this.$toast("删除成功");
                })
              //   var obj={};
              //   this.axios.get(url,{params:obj}).then(res=>{
              //      if(res.data.code>0){
              //          this.$toast("删除成功");
              //           this.$router.push({
              //           path:'Home'
              //   })
              //      }
              //  })
            }).catch(err=>{
                 console.log(err)
            })
          }
// ss(){
// this.check=!this.check;
// // if(ckeck==true){
// // show==false;
// // }
// }
},
mounted(){

},
created() {
        this.shop=document.getElementsByClassName("shopping")
        this.loadCart();
    },
  // computed: {
  //   TotalPprice(){
  //       var total = 0;
  //       this.list.map((item) => {total += item.money});
  //       return total;
  //   }
  // },
  components:{
    "myheader":Myheader
  }
}

</script>

<style scoped>
.span1{
  width: 20px;
  display: inline-block;
  text-align: center;
  font-weight: bold;
}
.carshow .kong{
  height:120px !important;
   transition: .6s ease-out ;
}
.car-div{
text-align: center;
line-height: 42px;
background: #fff;
height: 42px;
border-bottom:1px solid rgba(221, 221, 221, 0.5);
position: fixed;
width: 100%;
z-index: 9999;
height: 50px;
top:41px;

}
.car-div>div>span{
float: right;
padding-right: 10px;
}
/* */
.car-check{
padding: 5px 0px;
display: flex;
justify-content: space-between;
align-items: center;
text-align: left;
width: 100%;
}
.s-check{
display: inline-block;
border-radius:50%;
width: 20px;
height:20px; 
background: #9e9e9e;
line-height: 13px;
box-sizing: border-box;
padding: 4px 3px;
margin-right: 6px;
vertical-align: middle;
margin-left: 10px;
}
.car-check .scheck{
  background: #f00;
}
.scheck1{
  background:#f00 !important
}

 .s-check img{
width:100%;
height:100%;
}
.car-check .car-btn .check-btn{
background:#d20e10;
color: #fff;
margin-right: 25px;
}
/* divbu */
.car-tabbar{
display: flex;
justify-content:space-between;
align-items:center;
font-size: 14px;
width: 100%;
}
.car-tabbar>div .tab-span{
margin-right: 10px;
}
.tab-span>span{
color: #ff7100;
}
.car-tabbar .tab-btn {
background: #ff7100;
color: #fff;
width: 80px;

}
/* 购物列表 */
.car-ol{
background: #fff;
border-bottom:2px solid #ddd; 
height: 100px;
display: flex;
justify-content:space-between;
align-items: center;
flex-flow:column wrap;
}
.popup{
  position: fixed;
  width: 100%;
  margin-top:50px;
  transition: .6s ease-out;
  background-color: #fff;
  top: -60px;
  right: auto;
  bottom: auto;
  left: 50%;
  transform: translate3d(-50%, 0, 0);
}
.carshow .actice{
 
  position: fixed;
  width: 100%;
  margin-top:40px;
  transition: .6s ease-out ;
  background-color: #fff  ;
  top: 60px ;
  right: auto ;
  bottom: auto ;
  left: 50%  ;
  transform: translate3d(-50%, 0, 0) ;
}


.car-ol .car-oll{
display: flex;
justify-content:left;
padding: 0px 9px 10px 0;
height: 60px;
margin-top: 10px;
}
.car-ol .car-oll .s-check1{
display: initial-block;
margin-top:25px;
}
.car-ol .car-oll .car-title{
  font-size: 15px;
  color: #333;

  }
.car-ol .car-oll .car-price{
  
  color: #ff7223;
    font-size: 20px;
    margin-top: 7px;
    }

.car-ol .ol-img{
  display: inline-block;
  width: 80px;
  height: 80px;
  margin: 0px 10px 10px 10px;
  ;
 
}
.car-ol .ol-img img{
  width: 100%;
  height: 100%;
}
/* btn */
.car-ol .car-btn{
  margin-top: 20px;
  margin-right: 10px;
  
}
.car-ol .car-btn>button{
  background: #DC221D;
  height: 30px;
  width: 30px;
  border-radius: 3px;
  text-align: center;
  line-height: 2px;
  color:#fff;
  font-size:25px;
 
}
</style>