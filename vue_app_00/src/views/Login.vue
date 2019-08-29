<template>
  <div id="login">
    <div class="top">
      <div class="close1 iconfont icon-guanbi"></div>
      <div class="back iconfont icon-xiazai6" :class="back_dp" @click="goback"></div>
      <div class="help">帮助</div>
    </div>
    <div calss="login0" :class="login0_dp">
      <div class="middle">
        <h2>欢迎登录
          <span>快乐美食</span>
        </h2>
        <div class="phone">
          <mt-field type="text" placeholder="输入手机号" v-model="uphone" :attr="{maxlength:11}"></mt-field>
        </div>
        <div class="login1" :class="login1_dp">
          <span class="reg">未注册的手机号验证后自动创建快乐美食账户</span>
          <mt-button @click="dxBtnFun" :class="dxBtn" :disabled="dxBtn_qx" v-model="dxBtn">获取短信验证码</mt-button>
          <span class="mm" @click="mmFun">密码登录</span>
          <span class="wt">遇到问题</span>
        </div>
        <div class="login2" :class="login2_dp">
          <div class="pwd"> 
            <mt-field type="password" placeholder="请输入密码" v-model="upwd" :attr="{maxlength:16}">
              <span class="iconfont icon-biyan"></span>
            </mt-field>
            <span class="mmyz" :class="mmyz_dp">验证码或密码错误，请重新输入</span>
            <mt-button :class="dlBtn" :disabled="dlBtn_qx" @click="dlBtnFun">登录</mt-button>
            <span class="yzm" @click="yzmFun">验证码登录</span>
            <span class="wt">遇到问题</span>   
          </div>     
        </div>
      </div>
      <div class="bottom">
        <div>
          <div class="yuan">
            <span class="iconfont icon-icon_weixin-logo"></span>
          </div>
          <p>微信</p>
        </div>
        <div >
          <div class="yuan">
            <span class="iconfont icon-qq-fill"></span>
          </div>
          <p>QQ</p>
        </div>
      </div>
      <p class="ys">登录代表同意<span class="red">快乐美食用户协议、隐私政策</span>，并授权使用您</p>
      <p class="ys">的快乐美食账号信息（如昵称、头像、收货地址）以便您统</p>
      <p class="ys">一管理</p>
    </div>
   <div class="login00" :class="login00_dp"> 
      <div>
        <p class="p1">输入验证码</p>
        <p class="p2">验证码已发送至<span>{{this.uphone}}</span></p>
        <div class="number" ref="content">
			    <label :for="`code-${uuid}`" class="lab">
            <ul :class="`${theme}-container security-code-container`">
              <li class="field-wrap" v-for="(item, index) in length" :key="index">
                <i class="char-field">{{value[index]}}</i>
              </li>
            </ul>
          </label>
          <input type="number" ref="input" class="input-code" @keyup="handleInput($event)" v-model="value" :id="`code-${uuid}`" :name="`code-${uuid}`" :maxlength="length" autocorrect="off" autocomplete="off" autocapitalize="off">
		    </div>
        <p class="p3" :class="p3_dp">{{time}}秒后重新获取验证码</p>
        <p class="p4" @click="p4Fun" :class="p4_dp">重新获取验证码</p>
        <mt-button :class="qrBtn" :disabled="qrBtn_qx" @click="qrBtnFun" v-model="qrBtn">确认</mt-button>
      </div>
    </div>
    <div class="login000" :class="login000_dp">
      <div>
        <p>密码设置</p>
      </div>
      <div class="mmsr">
        <mt-field :type="str1" placeholder="输入密码" v-model="upwd1" :attr="{maxlength:16}">
          <span class="iconfont icon-biyan" @click="str1Fun" :class="mmsz1" ></span>
          <span class="iconfont icon-zhengyan" @click="str2Fun" :class="mmsz2" ></span>
        </mt-field>
      </div>
      <div class="mmsr">
        <mt-field :type="str2" placeholder="密码确认" v-model="upwd2" :attr="{maxlength:16}" :disabled="upwd2_qx">
          <span class="iconfont icon-biyan" @click="str3Fun" :class="mmsz3" ></span>
          <span class="iconfont icon-zhengyan" @click="str4Fun" :class="mmsz4" ></span>
        </mt-field>
      </div>
      <mt-button :class="mmqrBtn" :disabled="mmqrBtn_qx" @click="mmqrFun">确认</mt-button>
    </div>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      back_dp:"yc",
      str1:"password",
      str2:"password",
      uphone:"",
      upwd:"",
      upwd1:"",
      upwd2:"",
      dxBtn:"dx2",
      qrBtn:"dx2",
      dlBtn:"dl2",
      mmqrBtn:"dl2",
      upwd2_qx:true,
      mmqrBtn_qx:true,
      dxBtn_qx:true,
      qrBtn_qx:true,
      dlBtn_qx:true,
      login0_dp:"",
      login00_dp:"",
      login000_dp:"",
      login1_dp:"",
      login2_dp:"",
      time:60,
      t:"",
      p3_dp:"",
      p4_dp:"",
      mmyz_dp:"",
      value:"",//用户输入的验证码值
      dxCode:"",//随机生成的验证码
      mmsz1:"",
      mmsz2:"yc",
      mmsz3:"",
      mmsz4:"yc"
    }
  },
  props:{
		length:{
      type:Number,
      default:4
    },
 	theme:{
    type: String,
    default: 'block'
    }
  },
  computed: {
    uuid(){
      return Math.random().toString(36).substring(3, 8)
      }
    },
  methods: {
    goback(){
      this.login00_dp="yc";
      this.login0_dp="xs";
      this.login000_dp="yc";
      this.value=""
    },
    //设置账户密码，完成注册并登录
    mmqrFun(){
      var url="reg";
      var obj={upwd:this.upwd2,uphone:this.uphone};
      this.axios.post(url,this.qs.stringify(obj)).then(res=>{
        if(res.data.code==1){
          sessionStorage.setItem("uid",res.data.data[0].uid);
          this.$toast("登录成功");
          this.$router.push("/Home");
        }else{
          this.$toast("登录失败");
        }
      })
    },
    str1Fun(){
      this.str1="text";
      this.mmsz1="yc";
      this.mmsz2="xs";
    },
    str2Fun(){
      this.str1="password";
      this.mmsz1="xs";
      this.mmsz2="yc";
    },
    str3Fun(){
      this.str2="text";
      this.mmsz3="yc";
      this.mmsz4="xs";
    },
    str4Fun(){
      this.str2="password";
      this.mmsz3="xs";
      this.mmsz4="yc";
    },
    //密码登录验证
    dlBtnFun(){
      var obj={uphone:this.uphone,upwd:this.upwd};
      var url="login1";
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==1){
          sessionStorage.setItem("uid",res.data.data[0].uid);
          this.mmyz_dp="yc";
          this.$toast("登录成功");
          this.$router.push("/Home");
          
        }else{
          this.mmyz_dp="xs";
          this.$toast("登录失败");
        }
      })
    },
		hideKeyboard () {
        // 输入完成隐藏键盘
        document.activeElement.blur() // ios隐藏键盘
        this.$refs.input.blur() // android隐藏键盘
      },
      handleSubmit () {
        this.$emit('input', this.value)
      },
      handleInput (e) {
        if (e.target.value.length >= this.length) {
          this.hideKeyboard()
        }
        this.handleSubmit()
      },
    //获取短信验证码
    dxBtnFun(){
      this.login0_dp="yc";
      this.login00_dp="xs";
      this.back_dp="xs_in";
      //随机生成短信验证码
      for(var i=0,str="";i<4;i++){
        var number=Math.floor(Math.random()*10);
        str+=number;
      }
      this.dxCode=str;
      this.$toast(`请输入验证码：${this.dxCode}`);
      //验证码倒数计时
      if(this.t==""){
         this.t=setInterval(()=>{
          this.time=this.time-1;
          if(this.time==0){
            clearInterval(this.t);
            this.dxCode="";
            this.$toast('验证超时，请重新获取验证码');
            this.p3_dp="yc";
            this.p4_dp="xs";  
          }
        },1000);
      } 
    },
    //重新获取验短信证码
    p4Fun(){
      this.p4_dp="yc";
      this.p3_dp="xs";
      this.time=10;
      if(this.t==null){
        this.t=setInterval(()=>{
          this.time=this.time-1;
          if(this.time==0){
            clearInterval(this.t);
            this.p3_dp="yc";
            this.p4_dp="xs";
          }
        },1000);
      }
      //随机生成短信验证码
      for(var i=0,str="";i<4;i++){
        var number=Math.floor(Math.random()*10);
        str+=number;
      }
      this.dxCode=str;
      this.$toast(`请输入验证码：${this.dxCode}`);
    },
    //点击确认提交手机号进行验证码登录
    qrBtnFun(){
      clearInterval(this.t);
      if(this.value==this.dxCode){
        //获取当前客户输入的手机号并发送给后台服务器
        var obj={uphone:this.uphone}
        var url="login2";
        this.axios.get(url,{params:obj}).then(res=>{
          if(res.data.code==1){
            sessionStorage.setItem("uid",res.data.data[0].uid);
            this.$toast("登录成功");
            this.p3_dp="yc";
            this.$router.push("/Home");
          }else if(res.data.code==0){//进行账号注册操作
            this.login00_dp="yc";
            this.login000_dp="xs";
            this.$toast("密码为3~16位数字或字母组成");
          } 
        });
      }else{
        this.dxCode="";
        this.p3_dp="yc";
        this.p4_dp="xs";
        this.$toast("验证失败，请重新验证！");
      }
    },
    //切换密码登录
    mmFun(){
      this.login1_dp="yc";
      this.login2_dp="xs";
    },
    //切换短信验证码登录
    yzmFun(){
      this.login1_dp="xs";
      this.login2_dp="yc";
    } 
  },
  watch: {
    //验证手机号码格式
    uphone(){
      var uphone_reg=/^1[3456789]\d{9}$/;
      var uphone=this.uphone;
      if(uphone_reg.test(uphone)==true){
        this.dxBtn="dx1";
        this.dxBtn_qx=false;
      }else{
        this.dxBtn="dx2";
        this.dxBtn_qx=true;
      }
      this.mmyz_dp="yc";
    },
    //验证密码格式
    upwd(){
      var uphone_reg=/^1[3456789]\d{9}$/;
      var upwd_reg= /^[a-z0-9]{3,16}$/i;
      var uphone=this.uphone;
      var upwd=this.upwd;
      if(uphone_reg.test(uphone)==true && upwd_reg.test(upwd)==true){
        this.dlBtn="dl1";
        this.dlBtn_qx=false;
      }else{
         this.dlBtn="dl2";
        this.dlBtn_qx=true;
      }
      this.mmyz_dp="yc";
    },
    //监听验证码输入值
    value(){
      if(this.value.length==4){
        this.qrBtn="dx1";
        this.qrBtn_qx=false;
      }else{
        this.qrBtn="dx2";
        this.qrBtn_qx=true;
      }
    },  
    upwd1(){
      var upwd_reg=/^[a-z0-9]{3,16}$/i;
      if(upwd_reg.test(this.upwd1)==true){
        this.upwd2_qx=false;
      }
    } ,  
    upwd2(){
      if(this.upwd2==this.upwd1){
        this.mmqrBtn_qx=false;
        this.mmqrBtn="dl1";
      }else{
        this.mmqrBtn_qx=true;
        this.mmqrBtn="dl2";
      }
    },
    login00_dp(){
      if(this.login00_dp=="yc"){
        this.back_dp="yc";
      }else{
        this.back_dp="xs_in";
      }
    },
    login000_dp(){
      if(this.login000_dp=="xs"){
        this.back_dp="yc";
      }
    }
    
  },

  created() {
    
  },
}
</script>

