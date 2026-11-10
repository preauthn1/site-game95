<template>
<!--  <div class="user-wapper">-->
<!--    &lt;!&ndash; <span class="title hidden-sm-and-up">{{ $t("个人信息") }}</span> &ndash;&gt;-->
<!--    <el-avatar  class="avatar" :src="$store.state.userInfo.head_img"></el-avatar>-->
<!--    <div class="txt-wapper">-->
<!--      <div class="uid">ID：{{ $store.state.userInfo.rec_code }}</div>-->
<!--      <div class="user-name">{{$store.state.userInfo.real_name?$store.state.userInfo.real_name:$t('未设置')}}</div>-->
<!--    </div>-->
<!--    <el-button @click="change" class="button_fullwidth button_blue">{{ $t("修改") }}</el-button>-->
<!--  </div>-->
  <div class="user">
    <div class="user-top">
      <div class="avatar">
        <img :src="userInfo.head_img">
        <div class="avatar-vip">
          {{userInfo.level_name}}
        </div>
      </div>
      <div class="user-name">
        <div>ID:{{userInfo.id}} <i class="el-icon-edit" @click="change"></i></div>
        <div>{{$t('用户名')}}: {{userInfo.real_name||$t('未设置')}}</div>
      </div>
    </div>
    <div>{{$t('vip等级奖励')}}:</div>
    <el-row :gutter="24">
      <el-col :span="8" :xs="24">
        <div class="vip-rewards">
          <img src="@/assets/images/ranksystem/vip22.png">
          <div class="vip-rewards-right">
            <p class="vip-rewards-name">{{$t('周礼金')}}</p>
            <div>
              <div class="lq-btn" @click="toVip">去领取</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8" :xs="24">
        <div class="vip-rewards">
        <img src="@/assets/images/ranksystem/vip22.png">
        <div class="vip-rewards-right">
          <p class="vip-rewards-name">{{$t('月礼金')}}</p>
          <div>
            <div class="lq-btn" @click="toVip">去领取</div>
          </div>
        </div>
      </div></el-col>
    </el-row>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  computed:{
    ...mapState(['userInfo'])
  },
  methods:{
    change(){
      this.$emit('change')
    },
    toVip(){
      this.$router.push("/rank-system")
    }
  }
}
</script>

<style scoped lang="less">

.lq-btn{
  width: 133px;
  height: 36px;
  background: #FFA905;
  border-radius: 6px;
  color: #fff;
  line-height: 36px;
  text-align: center;
  margin-top: 20px;
}
.vip-rewards{
  display: flex;
  background: #0A0605;
  border-radius: 10px;
  padding: 10px 18px;
  margin-top: 10px;
  img{
    width: 106px;
    height: 84px;
  }
  &-name{
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #84F100;
  }
  &-right{
      padding-left: 10px;
      flex: 1;
  }
}
.user{
  background: #191A1E;
  border-radius: 10px;
  padding: 20px 15px;
  &-top{
    display: flex;
    padding-bottom: 40px;
  }
  .avatar{
    width: 63px;
    height: 63px;
    border-radius: 50%;
    position: relative;
    border: solid 1px #FFA905;
    &-vip{
      position: absolute;
      background: #FFA905;
      border-radius: 13px;
      font-family: D-DIN;
      font-weight: bold;
      font-size: 18px;
      color: #FFFFFF;
      left: 50%;
      transform: translateX(-50%);
      bottom: -20px;
      padding: 0 6px;
    }
    img{
      width: 100%;
      height: 100%;
    }
  }
  &-name{
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 14px;
    color: #FFFFFF;
    padding-left: 20px;
    i{
      font-size: 20px;
      cursor: pointer;
      color:#A4A4A4;
      padding-left: 20px;
    }
  }
}
@media (max-width: 768px) {
  .vip-rewards-right{
    display: flex;
    align-items: center;
  }
  .lq-btn{
    width: 58px;
    height: 22px;
    font-size: 10px;
    line-height: 22px;
    margin-top: 0;
  }
  .vip-rewards img{
    width: 59px;
    height: 47px;
  }
}
.user-wapper{
  background: #161F2C;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 33px 24px 23px;
  position: relative;
}
.uid{
  color: #91AAD1;
  font-weight: bold;
  margin: 8px 0 16px;
}
//.user-name{
//  color: #91AAD1;
//  font-weight: bold;
//  margin-bottom: 16px;
//}
.title{
  position: absolute;
  top: 13px;
  left: 13px;
  font-weight: bold;
  color: #91AAD1;
}
//.avatar{
//  width: 90px;
//  height: 90px;
//}
.txt-wapper{
  text-align: center;
}
@media screen and (max-width:768px) {
  .user-wapper{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 18px 24px;
  }
  .user-name{
    margin: 0;
  }
  .txt-wapper{
    display: flex;
    flex-direction: column-reverse;
    flex: 1;
    text-align: left;
  }
  .uid{
    margin-top: 4px;
    margin-bottom: 0;
  }
  .avatar{
    width: 48px;
    height: 48px;
    margin-right: 11px;
  }
  .button_fullwidth{
    width: auto !important;
    display: inline-block;
    min-width: 90px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
}
</style>
