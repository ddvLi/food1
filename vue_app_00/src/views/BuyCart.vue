<template>
    <div class="Buy-Cart">
        <div class="Buycart" v-for="(item,i) of list" :key="i">
      <div>
      <div>
          <img :src="'http://127.0.0.1:3000/'+item.ppic">
      </div>
      <div class="Buycart_title">
          <p>{{item.pname}}</p>
          <p class="title_price">￥{{item.pprice}}</p>
      </div>
      <div class="Buycart_num">
          <svg class="icon" aria-hidden="true" style="display:inline-block;width:25px;height:25px;" @click="numDown(item)">
        <use xlink:href="#icon-jian"></use>
      </svg>
        <span>{{item.gcount}}</span>
      <svg class="icon" aria-hidden="true" style="display:inline-block;width:25px;height:25px;" @click="numUp(item)">
        <use xlink:href="#icon-jia"></use>
        </svg>
      </div>
      <div>
      </div>
  </div>
  </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list:[],
        }
    },
    methods:{
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
               }
           })
         },
         numUp(item){
            item.gcount++;
        },
        numDown(item){
            item.gcount--;
            if(item.gcount<1){
                var gid=item.gid;
                this.$messagebox.confirm("是否删除指定商品").then(res=>{
                var url="del";
                var obj={gid:gid};
                this.axios.get(url,{params:obj}).then(res=>{
                   if(res.data.code>0){
                       this.$toast("删除成功");
                        this.$router.push({
                        path:'Home'
                })
                   }
               })
            }).catch(err=>{
                 item.gcount++;
            })
         }
            },
    },
    created() {
        this.loadCart();
    },
}
</script>
<style scoped>
.Buy-Cart{
    font-size: 16px;
}
.Buy-Cart>div{
    width: 100%;
    height:70px;
    padding-top: 15px;
    border-bottom: 2px solid #e9e7e8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow:column wrap;
}
.Buy-Cart>div>div{
    width: 90%;
    /* margin: 0 auto;  */
}
.Buycart>div>div{
    display: inline-block;
    vertical-align: top;
}
.Buycart img{
    width:60px;
    height: 60px;
}
.Buycart_title{
    margin-left: 15px;
    width: 100px;
}
.Buycart_title p{
    height: 25px;
    margin: 0;
    white-space: nowrap;
}
.title_price{
    color: #ff7100;
}
.Buycart_num{
    font-size:25px;
    float: right;

}
.Buycart_num span{
    padding-left:10px;
    padding-right: 10px; 
}
</style>