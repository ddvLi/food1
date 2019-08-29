<template>
  <div class="intop06">
    <div>
        <div>
          <span>姓名</span>
          <input type="text">
          </div>
        <div>
          <span>联系方式</span>
          <input type="text"></div>
        <div>
          <span>备注</span>
          <input type="text">
        </div>
    </div>
    <div><button>确定</button></div>
  </div>
</template>
<script>
export default {
  
}
</script>
<style scoped>
  .intop06{
    width: 100%;
    height: 670px;
    background: #edeeef;
    padding-top: 15px;
    
  }
  input {
	  background: none;
	  outline: none;
	  border: none;
	}
  .intop06>div:first-child{
    width: 100%;
    height: 122px;
    background: #fff;
    border-top:1px solid #ddd;
  }
  span{
    display: inline-block;
    width: 85px;
    height: 40px;
    color: #878889;
    font-size:16px;
    text-align: center;
    padding-left: 10px;
    }
  .intop06>div:first-child>div{
    height: 40px;
    border-bottom: 1px solid #ddd;
    line-height: 40px;
  }
  .intop06>div:last-child{
    width: 100%;
    height: 41px;
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }
  .intop06>div:last-child>button{
    width: 95%;
    height: 41px;
    border-radius: 5px;
    background: #55b737;
    text-align: center;
    color: #fff;
    outline: none;
    border: none;
  }
</style>