<template>
  <div id="myOrder">
    <ul class="ddzt">
      <li :class="l1" @click="getAll">全部</li>
      <li :class="l2" @click="getDsh">待收货</li>
      <li :class="l3" @click="getDpj">待评价({{num}})</li>
      <li :class="l4" @click="getTk">退款</li>
      <li :class="l5" @click="getOver">已完成</li>
    </ul>
    <div v-for="(item,i) of list" :key="i">
      <div class="order">
        <img src="../../public/images/wel002.jpg" alt="">
        <p>订单号：2019831{{item.oid}}
          <span class="lxr">收件人:{{item.auser}}</span>
        </p>
        <span class="ztm">{{item.tosid==1?"待收货":(item.tosid==2?"待评价":(item.tosid==3?"退货":"已完成"))}}</span>
        <p>商品名称:{{item.oname}}</p>
        <p>数量：{{item.gcount}}</p>
        <p>总价：￥{{item.tmoney}}</p>
        <div class="pj" @click="pjFun(item.oid,item.tosid)">评价</div>
        <div class="zlyd" @click="zlydFun">再来一单</div>
        <div class="qr" @click="qrFun(item.oid,item.tosid)">确认收货</div>
      </div>
    </div>
    <div class="bg" :class="bg_dp">
      <div class="evaStar">
        <ul class="star">
          <li v-for="(itemClass,index) in itemClasses" :class="itemClass" class="star-item" @click="stars(index)" track-by="index"></li><!--性能优化 track-by 数据不改变时不会重新渲染-->
        </ul>
       <button class="pjBtn" @click="pjBtnFun">匿名提交</button>
      </div>
    </div> 
  </div>  
</template>
 
<script>
export default {
  data() {
    return {
     oid:"1",
     auser:"",
     oname:"",
     gcount:"",
     tmoney:"",
     num:"",
     uid:"",
     list:[],
     text:"",
     tosid:"",
     l1:"",
     l2:"",
     l3:"",
     l4:"",
     l5:"",
     score:4,
     t:"",
     time:3,
     bg_dp:"yc"
    };
  },
  computed:{ //计算属性
    itemClasses(){
    var result = []; // 返回的是一个数组,用来遍历输出星星
    var score = Math.floor(this.score * 2 ) / 2; // 计算所有星星的数量
    var hasDecimal = score % 1 !== 0; // 非整数星星判断
    var integer = Math.floor(score); // 整数星星判断
    for(let i=0;i<integer;i++){ // 整数星星使用on
      result.push("on"); // 一个整数星星就push一个CLS_ON到数组
    }
    if(hasDecimal){ // 非整数星星使用half
      result.push("half"); // 类似
    } 
    while(result.length < 5){// 余下的用无星星补全,使用off
      result.push("off");
    }
    return result;
    }
  },
  methods:{
    pjBtnFun(score,oid){
      var score=this.score;
      if(score<=3){
        this.$toast("感谢您的惠顾!因为有您的支持，我们才有今天，感谢您的每一个评价，小店都会努力让您满意!");
        if(this.t==""){
          this.t=setInterval(()=>{
            this.time=this.time-1;
            if(this.time==0){
              clearInterval(this.t);
              this.$router.push("/Opention");
              this.bg_dp="yc";
            }
          },1000);
        }
        var url="tjpl";
        var oid=this.oid
        console.log(oid);
        var obj={oid:oid}
        this.axios.get(url,{params:obj}).then(res=>{
          if(res.data.code==1){
            this.getDpj();
          }else{
            this.$toast("评价失败");
          }
        });
      }else if(score==4){
        this.$toast("亲爱的朋友，感谢您一如既往的支持!您的满意是我们的最高追求")
        this.bg_dp="yc";
        var url="tjpl";
        var oid=this.oid
        var obj={oid:oid}
        this.axios.get(url,{params:obj}).then(res=>{
          if(res.data.code==1){
            this.getDpj();
          }else{
            this.$toast("评价失败");
          }
        });
      }else{
        this.$toast("欢迎对我们不断的进行口碑传播")
        this.bg_dp="yc";
        var url="tjpl";
        var oid=this.oid
        var obj={oid:oid}
        this.axios.get(url,{params:obj}).then(res=>{
          if(res.data.code==1){
            this.getDpj();
          }else{
            this.$toast("评价失败");
          }
        });
      }
    },
    stars:function(index){
      this.score = index + 1
    },
    pjFun(oid,tosid){
      if(tosid==2){
       this.bg_dp="xs";
       this.oid=oid;
      }    
    },
    zlydFun(){
      this.$router.push("/Home");
    },
    qrFun(oid,tosid){
      if(tosid==1){
        this.$messagebox.confirm("确认收货？")
        .then(action=>{
          var obj={oid:oid};
          this.axios.get("tjqr",{params:obj}).then(res=>{
            if(res.data.code==1){
              this.getDsh();
            }else{
              this.$toast("确认失败");
            }
          })
        })
        .catch(err=>{
        this.$toast("取消成功")
        })
      }
    },
  getAll(){
    this.l1="active";
    this.l2="";
    this.l3="";
    this.l4="";
    this.l5="";
    this.onload();
  },
    getDsh(){
      var url="Dshorder";
      var obj={uid:this.uid};
      this.l1="";
      this.l2="active";
      this.l3="";
      this.l4="";
      this.l5="";
      this.axios.get(url,{params:obj}).then(res=>{
        this.num=res.data.num;
        this.list=res.data.obj;  
        console.log(this.list);  
      })
    },
    getDpj(){
      this.l1="";
      this.l2="";
      this.l3="active";
      this.l4="";
      this.l5="";
      var url="Dpjorder";
      var obj={uid:this.uid};
      this.axios.get(url,{params:obj}).then(res=>{
        this.num=res.data.num;
        this.list=res.data.obj; 
      })
    },
    onload(){
      this.l1="";
      this.l2="";
      this.l3="active";
      this.l4="";
      this.l5="";
      var url="Dpjorder";
      var obj={uid:this.uid};
      this.axios.get(url,{params:obj}).then(res=>{
        this.num=res.data.num;
        this.list=res.data.obj;
     })
    },

    getTk(){
      this.l1="";
      this.l2="";
      this.l3="";
      this.l4="active";
      this.l5="";
      var url="Thorder";
      var obj={uid:this.uid};
      this.axios.get(url,{params:obj}).then(res=>{
        this.num=res.data.num;
        this.list=res.data.obj;
       
      })
    },
    getOver(){
      this.l1="";
      this.l2="";
      this.l3="";
      this.l4="";
      this.l5="active";
      var url="Over";
      var obj={uid:this.uid};
      this.axios.get(url,{params:obj}).then(res=>{
        this.num=res.data.num;
        this.list=res.data.obj;
       
    
      })
    },
  
    onload(){
      this.l1="active";
      this.l2="";
      this.l3="";
      this.l4="";
      this.l5="";
      var url="Allorder";
      var obj={uid:this.uid};
      this.axios.get(url,{params:obj}).then(res=>{
        this.num=res.data.num;
        this.list=res.data.obj;
      })
    }
  },
  created() {
    if(sessionStorage.getItem("uid")=="null"){ 
      this.$router.push("/Login");
    }else{
      this.uid=sessionStorage.getItem("uid");
    }
    this.onload();
  },
  components:{
    
  }
  

  
};
</script>

