SET NAMES UTF8;
DROP DATABASE IF EXISTS food;
CREATE DATABASE food CHARSET=UTF8;
USE food;

#用户账户
CREATE TABLE food_user(
  uid INT PRIMARY KEY AUTO_INCREMENT,			#用户id
  uphone CHAR(11),												#用户注册手机号(账号)
  uname VARCHAR(64),											#用户昵称
  upwd VARCHAR(128),											#密码
  usex BOOL,															#用户性别
  upic VARCHAR(60000)												#用户头像图片
);
INSERT INTO food_user VALUES(NULL,'18888888888','jams','123',1,"NULL");
INSERT INTO food_user VALUES(NULL,'19888888888','tom','123',0,NULL);

#用户收货地址
CREATE TABLE food_user_address(
	aid INT PRIMARY KEY AUTO_INCREMENT,		 #收获地址id
	auser VARCHAR(64),										 #联系人姓名
	aphone CHAR(11),											 #联系人手机号
	address VARCHAR(512),									 #收获地址
	uid INT,															 #当前用户id		
	isDefault BOOL                         #是否为默认地址,1:默认,0:其他
);
INSERT INTO food_user_address VALUES(NULL,'tom','18888888888','湖南省,长沙市,天心区,南门口111号',1,1);
INSERT INTO food_user_address VALUES(NULL,'tom','18888888888','湖南省,长沙市,天心区,东塘111号',1,0);


#省级地址选项列表
CREATE TABLE food_address_province(
	sid INT PRIMARY KEY AUTO_INCREMENT,    #省级地址id  
	provinceName VARCHAR(64)						   #省级地名
);
INSERT INTO food_address_province VALUES(NULL,'选择省');   
INSERT INTO food_address_province VALUES(NULL,'北京市');
INSERT INTO food_address_province VALUES(NULL,'湖南省');

#市级地址选项列表
CREATE TABLE food_address_city(
	cid INT PRIMARY KEY AUTO_INCREMENT,   #市级地址id
	cityName VARCHAR(64),                 #市级地名
	sid INT                               #省级地址id
);
INSERT INTO food_address_city VALUES(NULL,'选择市','1');
INSERT INTO food_address_city VALUES(NULL,'北京市','2');
INSERT INTO food_address_city VALUES(NULL,'县','2');
INSERT INTO food_address_city VALUES(NULL,'长沙市','3');
INSERT INTO food_address_city VALUES(NULL,'株洲市','3');
INSERT INTO food_address_city VALUES(NULL,'湘潭市','3');
INSERT INTO food_address_city VALUES(NULL,'岳阳市','3');

#区级地址选项列表
CREATE TABLE food_address_district(
	did INT PRIMARY KEY AUTO_INCREMENT,    #区级地址id
	districtName VARCHAR(128),             #区级地名
	cid INT                                #市级地址id
);
INSERT INTO food_address_district VALUES(NULL,'选择区',1);
INSERT INTO food_address_district VALUES(NULL,'平谷区',2);
INSERT INTO food_address_district VALUES(NULL,'怀柔区',2);
INSERT INTO food_address_district VALUES(NULL,'大兴区',2);
INSERT INTO food_address_district VALUES(NULL,'昌平区',2);
INSERT INTO food_address_district VALUES(NULL,'顺义区',2);
INSERT INTO food_address_district VALUES(NULL,'通州区',2);
INSERT INTO food_address_district VALUES(NULL,'房山区',2);
INSERT INTO food_address_district VALUES(NULL,'门头沟区',2);
INSERT INTO food_address_district VALUES(NULL,'海定区',2);
INSERT INTO food_address_district VALUES(NULL,'石景山区',2);
INSERT INTO food_address_district VALUES(NULL,'丰台区',2);
INSERT INTO food_address_district VALUES(NULL,'朝阳区',2);
INSERT INTO food_address_district VALUES(NULL,'西城区',2);
INSERT INTO food_address_district VALUES(NULL,'东城区',2);
INSERT INTO food_address_district VALUES(NULL,'延庆县',3);
INSERT INTO food_address_district VALUES(NULL,'密云县',3);
INSERT INTO food_address_district VALUES(NULL,'望城区',4);
INSERT INTO food_address_district VALUES(NULL,'浏阳市',4);
INSERT INTO food_address_district VALUES(NULL,'宁县县',4);
INSERT INTO food_address_district VALUES(NULL,'长沙县',4);
INSERT INTO food_address_district VALUES(NULL,'开福区',4);
INSERT INTO food_address_district VALUES(NULL,'岳麓区',4);
INSERT INTO food_address_district VALUES(NULL,'天心区',4);
INSERT INTO food_address_district VALUES(NULL,'芙蓉区',4);
INSERT INTO food_address_district VALUES(NULL,'醴陵市',5);
INSERT INTO food_address_district VALUES(NULL,'炎陵县',5);
INSERT INTO food_address_district VALUES(NULL,'茶陵县',5);
INSERT INTO food_address_district VALUES(NULL,'攸县',5);
INSERT INTO food_address_district VALUES(NULL,'株洲县',5);
INSERT INTO food_address_district VALUES(NULL,'天元区',5);
INSERT INTO food_address_district VALUES(NULL,'石峰区',5);
INSERT INTO food_address_district VALUES(NULL,'芦淞区',5);
INSERT INTO food_address_district VALUES(NULL,'荷塘区',5);
INSERT INTO food_address_district VALUES(NULL,'韶山市',6);
INSERT INTO food_address_district VALUES(NULL,'湘乡市',6);
INSERT INTO food_address_district VALUES(NULL,'湘潭市',6);
INSERT INTO food_address_district VALUES(NULL,'岳塘区',6);
INSERT INTO food_address_district VALUES(NULL,'雨湖区',6);
INSERT INTO food_address_district VALUES(NULL,'临湘市',7);
INSERT INTO food_address_district VALUES(NULL,'汨罗市',7);
INSERT INTO food_address_district VALUES(NULL,'平江县',7);
INSERT INTO food_address_district VALUES(NULL,'湘阴县',7);
INSERT INTO food_address_district VALUES(NULL,'华容县',7);
INSERT INTO food_address_district VALUES(NULL,'岳阳县',7);
INSERT INTO food_address_district VALUES(NULL,'君山区',7);
INSERT INTO food_address_district VALUES(NULL,'云溪区',7);
INSERT INTO food_address_district VALUES(NULL,'岳阳楼区',7);

