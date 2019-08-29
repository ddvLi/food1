<template>
  <div>
    <myheader></myheader>
    <div class="wztop_01">
      <!-- 标题 -->
      <div class="wztop_02">
        <span>还有人不知道三亚是美食之都吗？</span>
      </div>
      <div class="wztop_03">
        <span>2016-07-30</span>
      </div>
      
      <!-- 文章内容 -->
      <div class="wztop_01">
        <div class="wztop_04">
          <p>
            &nbsp;&nbsp;&nbsp;后安粉 后安粉的汤底浓郁香爽，是用猪骨、粉肠、大肠、猪内脏等熬成的，配料有小虾、海螺等，与手工磨制的米浆做成的米粉，组成一碗细软的后安粉。后安粉用胡椒提辣，这点也区别与其他几种粉。 过去在三亚后安粉几乎只出现在早餐时段，现在宽泛了，随时都有。
            </p>
          
           <div><img class="imgg_01" src="../../public/images/wznr01.jpg"></div>
          
          <p>
            &nbsp;&nbsp;&nbsp;陵水酸粉 在海南的众多粉中陵水酸粉可谓是独树一帜的，浓稠的汤汁，细密的米粉，鲜香中略点微酸的气味。别小看这样一碗粉，配料的华丽阵容足以蛊惑人心。沙虫（现在多数店家弃用，因为成本较高）、鱿鱼丝、小鱼干等海产品，再加上一勺味道独好的醋，一勺海南黄辣椒酱，成就香、鲜、辣、酸的味道绝配。 推荐：文明路和和平街交叉口（一馨甜品店隔壁）的店，店名忘记了，但是很好找，在他家可以吃到海南好几粉。
          </p>
          <p>
            &nbsp;&nbsp;&nbsp;港门粉 三亚众多粉中，我最爱港门粉。用杂鱼、大骨、鸡鸭加蒜头与姜熬煮2小时以上方可成就汤底，粉绵软汤鲜香，鱼饼切丝，油炸花生等脆口的配食增加不少口齿层次。港门粉也有酸粉，是另一大相径庭的滋味，汤底甜中带微酸的冷汤，其中一物有皮蛋相似的碱香味，恰与酸味相称的很，又是冰冰凉凉的，夏日里随时都可吃下一碗解暑。 推荐：第一家港门粉（一个有很多年历史的小店，没环境而言） 地址：三亚市明珠广场对面儋州三巷进去直走到岔路口即可看到.
          </p>
        </div>
      </div>
      <!-- 评论区 -->
      <div class="plq_01">
        <div class="plq_02">
          <div class="plq_03">
            <textarea class="plk_01" placeholder="我也来说几句..."></textarea>    
          </div>
          <div class="plq_04">
            <div class="plq_05">
              <span class="iconfont icon-zhaopian pl"></span>
            </div>
            <div class="plq_06">
            <span class="plfb_01">发布</span>
            </div>
          </div>
        </div>
        <p class="plq_07">
          <span style="font-weight: bold;">|</span>
          最近评论
          <span>（1）</span>
        </p>
        <div class="plq_08"></div>
        <div class="plq_09">
            <div>
              <img  class="imgg110" src="../../public/images/portrait.jpg">
            </div>
            <div class="plq_11">
            <span class="sapn1">88823641</span><br>
            <span class="sapn2">2019-08-15 00:36</span>
            </div>
            <div class="iconfont icon-huifu hf_01">
            <span class="hf_02">回复</span>
            </div>
            <div class="iconfont icon-buoumaotubiao16 hf_03">
            <span class="hf_04">0</span>
            </div>
            <div class="hf_05"><span>真棒</span></div>
        </div>
 
      </div>
    </div>
  </div>
</template>

<script>
import Myheader from "../components/Myheader.vue"
export default {
  components:{
    "myheader":Myheader
  }
}
</script>

<style scoped>
  .wztop_01{
    width: 100%;
    max-width: 100%;
    position: relative;
  }
  div>.wztop_02{
    width: 300px;
    height: 25px;
    font-size: 15px;
    color:rgb(102, 102, 102);
    font-weight: bold;
    margin-left: auto;
    text-align: left;
    margin-right: auto;
    margin-top:10px;

  }
  div>.wztop_03{
    width: 300px;
    height: 25px;
    font-size: 12px;
    color:rgb(102, 102, 102);
    margin-left: auto;
    text-align: left;
    margin-right: auto;
    margin-top:3px;
  }
  div>.wztop_04{
    width: 300px;
    height: 100%;
    font-size: 14px;
    color:rgb(102, 102, 102);
    margin-left: auto;
    text-align: left;
    margin-right: auto;
    margin-top:5px;
  }
  .wztop_04>p{
    white-space: pre-line;
    min-height: 19px;
    line-height:180%;
    
  }
  .imgg_01{
    width: 300px;
    height: 428px;
    margin-top:35px;
  }
  /* 评论区 */
  div>.plq_01{
    width: 100%;
    max-width: 100%;
    position: relative;
  }
  div>.plq_02{
    width: 300px;
    height: 25px;
    font-size: 15px;
    color:rgb(102, 102, 102);
    font-weight: bold;
    margin-left: auto;
    text-align: left;
    margin-right: auto;
    margin-top:10px;
  }

  div>.plk_01{
    width: 205px;
    height: 30px;
  }
  div>.plq_04{
    position: relative;
    width: 95px;
    height: 30px;
    left:210px;
    top:-40px;
  }
  .pl{
    font-size: 28px;
  }
  .plq_05{
    width: 35px;
    height: 33px;
    border: 2px solid #ccc;
    text-align: center;
  }
  .plq_06{
    position: absolute;
    width: 47px;
    height: 33px;
    right:-7px;
    top:1px;
    border: 2px solid #ccc;
    text-align: center;
    line-height: 30px;
    border-radius: 3px;
  }
  /* 最近评论 */
  .plq_07{
    width: 300px;
    height: 35px;
    font-size: 18px;
    color:#2b2b2b;
    line-height: 35px;
    margin-left: auto;
    text-align: left;
    margin-right: auto;
    margin-bottom: 0;
    /* margin-top:10px; */
  }
  .plq_08{
    width: 300px;
    margin-left: auto;
    text-align: left;
    margin-right: auto;
    border: 0.5px dashed #bfbfbf;
    opacity: 0.5;
  }
  .plq_09{
    position: relative;
     width: 300px;
    margin-left: auto;
    text-align: left;
    margin-right: auto;
    border-bottom: 0.5px dashed #bfbfbf;
    opacity: 0.8;
  }
  .imgg110{
    margin-top:5px;
    width: 30px;
    height: 30px;
  }
  .plq_11{
    position: absolute;
    left: 37px;
    top: 3px;
  }
  .sapn1{font-size: 13px;color:#000;}
  .sapn2{font-size: 12px;color:#999;}
  .hf_01{
    position: absolute;
    right: 40px;
    top: 12px;
    font-size: 15px;
    color: #999;
}
.hf_02{margin-left:3px; }
.hf_03{
  position: absolute;
  right: 2px;
  top: 14px;
  font-size:12px;
  color: #999;
}
.hf_04{margin: 3px;}
.hf_05{
  height: 60px;
  line-height: 60px;
  color:black;
}
</style>