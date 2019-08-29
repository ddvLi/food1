<template>
<div >
    <div @click="dd">ddd</div>
    <mt-popup
  v-model="popupVisible"
  position="bottom">
  <div class="carshow">
    <div class="carshow-div">
        <div class="car-divq">
            <div class="car-one">
                <div class="one-img"><img src="../../public/images/file_59f0533a40813.png" alt=""></div>
                <div class="one-p">
                <p>{{title}}</p>
                <p class="one-price">{{price}}</p> 
                </div> 
                
            </div>
            <span class="iconfont icon-shanchu icon-span" ></span>
        </div>
        <div class="car-divw">
            <div>
            <p>数量</p>
            </div> 
            <div>
            <span class="divw-span">库存:{{quantity}}</span><mt-button class="btn">-</mt-button><span>{{num}}</span><mt-button class="btn">+</mt-button>
            </div>
        </div>
        <div class="car-dive">
            <mt-button class="dive-btn">加入购物车</mt-button>
        </div>   
    </div>
    </div>
</mt-popup>
</div>


</template>

<script>
export default {
    data(){
        return{
            num:20,
            quantity:19,
             title:"芒果奶茶",
             price:"￥16.00",
            popupVisible:false
        }
    },


methods: {
 dd(){
     this.popupVisible=true;
 }
},

}
</script>

<style scoped>
.carshow{
    width:666px;
    
    background: #fff;
}

.carshow-div{

width:320px;
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
     margin: 0px;
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