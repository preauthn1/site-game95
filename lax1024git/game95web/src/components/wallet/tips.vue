<template>
  <el-dialog
      :visible.sync="isShow"
      custom-class="el-dialog-transparent2 el-dialog-center2"
      :modal-append-to-body="false"
      @close="hide"
      width="auto"
      z-index="3000"
    >
      <div class="wapper">
        <img src="@/assets/images/tip-top.png" class="top-img">
        <div class="title">{{ $t("取消付款将丢失") }}</div>
        <!-- <div class="num">{{ num }} {{ $t("奖金") }}!</div> -->
        <el-button class="button button_blue" @click="submit">{{ $t("确定") }}</el-button>
        <div class="cance" @click="hide">{{ $t("取消") }}</div>
      </div>
    </el-dialog>
</template>

<script>
export default {
  data(){
    return {
      isShow:false,
      num:0,
      reslove:()=>{}
    }
  },
  methods:{
    hide(){
      this.reslove(false)
      this.isShow = false
    },
    submit(){
      this.reslove(true)
      this.isShow = false
    },
    show(num){
      this.num = num
      this.isShow = true
      return new Promise((reslove)=>{
        this.reslove = reslove
      })
    }
  }
}
</script>

<style scoped lang="less">
.wapper{
  background-image: linear-gradient(to bottom,#004699 ,#111923 20%,#111923);
  color: #FFF;
  width: 220px;
  border-radius: 20px;
  padding: 0 34px;
  text-align: center;
  padding-bottom: 20px;
  @media (min-width:768px) {
    width: 300px;
  }
}

.top-img{
  width: 152px;
  margin-top: -50px;
}
.button{
  width: 100%;
  border-radius: 100vh;
  margin-top: 20px;
  margin-bottom: 14px;
}
.num{
  color: #FFE3A1;
  font-size: 28px;
  margin-top: 13px;
  font-weight: bold;
}
.title{
  margin-top: 10px;
  word-wrap: break-word;
  word-break:normal;
}
.cance{
  cursor: pointer;
  color: #93ACD3;
  font-weight: bold;
}
</style>