#商品类别
CREATE TABLE food_family_list(
	fpid INT PRIMARY KEY AUTO_INCREMENT,  #商品类别id
  fpname VARCHAR(128)										#商品类别名称
);
INSERT INTO food_family_list VALUES(NULL,'主食');
INSERT INTO food_family_list VALUES(NULL,'快餐');
INSERT INTO food_family_list VALUES(NULL,'早餐');
INSERT INTO food_family_list VALUES(NULL,'下午茶');

#商品列表
CREATE TABLE foods_list(
	pid INT PRIMARY KEY AUTO_INCREMENT,    #商品id
	pname VARCHAR(128),                    #商品名称
	pprice DECIMAL(10,2),                  #商品价格
	pdetails VARCHAR(128),                 #商品详情描述
	ppic VARCHAR(256),                     #商品图片
	salesVal INT,                          #销售量
	pcount INT,                            #商品库存
	isPinkage BOOL,                        #是否包邮  1:包邮,0:不包邮
	onSale BOOL,                           #是否打折  1:打折, 0:不打折
	fpid INT                               #商品类别id
);
INSERT INTO foods_list VALUES(NULL,'烤羊排',123.00,'内蒙古羊排','zs01.png',100,50,0,0,1);
INSERT INTO foods_list VALUES(NULL,'土豆焖牛肉',79.00,'红烧土豆焖野牛肉','zs02.png',125,50,0,0,1);
INSERT INTO foods_list VALUES(NULL,'剁椒鱼头',89.00,'湖南剁辣椒蒸雄鱼头','zs03.png',88,50,0,0,1);
INSERT INTO foods_list VALUES(NULL,'辣椒炒肉',15.00,'螺丝青椒炒肉','zs04.png',325,30,0,0,1);
INSERT INTO foods_list VALUES(NULL,'小鸡炖蘑菇',69.00,'农家散养小鸡炖长白山野生蘑菇','zs05.png',77,50,0,0,1);
INSERT INTO foods_list VALUES(NULL,'红烧牛肉面',26.00,'康师傅红烧牛肉面','kc01.png',56,66,0,0,2);
INSERT INTO foods_list VALUES(NULL,'米粉',15.00,'桂林米粉','kc02.png',356,66,0,0,2);
INSERT INTO foods_list VALUES(NULL,'肉夹馍',10.00,'陕西肉夹馍','kc03.png',306,100,0,0,2);
INSERT INTO foods_list VALUES(NULL,'汉堡包',36.89,'麦当劳牛肉汉堡','kc04.png',556,98,0,0,2);
INSERT INTO foods_list VALUES(NULL,'寿司',25.00,'北海道三文鱼寿司','kc05.png',102,64,0,0,2);
INSERT INTO foods_list VALUES(NULL,'营养早餐',19.00,'罗莎蛋糕','zc01.png',102,64,0,0,3);
INSERT INTO foods_list VALUES(NULL,'生煎包',2.00,'上海生煎包','zc02.png',102,64,0,0,3);
INSERT INTO foods_list VALUES(NULL,'三明治',6.00,'火腿三明治','zc03.png',102,64,0,0,3);
INSERT INTO foods_list VALUES(NULL,'油条',1.00,'营养健康油条','zc04.png',102,64,0,0,3);
INSERT INTO foods_list VALUES(NULL,'粥',25.00,'皮蛋瘦肉粥','zc05.png',102,64,0,0,3);
INSERT INTO foods_list VALUES(NULL,'奶茶',16.00,'芒果奶茶','xwc01.png',622,82,0,0,4);
INSERT INTO foods_list VALUES(NULL,'咖啡',20.00,'逆袭摩卡','xwc02.png',412,64,0,0,4);
INSERT INTO foods_list VALUES(NULL,'果茶',25.00,'柠檬果茶酱','xwc03.png',328,114,0,0,4);
INSERT INTO foods_list VALUES(NULL,'章鱼丸',20.00,'皮蛋瘦肉粥','xwc04.png',404,104,0,0,4);
INSERT INTO foods_list VALUES(NULL,'臭豆腐',2.00,'长沙火宫殿臭豆腐','xwc05.png',262,114,0,0,4);

