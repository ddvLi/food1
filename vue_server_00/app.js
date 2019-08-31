//vue_server_00/app.js node程序
//1:加载第三方模块
//web服务器
const express = require("express");
//mysql驱动
const mysql = require("mysql");
//跨域
const cors = require("cors");
//session
const session = require("express-session");
//post请求插件
const bodyParser=require("body-parser");

//2:配置数据库连接池:提高数据效率
var pool = mysql.createPool({
   host:"127.0.0.1",  //数据库地址
   user:"root",       //数据库用户名
   password:"",       //数据库密码
   port:3306,         //数据库端口
   database:"food",     //数据库名称
   connectionLimit:15 //连接数量
});

var server = express();
//3:配置跨域模块 50
server.use(cors({
//   //允许跨域访问程序地址列表
   origin:["http://127.0.0.1:8080",
   "http://localhost:8080"],
   credentials:true //请求验证
}))
//4:配置session模块
server.use(session({
 secret:"128位字符串",  //安全字符串
 resave:true,          //请求时更新数据
 saveUninitialized:true//保存初始数据
}));
//4.1:配置项目静态目录
server.use(express.static("public"));
//post请求需要
server.use(bodyParser.urlencoded({
   extended:false
}));

//http://127.0.0.1:3000/01.jpg
//5:启动监听3000
server.listen(3000);



