<template>
  <div id="notification">
    <div>
      <div>
        <span @click="retn" class="iconfont icon-xiangzuojiantou jty_09"></span>
      </div>
      <ul >
        <li @click="add(i)" v-for="(e,i) of list" :key="i" :class="sfxz===i?'active':''">
          <a>{{e}}</a>
        </li>
      </ul>
    </div>
    <mt-tab-container  v-model="active">
      <mt-tab-container-item id="tab1"> 
        <div class="Nomove"><span>没有更多了</span></div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab2"> 
        <div class="Nomove"><span>没有更多了</span></div> 
      </mt-tab-container-item>
      <mt-tab-container-item id="tab3"> 
        <div class="Nomove"><span>没有更多了</span></div>
      </mt-tab-container-item>
    </mt-tab-container>  
  </div>
</template>
<script>
export default {
  data(){
    return{
      active:"tab1",
      list:['点赞','评论','屏蔽'],
      sfxz:0
    }
  },
  methods:{
    add(i){
      this.sfxz = i;
      if(i===0){
        this.active="tab1"
      }else if(i===1){
        this.active="tab2"
      }else{
        this.active="tab3"
      }
    },
    retn(){
     this.$router.push('./Community')
     }
  },

}
</script>
<style scoped>
.active{
  border-bottom: 2px solid #00b6f8;
  color:#00b6f8;
}
ul{
  list-style: none;
  padding: 0;
  margin: 0;
  }
#notification{
  width: 100%;
  min-height: 667px;
  max-height: 100%;
  background-color:#eee;
}
#notification>div:first-child{
  width: 100%;
  height: 45px;
  background: #fff;
  display: flex;
}
#notification>div:first-child>ul{
  display: flex;
  justify-content: space-around;
  width:85%;
  text-align: center
}
#notification>div:first-child>ul>li{
  line-height: 42px;
  width:20%;
}
/* #notification>div:first-child>ul>li:first-child{
  border-bottom: 2px solid #00b6f8;
} */
#notification>div:first-child>ul>li>a{
  width:60px;height:45px;
  display: inline-block;
  /* border-bottom: 2px solid red; */
}
#notification>div:first-child>ul>li>a.a1{
  color:#00b6f8;
  border-bottom: 2px solid #00b6f8;
}
#notification>div>div{
  width:15%;
}
.jty_09{
  font-size:20px;
  line-height: 45px;
  padding: 15px;
  box-sizing: border-box;
}
.Nomove{
  font-size:14px;
  padding: 25px 0;
  color: #949494;
  text-align: center;
}
</style>