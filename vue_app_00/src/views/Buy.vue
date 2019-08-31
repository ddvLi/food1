<template>
<div class="app_Buy">
<BuyCart></BuyCart>
  <div style="height:150px;">
      <div class="leaveWord">
          <textarea name="leaveWord" placeholder="买家留言" maxlength="30" @input="lwordInput" v-model="lword"/>
          <div class="limitWord" v-bind:class="{active: isActive}">{{txtVal}}/30</div>
      </div>
  </div>
    <BuyAddress @getAphone="getAuser"></BuyAddress>
  <BuyTotal @Cartdata="GetCartdata"></BuyTotal>
  <div class="content" style="height:90px;border-bottom:none;">
     <div class="pay-method" @click="chooseMethods"> 
        <img src="../../public/images/weixin.jpg">
        <svg class="icon" aria-hidden="true" style="display:inline-block;width:30px;height:30px;">
        <use :xlink:href="'#icon-'+payMethod.firstImg"></use>
        </svg>        
     </div>
     <div class="pay-method" style="display:block;" @click="chooseMethods"> 
        <img src="../../public/images/zhifubao.jpg">
        <svg class="icon" aria-hidden="true" style="display:inline-block;width:30px;height:30px;">
        <use :xlink:href="'#icon-'+payMethod.secondImg"></use>
        </svg>        
     </div>
  </div>
   <div v-for="(item,i) of list" :key="i" style="display:none;"></div>
  <div class="content" style="height:60px;justify-content: space-between;flex-flow:row wrap;bottom:0;border-top:2px solid #e9e7e8;z-index:999;background-color:#ffffff;">
      <span style="display:inl-block;color:#ff7100;">&#12288;合计:&#12288;{{totalMoney}}</span>
      <mt-button type="danger" size="small" style="background-color:#ff7100;width:100px;" @click="complete(ordername,ordergcount,ordermoney,orderisPinkage)">去付款</mt-button>
  </div>
</div>
</template>

<script>
import Myheader from "../components/Myheader.vue"
import BuyCart from "./BuyCart.vue"
import BuyTotal from "./BuyTotal.vue"
import BuyAddress from "./BuyAddress.vue"
export default {
    data() {
        return {
            isActive: false,
            txtVal:0,
            lword:"",
            list:[],
            payMethod:{firstImg:"select",secondImg:"notSelect-copy"},
            ordername:"",
            ordergcount:0,
            ordermoney:0,
            orderisPinkage:0,
            totalMoney:0,
            auser:""
        }
    },
    methods:{
        lwordInput(){
             this.txtVal = this.lword.length;
             if(this.txtVal==30){
                    this.isActive = true;
             }else{
                    this.isActive = false;
             }
        },
       getAuser(auser){
           this.auser=auser;
           console.log(auser);
       },
        GetCartdata(data){
            this.data=data;
        },
        chooseMethods(){
            var fileImg=this.payMethod.firstImg;
            this.payMethod.firstImg= this.payMethod.secondImg;
            this.payMethod.secondImg= fileImg;
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
                   var ordername="";
                    this.list.map((item) => {ordername += item.pname+","});
                    this.ordername=ordername;
                    var ordergcount=0;
                    this.list.map((item) => {ordergcount += parseInt(item.gcount)});
                     this.ordergcount=ordergcount;
                    var ordermoney=0;
                     this.list.map((item) => {ordermoney += parseInt(item.money)});
                      this.ordermoney=ordermoney;
                    var orderisPinkage=0;
                     this.list.map((item) => {orderisPinkage += parseInt(item.isPinkage)});
                      this.orderisPinkage=orderisPinkage;
                      this.getTotalMoney();
               }
           })
         },
         complete(ordername,ordergcount,ordermoney,orderisPinkage){
            var auser=this.auser;
            var tmoney=this.totalMoney;
            console.log(tmoney);
            var url="addorder";
            var objs={auser:auser,gcount:ordergcount,pname:ordername,money:ordermoney,tmoney:tmoney};
             console.log(objs);
            this.axios.get(url,{params:objs}).then(res=>{
            if(res.data.code==-1){
                    this.$toast("请登录");
                    this.$router.push("/Login");
                    return;
                    }else{this.$toast("结算成功");
                     this.$router.push("/MyOrder");
            }
            })
        },
        getTotalMoney(){
            this.list.map((item) => {this.totalMoney += item.pprice;});
             this.list.map((item) => {
                if(item.isPinkage==0){
                    this.totalMoney+=6; 
                }
        })
        }
        },
         created() {
        this.loadCart();
         },
        components:{
        "BuyCart":BuyCart,
        "BuyTotal":BuyTotal,
        "BuyAddress":BuyAddress,
        "myheader":Myheader
    },
    }
</script>

<style scoped>
.app_Buy{
    font-size: 16px;
}
.app_Buy>div{
    width: 100%;
    height:100%;
    padding-top: 15px;
    border-bottom: 2px solid #e9e7e8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow:column wrap;
}
.app_Buy>div>div{
    width: 90%;
    /* margin: 0 auto;  */
}
.leaveWord{
    height: 100%;
}
.leaveWord textarea{
    display: block;
    width: 90%;
    height: 80%;
    line-height:30px;
    margin: 0 auto;
    background-color: #e9e7e8;
    border: none;
    outline: none;
    box-sizing: border-box;
}
.leaveWord div{
      width: 90%;
      height: 15%;
        margin: 0 auto;
        background-color: #e9e7e8;
}
.limitWord{
    text-align: right;
    font-size: 12px;
}
.content{
    padding: 0 !important;
}
.active{
    color: #f15a0c;
}
.pay-method{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.pay-method img{
     height: 35px;
    float: left;
}
.pay-method svg{
     float: right;
}
</style>