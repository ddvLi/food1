<template>
    <div class="app_total">
         <div class="Buycart" v-for="(item,i) of list" :key="i" style="display:none;">
            </div>
        <div class="content" style="height:50px;">
      <div class="amount">
          <span>商品金额</span>
          <span class="active">{{TotalPprice}}</span>
      </div>
  </div>
  <div class="content" style="height:50px;">
      <div class="amount">
          <span>运费</span>
          <span>{{TotalYprice}}</span>
      </div>
  </div>
</div>
</template>
<script>
export default {
    data() {
        return {
             list:[],
             CartTotal:"310.00",
             TotalYprice:0
        }
    },
    methods:{
        GetTotalYprice(){
            this.list.map((item) => {
                if(item.isPinkage==0){
                    console.log(11111111111);
                    this.TotalYprice+=6; 
                }
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
                   this.GetTotalYprice();
               }
           })
         },
         EmitCart(){
            this.$emit("Cartdata",this.CartTotal);
        }
    },
    created() {
        this.loadCart();
    },
    mounted() {
        this.EmitCart();
    },
    computed: {
        TotalPprice(){
            var total = 0;
            this.list.map((item) => {total += item.pprice});
            return total;
        }
}
}
</script>
<style scoped>
.app_total{
    font-size: 16px;
}
.app_total>div{
    width: 100%;
    height:100%;
    padding-top: 15px;
    border-bottom: 2px solid #e9e7e8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow:column wrap;
}
.app_total>div>div{
    width: 90%;
    /* margin: 0 auto;  */
}
.content{
    padding: 0 !important;
}
.amount span:nth-child(2){
    float: right;
}
.active{
    color: #f15a0c;
}
</style>