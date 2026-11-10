<template>
  <div>
    <template v-if="isangent">
      <el-skeleton :rows="1" :count="1" animated :throttle="500" v-if="skeletonShow">
        <template slot="template">
          <ul class="reward-list">
            <li v-for="(item,index) in 4">
              <!-- pc -->
              <div class="item">
                <div class="item-start-box">
                  <el-skeleton-item variant="image"
                                    style="width:100px;height:120px;border-radius:10px"/>
                </div>
                <div class="item-middle-box">
                  <div class="item-middle-box-text">
                    <el-skeleton-item variant="h1"/>
                  </div>
                  <div class="progress-container">
                    <div class="progress">
                      <el-skeleton-item variant="p"/>
                    </div>
                  </div>
                </div>
                <div class="item-end-box">
                  <el-skeleton-item variant="button"/>
                </div>
              </div>
              <!-- mobile -->
              <!-- m -->
              <div class="item-mobile">
                <div class="flex-center">
                  <div class="flex_bd">
                    <div class="item-left-box">
                      <div class="item-start-pic">
                        <el-skeleton-item variant="image"
                                          style="width:60px;height:60px;border-radius:10px"/>
                      </div>
                      <div class="item-info">
                        <el-skeleton-item variant="h1"/>
                      </div>
                      <div class="item-value">
                        <el-skeleton-item variant="p"/>
                      </div>
                    </div>
                  </div>
                  <div class="item-right-box">
                    <el-skeleton-item variant="button"/>
                  </div>
                </div>
                <div class="item-middle-box">
                  <div class="progress-container flex-center">
                    <el-skeleton-item variant="p"/>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </template>
      </el-skeleton>
      <ul class="reward-list" v-else>
        <li v-for="(item,index) in rewardlist" :key="`rewardlist${index}`">
          <div class="item">
            <div class="item-start-box">
<!--              <img class="item-img" :src="item.icon" alt="" v-if="item.icon">-->
              <img class="item-img" src="@/assets/images/teamcenter/icon1099.png" alt="">
            </div>
            <div class="item-middle-box">
              <div class="item-middle-box-text">
								<span>
									<strong>{{ $t(item.name) }}</strong>
<!--                  <strong class="text-blue">{{ item.stratum_number }} </strong>-->
								</span>
                <span class="item-progress-num">
<!--									<strong class="text-blue"> {{ total_num }} </strong>-->
<!--									<span>/ {{ item.stratum_number }} </span>-->
                   {{ current_symbol }} {{ numFormat(item.stratum_bonus) }}
								</span>
              </div>
              <div class="progress-container">
                <div class="progress">
                  <el-progress :text-inside="true" :stroke-width="16" status="success"
                               :percentage="(total_num / item.stratum_number * 100)>100?100:(total_num / item.stratum_number * 100)"
                               :format="format(item.stratum_number)" define-back-color="#37373A" text-color="#FFFFFF"></el-progress>
                </div>
              </div>
            </div>
            <div class="item-end-box">
<!--              <strong>{{ current_symbol }} {{ numFormat(item.stratum_bonus) }}</strong>-->
              <button class="btn btn_blue" v-if="item.is_finish" :disabled="item.is_receive > 0"
                      @click="getReceiveInviteRebate(item)">
                <span v-if="item.is_receive == 1">{{ $t('已领取') }}</span>
                <span v-else-if="item.is_receive == 2">{{ $t('待审核') }}</span>
                <span v-else>{{ $t('领取') }}</span>
              </button>
              <button class="btn btn_gray" v-else disabled>
                {{ $t('进行中') }}
              </button>
            </div>
          </div>
          <!-- m -->
          <div class="item-mobile">
            <div class="item-mobile-reward">
              <div class="item-start-pic">
