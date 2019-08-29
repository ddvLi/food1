<template>
    <div class="app_Cus">
         <myheader></myheader>
        <div class="element">
        <img src="../../public/images/file_58f5e700d93a2.png">
        </div>
        <div class="ele-container">
        <ul>
            <li>
                <span class="active">店铺介绍</span>
                <i class="underline"></i>
                </li>
            <li><span @click="opention">意见反馈</span></li>
        </ul>
        </div>
        <span class="Cus_msg">&#12288;&#12288;{{Cus_msg}}</span>
        <mt-button size="large" type="primary" style="margin:0 auto;width:75%;background-color:rgb(249, 174, 15);margin-top:15px;">联系我们</mt-button>
        <div class="Cus_map">
            <p>公司地址:</p>
            <BaiduMap></BaiduMap>
        </div>
    </div>
</template>

<script>
import Myheader from "../components/Myheader.vue"
import BaiduMap from "./BaiduMap.vue"
export default {
    data() {
        return {
            "Cus_msg":"渔夫寿司是日本传统美食之一。主要材料是用寿司醋调味过的维持在人体体温的饭块，再加上鱼肉，海鲜，蔬菜或鸡蛋等作配料，其味道鲜美，很受日本民众的喜爱。寿司在公元九二七年完成的平安时代法典「延喜式」中，就已有记载。当时的寿司指的是一种保存鱼的方式。在鱼身上抹上盐，用重物压紧，使之自然发酵。当产生酸味后，用水晶米包裹即可食用（水晶米煮熟冷却之后要通过反复碾压）。据《东夷列传-倭国传》记载倭人生食海物，即生鱼片，后与米粒包裹，形成一种速食。"
        }
    },
    methods: {
        opention(){
            this.$router.push({
                path:'Opention'
            })
        },
    },
    components:{
        "BaiduMap":BaiduMap,
    "myheader":Myheader

    }
}
</script>

<style scoped>
.element{
    width: 100%;
    max-width: 100%;
    clear: both;
    position: relative;
}
.element img{
    width: 100%;
    height: 100%;
    border-style:none; 
}
.ele-container{
    height: 40px;
    line-height: 40px; 
    background-color:rgb(255,255,255);  
}
.ele-container ul{
    padding: 0;
    margin: 0;
    width: 100%;
    height: 50px;
    list-style: none;
}
.ele-container ul li{
    position: relative;
    display: inline-block;
    min-width: 80px;
    text-align: center;
    vertical-align: top;
}
.ele-container ul li span{
    padding-left:0.4em;
    padding-right:0.4em;
    white-space: nowrap;
}
.active{
    color: #ff7100;
}
.underline{
    display: block;
    width:100%;
    height: 0;
    border-top:1px solid rgb(249,174,15);
    position:absolute;
    left: 0;
    bottom: 0;
}
.Cus_msg{
    border-style: none;
    border-width: 2px;
    color: rgb(102, 102, 102);
    font-size: 16px;
    width: 300px;
    line-height: 30px;
    margin-left: auto;
    margin-top: 1px;
    opacity: 1;
    text-align: left;
    margin-right: auto;
}
</style>