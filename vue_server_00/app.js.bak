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

//2:配置数据库连接池:提高数据效率
var pool = mysql.createPool({
   host:"127.0.0.1",  //数据库地址
   user:"root",       //数据库用户名
   password:"",       //数据库密码
   port:3306,         //数据库端口
   database:"xz",     //数据库名称
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
//http://127.0.0.1:3000/01.jpg
//5:启动监听3000
server.listen(3000);




//功能一:完成用户登录操作
server.get("/login",(req,res)=>{
  //1:参数:获取网页传递两个数据 uname upwd
  //参数方式一:?uname=tom&upwd=123 查询字符串
  //参数方式二:/tom/123            参数
  var uname = req.query.uname;
  var upwd = req.query.upwd;
  //2:sql:查询sql语句
  //数据库 库名 表名 列名 小写字母
  var sql = "SELECT id FROM xz_login";
  sql+=" WHERE uname = ? AND upwd=md5(?)";
  //3:json:{code:1,msg:"登录成功"}
  pool.query(sql,[uname,upwd],(err,result)=>{
   //执行sql语句回调函数
   if(err)throw err;
   if(result.length==0){
   res.send({code:-1,msg:"用户名或密码有误"});
   }else{
   //1:将登录成功凭据保存session
   req.session.uid = result[0].id;
   //2:将成功消息发送脚手架  
   res.send({code:1,msg:"登录成功"})  
   }
  })
});
//测试:15:30
//(1)启动node app.js
//(2)
//http://127.0.0.1:3000/login?uname=tom&upwd=123
//http://127.0.0.1:3000/login?uname=tom&upwd=121



//功能二:分页查询商品列表80-105
//1:接收请求方式 GET 请求地址 /product
server.get("/product",(req,res)=>{
//2:接收客户端二个参数
//  pno 页码  pageSize 页大小
 var p = req.query.pno;
 var ps = req.query.pageSize;
//3:设置参数默认值 pno:1 pageSize:4
 if(!p){p=1}
 if(!ps){ps=4}
//4:创建变量 offset 计算数据库偏移量
 var offset = (p-1)*ps;
//5:对pageSize转换整型? nodejs 报错
 ps = parseInt(ps);
//6:创建sql语句
 var sql = "SELECT lid,price,lname";
 sql +=" ,img_url FROM xz_laptop";
 sql +=" LIMIT ?,?";
//7:通过连接池发送sql语句
 pool.query(sql,[offset,ps],(err,result)=>{
  if(err)throw err;
  //8:获取数据库返回的查询结果
  //9:将查询结果发送客户端
  res.send({code:1,msg:"查询成功",data:result});
 });
})

//添加购物车 107~150
//http://127.0.0.1:3000/addcart?lid=1&price=49&lname=phone
//登录成功
//http://127.0.0.1:3000/login?uname=tom&upwd=123

//功能三:将指定商品加入购物车
//#此功能先行条件先登录
//1:GET /addcart
server.get("/addcart",(req,res)=>{
 //2:参数
 //2.1:获取当前登录用户id值
 var uid = req.session.uid;
 //2.2:如果当前用户没有登录
 if(!uid){
 //2.3:返回错误消息  
   res.send({code:-1,msg:"请先登录"});
   return;
 }
 //2.4:获取商品编号 商品价格 商品名称
 var lid = req.query.lid;
 var price = req.query.price;
 var lname = req.query.lname;
 //3:查询指定用户是否购买过此商品
 var sql = "SELECT id FROM xz_cart";
 sql+=" WHERE uid = ? AND lid = ?";
 pool.query(sql,[uid,lid],(err,result)=>{
  if(err)throw err;
  var sql = "";
  if(result.length==0){
    //4:没有购买过此商品添加
    sql=`INSERT INTO xz_cart VALUES(null,${lid},${uid},1,'${lname}',${price},'01.jpg')`;
  }else{
    sql=`UPDATE xz_cart SET count=count+1 WHERE uid=${uid} AND lid=${lid}`;
  }
  //5:购买过此商品更新
  pool.query(sql,(err,result)=>{
    if(err)throw err;
    console.log(result);
    res.send({code:1,msg:"添加成功"})
  })
  //6:json
 })
})


//功能四:查询当前登录用户购物车信息
//#此功能先行条件先登录
//1:请求方式 GET 请求地址 /cart

//http://127.0.0.1:3000/cart
//http://127.0.0.1:3000/login?uname=tom&upwd=123
//http://127.0.0.1:3000/cart

server.get("/cart",(req,res)=>{
  //2:获取uid 并且判断如果没有请求登录
  var uid = req.session.uid;
  if(!uid){
    res.send({code:-1,msg:"请登录"});
    return;
  }
  //3:创建sql查询用户购物车内容
  var sql = " SELECT id,lid,lname";
  sql+=" ,price,count,img_url";
  sql+=" FROM xz_cart";
  sql+=" WHERE uid = ?"
  //4:获取返回结果并且发送客户端
  pool.query(sql,[uid],(err,result)=>{
     if(err)throw err;
     res.send({code:1,msg:"查询成功",data:result});  
  })  
})







