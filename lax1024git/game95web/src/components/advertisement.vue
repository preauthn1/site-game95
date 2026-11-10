<template>
  <el-dialog
      :visible.sync="isShow"
      :modal-append-to-body="false"
      custom-class="el-dialog-transparent2 el-dialog-center2"
      width="auto"
    >
      <div class="wapper">
        <img class="bg-img" :src="data.images">
        <img src="@/assets/images/advertisement-close.png" class="colse-icon" @click="hide">
        <el-button class="btn" @click="toInfo">
          <span>{{$t(data.btn_text)}}</span>
          <i class="el-icon-arrow-right el-icon"></i>
        </el-button>
      </div>
    </el-dialog>
</template>

<script>
import {advertising_detail_api} from "@/api/advertising.js"
export default {
  data(){
    return {
      isShow:false,
      iosFlag:"",
      data:{}
    }
  },
  methods:{
    show({mode,condition}){
      this.getData({mode,condition})
    },
    hide(){
      this.isShow = false
    },
    toInfo(){
      if(this.data.jump_url=="/download"){
        this.download()
      }else{
        this.$helper.openLink(this.data.jump_url)
      }
    },
    async getData(params){
      const {data:res} = await advertising_detail_api(params)
      if(res.code == 1){
        this.data = res.data
        if(this.data.id){
          // app环境去掉下载弹窗
          if(this.$store.state.env == 'app' && this.data.jump_url=="/download") return
          this.isShow = true
        }
      }
    },
    download() {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      if (/android/i.test(userAgent)) {
        window.location.href = this.$helper.get("rule").android_download_url;
      } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        if(this.iosFlag==""){
          this.iosFlag = "loading"
          window.location.href = this.$helper.get("rule").ios_download_url;
          setTimeout(()=>{
            this.iosFlag = "ok"
          },3000)
        }else if(this.iosFlag=="ok"){
          window.location.href = "https://www.pgyer.com/app/getProvisionFile"
        }
      }else{
        window.location.href = this.$helper.get("rule").android_download_url;
      }
    },
  }
}
</script>

<style scoped lang="less">

.wapper{
  color: #FFF;
  width: 407px;
  position: relative;
  overflow: hidden;
  user-select: none;
  @media (max-width:540px) {
    width: 280px;
  }
}

.bg-img{
  width: 100%;
}
/deep/ .el-dialog__header{
  display: none;
}
/deep/ .el-dialog__body{
  padding: 0;
}
.colse-icon{
  width: 18px;
  height: 18px;
  position: absolute;
  right: 13px;
  top: 13px;
  pointer-events: unset;
}
.btn{
  position: absolute !important;
  bottom: 15px;
  background-color: transparent !important;
  left: 50%;
  transform: translateX(-50%);
  min-width: 199px;
  background-image: url(~@/assets/images/advertisement-btn.png);
  background-size: 100% 100%;
  color: #FFF !important;
  transition: .3s opacity;
  border-radius: 0;
  :hover{
    opacity: 0.8;
  }
  @media (max-width:540px) {
    min-width: 117px;
    font-size: 12px;
    font-weight: normal;
    padding: 6px 14px;
  }
}
</style>