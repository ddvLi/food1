<template>
<div>
<div class="myheader-div"></div>
<mt-header :title="unameomg||name" fixed>
<router-link to="" slot="left">
<mt-button icon="back" @click="goback">返回</mt-button>
</router-link>
<mt-button icon="more" slot="right"></mt-button>
</mt-header>
</div>
</template>
<script>
export default {
data(){
return{}
},
props:{
unameomg:{default:""},
name:{default:""}
},
methods: {
goback(){
this.$router.go(-1);
},
},
}
</script>

<style scoped>

.mint-header{
background:#000;
}
/* 空div */
.myheader-div{
height: 40px;
}
</style>