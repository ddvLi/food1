<template>
   <div id="coupont">
     <div>
       <ul>
         <li @click="coupontc(i)" v-for="(e,i) of list" :key="i" :class="fonz===i ? 'active':''">
           <a>{{e}}</a>
         </li>
       </ul>
     </div>
     <mt-tab-container v-model="active">
        <mt-tab-container-item id="tbb1">
          <div><span>没有更多</span></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tbb2">
          <div><span>没有更多</span></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tbb3">
          <div><span>没有更多</span></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tbb4">
          <div><span>没有更多</span></div>
        </mt-tab-container-item>
     </mt-tab-container>
   </div>
</template>

<script>
export default {
      data(){
        return{
            list:["全部","未使用","已使用","已失效"],
            active:"tbb1",
            fonz:0,
            a:"#ccc"
        }
      },
      methods: {
          coupontc(i){
            this.fonz=i;
            if(i==0){
              this.active="tbb1";
            }else if(i==1){
              this.active="tbb2"
            }else if(i==2){
              this.active="tbb3"
            }else{
              this.active="tbb4"
            }
          }
      },
}
</script>

<style scoped>
li{width: 20%; text-align: center;}
.active{
  border-bottom: 2px solid #ef7830;
  color:#ef7830;
  
}
ul{
  list-style: none;
  margin: 0;
  padding: 0;
  }
a{
  text-decoration: none;
   font-size: 14px;
}
#coupont{
  width: 100%;
  height: 665px;
  background: #f6f6f6;
}
#coupont>div:first-child{
  width: 100%;
  height: 40px;
  background: #fff;
}
#coupont>div:first-child>ul{
  width: 100%;
  display: flex;
  justify-content: space-around;
  line-height: 39px;
  margin-bottom: 10px;
}
span{
  display: inline-block;
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size:14px;
  color: 	#A9A9A9;
}
</style>