<template>
    <div class="app_Cus">
        <myheader></myheader>
        <div class="element">
        <img src="../../public/images/file_58f5e700d93a2.png">
        </div>
        <div class="ele-container">
        <ul>
            <li>
                <span @click="contactus">店铺介绍</span>
                </li>
            <li><span class="active">意见与建议</span
            ><i class="underline"></i></li>
        </ul>
        </div>
        <div class="Opention">
            <input v-model="Op_name" placeholder="请输入姓名">
            <input v-model="Op_contact" placeholder="请输入联系方式">
            <textarea v-model="Op_content" placeholder="请输入内容"></textarea>
        </div>
        <div style="margin-top:15px;">
        <mt-button size="large" type="primary" style="margin:0 auto;width:75%;background-color:rgb(52, 182, 253)" @click.native="opention">确定</mt-button>
         </div>
    </div>
</template>

<script>
import Myheader from "../components/Myheader.vue"
export default {
    data() {
        return {
            
        }
    },
    methods: {
        contactus(){
            this.$router.push({
                path:'ContactUs'
            })
        },
        opention(){
            this.$toast("提交成功")
        }
    },
    components:{
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
.Opention input{
    display: block;
    width: 75%;
    min-width: 50px;
    height: 35px;
    margin: 0 auto;
    text-indent: 8px;
    margin-top:20px;
}
.Opention textarea{
    display: block;
    width: 75%;
    height: 80px;
    min-width: 50px;
    margin: 0 auto;
    text-indent: 8px;
    margin-top:20px;
}
</style>