<style scoped>
  #login .mmyz{
    display: block;
    color:#f00;
    font-size: 12px;
    margin-top: 10px;
    display: none;
  }
  #login .xs_in{
    display: inline-block !important;
  }
  #login .xs{
    display: block !important;
  }
  #login .yc{
    display: none !important;
  } 
  #login .top{
    width:100%;
    height: 40px
  }
  #login .login00{
    width: 100%;
    height: 637px;
    background: #FDFDFD;
    padding-top:50px; 
    display: none;
  }
  #login .login000{
    display: none;
  }
  #login .close1{
    display: none;
    margin: 10px;
  }
  #login .back{
    display: inline-block;
    margin: 10px;
  }
  #login .help{
    width: 40px; height: 18px;
    text-align: center;
    color:#333;
    float: right;
    margin: 10px;
  }
  #login .middle{
    width: 100%;
    height: 300px;
    margin: 35px 0 30px;
  }
  #login .middle>h2{
    margin: 40px 30px;
    font-weight: normal;
  }
  #login .middle>h2>span{
    color: #333;
    font-size: 48px;
    font-family: "幼圆";
    font-weight: bolder;
  }
  #login .phone,#login .pwd{
    width: 80%;
    height: 50px;
    border-bottom: 1px solid #ccc;
    margin: 0 auto;
  }
  #login .pwd{
    width: 100%;
  }
  #login .phone>input,#login .pwd>input{
    padding: 10px 10px;
    border:none;
    outline: none;
    color:#333;
    font-size:18px;
  }
  #login .icon-biyan{
    float:right;
    margin: 10px 0;
    color:#ccc;
    font-size: 20px
  }
  #login .icon-zhengyan{
    float:right;
    margin: 10px 0;
    color:#ccc;
  }
  #login .no{
    color:#333;
    font-size: 12px;
  }
  #login .close2{
    font-size: 12px;
    color:#ccc;
    font-weight: bold;
    float:right;
    margin: 15px 0
  }
  #login .login1{
    width:80%; height: auto;
    margin: 0 auto;
    display: block; 
  }
  #login .login2{
    width:80%; height: auto;
    margin: 20px auto 0; 
    display: none;
  }
  #login .reg{
    width: 80%;
    height: 20px;
    display: block;
    margin: 8px auto;
    font-size: 12px;
    line-height: 20px;
    color:#ccc;
  }
  #login .dx1,#login .dl1{
    width: 80%;
    display: block;
    background: #fa0;
    margin: 10px auto;
    font-size: 15px;
    color:#333;
    font-weight: bold;
    border-radius: 12px;
  }
  #login .dx2,#login .dl2{
    width: 80%;
    display: block;
    background: #da0;
    margin: 10px auto;
    font-size: 15px;
    color:#777;
    font-weight: bold;
    border-radius: 12px;
  }
  #login .dl2,#login .dl1{
    margin: 40px auto 20px;
  }  
  #login .mm,#login .wt{
    width:58px;
    height:30px;
    font-size:12px;
    color:#777;
    text-align: center;
    line-height: 30px;
    float:left;
  }
  #login .yzm{
    width:100px;
    height:30px;
    font-size:12px;
    color:#777;
    text-align: left;
    line-height: 30px;
    
    float:left;
  }
  #login .wt{
    float:right;
  }
  #login .bottom{
    width: 100%;
    height: 100px;
    margin: 10px 0 50px;
    display: flex;
  }
  #login .bottom>div>p{
    color:#ccc;
    font-size:12px;
  }
  #login .bottom>div{
    width: 50%;
    padding: 60px 50px 0;
    text-align: center;
  }
  #login .icon-icon_weixin-logo{
    color:#04AE0F;
    font-size:25px;
  }
  #login .icon-qq-fill{
    color:#1296db;
    font-size:25px;
  }
  #login .yuan{
    width: 50px;
    height: 50px;
    border:1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
    margin: 0 auto;
  }
  #login .ys{
    margin: 0 0 10px;
    padding: 0 30px;
    font-size: 8px;
    color:#777;
  }
  #login .red{
    color:#f80;
  }
  #login .login00>div{
    width: 80%;
    height: auto;
    margin: 0 auto;
  }
  #login .p1{
    color:#333;
    font-size:25px;
    margin: 0;
  }
  #login .p2{
    color:#333;
    font-size:12px;
  }
  #login .p2 span{
    font-size:15px;
    color:#000;
  }
  #login .p3{
    color:#666;
    font-size:12px;
  }
  #login .p4{
    color:#f80;
    font-size:12px;
    display: none;
  }
  #login .number{
    display:flex;
    width:90%;
    margin: auto;
    justify-content: 
    space-between;
    align-items: center;
    padding-top:10%;
  }
  #login .lab{
    width:100%; 
    display: block;
  }
  #login .security-code-container{
    margin: 0 auto;
    width:80%;
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  #login .field-wrap{
    list-style: none;
    text-align: center;
    height: 50px;
    width: 40px;
    line-height: 50px;
    font-size: 16px;
    border-bottom: 1px solid #ccc;
  }
  #login .char-field {
    font-style: normal
  }
  #login .input-code {
    position: absolute;
    left: -9999px;
    top: -99999px;
    width: 0;
    height: 0;
    opacity: 0;
    overflow: visible;
    z-index: -1;
  }
  #login .w-btn{
    width: 70%;
    margin: auto;
    padding:5%;
  }
  #login .number{
    display:flex;
    width:90%;
    margin: auto;
    justify-content: space-between;
    align-items: center;
    padding-top:10%;
  }
  #login .login000>div>p{
    color:#333;
    font-size: 25px;
    margin-left:15px;
    text-align: center;
  }
  #login .mmsr{
    width: 80%;
    height: 50px;
    margin: 10px auto;
    border-bottom: 1px solid #ccc;
  }
 
  
</style>