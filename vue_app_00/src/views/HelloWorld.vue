<template>
  <div id="hello">
   
    <div class="top">
      <img src="../../public/images/wel001.jpg" alt="">
    </div>
    <div class="middle">
      <h1>快乐美食</h1>
    </div>
     <div class="line"></div>
    <div class="bottom">
      <img src="../../public/images/wel002.jpg" alt="">
    </div>
 
  </div>
</template>

<script>
export default {
  data() {
    return {
      t:"",
      time:3
    }
  },
  methods: {
    
  },
  created() {
    if(this.t==""){
         this.t=setInterval(()=>{
          this.time=this.time-1;
          if(this.time==0){
            clearInterval(this.t);
            this.$router.push("/Login");  
          }
        },1000);
      }
  },
}
</script>

<style scoped>
  #hello .top>img{
    width: 100%;
    height: auto;
    margin-top: 25px;
    
  }

  #hello .middle h1{
    width: 100%;
    height:80px;
    background: #333;
    text-align: center;
    margin: 0;
    color:#fff;
    font-size: 48px;
    line-height: 80px;
    font-family: "幼圆";
    font-weight: bolder;
  }


  #hello .line{
    width: 100%;
    height: 3px;  
  }
  #hello .bottom>img{
    width: 100%;
    height: auto; 
  }
  
  
    
</style>