//密码验证登录
server.get("/login1",(req,res)=>{
   var uphone=req.query.uphone;
   var upwd=req.query.upwd;
   var sql="SELECT * FROM food_user WHERE uphone=? AND upwd=?";
   pool.query(sql,[uphone,upwd],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         req.session.uid=result[0].uid;
         res.send({code:1,msg:"login success",data:result})
      }else{
         res.send({code:0,msg:"login error"})
      }
   })      
});
//手机验证登录
server.get("/login2",(req,res)=>{
   var uphone=req.query.uphone;
   var sql1="SELECT * FROM food_user WHERE uphone=?";
   pool.query(sql1,[uphone],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         req.session.uid=result[0].uid;
         res.send({code:1,msg:"login success",data:result});
      }else{//创建账号
             res.send({code:0,msg:"请设置密码"});   
      }
   })
});
//设密码完成注册并登录
server.post("/reg",(req,res)=>{
   var obj=req.body;
   var sql1="INSERT INTO food_user SET ?";
   pool.query(sql1,[obj],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
         var sql2="SELECT * FROM food_user WHERE uphone=? and upwd=?";
         pool.query(sql2,[obj.uphone,obj.upwd],(err,result)=>{
            if(err)throw err;
            if(result.length>0){
               req.session.uid=result[0].uid;
               res.send({code:1,msg:"login success",data:result});
            }else{
               res.send({code:0,msg:"login error"})
            }
         })
      }
   })
});
//个人中心页面加载
server.get("/perCenter",(req,res)=>{
   var uid=req.query.uid;
   var sql="SELECT uname,uphone,upic FROM food_user WHERE uid=?";
   pool.query(sql,[uid],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         res.send(result);
      }
   })
})
//个人中新设置页面加载
server.get("/szPerCenter",(req,res)=>{
   var uid=req.query.uid;
   var sql="SELECT uname,uphone,upic,upwd,usex FROM food_user WHERE uid=?";
   pool.query(sql,[uid],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         res.send(result);
      }
   })
})
//账户信息修改
server.get("/update",(req,res)=>{
   var uid=req.query.uid;
   var uname=req.query.uname;
   var upwd=req.query.upwd;
   var usex=req.query.usex;
   var upic=req.query.upic;
   var sql1="UPDATE food_user SET uname=?,upwd=?,usex=?,upic=? WHERE uid=?";
   pool.query(sql1,[uname,upwd,usex,upic,uid],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
         var sql2="SELECT * FROM food_user WHERE uid=?";
         pool.query(sql2,[uid],(err,result)=>{
            if(err)throw err;
            req.session.uid=result[0].uid;
            res.send({code:1,msg:"update success",data:result}); 
         })
      }else{
         res.send({code:0,msg:"update error"});
      }
   })
})
//地址数据加载
server.get("/address",(req,res)=>{
   var uid=req.query.uid;
   var output={
      mrdz:{},
      qitdz:[]
   }
   var sql1="SELECT * FROM food_user_address WHERE uid=? AND isDefault=1";
   pool.query(sql1,[uid],(err,result)=>{ 
      if(err)throw err;
      if(result.length>0){
         output.mrdz=result;
         var sql2="SELECT * FROM food_user_address WHERE uid=? AND isDefault=0";
         pool.query(sql2,[uid],(err,result)=>{
            if(err)throw err;
            if(result.length>0){
               output.qtdz=result;
               res.send({code:2,output});   
            }else{
               res.send({code:1,output});
            }
         })
      }else{
         sql2="SELECT * FROM food_user_address WHERE uid=? AND isDefault=0";
         pool.query(sql2,[uid],(err,result)=>{
            if(err)throw err;
            if(result.length>0){
               output.qtdz=result;
               res.send({code:0,output});
            }else{
               res.send({code:-1});
            }
         })
      }
   });
   
})
//省级行政区域下拉选项框加载
server.get("/xzqy",(req,res)=>{
   var output={
      pro:[],
      city:[],
      dis:[]
   }
   var sql1="SELECT * FROM food_address_province";
   pool.query(sql1,[],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         output.pro=result;
      }
   });
   var sql2="SELECT * FROM food_address_city WHERE sid=1";
   pool.query(sql2,[],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         output.city=result;
      }
   });
   var sql3="SELECT * FROM food_address_district WHERE cid=1";
   pool.query(sql3,[],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         output.dis=result;
         res.send(output);   
      }
   })
});
//市级行政区域下拉选项框加载
server.get("/proChange",(req,res)=>{
   var sid=req.query.sid;
   var sql="SELECT * FROM food_address_city WHERE sid=? OR sid=1";
   pool.query(sql,[sid],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         res.send(result);
      }
   })
});
//区级行政区域下拉选项框加载
server.get("/cityChange",(req,res)=>{
   var cid=req.query.cid;
   var sql="SELECT * FROM food_address_district WHERE cid=? OR cid=1";
   pool.query(sql,[cid],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         res.send(result);
      }
   })
});
//省级行政区字符串
server.get("/textPro",(req,res)=>{
   var sid=req.query.sid;
   var sql="SELECT provinceName FROM food_address_province WHERE sid=?";
   pool.query(sql,[sid],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         res.send(result);
      }
   })   
});
//市级行政区字符串
server.get("/textCity",(req,res)=>{
   var cid=req.query.cid;
   var sql="SELECT cityName FROM food_address_city WHERE cid=?";
   pool.query(sql,[cid],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         res.send(result);
      }
   })   
});
//区级行政区字符串
server.get("/textDis",(req,res)=>{
   var did=req.query.did;
   var sql="SELECT districtName FROM food_address_district WHERE did=?";
   pool.query(sql,[did],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         res.send(result);
      }
   })   
});
//添加收货地址信息
server.post("/addAddress",(req,res)=>{
   var obj=req.body;
   var sql="INSERT INTO food_user_address SET ?";
   pool.query(sql,[obj],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
         res.send({code:1,msg:"add success",data:result});
      }else{
         res.send({code:0,msg:"add error"});
      }
   })
});
//删除默认收货地址信息
server.get("/del1",(req,res)=>{
   var uid=req.query.uid;
   var sql='DELETE FROM food_user_address WHERE uid=? AND isDefault=1';
   pool.query(sql,[uid],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
         res.send({code:1,msg:"delete success"});
      }else{
         res.send({code:0,msg:"delete error"});
      }
   })
}) 
//删除其他收货地址信息
server.get("/del2",(req,res)=>{
   var uid=req.query.uid;
   var auser=req.query.auser;
   var aphone=req.query.aphone;
   var address=req.query.address;
   var sql1="DELETE FROM food_user_address WHERE uid=? AND auser=? AND aphone=? AND address=? AND isDefault=0";
   pool.query(sql1,[uid,auser,aphone,address],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
         var sql2="SELECT COUNT(*) FROM food_user_address WHERE uid=? AND isDefault=0";
         pool.query(sql2,[uid],(err,result)=>{
            if(err)throw err;
            if(result[0].count>0){
               res.send({code:1,msg:"delete success"});
            }else{
               res.send({code:0,msg:"delete success"})
            }
         })  
      }else{ 
         res.send({code:-1,msg:"delete error"});
      }
   })
})
//设置默认地址
server.get("/updateMr",(req,res)=>{
   var uid=req.query.uid;
   var auser=req.query.auser;
   var aphone=req.query.aphone;
   var address=req.query.address;
   var sql1="SELECT * FROM food_user_address WHERE uid=? AND isDefault=1";
   pool.query(sql1,[uid],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         var sql2="UPDATE food_user_address SET isDefault=0 WHERE uid=? AND isDefault=1";
         pool.query(sql2,[uid],(err,result)=>{
            if(err)throw err;
            if(result.affectedRows>0){
               var sql3="UPDATE food_user_address SET isDefault=1 WHERE uid=? AND auser=? AND aphone=? AND address=? AND isDefault=0";
               pool.query(sql3,[uid,auser,aphone,address],(err,result)=>{
                  if(err)throw err;
                  if(result.affectedRows>0){
                     res.send({code:1,msg:"update success"}); 
                  }else{
                     res.send({code:-1,msg:"update error"});
                  } 
               })         
            }
         })
      }else{
         sql3="UPDATE food_user_address SET isDefault=1 WHERE uid=? AND auser=? AND aphone=? AND address=? AND isDefault=0";
         pool.query(sql3,[uid,auser,aphone,address],(err,result)=>{
            if(err)throw err;
            if(result.affectedRows>0){
               var sql4="SELECT COUNT(*) FROM food_user_address WHERE uid=? AND isDefault=0";
               pool.query(sql4,[uid],(err,result)=>{
                  if(err)throw err;
                  if(result[0].count>0){
                     res.send({code:2}); 
                  }else{
                     res.send({code:0});
                  }
               })   
            }else{
               res.send({code:-1,msg:"update error"});
            }
         })
      }
   })
})

