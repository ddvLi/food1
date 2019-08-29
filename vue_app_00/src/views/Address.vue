<template>
  <div id="address">
    <myheader></myheader>
    <div class="d01" :class="d01_dp">
      <div class="d0">
        <div class="d1m">
          <div class="shen">默认地址</div>
          <ul>
            <li class="qian" :class="qian_dp1">暂无默认地址</li>
            <li :class="mrdz_dp">
              <dl>
                <dt>收件人：</dt>
                <dd>{{mrName}}</dd>
                <dt>联系电话：</dt>
                <dd>{{mrPhone}}</dd>
                <dt>联系地址：</dt>
                <dd>{{mrAddress}}</dd>
              </dl>
            </li>
            <div class="mrdz_xz" :class="mrdz_dp">
              <span class="red" @click="del1Fun">删除</span>
            </div>
          </ul>
        </div>
        <div class="d1q">
          <div class="shen">其他地址</div>
          <ul>
            <li class="qian" :class="qian_dp2">暂无其他地址</li>
            <div class="qtdz" v-for="(item,i) of list" :key="i">
              <li :class="qtdz_dp">
                <dl>
                  <dt>收件人：</dt>
                  <dd>{{item.auser}}</dd>
                  <dt>联系电话：</dt>
                  <dd>{{item.aphone}}</dd>
                  <dt>联系地址：</dt>
                  <dd>{{item.address}}</dd>
                </dl>
              </li>
              <div class="qtdz_xz" :class="qtdz_dp">
                <span class="blue" @click="setMrFun(item.auser,item.aphone,item.address)">设为默认</span>
                <span class="red" @click="del2Fun(item.auser,item.aphone,item.address)">删除</span>
              </div>
            </div>
          </ul>
        </div>
        <div class="d2q"></div>
      </div>
      <div class="bottom" @click="addFun">+ 添加新地址</div>
    </div>
    <div class="d02" :class="d02_dp">
      <div class="d02_top">
        <div >
          <span class="iconfont icon-xiazai6" @click="fhFun"></span>
          <span class="cydz">添加常用地址</span>
          <span class="save" @click="bcFun">保存</span>
        </div>   
      </div>
      <div class="d02_middle">
        <div>
          <input type="text" placeholder="联系人姓名" v-model="lxrName">
        </div>
        <div>
          <input type="text" placeholder="手机号码" v-model="lxrPhone" maxlength=11>
        </div>
        <div class="xzdq">
          <select name="sel_pro" id="sel_pro" @change="look_pro" v-model="selectd_pro">
            <option :value="item_pro.sid" v-for="(item_pro,i_pro) of list_pro" :key="i_pro">{{item_pro.provinceName}}</option>
          </select>
          <select name="sel_city" id="sel_city"  @change="look_city" v-model="selectd_city">
            <option :value="item_city.cid" v-for="(item_city,i_city) of list_city" :key="i_city">{{item_city.cityName}}</option>
          </select>
          <select name="sel_dis" id="sel_dis" @change="look_dis" v-model="selectd_dis">
            <option :value="item_dis.did" v-for="(item_dis,i_dis) of list_dis" :key="i_dis" ref="newText">{{item_dis.districtName}}</option>
          </select>
        </div>
        <div class="xxdz">
          <textarea name="" id="" cols="30" rows="10" placeholder="详细地址" v-model="xxdz"></textarea>
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
      uid:"",
      mrPhone:"",
      mrName:"",
      mrAddress:"",
      isDefault:"",
      qian_dp1:"",
      qian_dp2:"",
      mrdz_dp:"",
      qtdz_dp:"",
      list:[],
      list_pro:[],
      selectd_pro:"",
      list_city:[],
      selectd_city:"",
      list_dis:[],
      selectd_dis:"",
      d01_dp:"",
      d02_dp:"",
      lxrName:"",
      lxrPhone:"",
      xxdz:"",
      arr_pro:[],
      arr_city:[],
      arr_dis:[],
      textPro:"",
      textCity:"",
      textDis:""
    }
  },
  methods: {
    setMrFun(auser,aphone,address){
      var obj={
        uid:this.uid,
        auser:auser,
        aphone:aphone,
        address:address
      }
      this.axios.get("updateMr",{params:obj}).then(res=>{
        if(res.data.code==1){
          this.onLoad();       
        }else if(res.data.code==2){  
          this.onLoad();
        }else if(res.data.code==0){
          this.onLoad();
        }else{
          this.$toast("设置失败")
        }  
      })
    },
    del2Fun(auser,aphone,address){
      this.$messagebox.confirm("确认删除该地址？")
      .then(action=>{
        var obj={
          uid:this.uid,
          auser:auser,
          aphone:aphone,
          address:address
        }
        this.axios.get("del2",{params:obj}).then(res=>{
           if(res.data.code==1){
            this.$toast("删除成功");
            this.onLoad();
          }else if(res.data.code==0){
            this.qian_dp2="xs";       
            this.$toast("删除成功");
            this.onLoad();
          }else{
            this.$toast("删除失败");
          }
        });
      })
      .catch(err=>{
        this.$toast("取消成功")
      })
    },
    del1Fun(){
      this.$messagebox.confirm("确认删除该地址？")
      .then(action=>{
        var obj={uid:this.uid}
        this.axios.get("del1",{params:obj}).then(res=>{
          if(res.data.code==1){
            this.$toast("删除成功");
            this.onLoad();
          }else{
            this.$toast("删除失败");
          } 
        }) 
      })
      .catch(err=>{
        this.$toast("取消成功");
      })
    },
    bcFun(){
      var str=this.textPro+","+this.textCity+","+","+this.textDis+this.xxdz;
      var aphone_reg=/^1[3456789]\d{9}$/;
      if(this.lxrName==null){
        this.$toast("请输入联系人姓名");
      }else if(aphone_reg.test(this.lxrPhone)==false){
        this.$toast("请输入合法的手机号！");
      }else if(this.selectd_pro==1){
        this.$toast("请选择你所在的省域！");
      }else if(this.selectd_city==1){
        this.$toast("请选择你所在的城市！");
      }else if(this.selectd_dis==1){
        this.$toast("请选择你所在的区域！");
      }else if(this.xxdz==null){
        this.$toast("请输入详细地址！");
      }else{
        var url="addAddress";
        var obj={
          auser:this.lxrName,
          aphone:this.lxrPhone,
          address:str,
          uid:this.uid,
          isDefault:0
        }
        this.axios.post(url,this.qs.stringify(obj)).then(res=>{
          if(res.data.code==1){
            this.d01_dp="xs";
            this.d02_dp="yc";
            this.qian_dp2="yc";
            this.qtdz_dp="xs";
            this.selectd_pro=1;
            this.selectd_city=1;
            this.selectd_dis=1;
            this.$toast("添加成功");
            this.onLoad();
          }else{
            this.$toast("添加失败");
          }
        });
      }
    },
    look_pro(){
      if(this.selectd_pro!==1){
        var url="textPro";
        var obj={sid:this.selectd_pro}
        this.axios.get(url,{params:obj}).then(res=>{
          this.textPro=res.data[0].provinceName;  
        })
      }
    },
    look_city(){
      if(this.selectd_city!==1){
        var url="textCity";
        var obj={cid:this.selectd_city}
        this.axios.get(url,{params:obj}).then(res=>{
          this.textCity=res.data[0].cityName;  
        })
      }
    },
    look_dis(){
      if(this.selectd_dis!==1){
        var url="textDis";
        var obj={did:this.selectd_dis}
        this.axios.get(url,{params:obj}).then(res=>{
          this.textDis=res.data[0].districtName;  
        })
      }
    },
    addFun(){
      this.d01_dp="yc";
      this.d02_dp="xs";
      this.lxrPhone=null;
      this.lxrName=null;
      this.xxdz=null
    },
    fhFun(){
      this.d01_dp="xs";
      this.d02_dp="yc";
    },
    onLoad(){
      //我的地址页面添加载
      var url="address";
      var obj={uid:this.uid};
      this.axios.get(url,{params:obj}).then(res=>{
        if(res.data.code==2){
          var mrdz=res.data.output.mrdz[0];
          this.mrName=mrdz.auser;
          this.mrPhone=mrdz.aphone;
          this.mrAddress=mrdz.address;
          this.qian_dp1="yc";
          this.mrdz_dp="xs";
          var qtdz=res.data.output.qtdz;
          this.list=qtdz;
        }else if(res.data.code==1){
          var mrdz=res.data.output.mrdz[0];
          this.mrName=mrdz.auser;
          this.mrPhone=mrdz.aphone;
          this.mrAddress=mrdz.address;
          this.qian_dp1="yc";
          this.mrdz_dp="xs";
          this.qian_dp2="xs";
          this.qtdz_dp="yc"; 
        }else if(res.data.code==0){
          this.qian_dp1="xs";
          this.mrdz_dp="yc";
          var qtdz=res.data.output.qtdz;
          this.list=qtdz;
        }else{
          this.qian_dp1="xs";
          this.mrdz_dp="yc";
          this.qian_dp2="xs";
          this.qtdz_dp="yc";
        }
      });
    }
  },
  watch:{
    selectd_pro(){
      var obj={sid:this.selectd_pro};
      var url="proChange";
      this.axios.get(url,{params:obj}).then(res=>{
        this.list_city=res.data;
        this.selectd_city=1;
      })
    },
    selectd_city(){
      var obj={cid:this.selectd_city};
      var url="cityChange";
      this.axios.get(url,{params:obj}).then(res=>{
        this.list_dis=res.data;
        this.selectd_dis=1;
      })
    },
  },
  created() {
    if(sessionStorage.getItem("uid")=="null"){ 
      this.$router.push("/Login");
    }else{
      this.uid=sessionStorage.getItem("uid");
    }
    this.onLoad();
    //行政区域下拉选项框加载
    this.axios.get("xzqy").then(res=>{
      var arr_pro=res.data.pro;
      var arr_city=res.data.city;
      var arr_dis=res.data.dis;
      this.list_pro=arr_pro;
      this.list_city=arr_city;
      this.list_dis=arr_dis;
      this.selectd_pro=1;
    })
  },
  components:{
    "myheader":Myheader
  }
}
</script>