#购物车列表
CREATE TABLE food_car(
	gid INT PRIMARY KEY AUTO_INCREMENT,    #购物车id
  uid INT,                               #当前用户id
	pid INT,															 #商品id
	gcount INT,                            #购物车项目数量(购买商品数量)
	pname VARCHAR(128),                    #商品名称
	pprice DECIMAL(10,2),                  #商品价格
	ppic VARCHAR(256),                     #商品图片
	yprice DECIMAL(10,2),                  #邮费
	money DECIMAL(10,2)                    #合计
);

#优惠卷类别
CREATE TABLE food_coupons(
	yid INT PRIMARY KEY AUTO_INCREMENT,    #优惠卷id
	yname VARCHAR(128),                    #优惠名称
	ycount INT,                            #优惠卷数量
	ydays INT,                             #优惠卷期限(天数)
	ysid INT,                              #优惠卷状态码
	uid INT                                #当前用户id
);
INSERT INTO food_coupons VALUES(NULL,'九折',1,7,1,1);
INSERT INTO food_coupons VALUES(NULL,'八折',1,7,1,1);
INSERT INTO food_coupons VALUES(NULL,'满50减10',1,7,1,1);
INSERT INTO food_coupons VALUES(NULL,'满100减20',1,7,1,1);

#优惠卷状态码列表
CREATE TABLE food_coupons_status(
	ysid INT PRIMARY KEY AUTO_INCREMENT,   #优惠卷id
	ystatusName VARCHAR(64)                #优惠卷名称
);
INSERT INTO food_coupons_status VALUES(NULL,'未使用');
INSERT INTO food_coupons_status VALUES(NULL,'已使用');
INSERT INTO food_coupons_status VALUES(NULL,'已失效');

#订单种类列表
CREATE TABLE user_famliy_order(
	foid INT PRIMARY KEY AUTO_INCREMENT,  #订单种类id
	foname VARCHAR(128)                   #订单种类名称
);
INSERT INTO user_famliy_order VALUES(NULL,'外卖');
INSERT INTO user_famliy_order VALUES(NULL,'到店');

#到店订单状态码列表
CREATE TABLE store_status(
	sosid INT,                #到店订单状态id
	sosname VARCHAR(128)      #到店订单状态名称
);
INSERT INTO store_status VALUES(NULL,'待付款');
INSERT INTO store_status VALUES(NULL,'待确认');
INSERT INTO store_status VALUES(NULL,'待收获');
INSERT INTO store_status VALUES(NULL,'商家已确认');
INSERT INTO store_status VALUES(NULL,'待评价');
INSERT INTO store_status VALUES(NULL,'退款');
INSERT INTO store_status VALUES(NULL,'已完成');
INSERT INTO store_status VALUES(NULL,'已关闭');

#到店订单状态码列表
CREATE TABLE takeoutr_status(
	tosid INT,                #外卖订单状态id
	tosname VARCHAR(128)      #外卖订单状态名称
);
INSERT INTO takeoutr_status VALUES(NULL,'待付款');
INSERT INTO takeoutr_status VALUES(NULL,'待发货');
INSERT INTO takeoutr_status VALUES(NULL,'待收获');
INSERT INTO takeoutr_status VALUES(NULL,'待评价');
INSERT INTO takeoutr_status VALUES(NULL,'退款');
INSERT INTO takeoutr_status VALUES(NULL,'已完成');
INSERT INTO takeoutr_status VALUES(NULL,'已关闭');


#订单列表
CREATE TABLE user_takeout_order(
	oid INT,               #订单id
	otime BIGINT,          #下单时间
	tosid INT,             #订单状态id
	foid INT,              #订单种类id
	uid INT,               #当前用户id
	uphone CHAR(11),       #当前用户手机号
	gcount INT,             #购物车项目数量(购买商品数量)
	pname VARCHAR(128),    #商品名称
	ppic VARCHAR(256),     #商品图片
	pprice DECIMAL(10,2),  #商品价格
	yprice DECIMAL(10,2),  #邮费
	money DECIMAL(10,2),   #合计
	onSale BOOL            #是否打折  1:打折, 0:不打折
); 