server.get("/product",(req,res)=>{
   // 2:接收客服端二个参数
   // pno 页码pageSize也大小
   var p=req.query.pno;
   var ps=req.query.pageSize;
   // 3：设置参数默认值pno：1pageSize:4
   if(!p){p=1}
   if(!ps){ps=6}
   // 4:创建变量offset计算数据库偏移量
   var offset=(p-1)*ps;
   // 5：对pageSize转换整型？nodejs报错
   ps=parseInt(ps);
   // 6：创建sql语句
   var sql="SELECT pid,pname,pprice";
   sql +=" ,ppic,salesVal,pcount"; 
   sql +=" ,isPinkage,fpid FROM foods_list";
   sql +=" LIMIT ?,?";
   //7:通过连接池发送sql语句
   pool.query(sql,[offset,ps],(err,result)=>{if(err)throw err;
   //8获取数据库返回的查询结果
   //9:将查询结果发送客户端
   res.send({code:1,msg:"查询成功",data:result});
   });
})
server.get("/lqc",(req,res)=>{
   var pid=req.query.pid;
   // console.log(pid)
   // 3：设置参数默认值pno：1pageSize:4
   // 5：对pageSize转换整型？nodejs报错
   // 6：创建sql语句
   var sql="SELECT pid,pname,pprice,ppic,salesVal,pcount,isPinkage,fpid,pdetails FROM foods_list WHERE pid=?";
   //7:通过连接池发送sql语句
   pool.query(sql,[pid],(err,result)=>{if(err)throw err;
   //8获取数据库返回的查询结果
   //9:将查询结果发送客户端
   res.send({code:1,data:result});
   // console.log(result)
   });
})
server.get("/staple",(req,res)=>{
   var fpid=req.query.fpid;
   // console.log(fpid)
   // 3：设置参数默认值pno：1pageSize:4
   // 5：对pageSize转换整型？nodejs报错
   // 6：创建sql语句
   var sql="SELECT pid,pname,pprice,ppic,salesVal,pcount,isPinkage,fpid FROM foods_list WHERE fpid=?";
   //7:通过连接池发送sql语句
   pool.query(sql,[fpid],(err,result)=>{if(err)throw err;
   //8获取数据库返回的查询结果
   //9:将查询结果发送客户端
         res.send({code:1,data:result});
      //   console.log(result)
   
 });
})
//添加购物车
server.get("/addcart", (req, res) => {
   var uid = req.session.uid;
   if (!uid) {
       res.send({
           code: -1,
           msg: "请先登录"
       })
       return;
   }
   console.log(res.query);
   var pid = req.query.pid;
   var pprice = req.query.pprice;
   var pname = req.query.pname;
   var gcount = req.query.gcount;
 
   var ppic = req.query.ppic;
   console.log(isPinkage);
   var isPinkage=req.query.isPinkage;
   var money = (parseInt(pprice) ) * gcount;
   var sql =`INSERT INTO food_car VALUES(null,${uid},${pid},${gcount},'${pname}',${pprice},'${ppic}',${money},${isPinkage})`;
   pool.query(sql, (err, result) => {
      console.log(1111111);
      if (err) throw err;
      console.log(222222);
      res.send({ code: 1, msg: "添加成功" })
      console.log(333333);
   })
})