<style scoped>
#address .xs{
  display: block !important;
}
#address .yc{
  display: none !important;
}
#address ul,#address li{
  width: 90%;
  list-style-type: none;
  margin: 0 auto;
  padding: 0;
}

#address .d01{
  height:auto;
  overflow: hidden;
  display: block;
}
#address .d02{
  height: auto;
  overflow: hidden;
  display: none;
}

#address .d0{
  background: #eee;
  height: auto;
  position: relative;
}
#address .d1m,#address .d1q{
  margin:5px 0 15px;
  background: #fff;
}
#address .d1m dt,#address .d1q dt{
  width:100px;
  position:absolute;
}
#address .d1m dd,#address .d1q dd{
 padding-left: 100px;
 margin: 5px 0;
}
#address .d2q{
  width: 100%;
  height: 1px;
  background:#eee; 
}
#address .shen{
  width: 90%;height: 19px;
  padding: 5px 0;
  color:#444;
  font-weight: bolder;
  font-size:16px;
  margin: 0 auto;
  border-bottom:1px solid #eee;
}
#address dl>dd{
  height: auto;
}
#address .qian{
  width: 90%;height: 20px;
  padding: 35px 0 10px;
  color:#a8a8a8;
  font-weight: bolder;
  font-size:16px;
  margin: 0 auto;
  display: none;
}
#address .mrdz_xz,#address .qtdz_xz{
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #eee;
}
#address .mrdz_xz>span{
  margin-right: 60px;
}