<!-- 样式 -->
<style scoped>
  #myOrder .pjBtn{
    margin: 15px;
    padding: 10px 50px;
    border-radius: 5px;
    background: #2BA246;
    color: #fff;
    border:none;
    outline: none;
  }
  #myOrder .bg{
    width: 100%;
    height: 150%;
    background: rgba(0,0,0,.8);
    position: absolute;
    top:0;
    z-index:999;
  }
  #myOrder .xs{
    display:inline-block;
  }
  #myOrder .yc{
    display:none;
  }
  #myOrder .evaStar{
    background: #fff;
    position: absolute;
    height: 130px;
    width: 90%;
    margin:0;
    top: 20%;
    left: 18px;
    text-align:center;
    border-radius: 10px;
    }
  #myOrder .star{
    height: 40px;
    font-size: 30;
    padding: 0;
    margin: 20px 0 0

    }
  #myOrder .star-item{
    display: inline-block;
    background-repeat: no-repeat;
    width: .6rem;
    height: 30px;
    margin-left: .27rem;
    background-size: 100%;
  }
  #myOrder .star-item.on{
    width: 30px;
    background-image: url(../assets/on.png);
  }
  #myOrder .star-item.half{
    width: 30px;
    background-image: url(../assets/half.png);
  }
  #myOrder .star-item.off{
    width: 30px;
    background-image: url(../assets/off.png);
  }
  #myOrder .ztm{
    color:#3091F2;
    position: absolute;
    right:30px;
    top:50%;
  }
  #myOrder img{
    width:80px;
    height: 80px;
    float:left;
  }
  #myOrder a{
      text-decoration: none;
    }
  #myOrder ul{
      list-style-type: none;
    }
  *{
    box-sizing: border-box;
  }
  #myOrder .ddzt{
    width: 100%;
    margin: 0;
    padding: 0;
    background: #fff;
    height: 40px;
    display: flex;
  }
  #myOrder .ddzt>li{
    height: 39px;
    width: 30%;
    text-align: center;
    line-height: 43px;
  }
  .active{
    border-bottom: 3px solid #bbb;
  }
  #myOrder .order{
    width: 95%;
    height: 150px;
    border:2px solid #eee;
    background: #fff;
    padding: 10px;
    margin:10px auto;
    border-radius: 5px;
    position: relative;
  }
  #myOrder .lxr{
    float: right;
    margin-right: 10px;
  }
  #myOrder .order>p{
    width: 70%;
    margin: 2px;
    float: right;
    color:#333;
    font-size: 12px;
    font-family: "微软";
  }

  #myOrder .pj,#myOrder .zlyd,#myOrder .qr{
    width: 90px;
    height: 30px;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    float: right;
  }
  #myOrder .qr{
    background: #fff;
    margin: 15px 4px 0 0;
    border:1px solid #ccc;
    color:#555;
    font-size: 13px;
  }
  #myOrder .pj{
    color:#fff;
    background: #6EC884;
    margin: 27px 4px 0 0;
    font-size: 13px;
  }
  #myOrder .zlyd{
    color:#fff;
    background: #FF4401;
    margin: 27px 4px 0 0;
    font-size: 13px;
  }
</style>