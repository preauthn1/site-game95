<template>
  <el-dialog
    :visible.sync="dialogVisible"
    custom-class="el-dialog-center2 el-dialog-transparent2"
    width="auto"
  >
    <div>
      <div class="cart-wapper">
        <div class="content">
          <div class="cart-title">
            <span>{{ $t("您发现一个神秘的代码点击领取获得") }}</span>
          </div>
          <div class="code-wapper">
            <span class="code-txt">{{ $t("代码") }}:{{ code }}</span>
            <div class="copy-btn"
              v-clipboard:copy="code"
              v-clipboard:success="onCopy"
            >
              <img src="@/assets/images/b-copy.png" />
            </div>
          </div>
          <div class="tip">{{ $t("神秘代码每个活动只能使用一次") }}</div>
          <el-button class="btn" @click="submit" :loading="loading">{{ $t("立即领取") }}</el-button>
        </div>
      </div>
      <div class="close-wapper">
        <div class="close" @click="hide"></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import {code_receive} from '@/api/code'
export default {
  data() {
    return {
      dialogVisible: false,
      code:"",
      loading:false
    };
  },
  methods:{
    hide(){
      this.dialogVisible = false
    },
    onCopy: function() {
      this.successTips("Copy success");
    },
    show(code){
      this.code=code
      if(!this.code){
        this.$message.error(this.$t("请输入神秘代码"));
        return
      }
      this.dialogVisible = true
    },
    async submit(){
      this.loading = true
      const {data} = await code_receive({code:this.code})
      this.loading = false
      if(data.code==1){
        this.$message({
          message: this.$t("恭喜你，神秘代码兑换成功"),
          type: 'success'
        });
        this.hide()
      }else{
        this.$message.error(data.msg);
      }
    }
  }
};
</script>

<style scoped lang="less">
.cart-wapper {
  width: 353px;
  padding-bottom: 145%;
  background-image: url(~@/assets/images/b-cart-bg.png);
  position: relative;
  background-size: 100% 100%;
  @media (max-width:540px){
    width: 320px;
  }
  @media (max-width:320px){
    max-width: 80vw;
  }
}
::v-deep .el-dialog__header {
  display: none;
}
.content {
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0 50px 35px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.cart-title {
  width: 64%;
  top: 21%;
  position: absolute;
  left: 50%;
  height: 0;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
.cart-title span {
  background: linear-gradient(88deg, #f0e9d5 0%, #ffd091 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 这里是超出几行省略 */
}
.code-wapper {
  background-color: #fffae3;
  font-size: 16px;
  height: 39px;
  display: flex;
  align-items: center;
  margin-bottom: 46px;
}
.code-txt {
  flex: 1;
  padding: 0 10px;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* 这里是超出几行省略 */
}
.copy-btn {
  background: linear-gradient(75deg, #e7caaf 0%, #ab8167 100%);
  height: 100%;
  padding: 0 12px;
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;
  border: 1px solid #fffae3;
  cursor: pointer;
}
.copy-btn img {
  width: 20px;
}
.tip {
  text-align: center;
  color: #b99178;
}
.btn {
  background: linear-gradient(89deg, #e8cbb1 0%, #ac8268 100%);
  color: #482f2d !important;
  border-radius: 100vh;
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
}
.close{
  width: 40px;
  height: 40px;
  background-image: url(~@/assets/images/b-close.png);
  background-size: 100% 100%;
}
.close-wapper{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  cursor: pointer;
}
</style>