#address .blue{
  color:#938CF9
  
}
#address .red{
  color:red;
  float:right;
}
#address .bottom{
  width: 100%;
  height: 50px;
  text-align: center;
  color:#a8a8a8;
  font-size: 20px;
  line-height: 50px;
  box-shadow:0 -1px 2px #eee;
}
#address .d02_top{
  width: 100%;
  height: 42px;
  display: block;
  line-height: 42px;
  box-shadow: 0 1px 2px #eee;
  background: #fff;
  font-size: 18px;
}
#address .d02_top>div{
  width: 94%;
  margin: 0 auto;
}
#address .save{
  float:right;
  color:#333;
}
#address .cydz{
  position: absolute;
  width: 120px;
  left:35%;
  color:#333;
}
#address .d02_middle{
  width: 94%;
  height: 273px;
  margin: 10px auto;
}
#address .d02_middle>div{
  width: 100%;
  height: 37px;
  border-bottom: 1px solid #eee;
}
#address .d02_middle>div>input{
  width: 94%;
  border: none;
  height: 33px;
  padding: 0 10px;
}
#address .xzdq{
  display: flex;
  padding: 0 10px;
}
#address .xzdq>select{
  width: 95px;
  height: 36px;
  border: none;
  border-radius: 4px;
  appearance:none;
  color:#666;
}
#address .xzdq>select>option{
  padding:0 10px;
}
#address .xxdz{
  border-bottom: none !important;
}

#address .xxdz>textarea{
  width: 94%;
  height: 145px;
  padding: 10px;
  border:none;
}
#address dt,#address dd{
  height:18px;
}
</style>