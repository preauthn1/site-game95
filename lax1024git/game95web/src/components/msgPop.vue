<template>
  <el-dialog
      :visible.sync="isShow"
      :modal-append-to-body="false"
      custom-class="el-dialog-transparent2 el-dialog-center2"
      @close="hide"
      width="auto"
      z-index="3000"
    >
      <div class="wapper">
        <img src="@/assets/images/msg-laba.png" class="top-img">
        <div class="title">{{ $t(title) }}</div>
        <div class="num html" v-if="isRichText(msg)" v-html="msg"></div>
        <div class="num" v-else>{{ $t(msg) }}</div>
        <el-button class="button button_red" @click="submit">{{ $t(buttonText||"确定") }}</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  data(){
    return {
      isShow:false,
      title:"",
      msg:"",
      buttonText:"",
      callBack:null
    }
  },
  methods:{
    isRichText(content) {
      const htmlTags = /<\/?[a-z][\s\S]*>/i;
      //判断是否是富文本格式,此处是发现系统消息通知存在富文本消息，但原代码未进行转换，不清楚逻辑的情况下做判断是否转换富文本
      return htmlTags.test(content);
    },
    hide(){
      this.isShow = false
    },
    submit(){
      this.isShow = false
      this.callBack && this.callBack()
    },
    show({title,msg,callBack,buttonText}){
      this.title = title
      this.msg = msg
      this.isShow = true
      this.callBack = callBack
      this.buttonText = buttonText
    }
  }
}
</script>

<style scoped lang="less">
.wapper{
  background-image: linear-gradient(to bottom,#004699 ,#111923 20%,#111923);
  color: #FFF;
  width: 340px;
  max-width: calc(100vw - 30px);
  border-radius: 20px;
  padding: 0 34px;
  text-align: center;
  padding-bottom: 20px;
  @media (min-width:769px) {
    width: 400px;
  }
}

.top-img{
  width: 252px;
  margin-top: -150px;
  margin-left: -40px;
  @media (max-width:768px) {
    width: 200px;
    margin-top: -100px;
  }
}
.button{
  width: 100%;
  border-radius: 100vh;
  margin-top: 20px;
  margin-bottom: 14px;
}
.num{
  color: #FFE3A1;
  font-size: 16px;
  margin-top: 13px;
  padding: 20px 0;
  @media (max-width:768px) {
    padding: 10px 0;
  }
}
.html{
  text-align: left;
}
.title{
  margin-top: 10px;
  font-size: 24px;
  font-weight: bold;
}
.cance{
  cursor: pointer;
  color: #93ACD3;
  font-weight: bold;
}
</style>