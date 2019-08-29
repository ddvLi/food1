<template>
  <div id="center_update">
    <myheader></myheader>
    <div class="center2">
      <div class="bg-wihte">
        <div class="tx">
          <span class="txt">我的头像</span>
          <span class="jt iconfont icon-jiantou"></span>
          <div class="yhtx" @click.stop="uploadHeadImg">
            <img :src="userInfo.avatar" alt="">
          </div>
        </div>
        <input type="file" accept="image/png,image/jpeg,image/gif,image/jpg" id="sctp" @change="handleFile" class="sctpBtn">
        <div class="uname">
          <span class="txt">昵称</span>
          <span class="jt iconfont icon-jiantou"></span>
          <input type="text" :placeholder="uname" v-model="uname_val" @change="uname_valChange">
        </div>
        <div class="sex" @click="updateSex">
          <span class="txt">性别</span>
          <span class="jt iconfont icon-jiantou"></span>
          <span class="nan">{{sex}}</span>
        </div>
        <div class="upwd1">
          <span class="txt">密码</span>
          <span class="jt iconfont icon-jiantou"></span>
          <input type="password" placeholder="修改密码" v-model="upwd1_val"  @click="updateUpwd">
        </div>
        <div class="upwd2" :class="upwd2_dp">
          <span class="txt">密码</span>
          <span class="jt iconfont icon-jiantou"></span>
          <input type="password" placeholder="确认密码" v-model="upwd2_val" :disabled="upwd2_qx" @change="upwd2_valChange">
        </div>
      </div>
      <mt-button class="btn1" @click="btn1Fun" :disabled="btn1_qx">保存</mt-button>
      <mt-button class="btn2" @click="btn2Fun">退出登录</mt-button>
    </div>
    <div class="center3" :class="center3_dp" @click="cneter3Close">
      <div class="sex_window">
        <div class="sex_title">性别</div>
        <div @click="xzM">男
          <span :class="m_dp">✔</span>
        </div>
        <div @click="xzFM">女
          <span :class="fm_dp">✔</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Myheader from "../components/Myheader.vue"
export default {
  data() {
    return {
      center3_dp:"yc",
      upwd2_dp:"yc",
      upwd1_val:"",
      upwd2_val:"",
      upwd2_qx:true,
      upwd:"",
      m_dp:"",
      fm_dp:"yc",
      usex:"",
      uid:"",
      uname:"",
      upic:"",
      uname_val:"",
      btn1_qx:true,
      sex:"",
      userInfo: {
        avatar: 'data:image/jpeg;base64,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'
      }
    }
  },
  methods: {
    // 打开图片上传
    uploadHeadImg: function () {
      this.$el.querySelector("input.sctpBtn").click()
      this.btn1_qx=false;
    },
    // 将头像显示
    handleFile: function (e) {
      var $target = e.target || e.srcElement
      var file = $target.files[0]
      if(!file){return;}
        var reader = new FileReader()
        reader.onload = (data) => {
        var res = data.target || data.srcElement
        this.userInfo.avatar = res.result
      }
      reader.readAsDataURL(file)   //编码  
    },
    btn2Fun(){
      this.$router.push("/Login");
      sessionStorage.setItem("uid","");
    },
    upwd2_valChange(){
      this.upwd=this.upwd2_val;
      this.btn1_qx=false;
    },
    uname_valChange(){
      this.uname=this.uname_val;
      this.btn1_qx=false;
    },
    btn1Fun(){
      var obj={
        uid:this.uid,
        uname:this.uname,
        upwd:this.upwd,
        usex:this.usex,
        upic:this.userInfo.avatar
      }
      var url="update";
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==1){
          this.$toast("修改成功");
          this.$router.push("/PersonalCenter");
        }else{
          this.$toast("修改失败");
        }
      })
    },
    xzFM(){
      this.fm_dp="xs";
      this.m_dp="yc";
      this.usex=0;
      this.sex="女";
      this.btn1_qx=false;
    },
    xzM(){
      this.m_dp="xs";
      this.fm_dp="yc";
      this.usex=1;
      this.sex="男";
      this.btn1_qx=false;
    },
    cneter3Close(){
      this.center3_dp="yc";
    },
    updateSex(){
      this.center3_dp="xs";
    },
    updateUpwd(){
      this.upwd2_dp="sx";
      this.$toast("密码为3~16位数字或字母组成");
    }
  },
  watch:{
    upwd1_val(){
      var upwd_reg= /^[a-z0-9]{3,16}$/i;
      var upwd=this.upwd1_val;
      if(upwd_reg.test(upwd)==true){
        this.upwd2_qx=false;  
      }else{
        this.upwd2_qx=true;
      }
    }
  },
  created() {
    if(sessionStorage.getItem("uid")=="null"){ 
      this.$router.push("/Login");
    }else{
      this.uid=sessionStorage.getItem("uid");
    }
    var url="szPerCenter";
    var obj={uid:this.uid}
    this.axios.get(url,{params:obj}).then(res=>{
      var uname=res.data[0].uname;
      var uphone=res.data[0].uphone;
      var upwd=res.data[0].upwd;
      var upic=res.data[0].upic;
      var usex=res.data[0].usex;
      uname==null?this.uname=uphone:this.uname=uname;
      upic==null?upic=this.userInfo.avatar:this.userInfo.avatar=upic;
      this.upwd=upwd;
      this.usex=usex;
      usex==1?this.sex="男":this.sex="女";
    })
  },
  components:{
    "myheader":Myheader
  }
}
</script>

