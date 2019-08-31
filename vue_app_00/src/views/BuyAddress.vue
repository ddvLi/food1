<template>
    <div class="Buy-Address" @click="FatherAuser">
        <div style="border-bottom: 8px solid #e9e7e8;height:70px;" class="content">
      <div class="adress">
          <div>
              <div>
                  <span>{{list.auser}}&#12288;</span>
                  <span>{{list.aphone}}</span>
            </div>
              <div>
                  <span>{{list.address}}</span>
              </div>
          </div>
          <div class="iconfont icon-jiantou" style="font-size:35px;float:right;" @click="chooseAddress"></div>
      </div>
  </div> 
    </div>
</template>
<script>
export default {
    data() {
        return {
            list:[],
           auser:""
        }
    },

    methods: {
         chooseAddress(){
            this.$router.push({
                path:'Address'
            })
        },
        loadAddress(){
           var url="BuyAddress";
           this.axios.get(url).then(res=>{
               if(res.data.code==-1){
                   this.$messagebox("消息","请登录").then(res=>{
                       this.$router.push("/Login");
                       return;
                   })
               }else{
                   var list=res.data.data[0];
                   this.list=list;
                   this.auser=this.list.auser;
                   console.log(this.auser);
               }
           })
         },
         FatherAuser(){
              this.$emit('getAphone',this.auser);
         }
    },
    created() {
        this.loadAddress();
    }
}
</script>
<style scoped>
.Buy-Address{
    font-size: 16px;
}
.Buy-Address>div{
    width: 100%;
    height:70px;
    padding-top: 15px;
    border-bottom: 2px solid #e9e7e8;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-flow:column wrap;
}
.Buy-Address>div>div{
    width: 90%;
    /* margin: 0 auto;  */
}
.content{
    padding: 0 !important;
}
.adress>div{
    display: inline-block;
    max-width: 80%;
}
</style>