<template>
<div class="myOrder">
  <myheader></myheader>
  <div class="state-way">
    <mt-navbar class="way-part" v-model="waySelected">
      <mt-tab-item id="1" style="font-size:25px;">&#12288;&#12288;&#12288;&#12288;电商</mt-tab-item>
      <mt-tab-item id="2">到店&#12288;&#12288;&#12288;&#12288;</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="waySelected">
      <mt-tab-container-item id="1">
          <div class="order-state">
    <mt-navbar class="state-part" v-model="stateSelected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待付款</mt-tab-item>
       <mt-tab-item id="3">待发货</mt-tab-item>
        <mt-tab-item id="4">待收货</mt-tab-item>
         <mt-tab-item id="5">待评价</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="stateSelected">
      <mt-tab-container-item id="1">
        <Tostore></Tostore>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
          <Tostore1></Tostore1>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
          <Tostore2></Tostore2>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
          <Tostore3></Tostore3>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
          <Tostore4></Tostore4>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <div class="order-state">
    <mt-navbar class="state-part" v-model="stateSelected">
      <mt-tab-item id="1">全部</mt-tab-item>
      <mt-tab-item id="2">待付款</mt-tab-item>
       <mt-tab-item id="3">待确认</mt-tab-item>
        <mt-tab-item id="4">商家已确认</mt-tab-item>
         <mt-tab-item id="5">待评价</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="stateSelected">
      <mt-tab-container-item id="1">
          <span>1111111</span>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
           <span>2222222</span>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
            <span>33333</span>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
           <span>444444</span>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
            <span>55555</span>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
  </div>
</template>
 
<script>
import Myheader from "../components/Myheader.vue"
import Tostore1 from './Tostore1.vue'
import Tostore2 from './Tostore2.vue' 
import Tostore3 from './Tostore3.vue' 
import Tostore4 from './Tostore4.vue' 
import Tostore from './Tostore.vue' 
export default {
  data() {
    return {
      waySelected: '1',
      stateSelected: '1'
    };
  },
  components:{
        "Tostore1":Tostore1,
        "Tostore2":Tostore2,
        "Tostore3":Tostore3,
        "Tostore4":Tostore4,
        "Tostore":Tostore,
        "myheader":Myheader
    }

  
};
</script>

<!-- 样式 -->
<style scoped>
.state-way .mint-navbar>.mint-tab-item.is-selected{
  color:#ff7100;
  border-bottom: 2px solid #ff7100;
}
</style>