<style scoped>
  #center_update{
    width: 100%;
    height: 677px;
    background:#eee;
    position: relative;
  }
  #center_update .xs{
    display: block !important;
  }
  #center_update .yc{
    display: none !important;
  }
  #center_update .center2{
    width: 100%;
    height: auto;
    display: block;
  }
  #center_update .bg-wihte{
    width: 100%;
    height: auto;
    background: #fff;
  }
  #center_update .bg-wihte input{
    width: 200px;
    height: 30px;
    float:right;
    margin-top:6px;
    border:none;
    line-height: 32px;
    text-align: end;
    font-size:15px;
  }
  #center_update .tx{
    width: 95%;
    height: 80px;
    background: #fff;
    line-height: 80px;
    border-bottom: 1px solid #f3f3f3;
    margin: 0 auto;
    font-size:15px;
  }
   #center_update .txt{
    margin-left: 15px;
    color:#666;
    font-size:16px;
  }
  #center_update .jt{
    float:right;
    font-size:30px;
    color:#bbb !important;
  }
  #center_update .uname,#center_update .sex,#center_update .upwd1,#center_update .upwd2{
    width: 95%;
    height: 50px;
    background: #fff;
    border-bottom: 1px solid #f3f3f3;
    margin: 0 auto;
    line-height: 50px;
    font-size: 15px;
  }
   #center_update .btn1{
    width: 90%;
    height: 38px;
    display: block;
    margin: 20px auto 0;
    color:#ccc;
    font-weight: 500;
    background: #3091F2;
  }
  #center_update .btn2{
    width: 90%;
    height: 38px;
    display: block;
    margin: 20px auto 0 ;
    color: #333;
    background: #fff;
  }
  #center_update .center3{
    width: 100%;
    height:100%;
    background:rgba(0,0,0,0.85);
    position: absolute;
    top: 0;
  }
  #center_update .sex_window{
    width: 80%;
    height: 150px;
    background: #fff;
    position: absolute;
    z-index: 1;
    top: 20%;
    left: 10%
  }
  #center_update .sex_window>div{
    width: 90%;
    height: 50px;
    padding: 0 10px;
    line-height: 50px;
    margin: 0 auto;
    color:#666;
  }
  #center_update .sex_title{
    border-bottom:3px solid #ccc;
    color:#41B80E !important;
    font-size: 20px;
  }
  #center_update .sex_window>div>span{
    color:#41B80E;
    float: right;
  }
  #center_update .yhtx{
    width: 55px;
    height: 55px;
    float:right;
    border-radius: 50%;
    text-align: center;
    overflow: hidden;
    margin: 10px 0;
  }
  #center_update .yhtx>img{
    width: 55px;
    height: 55px;
    text-align: center;
  }
  #center_update .nan{
    color: #666;
    float:right;
  }
  #center_update .sctpBtn{
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
</style>