//购物车查询
server.get("/cart", (req, res) => {
   var uid = req.session.uid;
   if (!uid) {
      res.send({ code: -1, msg: "请登录" });
      return;
   }
   var sql = "SELECT ppic,isPinkage,pname,gid";
   sql += " ,pprice,gcount,money";
   sql += " FROM food_car";
   sql += " WHERE uid=?";
   pool.query(sql, [uid], (err, result) => {
       if (err) throw err;
       res.send({ code: 1, msg: "查询成功", data: result });
   })
})
//购物车全删
server.get("/delAll", (req, res) => {
   var gid = req.query.ids;
   console.log(gid)
   var sql = `DELETE FROM food_car where gid in (${gid})`
   pool.query(sql, [gid], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
         res.send({ code: 1, msg: "删除成功" });
      } else {
          res.send({ code: -1, msg: "删除失败" }) 
      }
   })
})


//全部订单
server.get("/Allorder", (req, res) => {
   var output={
      obj:{},
      num:""
   }
   var uid=req.query.uid;
   function getAll(){
      return new Promise(
         function(resolve,reject){
            var sql="SELECT * FROM user_takeout_order WHERE uid=?";
            pool.query(sql,[uid],(err,result)=>{
               if(err)throw err;
               if(result.length>0){
                  output.obj=result;
                  resolve();
               }
            })
         }   
      )
   }
   function getCount(){
      return new Promise(
         function(resolve,reject){
            var sql="SELECT * FROM user_takeout_order WHERE uid=? AND tosid=2";
            pool.query(sql,[uid],(err,result)=>{
               if(err)throw err;
               if(result.length>0){
                  output.num=result.length;
                  resolve();
               }else{
                  output.num=0;
                  resolve();
               }
            })
         }
      )
   }
   (async function(){
      await Promise.all([getAll(),getCount()]);
      res.send(output);
   })()
})
//待收货订单
server.get("/Dshorder", (req, res) => {
   var uid=req.query.uid;
   var output={
      obj:{},
      num:""
   }
   function getDsh(){
      return new Promise(
         function(resolve,reject){
            var sql="SELECT * FROM user_takeout_order WHERE uid=? AND tosid=1";
            pool.query(sql,[uid],(err,result)=>{
               if(err)throw err;
               if(result.length>0){
                  output.obj=result;
                  resolve();
               }else{
                  resolve();
               }
            })
         }
      )
   }
   function getCount(){
      return new Promise(
         function(resolve,reject){
            var sql="SELECT * FROM user_takeout_order WHERE uid=? AND tosid=2";
            pool.query(sql,[uid],(err,result)=>{
               if(err)throw err;
               if(result.length>0){
                  output.num=result.length;
                  resolve();
               }else{
                  output.num=0;
                  resolve();
               }
            })
         }
      )
   }
   (async function(){
      await Promise.all([getDsh(),getCount()]);
      res.send(output);
   })()
})
//待评价订单
server.get("/Dpjorder", (req, res) => {
   var output={
      obj:{},
      num:""
   }
   var uid=req.query.uid;
   var sql="SELECT * FROM user_takeout_order WHERE uid=? AND tosid=2";
   pool.query(sql,[uid],(err,result)=>{
      if(err)throw err;
      if(result.length>0){
         output.obj=result;
         output.num=result.length;
         res.send(output);
      }else{
         output.num=0;
         res.send(output);
      }
   })
})
//退款订单
server.get("/Thorder", (req, res) => {
   var output={
      obj:{},
      num:""
   }
   var uid=req.query.uid;
   function getTh(){
      return new Promise(
         function(resolve,reject){
            var sql="SELECT * FROM user_takeout_order WHERE uid=? AND tosid=3";
            pool.query(sql,[uid],(err,result)=>{
               if(err)throw err;
               if(result.length>0){
                  output.obj=result;
                  resolve();
               }else{
                  resolve();
               }
            })
         }   
      )
   }
   function getCount(){
      return new Promise(
         function(resolve,reject){
            var sql="SELECT * FROM user_takeout_order WHERE uid=? AND tosid=2";
            pool.query(sql,[uid],(err,result)=>{
               if(err)throw err;
               if(result.length>0){
                  output.num=result.length;
                  resolve();
               }else{
                  output.num=0;
                  resolve();
               }
            })
         }
      )
   }
   (async function(){
      await Promise.all([getTh(),getCount()]);
      res.send(output);
   })()
})
//已完成订单
server.get("/Over", (req, res) => {
   var output={
      obj:{},
      num:""
   }
   var uid=req.query.uid;
   function getOver(){
      return new Promise(
         function(resolve,reject){
            var sql="SELECT * FROM user_takeout_order WHERE uid=? AND tosid=4";
            pool.query(sql,[uid],(err,result)=>{
               if(err)throw err;
               if(result.length>0){
                  output.obj=result;
                  resolve();
               }else{
                  resolve();
               }
            })
         }   
      )
   }
   function getCount(){
      return new Promise(
         function(resolve,reject){
            var sql="SELECT * FROM user_takeout_order WHERE uid=? AND tosid=2";
            pool.query(sql,[uid],(err,result)=>{
               if(err)throw err;
               if(result.length>0){
                  output.num=result.length;
                  resolve();
               }else{
                  output.num=0;
                  resolve();
               }
            })
         }
      )
   }
   (async function(){
      await Promise.all([getOver(),getCount()]);
      res.send(output);
   })()
})