<!--                <img class="item-img" :src="item.icon" alt="" v-if="item.icon">-->
                <img class="item-img" src="@/assets/images/teamcenter/icon1099.png" alt="">
              </div>
              <div class="item-mobile-reward-right">
                <div class="item-mobile-reward-right-top">
                  <strong>{{ $t(item.name) }}</strong>
                  <strong>{{ current_symbol }} {{ numFormat(item.stratum_bonus) }}</strong>
                </div>
                <el-progress :text-inside="true" :stroke-width="16"
                             :percentage="(total_num / item.stratum_number * 100)>100?100:(total_num / item.stratum_number * 100)"
                             :format="format(item.stratum_number)" define-back-color="#37373A" text-color="#FFFFFF" ></el-progress>
              </div>
              <div class="item-right-box item-mobile-reward-btn">
                <button class="btn btn_blue" v-if="item.is_finish" :disabled="item.is_receive==1"
                        @click="getReceiveInviteRebate(item)">
                  <span v-if="item.is_receive == 1">{{ $t('已领取') }}</span>
                  <span v-else-if="item.is_receive == 2">{{ $t('待审核') }}</span>
                  <span v-else>{{ $t('领取') }}</span>
                </button>
                <button class="btn btn_gray" v-else disabled>
                  {{ $t('进行中') }}
                </button>
              </div>
            </div>
<!--            <div class="flex-center">-->
<!--              <div class="flex_bd">-->
<!--                <div class="item-left-box">-->
<!--                  <div class="item-start-pic">-->
<!--                    <img class="item-img" :src="item.icon" alt="" v-if="item.icon">-->
<!--                    <img class="item-img" src="@/assets/images/teamcenter/icon1099.png" alt="" v-else>-->
<!--                  </div>-->
<!--                  <div class="item-info">-->
<!--										<span>-->
<!--											<strong>{{ $t(item.name) }}</strong>-->
<!--&lt;!&ndash;                      <strong class="text-blue">{{ item.stratum_number }} </strong>&ndash;&gt;-->
<!--										</span>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="item-right-box">-->
<!--                <div class="item-value"><strong>{{ current_symbol }} {{ numFormat(item.stratum_bonus) }}</strong></div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="item-middle-box">-->
<!--              <div class="progress-container flex-center">-->
<!--                <div class="progress flex_bd">-->
<!--                  <el-progress :text-inside="true" :stroke-width="16"-->
<!--                               :percentage="(total_num / item.stratum_number * 100)>100?100:(total_num / item.stratum_number * 100)"-->
<!--                               :format="format(item.stratum_number)" define-back-color="#37373A" text-color="#FFFFFF" ></el-progress>-->
<!--                </div>-->

<!--                <span class="item-progress-num">-->
<!--									<strong class="text-blue"> {{ total_num }} </strong>-->
<!--									<span>/ {{ item.stratum_number }} </span>-->
<!--								</span>-->
<!--              </div>-->

<!--            </div>-->
<!--            <div class="item-right-box">-->
<!--              <button class="btn btn_blue" v-if="item.is_finish" :disabled="item.is_receive==1"-->
<!--                      @click="getReceiveInviteRebate(item)">-->
<!--                <span v-if="item.is_receive == 1">{{ $t('已领取') }}</span>-->
<!--                <span v-else-if="item.is_receive == 2">{{ $t('待审核') }}</span>-->
<!--                <span v-else>{{ $t('领取') }}</span>-->
<!--              </button>-->
<!--              <button class="btn btn_gray" v-else disabled>-->
<!--                {{ $t('进行中') }}-->
<!--              </button>-->
<!--            </div>-->
          </div>
        </li>
      </ul>
    </template>
    <template v-else>
      <div style="padding: 25px 0;">
        <el-empty :image="$t('no_empty')" :description="$t('请先申请成为代理商')"/>
      </div>
    </template>
  </div>
</template>
<script>
import svgIcon from '@/components/svg.vue'
import {getRemuneration_api, get_receiveInviteRebate_api} from "@/api/user";

