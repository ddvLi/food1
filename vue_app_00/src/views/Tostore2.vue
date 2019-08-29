<template>
<div class="stateDetails">
    <div v-for="(item,i) of list" :key="i">
<div class="orderDetail">
    <div style="display:block;margin:0 auto;font-size:18px;">
        <span class="completeTime">完成时间:{{item.otime}}</span>
        <span style="color:#ff7100;">&#12288;&#12288;&#12288;{{order.state}}</span>
    </div>
</div>
<div style="display:flex;text-align:center;">
    <div class="DetailImg" style="text-align:center;width:50%;display:flex;">
        &#12288;&#12288;
          <img :src="'http://127.0.0.1:3000/'+item.ppic" style="width:80px;height:80px;">
      </div>
      <div class="Details" style="width:50%;display:flex;flex-direction:column;text-align:center;justify-content:center;">
          <p>{{item.pname}}</p>
          <p class="title_price">{{item.pprice}}</p>
          <p class="title_price">数量:&#12288;{{item.gcount}}</p>
      </div>
</div>
<div class="handleBtn">
    <mt-button size="small" type="primary" style="background-color:#ff7100;font-size:18px;">再来一单</mt-button>
    <mt-button size="small" type="primary" style="background-color:#ff7100;font-size:18px;">删除</mt-button>
</div>
<div style="width:100%;height:40px;"></div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            order:{state:"待发货"},
            list:[]
        }
    },
    methods: {
        toStore2(){
           var url="toStore2";
           this.axios.get(url).then(res=>{
               if(res.data.code==-1){
                   this.$messagebox("消息","请登录").then(res=>{
                       this.$router.push("/Login");
                       return;
                   })
               }else{
                   var list=res.data.data;
                   this.list=list;
               }
           })
         },
    },
    created() {
        this.toStore2();
    },
}
</script>

<style scoped>
.orderDetail{
    width: 100%;
    text-align: center;
}
.orderDetail>div{
    display: inline-block;
}
.leftImg img{
    width: 60px;
    height: 60px;
}
.completeTitle{
    display: block;
}
.Details p{
    width:100%;
    height:20px;
    margin: 0;
}
.compDetails{
    float: right;
    height: 80px;
    line-height: 20px;
}
.compDetails span{
    display: block;
}
.stateHandle{
    display: flex;
    justify-content: center;
    align-items: center;
}
.stateHandle div{
    width: 40%;
}
.handleBtn{
     display: flex;
    justify-content: space-around;
    align-items: center;
    width: 50%;
    float: right;
}
</style>