//收货确认
server.get("/tjqr", (req, res) => {
   var oid=req.query.oid;
   var sql="UPDATE user_takeout_order SET tosid=2 WHERE oid=?";
   pool.query(sql,[oid],(err,result)=>{
      if(err)throw err;
      if(result.affectedRows>0){
         res.send({code:1,msg:"update success"});
      }else{
         res.send({code:0,msg:"update error"});
      }   
   })
})

//商品评价
server.get("/tjpl",(req,res)=>{
   var oid=req.query.oid;
   var sql="UPDATE user_takeout_order SET tosid=4 WHERE oid=?";
   pool.query(sql,[oid],(err,result)=>{
      console.log(11111);
      if(err)throw err;
      if(result.affectedRows>0){
         res.send({code:1,msg:"update success"});
      }else{
         res.send({code:0,msg:"update error"});
      }   
   })
})


















//buy加载默认地址
server.get("/BuyAddress", (req, res) => {
   var uid = req.session.uid;
   if (!uid) {
       res.send({ code: -1, msg: "请登录" });
       return;
   }
   var sql = "SELECT auser,aphone,address";
   sql += " FROM food_user_address";
   sql += " WHERE isDefault=1";
   pool.query(sql, [uid], (err, result) => {
       if (err) throw err;
       res.send({ code: 1, msg: "查询成功", data: result });
   })
})
//结算添加至订单
server.get("/addorder", (req, res) => {
var uid = req.session.uid;
if (!uid) {
   res.send({
       code: -1,
       msg: "请先登录"
   })
   return;
}
var tosid = 1;
var auser = req.query.auser;
var gcount = req.query.gcount;
var pname = req.query.pname;
var tmoney = req.query.tmoney;
var sql = "SELECT * FROM user_takeout_order";
sql += " WHERE uid = ?";
pool.query(sql, [uid], (err, result) => {
   if (err) throw err;
   var sql = "";
   sql = `INSERT INTO user_takeout_order VALUES(null,${tosid},"${auser}",${uid},"${pname}",${gcount},${tmoney})`;
   pool.query(sql, (err, result) => {
       if (err) throw err;
       res.send({ code: 1, msg: "添加成功" })
   })
})
})





server.get("/add",(req,res)=>{
   var i=req.query.i
   var gid=req.query.gid
   var sql="select gcount from food_car where gid=?"
   pool.query(sql,[gid],(err,aa)=>{
      if (err){throw err}
      var gcount=aa[0].gcount
      gcount=parseFloat(gcount)
      if (i=="1"){
         gcount++
      }else{
         gcount--
      }
      if (gcount<=1){
         gcount=1
      }
      var sql="update food_car set gcount=? where gid=?"
      pool.query(sql,[gcount,gid],(err,bb)=>{
         if (err){throw err}
            res.send({code:1,msg:"修改成功"})
         })
      })
   })

   