export default {
  components: {
    svgIcon
  },
  data() {
    return {
      isangent: true,
      rewardlist: [],
      total_num: 0,
      skeletonShow: true,
      current_symbol: ""
    }
  },
  methods: {
    format(row) {
      return () => {
        if(this.total_num<=row){
          return `${this.total_num} / ${row}`;
        }else {
          return `${row} / ${row}`;
        }

      };
    },
    async getRemuneration() {
      await getRemuneration_api().then(res => {
        console.log(res)
        if (res && res.data.code == 1) {
          this.rewardlist = res.data.data.list;
          this.current_symbol = res.data.data.current_symbol
          this.total_num = res.data.data.total_num
          this.skeletonShow = false
        } else if (res && res.data.code == 103) {
          this.isangent = false;
        }
      });
    },
    async getReceiveInviteRebate(item) {
      const receId = item.id
      let data = {
        id: receId
      };
      await get_receiveInviteRebate_api(data).then(res => {
        if (res && res.data.code == 1) {
          this.successTips(res.data.msg);
          item.is_receive = 1
          this.$forceUpdate()
        } else {
          this.errorTips(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.getRemuneration();
  },
};
</script>

<style scoped lang="less">
.item-mobile-reward{
  display: flex;
  position: relative;
  padding: 30px 22px;
  &-right{
    flex: 1;
    padding-left: 6px;
    &-top{
      display: flex;
      justify-content: space-between;
      strong:nth-child(2){
        color: #84F100;
      }
      padding-bottom: 4px;
    }
  }
  &-btn{
    position: absolute;
    left: 50%;
    bottom: 8px;
    transform: translateX(-50%);
  }
}
.reward-list {
  padding-top: 30px;
}

.reward-list li {
  margin-bottom: 15px;
}

.reward-list .item {
  align-items: center;
  background: #282f5a !important;
  border-radius: 13px;
  display: flex;
  flex-direction: column;
  padding: 42px;
}

.item-end-box {
  color: #adb6c4;
  text-align: center;
}

.item-end-box strong {
  color: #fce90b;
  display: block;
  font-size: 36px;
  margin-bottom: 15px;
}

.item-end-box .btn {
  width: 120px;
  height: 40px;
}

.reward-list .item-middle-box-text {
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-bottom: 22px;
  color: #adb6c4;
  font-size: 20px;
}

.text-blue {
  color: #3a07f2 !important;
}
/*
.reward-list ::v-deep .el-progress-bar__inner {
  background: no-repeat linear-gradient(90deg, #0a9dff, #1a52ee);
  border-radius: 9999px;
}

.reward-list ::v-deep .el-progress-bar__outer {
  background-color: #2d3746 !important;
  border-radius: 9999px;
  padding: 3px !important;
}

.reward-list ::v-deep .el-progress-bar__innerText {
  display: none;
}
 */
.item-end-box .button {
  min-width: 110px;
}

@media (max-width: 765px) {
  .item-middle-box {
    padding: 10px 0;
  }

  .reward-list .item > div {
    text-align: center;
    width: 100%;
  }
}

@media (min-width: 765px) {
  .reward-list .item {
    align-items: center;
    background: #282f5a;
    border-radius: 18px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 22px 0 19px;
  }

  .reward-list .item-start-box {
    align-items: center;
    display: flex;
    flex: 0 0 174px;
    justify-content: center;
    margin-right: 2px;
    img{
      width: 124px;
      height: 124px;
    }
  }

  .reward-list .item-middle-box-text {
    flex-direction: row;
    justify-content: space-between;
  }

  .reward-list .item-middle-box {
    flex: 1 1;
    margin-right: 41px;
  }

  .reward-list .item-end-box {
    align-items: center;
    //border-left: 1px solid #2a374a;
    display: flex;
    //flex: 0 0 292px;
    flex-direction: column;
    padding: 0 20px;
  }
}

.reward-list .item-mobile {
  background: #282f5a;
  border-radius: 7px;
  //padding: 22px;
}

.item-left-box {
  display: inline-flex;
  flex-direction: column;
  max-width: 160px;
}

.item-progress-num {
  font-size: 14px;
  margin-left: 20px;
  color: #84F100;
}

.item-info {
  max-width: 160px;
  font-size: 18px;
  margin-top: 10px;
}

.item-value {
  color: #fce90b;
  display: block;
  font-size: 26px;
  margin-top: 10px;
  line-height: 1;
}

.item-mobile {
  display: none;
}


@media (max-width: 765px) {
  .reward-list li > .item {
    display: none;
  }

  .reward-list li > .item-mobile {
    display: block;
  }

  .item-start-pic img {
    width: 60px;
    height: 60px;
  }

  .bonusWork_invite_panel {
    padding: 15px;
  }

  .bonusWork_box {
    flex-direction: column;
  }

  .bonusWork_box_left {
    width: 100%;
    padding: 20px 15px;
  }

  .referral_apostas_bottom {
    padding: 15px;
    margin: 15px;
  }

  .referral_apostas_mobile {
    display: block;
  }

  .referral_apostas_top_right {
    display: none;
  }

  .referral_apostas_top_left {
    padding: 15px;
    width: 100%;
  }

  .item-right-box .btn {
    min-width: 82px;
    height: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    font-size: 10px;
    color: #FFFFFF;
  }
}

.btn_gray:disabled {
  background-color: #FFA905;
  color: #FFFFFF  ;
}
</style>
