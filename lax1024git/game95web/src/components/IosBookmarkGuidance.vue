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
        <div class="i-header">
          <img src="@/assets/images/apple.png" class="apple-icon">
          <img src="@/assets/images/ios-txt.png" class="ios">
          <div class="header-txt">{{ $t("添加书签") }}</div>
        </div>
        <div class="i-border">
          <div class="i-content">
            <div class="c-item">
              <div class="num-wapper">1</div>
              <div class="item-content">
                <div class="num1-tips title ellipsis">{{ $t("运行Safari并打开此网站") }}</div>
              </div>
            </div>
            <div class="c-item">
              <div class="num-wapper">2</div>
              <div class="item-content">
                <div class="num1-tips title ellipsis">{{ $t("新闻分享") }}</div>
                <div class="icon-wapper icon-wapper1">
                  <img src="@/assets/images/i-icon1.png" style="width: 6px;">
                  <img src="@/assets/images/i-icon2.png" style="width: 6px;">
                  <div class="icon-circular-wapper">
                    <div class="icon-circular">
                      <img src="@/assets/images/i-icon3.png" style="width: 18px;">
                    </div>
                  </div>
                  <img src="@/assets/images/i-icon4.png" style="width: 14px;">
                  <img src="@/assets/images/i-icon5.png" style="width: 14px;">
                </div>
              </div>
            </div>
            <div class="c-item">
              <div class="num-wapper">3</div>
              <div class="item-content">
                <div class="num1-tips title ellipsis">{{ $t("选择“添加到主屏幕”") }}</div>
                <div class="icon-wapper icon-wapper2">
                  <span class="ellipsis">{{ $t("添加到主页Sreeen") }}</span>
                  <div class="icon-circular-wapper">
                    <div class="icon-circular">
                      <img src="@/assets/images/i-icon3.png" style="width: 18px;">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="c-item">
              <div class="num-wapper">4</div>
              <div class="item-content">
                <div class="num1-tips title ellipsis">{{ $t("按“添加”") }}</div>
                <div class="icon-wapper icon-wapper2">
                  <span class="ellipsis">{{ $t("取消添加到主屏幕") }}</span>
                  <div class="icon-circular-wapper">
                    <div class="icon-circular">
                      <img src="@/assets/images/i-icon3.png" style="width: 18px;">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="closed-icon">
          <i class="el-icon-error el-icon" @click="hide"></i>
        </div>
      </div>
    </el-dialog>
</template>

<script>
export default {
  data(){
    return {
      isShow:false,
    }
  },
  mounted(){
    if(this.judgeClient()=='ios'){
      this.show()
    }
  },
  methods:{
    hide() {
      this.isShow = false;
    },
    show() {
      this.isShow = true;

      let time = new Date().getTime();
      const downloadTime = localStorage.getItem("downloadTime-ios");
      if (downloadTime == "hide") return;
      if (downloadTime && Math.abs(downloadTime - time) < 86400000) return;
      if (this.dev != "pc") {
        this.isShow = true;
        localStorage.setItem("downloadTime-ios", time);
      }
    },
    judgeClient() {
      let client = "";
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        //判断iPhone|iPad|iPod|iOS
        client = "ios";
      } else if (/(Android)/i.test(navigator.userAgent)) {
        //判断Android
        client = "android";
      } else {
        client = "pc";
      }
      return client;
    },
  }
}
</script>

<style scoped lang="less">
:deep(.el-dialog__header){
  display: none;
}
:deep(.el-dialog__body){
  padding: 0;
}
:deep(.el-dialog) {
  box-shadow: none ;
}
.wapper{
  color: #FFF;
  width: calc(100vw - 30px);
  max-width: 296px;
}
.i-header{
  padding-bottom: 62.6%;
  background-image: url(~@/assets/images/ios-head-bg.png);
  background-size: 100% 100%;
  width: 93%;
  margin-left: auto;
  position: relative;
}
.header-txt{
  position: absolute;
  bottom: 14%;
  width: 60%;
  transform: translateY(50%);
  text-align: center;
  text-shadow: 0px 2px 0px rgba(15,24,2,0.76);
  color: #FFF;
  font-weight: bold;
}
.i-border{
  border-radius: 22px;
  background: linear-gradient(0deg, #7B79FC, #86EBFE);
  padding: 12px;
}
.i-content{
  background-color: #D2E5F6;
  padding: 12px;
  border-radius: 20px;
}
.c-item{
  background: linear-gradient(86deg, #F4F0EF, #F7E9D9);
  box-shadow: 0px 2px 5px 0px rgba(15,24,2,0.14);
  border-radius: 10px;
  margin-bottom: 10px;
  display: flex;
  &:last-child{
    margin-bottom: 0;
  }
}
.num-wapper{
  width: 38px;
  background: linear-gradient(0deg, #4F5DFB, #7BB9DE);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 24px;
}
.title{
  color: #A76D5C;
  font-weight: bold;
  text-align: center;
  font-size: 12px;
}
.item-content{
  flex: 1;
  padding: 8px;
}
.icon-wapper{
  min-height: 30px;
  background: #EFCEAD;
  border-radius: 7px;
  margin-top: 6px;
}
.icon-wapper1{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 13px;
}
.icon-wapper2{
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0 10px 10px;
  color: #A76D5C;
  font-size: 10px;
}
.icon-circular-wapper{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49px;
  height: 49px;
  background-color: rgba(242, 226, 200, .4);
  border-radius: 50%;
  flex-shrink: 0;
  margin: -16px 0;
}
.icon-circular{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  background-color: rgba(242, 226, 200, 1);
  border-radius: 50%;
}
.ellipsis{
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}
.closed-icon{
  text-align: center;
  font-size: 30px;
}
.apple-icon{
  width: 30px;
  position: absolute;
  bottom: 34%;
}
.ios{
  width: 46px;
  position: absolute;
  bottom: 37%;
  left: 40px;
}
</style>