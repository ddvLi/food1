<template>
    <div>
        <myheader></myheader>
        <div class="fd-div">
        <div class="fdx-div">
            <img src="../../public/images/file_59f0533a40813.png" alt="">
        </div>
        <!-- 2 -->
        <div class="fd-titles">
            <div class="fd-title">{{title}}</div>
            <div class="fd-price">{{price}}</div>
            <div>
                <div class="fd-quantity">库存：<span>{{quantity}}</span></div>
                <div class="fd-span">运费：<span>{{mail}}</span></div>
            </div>
            </div>
        </div>
<!-- 详细 -->
    <div style="height:100px;">
      <div class="fd-particular">
        <div class="line"></div>  
            <span class="iconfont icon-xiangqing icon"></span>
            <span class="xiangqing">详情</span>
            <div class="line"></div>
        </div>  

        <div class="fd-product">产品详情</div>
        <div class="fd-product-p"><p>{{product}}</p></div>
    </div>
        <!-- 底部选项 -->
    <mt-tabbar fixed >
        <mt-tab-item id="" class="iconfont icon-jiarugouwuche fd-icon" >购物车</mt-tab-item>
        <mt-tab-item id="" class="iconfont icon-dianpu fd-icon" ><span @click="tzDp">店铺</span>   </mt-tab-item>
        <mt-tab-item id=""><mt-button class="fd-btnj">加入购物车</mt-button></mt-tab-item>
        <mt-tab-item id=""><mt-button class="fd-btnl">立即购买</mt-button></mt-tab-item>
</mt-tabbar>
    </div>


</template>

<script>
import Myheader from "../components/Myheader.vue"
export default {
    data() {
        
        return { title:"芒果奶茶",
                 price:"￥16.00",
                 quantity:19,
                 mail:"包邮",
                 product:"芒果奶茶"}
    },
    methods: {
        tzDp(){
            console.log(1111)
            this.$router.push({
            path:'Opention'
        })
        }
    },
    components:{
        "myheader":Myheader
    }
}
</script>

<style scoped>
.fd-div .fdx-div{
    margin:0 auto;

    height: 320px;
    
}
.fd-div .fdx-div img{
    width: 100%;
    height: 100%;
   
}  
/* 2 */
.fd-titles{
    padding:10px 10px;
    
}
.fd-titles .fd-title{
    font-size: 14px;
    color: #333;
}
.fd-titles .fd-price{
    color: #ff7100;
    padding:8px 0;
}
.fd-titles .fd-quantity{
    display: inline-block;
    margin-right: 20px; 
     font-size: 12px;
    line-height: 20px;
}


.fd-titles .fd-span{
    display: inline-block;
    font-size: 12px;
    line-height: 20px;
}
/* 详细 */
.fd-particular{
    padding:8px;
    text-align:center;
    background:#f4f4f4;
    color:#b2b2b2;
    font-size:12px;
}
.fd-particular .line{
    width:45px;
    height:1px;
    background: #ccc;
    display:inline-block;
    vertical-align: middle;
}
.fd-particular .icon{
    display:inline-block;
    vertical-align: middle;
    margin: 0 6px; 
}
.fd-particular .xiangqing{
    display: inline-block;
    vertical-align: middle;
    margin-right:3px;
}
/* 产品详情 */
.fd-product{
 border-bottom:1px solid #f4f4f4;
 padding:0 0 8px 8px;
 color: #333;   
}
.fd-product-p{
    margin-top:8px;
    padding: 0 20px;
    color: #333;
}
/* 底部导航 */

.mint-tabbar > .mint-tab-item.is-selected{
    background: #fff;
    color: #333;
    border-top:1px solid #d9d9d9;
}
.fd-icon{
    font-size: 26px;
   
}
.mint-button--default{
    color:#fff;
    font-size:12px;
    
   
}

.fd-btnj{
    background: #f5a623;
     width:95%;
    
   
}
.fd-btnl{
    background:#ff7100;
    width:95%;
}

</style>