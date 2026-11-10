<template>
  <div>
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <myTabs :list="typeList" @change="tabsChange"
                  :showIcon="false">
            <!-- <template v-slot:icon="{ i }">
              <img :src="typeList[i].icon" class="tabs-icon">
            </template> -->
          </myTabs>
          <div class="flex" style="min-height: 600px;">
            <div class="active_content" ref="activit_content">
              <template v-if="tabsIndex == this.typeList.length-1 ">
                <div class="container01">
                  <div class="p-2">
                    <div>{{ $t("兑换促销代码") }}</div>
                    <div class="redemption-opt">
                      <input v-model="redemptionCode" :placeholder="$t('输入促销代码')" class="redemption-input"
                             type="text">
                      <button type="button" @click="goRedemption" :disabled="redemptionLoadng" class="redemption-btn">
                        {{ $t("兑换") }}
                        <ul v-if="redemptionLoadng" class="animate--loading list-none inline-flex">
                          <li>&period;</li>
                          <li>&period;</li>
                          <li>&period;</li>
                        </ul>
                      </button>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div v-for="(item, index) in hotListClassification" class="active_content_item" :key="`hot${index}`">
                  <img :src="item.c_img" style="object-fit: contain; border-radius: 8px;" alt="">
                  <div class="p-2">
                    <div class="item_title">
                      <span>{{ $t(item.c_title) }}</span>
                    </div>
                    <div class="item_intro">
                      <span>{{ $t(item.c_intro) }}</span>
                    </div>
                    <div class="btn_detail">
                      <el-button @click="showMore(item)" class="btn">
                        {{ item.is_join == 1 ? $t('已参与') : $t('查看详情') }}
                      </el-button>
                    </div>
                  </div>
                </div>
                <none v-if="hotListClassification.length == 0 && activityList.length == 0"></none>
              </template>
            </div>
            <div class="scroll_img" ref="scroll_img">
              <div >
                <img src="../../assets/images/active/active_icon.png" class="scroll_img_data" alt="">
                <div class="text-center text-lime-green project_icon">
                  <span>{{ $t('95') }}</span> {{ $t('提供最慷慨和最多样的') }} <span>{{ $t('活动奖金') }}</span>
                </div>
              </div>
            </div>
          </div>

          <div ref="underLine" class="underLine" ></div>
          <div v-if="openlogin">
            <activeLogin v-if="!$store.state.isLoginStatu" @close="closeRewardPopup"/>
          </div>
          <reward-popup v-if="rewardDialogShow" :reward="rewardAcount" @close="closeRewardPopup"/>


<!--          <div class="all">-->
<!--            <section class="all-s1" :class="this.$t('promote_banner') != 'promote_banner' ? 'm-b-80' : ''">-->
<!--              <div class="all-s1-txt">-->
<!--                <h2 class="all-title">-->
<!--                  <span>{{ $t('Cyber Raccoon') }}</span> {{ $t('提供最慷慨和最多样的') }} <span>{{-->
<!--                    $t('活动奖金')-->
<!--                  }}</span>-->
<!--                </h2>-->
<!--                <p class="gray-p">-->
<!--                  {{ $t('activity_desc1') }}-->
<!--                </p>-->
<!--                <div class="all-sign-btn" v-if="!$store.state.isLoginStatu">-->
<!--                  <button type="button" class="button button_lg button_red button_center button_fullwidth"-->
<!--                          @click="showLoginReg(0)">-->
<!--                    <span class="button__inner">-->
<!--                      <span class="button__text">-->
<!--                        <span class="sign-text">{{ $t('登录') }}</span>-->
<!--                      </span>-->
<!--                    </span>-->
<!--                  </button>-->
<!--                  <div class="all-sign-btn-info">-->
<!--                    <p>-->
<!--                      {{ $t('activity_desc2') }}-->
<!--                    </p>-->
<!--                    <img src="../../assets/images/vnd2.png" width="37" height="37" alt="">-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="redemption-code">-->
<!--                  <span>{{ $t("兑换促销代码") }}</span>-->
<!--                  <div class="redemption-opt">-->
<!--                    <input v-model="redemptionCode" :placeholder="$t('输入促销代码') + '...'" class="redemption-input"-->
<!--                           type="text">-->
<!--                    <button type="button" @click="goRedemption" :disabled="redemptionLoadng" class="redemption-btn">-->
<!--                      {{ $t("兑换") }}-->
<!--                      <ul v-if="redemptionLoadng" class="animate&#45;&#45;loading list-none inline-flex">-->
<!--                        <li>&period;</li>-->
<!--                        <li>&period;</li>-->
<!--                        <li>&period;</li>-->
<!--                      </ul>-->
<!--                    </button>-->
<!--                  </div>-->
<!--                </div>-->
<!--              </div>-->
<!--              <div class="all-s1-imgs" v-if="!isMobileFlag">-->
<!--                <div class="rect-cont">-->
<!--                  <img-->
<!--                      v-lazy="this.$t('promote_banner') != 'promote_banner' ? $t('promote_banner') : require('../../assets/images/racon_big.png')"-->
<!--                      alt="" width="1283" height="1283">-->
<!--                  <img src="../../assets/images/p1.png" width="428" height="427" alt="" class="fly-part f-p1">-->
<!--                  <img src="../../assets/images/p4.png" width="428" height="427" alt="" class="fly-part f-p4">-->
<!--                  <img src="../../assets/images/p5.png" width="428" height="427" alt="" class="fly-part f-p5">-->
<!--                  <img src="../../assets/images/p6.png" width="428" height="427" alt="" class="fly-part f-p6">-->
<!--                </div>-->
<!--              </div>-->
<!--            </section>-->


<!--            <reward-popup v-if="rewardDialogShow" :reward="rewardAcount" @close="closeRewardPopup"/>-->

<!--            <el-skeleton v-if="!skeletonShow" :rows="1" :count="1" animated :throttle="500">-->
<!--              <template slot="template">-->
<!--                <h3 class="sub-title" style="padding-top:40px">-->
<!--                  <el-skeleton-item variant="h1" style="width:40%"/>-->
<!--                </h3>-->
<!--                <el-row type="flex" class="hall-row" :gutter="36">-->
<!--                  <el-col :xs="24" :md="12" v-for="(item, index) in 4" :key="`hot${index}`">-->
<!--                    <div class="hall-block ">-->
<!--                      <div class="hall-photo" style="height:300px">-->
<!--                        <el-skeleton-item variant="image" style="width: 100%; height:100%; border-radius:20px"/>-->
<!--                      </div>-->
<!--                      <div class="hall-grid">-->
<!--                        <h4 class="sub-title2">-->
<!--                          <el-skeleton-item variant="h1" style="width:90%"/>-->
<!--                        </h4>-->
<!--                        <p class="sub-title2">-->
<!--                          <el-skeleton-item variant="p"/>-->
<!--                        </p>-->
<!--                        <p class="white-p">-->
<!--                          <el-skeleton-item variant="p"/>-->
<!--                        </p>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </el-col>-->
<!--                </el-row>-->
<!--              </template>-->
<!--            </el-skeleton>-->
<!--            <template v-if="skeletonShow">-->
<!--              <template v-if="isNeedLogin">-->
                <!-- 下面这行是原本就修改了的 -->
                <!-- <h3 class="sub-title">{{ $t('热门活动') }}</h3> -->
<!--                <myTabs :list="typeList.map(item => item.name)" @change="tabsChange"-->
<!--                        v-if="$store.state.activityShow && !isMobileFlag" :showIcon="false">-->
<!--                  <template v-slot:icon="{ i }">-->
<!--                    <img :src="typeList[i].icon" class="tabs-icon">-->
<!--                  </template>-->
<!--                </myTabs>-->
<!--                <div class="s2" v-for="(item, index) in hotList1" :key="`hot1${index}`" v-if="!$store.state.activityShow">-->
<!--                  <div class="s2__content-block">-->
<!--                    <h2 class="s2__title">-->
<!--                      {{ item.c_title }}-->
<!--                    </h2>-->
<!--                    <p class="s2__desc">-->
<!--                      {{ $t(item.c_intro) }}-->
<!--                    </p>-->
<!--                    <button class="link link_md" @click="showMore(item)">-->
<!--                      <span class="link__text">{{ $t('详情') }}</span>-->
<!--                      <svgIcon widthName="16" heightName="16" class="link__icon"-->
<!--                               icon="icon-arrow-right-small"></svgIcon>-->
<!--                    </button>-->
<!--                  </div>-->
<!--                  <div class="s2__image-block">-->
<!--                    <img v-if="item.c_img" :src="item.c_img" alt="" class="s2__image">-->
<!--                    <div class="s2__image-gr"></div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <section class="all-s3" v-if="!$store.state.activityShow">-->
<!--                  <div class="for-srcl"></div>-->
<!--                  <div class="s3-blocks">-->
<!--                    <div class="s3-block " v-for="(item, index) in hotList2" :key="`hot${index}`">-->
<!--                      <h4 class="sub-title2">{{ item.c_title }}</h4>-->
<!--                      <p class="white-p">{{ item.desc }}</p>-->
<!--                      <p class="gray-p" v-html="item.c_intro"></p>-->
<!--                      <button class="link link_md" @click="showMore(item)">-->
<!--                        <span class="link__text">{{ $t('详情') }}</span>-->
<!--                        <svgIcon widthName="16" heightName="16" class="link__icon" icon="icon-arrow-right-small">-->
<!--                        </svgIcon>-->
<!--                      </button>-->
<!--                      <img v-if="item.c_img" :src="item.c_img" alt="" class="rg-img">-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </section>-->
<!--                <el-row type="flex" class="hall-row" :gutter="36" v-else>-->
<!--                  <el-col :xs="24" :md="12" v-for="(item, index) in hotListClassification" :key="`hot${index}`">-->
<!--                    <div class="hall-block ">-->
<!--                      <div class="hall-photo" @click="showMore(item)">-->
<!--                        <img v-if="item.c_img" :src="item.c_img" alt="" class="img">-->
<!--                      </div>-->
<!--                      <div class="hall-grid">-->
<!--                        <h4 class="sub-title2">{{ item.c_title }}</h4>-->
<!--                        <p class="white-p">{{ item.desc }}</p>-->
<!--                        <p class="gray-p" v-html="item.c_intro"></p>-->
<!--                        <button class="link link_md" @click="showMore(item)">-->
<!--                          <span class="link__text">{{ $t('详情') }}</span>-->
<!--                          <svgIcon widthName="16" heightName="16" class="link__icon" icon="icon-arrow-right-small">-->
<!--                          </svgIcon>-->
<!--                        </button>-->
<!--                      </div>-->
<!--                    </div>-->
<!--                  </el-col>-->
<!--                </el-row>-->

<!--                <none v-if="hotListClassification.length == 0 && activityList.length == 0"></none>-->
<!--                <section class="all-s6" v-if="activityList.length > 0">-->
<!--                  <div class="for-srcl"></div>-->
<!--                  <h3 class="sub-title">-->
<!--                    <span>{{ $t('常驻活动') }}</span>-->
<!--                  </h3>-->
<!--                  <div class="s6-conts">-->
<!--                    <swiper class="swiper s6-conts-gallery" :options="swiperOptionThumbs" ref="swiperThumbs">-->
<!--                      <swiper-slide v-for="(item, index) in activityList" :key="index">-->
<!--                        <div class="s6-cont" :class="'s6-card-bg' + index">-->
<!--                          <h4 class="sub-title2">{{ item.c_title }}</h4>-->
<!--                          <p class="gray-p" v-html="item.c_intro"></p>-->
<!--                          <button class="link link_md" @click="showMore(item)">-->
<!--                            <span class="link__text">{{ $t('详情') }}</span>-->
<!--                            <svgIcon widthName="16" heightName="16" class="link__icon" icon="icon-arrow-right-small">-->
<!--                            </svgIcon>-->
<!--                          </button>-->
<!--                          <div class="rg-img rg-img-bg-1" v-if="item.c_img && item.c_img != '/static/admin/img/add.png'"-->
<!--                               :style="{ backgroundImage: 'url(' + item.c_img + ')' }"></div>-->
<!--                          <div class="rg-img rg-img-bg-1" :class="'rg-img-bg-' + index" v-else></div>-->
<!--                        </div>-->
<!--                      </swiper-slide>-->
<!--                    </swiper>-->
<!--                  </div>-->
<!--                </section>-->
                <!-- 下面这段注释是本来就修改了的 -->
                <!-- <section class="all-s7">
                  <div class="for-srcl"></div>
                  <h3 class="sub-title" style="text-align: center;">
                    <span >{{ $t('告诉你的朋友 Cyber Raccoon 并获得丰厚的奖金') }}</span>
                  </h3>
                  <div class="s7-blocks">
                    <div class="s7-block">
                      <h4 class="sub-title2">{{ $t('推广好友') }}</h4>
                      <p class="gray-p">
                        {{ $t('activity_desc3') }}
                      </p>
                      <router-link class="link link_md" to="/team-center">
                        <span class="link__text">{{ $t('推广链接') }}</span>
                        <svgIcon
                          widthName="16"
                          heightName="16"
                          class="link__icon"
                          icon="icon-arrow-right-small"
                        ></svgIcon>
                      </router-link>
                      <img src="" alt="" class="rg-img s7img1">
                    </div>
                    <div class="s7-block">
                      <h4 class="sub-title2">{{ $t('组建我的团队') }}</h4>
                      <p class="white-p">{{ $t('团队返利更多') }}</p>
                      <p class="gray-p">
                        {{ $t('activity_desc4') }}
                      </p>
                      <button class="button button_md button_red button_center" @click="toLiveSuppert">
                        <span class="link__text">{{ $t('联系客服') }}</span>
                        <svgIcon
                          widthName="16"
                          heightName="16"
                          class="link__text__icon"
                          icon="icon-arrow-right-small"
                        ></svgIcon>
                      </button>
                      <img alt="" class="rg-img s7img2">
                    </div>
                  </div>
                </section>-->
<!--              </template>-->
<!--            </template>-->
<!--          </div>-->
        </div>
      </div>
      <Foot/>
    </div>
    <activityShowDiolog :content="activityItem" ref="activityShowDiolog"></activityShowDiolog>
    <div class="app-overlay" v-if="isMobileFlag" :class="openedleft ? 'visible' : ''" @click="menuClick"></div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import rewardPopup from '@/components/rewardPopup.vue';
import Foot from "@/components/Foot.vue";
import activeLogin from '@/components/wallet/active_login.vue';
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import myTabs from "@/components/myTabs.vue";
import activityShowDiolog from "@/components/activityShowDiolog.vue";
import {action_list_api, action_nologin_list_api} from "@/api/action";
import {code_receive} from '@/api/code'

export default {
  name: "ActivityPage",
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    activityShowDiolog,
    myTabs,
    rewardPopup,
    activeLogin

  },
  data() {
    return {
      dialogVisible: false,
      dialogAgentVisible: false,
      hotList: [],
      typeList: [],
      tabsIndex: 0,
      openlogin: false,
      swiperOptionThumbs: {
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".splide__arrow--next",
          prevEl: ".splide__arrow--prev"
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 1,
            slidesPerGroup: 1
          },
          1200: {
            slidesPerView: 3
          }
        }
      },
      activityList: [],
      infoTitle: '',
      infoContent: '',
      isAgent: false,
      listPage: 1,
      listLimit: 70,
      typeid: 0,
      activityId: 0,
      isApplay: false,
      activityItem: [],
      isNeedLogin: this.$store.state.activityShow ? true : this.$store.state.isLoginStatu,
      skeletonShow: false,
      redemptionCode: "",
      redemptionLoadng: false,
      rewardAcount: 0,
      rewardDialogShow: false
    };
  },
  computed: {
    hotList1() {
      return this.hotList.filter((item, index) => {
        return index == 0;
      })
    },
    hotList2() {
      return this.hotList.filter((item, index) => {
        return index > 0;
      })
    },

    hotListClassification() {
      const typeId = this.typeList[this.tabsIndex] && this.typeList[this.tabsIndex].id
      if (typeId) {
        return this.hotList.filter(item => item.type_id == typeId)
      } else {
        return this.hotList
      }
    }

  },
  methods: {
    initIntersectionObserver(){
      const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.$refs.scroll_img.style.position = 'absolute'
            this.$refs.scroll_img.style.bottom = '0'
            this.$refs.scroll_img.style.right = '0'
            // 模块滚动到可视区
            console.log('模块进入可视区');
          }else{
            const width_size = window.innerWidth
            this.$refs.scroll_img.style.position = 'fixed'
            this.$refs.scroll_img.style.bottom = 'auto'
            if(width_size < 1099){
              this.$refs.scroll_img.style.right = '0'
            }else{
              this.$refs.scroll_img.style.right = 'calc((100vw - 1088px)/2)'
            }
            
          }
      });
      }, {
      rootMargin: '0px',
      threshold: 0.1
      });
      observer.observe(this.$refs.underLine)
    },
    closeRewardPopup() {
      this.openlogin = false
      this.rewardDialogShow = false
      this.rewardAcount = 0
    },

    async goRedemption() {

      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(0);
        return;
      }
      if (this.redemptionCode) {
        this.redemptionLoadng = true
        const {data} = await code_receive({code: this.redemptionCode})

        this.redemptionLoadng = false
        if (data.code == 1) {
          this.redemptionCode = ""
          this.rewardAcount = data.data.amount
          this.rewardDialogShow = true
        } else {
          this.$message.error(data.msg);
        }
      } else {
        this.$message.error(this.$t("请输入促销代码"));
      }
    },
    tabsChange(i) {
      this.tabsIndex = i
    },
    agentChange() {
      this.isAgent = true
    },
    // showmore
    showMore(item) {
      this.openlogin = true
      this.$refs.activityShowDiolog.show()
      this.activityItem = item
      // this.infoTitle = tit,
      // this.infoContent = content,
      // this.typeid = typeid
      // this.activityId = id
    },
    menuClick() {
      this.openedleft = !this.openedleft;
    },
    contestsClick() {
      this.openedcontests = !this.openedcontests;
    },
    contestsShow() {
      this.openedcontests = true;
    },
    // 活动列表
    async getActionList(is_hot) {
      let data = {
        page: this.listPage,
        limit: this.listLimit,
      };
      await (this.$store.state.activityShow && !this.$store.state.isLoginStatu ? action_nologin_list_api(data) : action_list_api(data)).then(res => {
        if (res && res.data.code == 1) {
          if (is_hot) {
            this.hotList = res.data.data;
            this.typeList = [
              {
                name: this.$t("全部活动"),
                icon: require('@/assets/images/allA.png'),
                id: ""
              },
              ...res.data.type_list,
              {
                name: this.$t("兑换码"),
                id: '8080',
              },
            ]
            if (this.$route.query.id) {
              const items = this.hotList.find(item => item.id == this.$route.query.id)
              this.showMore(items)
            }
          } else {
            this.activityList = res.data.data;
          }
          this.skeletonShow = true
        } else {
          console.log('sssssss')
        }
      });
    },
    toLiveSuppert() {
      const ua = navigator.userAgent
      let service_url = this.$t('service_url');
      if (/android/i.test(ua) || /iphone|ipad|ipod/i.test(ua)) {
        service_url = this.$t('mobile_service_url');
        if (/android/i.test(ua)) {
          window.open(service_url, '_blank');
        } else {
          window.location.href = service_url;
        }
      } else {
        window.open(service_url, '_blank');
      }
    },
  },
  mounted() {
    if (this.$store.state.activityShow ? 1 : this.$store.state.isLoginStatu) {
      // this.getActionList(0);
      this.getActionList(1);
    }
    this.initIntersectionObserver()
  },
  created() {
    this.isPhone();
  }
};
</script>
<style lang="less" scoped>
.container01 {
  max-width: 391px;
  height: 174px;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 10px;
  position: relative;
  background-image: url('../../assets/images/active/exchange_background.png');
}

.scroll_img {
  position: fixed;
  right: calc((100vw - 1088px)/2);
  display: flex;
  height: 550px;
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 780px) {
    display: none;
  }
  @media(max-width:1090px){
    right: 0;
  }
  .scroll_img_data{
    width:490px;
    object-fit: contain;
    @media(max-width:1090px){
    width: 350px;
    margin-right: 3vw;
    }
    @media (max-width:900px){
      width: 232px;
    }
    @media(max-width:810px){
      width: 211px;
    }
  }
}
.project_icon{
  @media(max-width:900px){
    text-align: left;
  }
}
.for-srcl {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  width: 50px;
  pointer-events: none;
}

.active_content {
  position: relative;
  width: 391px;
  // padding-bottom: 208px;
  .active_content_item {
    background-color: #191A1E;
    border-radius: 8px;
    margin-bottom: 10px;
    img{
      margin: 0 auto;
    }
    .item_title {
      font-weight: 500;
      font-size: 16px;
      color: #84F100;
      margin-bottom: 10px;

    }

    .item_intro {
      font-weight: 300;
      font-size: 12px;
      color: #A4A4A4;
      margin-bottom: 10px;
    }

    .btn_detail {
      margin: 10px auto;

      .btn {
        width: 100%;
        padding: 10px;
        background: #FF7D1E;
        border-radius: 8px;
      }

    }
  }
}
.el-button:focus, .el-button:hover{
  color: #FFFFFF;
}
.none-wapper {
  background: #191A1E;
  margin-top: 0px !important;
}

.all-s1 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.all-s1 .gray-p {
  margin: 12px 0 24px;
}

.all-s1-txt {
  max-width: 388px;
  position: relative;
  z-index: 1;
}

.all-s1-imgs {
  width: 600px;
  height: 390px;
  position: relative;
  z-index: -1;
}

@media (max-width: 699px) {
  .all-s1-imgs {
    height: 260px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all-s1-imgs {
    height: 260px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all-s1-imgs {
    height: 260px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all-s1-imgs {
    height: 260px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all-s1-imgs {
    height: 260px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all-s1-imgs {
    height: 260px;
  }
}

@media (max-width: 699px) {
  .all-s1 {
    flex-direction: column;
    max-width: 328px;
  }

  .all-s1 .gray-p {
    margin: 8px 0 20px;
  }
}


.all-title {
  font-weight: 700;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: -0.02em;
  margin: 0;
}

.all-title span {
  color: #fa305c;
}

@media (max-width: 699px) {
  .all-title {
    margin-top: 0;
    font-size: 24px;
    line-height: 32px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all-title {
    margin-top: 10px;
    font-size: 24px;
    line-height: 32px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all-title {
    margin-top: 10px;
    font-size: 24px;
    line-height: 32px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all-title {
    margin-top: 10px;
    font-size: 24px;
    line-height: 32px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all-title {
    margin-top: 10px;
    font-size: 24px;
    line-height: 32px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all-title {
    margin-top: 10px;
    font-size: 24px;
    line-height: 32px;
  }
}

.rect-cont {
  position: absolute;
  transform: translate(-50%, -50%) scale(1.07);
  left: 55%;
  top: 52%;
  width: 100%;
  height: auto;
}

@media (max-width: 1088px) {
  .rect-cont {
    transform: translate(-50%, -50%);
    left: 50%;
    top: 56%;
  }
}

@media (max-width: 1320px) {
  .opened-left-panel .rect-cont {
    transform: translate(-50%, -50%);
    left: 50%;
    top: 56%;
  }
}

@media (max-width: 1413px) {
  .opened-right-panel .rect-cont {
    transform: translate(-50%, -50%);
    left: 50%;
    top: 56%;
  }
}

@media (max-width: 1428px) {
  .opened-contests-panel .rect-cont {
    transform: translate(-50%, -50%);
    left: 50%;
    top: 56%;
  }
}

@media (max-width: 1645px) {
  .opened-left-panel.opened-right-panel .rect-cont {
    transform: translate(-50%, -50%);
    left: 50%;
    top: 56%;
  }
}

@media (max-width: 1660px) {
  .opened-left-panel.opened-contests-panel .rect-cont {
    transform: translate(-50%, -50%);
    left: 50%;
    top: 56%;
  }
}

@media (max-width: 699px) {
  .rect-cont {
    transform: translate(-50%, -50%) scale(0.65);
  }
}

@media (max-width: 931px) {
  .opened-left-panel .rect-cont {
    transform: translate(-50%, -50%) scale(0.65);
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .rect-cont {
    transform: translate(-50%, -50%) scale(0.65);
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .rect-cont {
    transform: translate(-50%, -50%) scale(0.65);
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .rect-cont {
    transform: translate(-50%, -50%) scale(0.65);
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .rect-cont {
    transform: translate(-50%, -50%) scale(0.65);
  }
}

.fly-part {
  position: absolute;
  width: 33.3%;
  height: auto;
}

.bg_light {
  position: absolute;
  z-index: -1;
  transform: scale(3);
  left: 44%;
  top: -25%;
}

@media (max-width: 699px) {
  .bg_light {
    transform: scale(2);
    left: 12%;
    top: 2%;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .bg_light {
    transform: scale(2);
    left: 12%;
    top: 2%;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .bg_light {
    transform: scale(2);
    left: 12%;
    top: 2%;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .bg_light {
    transform: scale(2);
    left: 12%;
    top: 2%;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .bg_light {
    transform: scale(2);
    left: 12%;
    top: 2%;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .bg_light {
    transform: scale(2);
    left: 12%;
    top: 2%;
  }
}

.f-p1 {
  left: -3%;
  top: 20%;
  -webkit-animation: f-p1-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  animation: f-p1-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
}

.f-p2 {
  left: 70%;
  top: 44%;
  -webkit-animation: f-p2-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  animation: f-p2-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  transform-origin: 21% 45%;
}

.f-p3 {
  left: -1%;
  top: 50%;
  -webkit-animation: f-p3-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  animation: f-p3-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
}

.f-p3,
.f-p4 {
  transform-origin: 21% 65%;
}

.f-p4 {
  left: 64%;
  top: 12%;
  -webkit-animation: f-p4-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  animation: f-p4-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
}

.f-p5 {
  left: 82%;
  top: 22%;
  -webkit-animation: f-p5-data-v-1189e5f5 7s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  animation: f-p5-data-v-1189e5f5 7s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  transform-origin: 15% 65%;
}

.f-p6 {
  left: 16%;
  top: -2%;
  -webkit-animation: f-p6-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  animation: f-p6-data-v-1189e5f5 8s cubic-bezier(0.6, 0.01, 0.45, 1) infinite;
  transform-origin: 21% 65%;
}

.all-sign-btn-info {
  justify-content: center;
  padding-left: 10px;
}

.all-sign-btn-info p {
  width: auto;
}

@-webkit-keyframes f-p1-data-v-1189e5f5 {
  0% {
    transform: translate(0);
  }

  50% {
    transform: translate(7px, 10px);
  }

  to {
    transform: translate(0);
  }
}

@keyframes f-p1-data-v-1189e5f5 {
  0% {
    transform: translate(0);
  }

  50% {
    transform: translate(7px, 10px);
  }

  to {
    transform: translate(0);
  }
}

@-webkit-keyframes f-p2-data-v-1189e5f5 {
  0% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(0);
  }

  to {
    transform: rotate(10deg);
  }
}

@keyframes f-p2-data-v-1189e5f5 {
  0% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(0);
  }

  to {
    transform: rotate(10deg);
  }
}

@-webkit-keyframes f-p3-data-v-1189e5f5 {
  0% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(0);
  }

  to {
    transform: rotate(10deg);
  }
}

@keyframes f-p3-data-v-1189e5f5 {
  0% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(0);
  }

  to {
    transform: rotate(10deg);
  }
}

@-webkit-keyframes f-p4-data-v-1189e5f5 {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(10deg);
  }

  to {
    transform: rotate(0);
  }
}

@keyframes f-p4-data-v-1189e5f5 {
  0% {
    transform: rotate(0);
  }

  50% {
    transform: rotate(10deg);
  }

  to {
    transform: rotate(0);
  }
}

@-webkit-keyframes f-p5-data-v-1189e5f5 {
  0% {
    transform: rotate(0) translateX(0);
  }

  50% {
    transform: rotate(8deg) translateX(-10px);
  }

  to {
    transform: rotate(0) translateX(0);
  }
}

@keyframes f-p5-data-v-1189e5f5 {
  0% {
    transform: rotate(0) translateX(0);
  }

  50% {
    transform: rotate(8deg) translateX(-10px);
  }

  to {
    transform: rotate(0) translateX(0);
  }
}

@-webkit-keyframes f-p6-data-v-1189e5f5 {
  0% {
    transform: rotate(0) translateX(0);
  }

  50% {
    transform: rotate(10deg) translateX(-15px);
  }

  to {
    transform: rotate(0) translateX(0);
  }
}

@keyframes f-p6-data-v-1189e5f5 {
  0% {
    transform: rotate(0) translateX(0);
  }

  50% {
    transform: rotate(10deg) translateX(-15px);
  }

  to {
    transform: rotate(0) translateX(0);
  }
}

.s2 {
  display: flex;
  margin-top: 40px;
  background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
  border-radius: 16px;
  overflow: hidden;
  justify-content: space-between;
}

@media (max-width: 700px) {
  .s2 {
    flex-direction: column;
    justify-content: flex-end;
  }
}

@media (max-width: 932px) {
  .opened-left-panel .s2 {
    flex-direction: column;
  }
}

@media (max-width: 1025px) {
  .opened-right-panel .s2 {
    flex-direction: column;
  }
}

@media (max-width: 1040px) {
  .opened-contests-panel .s2 {
    flex-direction: column;
  }
}

@media (max-width: 1257px) {
  .opened-left-panel.opened-right-panel .s2 {
    flex-direction: column;
  }
}

@media (max-width: 1272px) {
  .opened-left-panel.opened-contests-panel .s2 {
    flex-direction: column;
  }
}

.s2__content-block {
  padding: 40px 32px;
  max-width: 50%;
}

@media (max-width: 700px) {
  .s2__content-block {
    padding: 0 20px 20px;
    max-width: 100%;
    z-index: 5;
  }
}

@media (max-width: 932px) {
  .opened-left-panel .s2__content-block {
    padding: 0 32px 20px;
    max-width: 100%;
  }
}

@media (max-width: 1025px) {
  .opened-right-panel .s2__content-block {
    padding: 0 32px 20px;
    max-width: 100%;
  }
}

@media (max-width: 1040px) {
  .opened-contests-panel .s2__content-block {
    padding: 0 32px 20px;
    max-width: 100%;
  }
}

@media (max-width: 1257px) {
  .opened-left-panel.opened-right-panel .s2__content-block {
    padding: 0 32px 20px;
    max-width: 100%;
  }
}

@media (max-width: 1272px) {
  .opened-left-panel.opened-contests-panel .s2__content-block {
    padding: 0 32px 20px;
    max-width: 100%;
  }
}

.s2__title {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.s2__title--red {
  color: #ed1d49;
}

.s2__desc {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #93acd3;
  margin-bottom: 12px;
}

.s2__image,
.s2__image-block {
  position: relative;
}

@media (max-width: 700px) {
  .s2__image-block {
    max-height: 290px;
    overflow: hidden;
  }
}

.s2__image {
  border-radius: 16px 0 0 16px;
  z-index: 2;
}

.s2__image-gr {
  position: absolute;
  top: -35px;
  left: 0;
  background: #0035f0;
  width: 375.59px;
  height: 177.55px;
  filter: blur(85px);
}

@media (max-width: 700px) {
  .s2__image-gr {
    top: -100px;
  }
}

@media (max-width: 932px) {
  .opened-left-panel .s2__image-gr {
    top: -100px;
  }
}

@media (max-width: 1025px) {
  .opened-right-panel .s2__image-gr {
    top: -100px;
  }
}

@media (max-width: 1040px) {
  .opened-contests-panel .s2__image-gr {
    top: -100px;
  }
}

@media (max-width: 1257px) {
  .opened-left-panel.opened-right-panel .s2__image-gr {
    top: -100px;
  }
}

@media (max-width: 1272px) {
  .opened-left-panel.opened-contests-panel .s2__image-gr {
    top: -100px;
  }
}

.all-s2 {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(182px, 1fr));
  grid-gap: 16px;
  gap: 16px;
}

@media (max-width: 850px) {
  .all-s2 {
    grid-gap: 12px;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .all-s2 {
    grid-gap: 12px;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .all-s2 {
    grid-gap: 12px;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .all-s2 {
    grid-gap: 12px;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .all-s2 {
    grid-gap: 12px;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .all-s2 {
    grid-gap: 12px;
    gap: 12px;
    grid-template-columns: repeat(auto-fit, minmax(158px, 1fr));
  }
}

.all-s2-bl {
  cursor: pointer;
  width: 100%;
  padding: 8px 12px 8px 8px;
  background: #161f2c;
  border: 1px solid #1c2532;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #fff;
}

.all-s2-bl:hover {
  background: #1c2532;
  border-color: transparent;
}

.all-s2-bl:active {
  background: #111923;
  border-color: transparent;
}

.all-s2-bl p {
  margin: 0 0 0 6px;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: -0.02em;
}

@media (max-width: 699px) {
  .all {
    max-width: 350px;
    margin: 0 auto;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all {
    max-width: 350px;
    margin: 0 auto;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all {
    max-width: 350px;
    margin: 0 auto;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all {
    max-width: 350px;
    margin: 0 auto;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all {
    max-width: 350px;
    margin: 0 auto;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all {
    max-width: 350px;
    margin: 0 auto;
  }
}

.link__icon {
  fill: #3a07f2;
  transition: transform 0.1s ease-in-out, fill 0.1s ease-in-out;
}

.for-srcl {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  width: 50px;
  pointer-events: none;
}

.all-s3 {
  position: relative;
  padding-bottom: 54px;
  border-bottom: 1px solid #1c2532;
  padding-top: 40px;
}

@media (max-width: 850px) {
  .all-s3 {
    padding-top: 36px;
    padding-bottom: 28px;
  }

  .all-s3 .for-srcl {
    top: -24px;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .all-s3 {
    padding-top: 36px;
    padding-bottom: 28px;
  }

  .opened-left-panel .all-s3 .for-srcl {
    top: -24px;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .all-s3 {
    padding-top: 36px;
    padding-bottom: 28px;
  }

  .opened-right-panel .all-s3 .for-srcl {
    top: -24px;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .all-s3 {
    padding-top: 36px;
    padding-bottom: 28px;
  }

  .opened-contests-panel .all-s3 .for-srcl {
    top: -24px;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .all-s3 {
    padding-top: 36px;
    padding-bottom: 28px;
  }

  .opened-left-panel.opened-right-panel .all-s3 .for-srcl {
    top: -24px;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .all-s3 {
    padding-top: 36px;
    padding-bottom: 28px;
  }

  .opened-left-panel.opened-contests-panel .all-s3 .for-srcl {
    top: -24px;
  }
}

.s3-blocks {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(182px, 1fr));
  grid-gap: 16px;
  gap: 16px;
}

@media (max-width: 850px) {
  .s3-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .s3-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .s3-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .s3-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .s3-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .s3-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

.s3-block {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
  border-radius: 14px;
  padding: 42px 0 24px 28px;
}

.s3-block .gray-p,
.s3-block .sub-title2,
.s3-block .white-p {
  max-width: 260px;
}

.s3-block .sub-title2 {
  margin-bottom: 6px;
  position: relative;
  z-index: 3;
}

.s3-block .white-p {
  margin-bottom: 8px;
}

.s3-block .gray-p {
  margin-bottom: 12px;
}

@media (max-width: 1050px) {
  .s3-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1282px) {
  .opened-left-panel .s3-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1375px) {
  .opened-right-panel .s3-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1390px) {
  .opened-contests-panel .s3-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1607px) {
  .opened-left-panel.opened-right-panel .s3-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1622px) {
  .opened-left-panel.opened-contests-panel .s3-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 980px) {
  .s3-block .rg-img {
    transform: translateX(70px);
  }
}

@media (max-width: 1212px) {
  .opened-left-panel .s3-block .rg-img {
    transform: translateX(70px);
  }
}

@media (max-width: 1305px) {
  .opened-right-panel .s3-block .rg-img {
    transform: translateX(70px);
  }
}

@media (max-width: 1320px) {
  .opened-contests-panel .s3-block .rg-img {
    transform: translateX(70px);
  }
}

@media (max-width: 1537px) {
  .opened-left-panel.opened-right-panel .s3-block .rg-img {
    transform: translateX(70px);
  }
}

@media (max-width: 1552px) {
  .opened-left-panel.opened-contests-panel .s3-block .rg-img {
    transform: translateX(70px);
  }
}

@media (max-width: 899px) {
  .s3-block .rg-img {
    width: auto;
    height: 60%;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1131px) {
  .opened-left-panel .s3-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1224px) {
  .opened-right-panel .s3-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1239px) {
  .opened-contests-panel .s3-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1456px) {
  .opened-left-panel.opened-right-panel .s3-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1471px) {
  .opened-left-panel.opened-contests-panel .s3-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 899px) {
  .s3-block {
    padding: 28px 20px 65%;
  }

  .s3-block .gray-p,
  .s3-block .sub-title2,
  .s3-block .white-p {
    max-width: none;
  }
}

.s3-glow {
  position: absolute;
  z-index: -1;
  transform: translate(-50%, -50%) scale(0.5);
  top: 35%;
  left: 40%;
}

@media (max-width: 1050px) {
  .s3-glow {
    top: 14%;
  }
}

@media (max-width: 1282px) {
  .opened-left-panel .s3-glow {
    top: 14%;
  }
}

@media (max-width: 1375px) {
  .opened-right-panel .s3-glow {
    top: 14%;
  }
}

@media (max-width: 1390px) {
  .opened-contests-panel .s3-glow {
    top: 14%;
  }
}

@media (max-width: 1607px) {
  .opened-left-panel.opened-right-panel .s3-glow {
    top: 14%;
  }
}

@media (max-width: 1622px) {
  .opened-left-panel.opened-contests-panel .s3-glow {
    top: 14%;
  }
}

@media (max-width: 850px) {
  .s3-glow {
    top: 4%;
    left: 78%;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .s3-glow {
    top: 4%;
    left: 78%;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .s3-glow {
    top: 4%;
    left: 78%;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .s3-glow {
    top: 4%;
    left: 78%;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .s3-glow {
    top: 4%;
    left: 78%;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .s3-glow {
    top: 4%;
    left: 78%;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (max-width: 850px) {
  .furyWheel {
    padding: 28px 20px 53.5%;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .furyWheel {
    padding: 28px 20px 53.5%;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .furyWheel {
    padding: 28px 20px 53.5%;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .furyWheel {
    padding: 28px 20px 53.5%;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .furyWheel {
    padding: 28px 20px 53.5%;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .furyWheel {
    padding: 28px 20px 53.5%;
  }
}

.s3-shild {
  position: absolute;
  left: 0;
  top: 0;
  width: 95px;
}

.all-s4 {
  position: relative;
  padding-top: 46px;
}

.all-s4 .for-srcl {
  top: -20px;
}

.all-s4 .sub-title {
  margin-bottom: 32px;
}

@media (max-width: 850px) {
  .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 699px) {
  .all-s4 {
    padding-top: 20px;
  }

  .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-left-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-right-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-contests-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-left-panel.opened-right-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-left-panel.opened-contests-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

.s4-imgComt {
  padding: 32px 28px 28px 50%;
  margin-bottom: 32px;
  overflow: hidden;
  background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
  border-radius: 14px;
  position: relative;
}

.s4-imgComt .rank-shild {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: rgba(38, 48, 65, 0.8);
}

.s4-imgComt .rg-img {
  left: 0;
  width: 54%;
  height: auto;
}

@media (max-width: 800px) {
  .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1032px) {
  .opened-left-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1125px) {
  .opened-right-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1140px) {
  .opened-contests-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1357px) {
  .opened-left-panel.opened-right-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1372px) {
  .opened-left-panel.opened-contests-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 699px) {
  .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

.s4-imgComt .sub-title2 {
  margin-bottom: 6px;
}

.s4-imgComt .white-p {
  margin-bottom: 8px;
}

.s4-imgComt .gray-p,
.s4-imgComt .totalPaid {
  margin-bottom: 16px;
}

@media (max-width: 699px) {
  .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

.s4-boxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 16px;
  gap: 16px;
}

@media (max-width: 900px) {
  .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1132px) {
  .opened-left-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1225px) {
  .opened-right-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1240px) {
  .opened-contests-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1457px) {
  .opened-left-panel.opened-right-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1472px) {
  .opened-left-panel.opened-contests-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 699px) {
  .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

.s4-box {
  display: flex;
  flex-direction: column;
  position: relative;
}

.s4-box-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 12px 0 10px;
}

.s4-box-title h4 {
  margin: 0 0 0 10px;
}

.s4-box .gray-p {
  margin-bottom: 36px;
}

.link {
  position: relative;
  z-index: 22;
}

.s4-box .link {
  position: absolute;
  left: 0;
  bottom: 0;
}

.s4-img {
  content: url(../../assets/images/cashback_big.13c34ae.png);
}

@media (max-width: 699px) {
  .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

.s4-glow {
  position: absolute;
  left: 31%;
  top: 25%;
  transform: translate(-50%, -50%) scale(0.7);
  z-index: -1;
}

@media (max-width: 699px) {
  .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.rg-img {
  position: absolute;
  height: 100%;
  width: auto;
  right: 0;
  top: 0;
  pointer-events: none;
}


.totalPaid {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background: #1c2532;
  border-radius: 14px;
  padding: 12px 16px;
  width: -webkit-max-content;
  width: -moz-max-content;
  width: max-content;
}

.totalPaid h4,
.totalPaid p {
  margin: 0;
}

.totalPaid h4 {
  font-weight: 700;
  font-size: 24px;
  line-height: 32px;
  letter-spacing: -0.02em;
  margin-left: 4px;
}

.totalPaid p {
  color: #55657e;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.02em;
  margin-right: 12px;
}

.totalPaid img {
  margin-right: 8px;
  width: 32px;
}

@media (max-width: 850px) {
  .totalPaid {
    padding: 12px;
    width: 100%;
    justify-content: flex-start !important;
  }

  .totalPaid p {
    font-size: 12px;
  }

  .totalPaid img {
    margin-right: 4px;
    width: 25px;
  }

  .totalPaid h4 {
    font-size: 18px;
    font-weight: 600px;
    line-height: 24px;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .totalPaid {
    padding: 12px;
    width: 100%;
    justify-content: flex-start !important;
  }

  .opened-left-panel .totalPaid p {
    font-size: 12px;
  }

  .opened-left-panel .totalPaid img {
    margin-right: 4px;
    width: 25px;
  }

  .opened-left-panel .totalPaid h4 {
    font-size: 18px;
    font-weight: 600px;
    line-height: 24px;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .totalPaid {
    padding: 12px;
    width: 100%;
    justify-content: flex-start !important;
  }

  .opened-right-panel .totalPaid p {
    font-size: 12px;
  }

  .opened-right-panel .totalPaid img {
    margin-right: 4px;
    width: 25px;
  }

  .opened-right-panel .totalPaid h4 {
    font-size: 18px;
    font-weight: 600px;
    line-height: 24px;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .totalPaid {
    padding: 12px;
    width: 100%;
    justify-content: flex-start !important;
  }

  .opened-contests-panel .totalPaid p {
    font-size: 12px;
  }

  .opened-contests-panel .totalPaid img {
    margin-right: 4px;
    width: 25px;
  }

  .opened-contests-panel .totalPaid h4 {
    font-size: 18px;
    font-weight: 600px;
    line-height: 24px;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .totalPaid {
    padding: 12px;
    width: 100%;
    justify-content: flex-start !important;
  }

  .opened-left-panel.opened-right-panel .totalPaid p {
    font-size: 12px;
  }

  .opened-left-panel.opened-right-panel .totalPaid img {
    margin-right: 4px;
    width: 25px;
  }

  .opened-left-panel.opened-right-panel .totalPaid h4 {
    font-size: 18px;
    font-weight: 600px;
    line-height: 24px;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .totalPaid {
    padding: 12px;
    width: 100%;
    justify-content: flex-start !important;
  }

  .opened-left-panel.opened-contests-panel .totalPaid p {
    font-size: 12px;
  }

  .opened-left-panel.opened-contests-panel .totalPaid img {
    margin-right: 4px;
    width: 25px;
  }

  .opened-left-panel.opened-contests-panel .totalPaid h4 {
    font-size: 18px;
    font-weight: 600px;
    line-height: 24px;
  }
}

.rank-shild {
  background: #263041;
  border-radius: 14px 0;
  padding: 6px;
  width: 138px;
}

.rank-shild span {
  color: #93acd3;
  font-weight: 600;
  font-size: 14px;
}

.all-sig-glow-wrp {
  position: relative;
  overflow: visible;
}

.sign-text {
  font-weight: 600;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: -0.02em;
}

.all-sign-btn {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
  width: 328px;
}

.all-sign-btn button {
  height: 64px;
  max-width: 109px;
  box-shadow: 0 0 15px rgba(237, 29, 73, 0.6);
  position: relative;
  z-index: 1;
}

.all-sign-btn-info {
  background: linear-gradient(270.11deg, #fffafb 0.1%, #ffe7ec 99.91%);
  width: 102%;
  transform: translateX(-2%);
  height: 54px;
  border-radius: 0 23px 23px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.all-sign-btn-info p {
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  color: #55657e;
  width: 149px;
  margin: 0 6.6px 0 0;
}

.all-sign-btn-info p span {
  color: #0d131c;
  font-weight: 600;
}

.all-sign-btn-glow {
  transform: translate(-50%, -50%);
  max-width: none;
}

.all-sign-btn-glow,
.sign-glow {
  position: absolute;
  left: 50%;
  top: 50%;
  z-index: -1;
}

.sign-glow {
  transform: translate(-50%, -50%) scaleX(1.6);
  height: 250px;
}

@media (max-width: 850px) {
  .sign-glow {
    height: 150px;
    transform: translate(-50%, -50%) scale(4, 1.2);
    top: 26%;
    left: 38%;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .sign-glow {
    height: 150px;
    transform: translate(-50%, -50%) scale(4, 1.2);
    top: 26%;
    left: 38%;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .sign-glow {
    height: 150px;
    transform: translate(-50%, -50%) scale(4, 1.2);
    top: 26%;
    left: 38%;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .sign-glow {
    height: 150px;
    transform: translate(-50%, -50%) scale(4, 1.2);
    top: 26%;
    left: 38%;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .sign-glow {
    height: 150px;
    transform: translate(-50%, -50%) scale(4, 1.2);
    top: 26%;
    left: 38%;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .sign-glow {
    height: 150px;
    transform: translate(-50%, -50%) scale(4, 1.2);
    top: 26%;
    left: 38%;
  }
}

.for-srcl {
  position: absolute;
  left: 0;
  top: 0;
  height: 40px;
  width: 50px;
  pointer-events: none;
}

.all-s4 {
  position: relative;
  padding-top: 46px;
}

.all-s4 .for-srcl {
  top: -20px;
}

.all-s4 .sub-title {
  margin-bottom: 32px;
}

@media (max-width: 850px) {
  .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .all-s4 .sub-title {
    margin-bottom: 20px;
  }
}

@media (max-width: 699px) {
  .all-s4 {
    padding-top: 20px;
  }

  .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-left-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-right-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-contests-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-left-panel.opened-right-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all-s4 {
    padding-top: 20px;
  }

  .opened-left-panel.opened-contests-panel .all-s4 .for-srcl {
    top: -44px;
  }
}

.s4-imgComt {
  padding: 32px 28px 28px 50%;
  margin-bottom: 32px;
  overflow: hidden;
  background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
  border-radius: 14px;
  position: relative;
}

.s4-imgComt .rank-shild {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  background: rgba(38, 48, 65, 0.8);
}

.s4-imgComt .rg-img {
  left: 0;
  width: 54%;
  height: auto;
}

@media (max-width: 800px) {
  .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1032px) {
  .opened-left-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1125px) {
  .opened-right-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1140px) {
  .opened-contests-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1357px) {
  .opened-left-panel.opened-right-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 1372px) {
  .opened-left-panel.opened-contests-panel .s4-imgComt .rg-img {
    transform: translateY(32px) scale(1.3);
  }
}

@media (max-width: 699px) {
  .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-imgComt .rg-img {
    width: 100%;
    transform: none;
  }
}

.s4-imgComt .sub-title2 {
  margin-bottom: 6px;
}

.s4-imgComt .white-p {
  margin-bottom: 8px;
}

.s4-imgComt .gray-p,
.s4-imgComt .totalPaid {
  margin-bottom: 16px;
}

@media (max-width: 699px) {
  .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-imgComt {
    padding: 260px 20px 24px;
    margin-bottom: 0;
  }
}

.s4-boxes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-gap: 16px;
  gap: 16px;
}

@media (max-width: 900px) {
  .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1132px) {
  .opened-left-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1225px) {
  .opened-right-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1240px) {
  .opened-contests-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1457px) {
  .opened-left-panel.opened-right-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 1472px) {
  .opened-left-panel.opened-contests-panel .s4-boxes {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
}

@media (max-width: 699px) {
  .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-boxes {
    border-top: 1px solid #1c2532;
    grid-gap: 32px;
    gap: 32px;
    padding-top: 36px;
  }
}

.s4-box {
  display: flex;
  flex-direction: column;
  position: relative;
}

.s4-box-title {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 12px 0 10px;
}

.s4-box-title h4 {
  margin: 0 0 0 10px;
}

.s4-box .gray-p {
  margin-bottom: 36px;
}

.s4-box .link {
  position: absolute;
  left: 0;
  bottom: 0;
}

.s4-img {
  content: url(../../assets/images/cashback_big.13c34ae.png);
}

@media (max-width: 699px) {
  .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-img {
    content: url(../../assets/images/cashback_low.32c26bf.png);
  }
}

.s4-glow {
  position: absolute;
  left: 31%;
  top: 25%;
  transform: translate(-50%, -50%) scale(0.7);
  z-index: -1;
}

@media (max-width: 699px) {
  .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s4-glow {
    left: 75%;
    top: 7%;
    transform: translate(-50%, -50%) scale(1.2);
  }
}

.all-s5 {
  padding: 68px 0 54px;
  position: relative;
  border-bottom: 1px solid #1c2532;
}

@media (max-width: 699px) {
  .all-s5 {
    padding: 40px 0 28px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all-s5 {
    padding: 40px 0 28px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all-s5 {
    padding: 40px 0 28px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all-s5 {
    padding: 40px 0 28px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all-s5 {
    padding: 40px 0 28px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all-s5 {
    padding: 40px 0 28px;
  }
}

.s5-cont {
  padding: 32px 50% 24px 28px;
  overflow: hidden;
  background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
  border-radius: 14px;
  position: relative;
}

.s5-cont .sub-title2 {
  margin-bottom: 8px;
}

.s5-cont .white-p {
  margin: 8px 0 6px;
}

.s5-cont .gray-p {
  max-width: 426px;
}

.s5-cont ul {
  list-style-type: disc;
  list-style-position: inside;
}

.s5-cont .rg-img {
  width: 54%;
  height: auto;
}

@media (max-width: 930px) {
  .s5-cont .rg-img {
    transform: translateX(30px);
    width: 50%;
  }
}

@media (max-width: 1162px) {
  .opened-left-panel .s5-cont .rg-img {
    transform: translateX(30px);
    width: 50%;
  }
}

@media (max-width: 1255px) {
  .opened-right-panel .s5-cont .rg-img {
    transform: translateX(30px);
    width: 50%;
  }
}

@media (max-width: 1270px) {
  .opened-contests-panel .s5-cont .rg-img {
    transform: translateX(30px);
    width: 50%;
  }
}

@media (max-width: 1487px) {
  .opened-left-panel.opened-right-panel .s5-cont .rg-img {
    transform: translateX(30px);
    width: 50%;
  }
}

@media (max-width: 1502px) {
  .opened-left-panel.opened-contests-panel .s5-cont .rg-img {
    transform: translateX(30px);
    width: 50%;
  }
}

@media (max-width: 850px) {
  .s5-cont .rg-img {
    transform: translateX(109px) translateY(62px) scale(1.4);
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .s5-cont .rg-img {
    transform: translateX(109px) translateY(62px) scale(1.4);
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .s5-cont .rg-img {
    transform: translateX(109px) translateY(62px) scale(1.4);
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .s5-cont .rg-img {
    transform: translateX(109px) translateY(62px) scale(1.4);
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .s5-cont .rg-img {
    transform: translateX(109px) translateY(62px) scale(1.4);
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .s5-cont .rg-img {
    transform: translateX(109px) translateY(62px) scale(1.4);
  }
}

@media (max-width: 699px) {
  .s5-cont .rg-img {
    width: 100%;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s5-cont .rg-img {
    width: 100%;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s5-cont .rg-img {
    width: 100%;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s5-cont .rg-img {
    width: 100%;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s5-cont .rg-img {
    width: 100%;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s5-cont .rg-img {
    width: 100%;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

.s5-cont .totalPaid {
  margin: 16px 0;
}

@media (max-width: 930px) {
  .s5-cont {
    padding: 32px 44% 24px 28px;
  }
}

@media (max-width: 1162px) {
  .opened-left-panel .s5-cont {
    padding: 32px 44% 24px 28px;
  }
}

@media (max-width: 1255px) {
  .opened-right-panel .s5-cont {
    padding: 32px 44% 24px 28px;
  }
}

@media (max-width: 1270px) {
  .opened-contests-panel .s5-cont {
    padding: 32px 44% 24px 28px;
  }
}

@media (max-width: 1487px) {
  .opened-left-panel.opened-right-panel .s5-cont {
    padding: 32px 44% 24px 28px;
  }
}

@media (max-width: 1502px) {
  .opened-left-panel.opened-contests-panel .s5-cont {
    padding: 32px 44% 24px 28px;
  }
}

@media (max-width: 699px) {
  .s5-cont {
    padding: 24px 20px 299px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s5-cont {
    padding: 24px 20px 299px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s5-cont {
    padding: 24px 20px 299px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s5-cont {
    padding: 24px 20px 299px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s5-cont {
    padding: 24px 20px 299px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s5-cont {
    padding: 24px 20px 299px;
  }
}


.s5-links {
  display: flex;
}

.s5-links .link:first-of-type {
  margin-right: 12px;
}

.s5-glow {
  position: absolute;
  left: 88%;
  top: 29%;
  transform: translate(-50%, -50%) scale(0.7);
  z-index: -1;
}

@media (max-width: 699px) {
  .s5-glow {
    left: 76%;
    top: 13%;
    transform: translate(-50%, -50%) scale(1.4);
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s5-glow {
    left: 76%;
    top: 13%;
    transform: translate(-50%, -50%) scale(1.4);
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s5-glow {
    left: 76%;
    top: 13%;
    transform: translate(-50%, -50%) scale(1.4);
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s5-glow {
    left: 76%;
    top: 13%;
    transform: translate(-50%, -50%) scale(1.4);
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s5-glow {
    left: 76%;
    top: 13%;
    transform: translate(-50%, -50%) scale(1.4);
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s5-glow {
    left: 76%;
    top: 13%;
    transform: translate(-50%, -50%) scale(1.4);
  }
}

.all-s6 {
  padding: 46px 0 54px;
  position: relative;
}

.all-s6 .for-srcl {
  top: -22px;
}

@media (max-width: 699px) {
  .all-s6 {
    padding: 28px 0 0;
  }

  .all-s6 .for-srcl {
    top: -40px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all-s6 {
    padding: 28px 0 0;
  }

  .opened-left-panel .all-s6 .for-srcl {
    top: -40px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all-s6 {
    padding: 28px 0 0;
  }

  .opened-right-panel .all-s6 .for-srcl {
    top: -40px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all-s6 {
    padding: 28px 0 0;
  }

  .opened-contests-panel .all-s6 .for-srcl {
    top: -40px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all-s6 {
    padding: 28px 0 0;
  }

  .opened-left-panel.opened-right-panel .all-s6 .for-srcl {
    top: -40px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all-s6 {
    padding: 28px 0 0;
  }

  .opened-left-panel.opened-contests-panel .all-s6 .for-srcl {
    top: -40px;
  }
}

.s6-head {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.s6-head .sub-title {
  margin: 16px 0 8px;
}

@media (max-width: 699px) {
  .s6-head .sub-title {
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s6-head .sub-title {
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s6-head .sub-title {
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s6-head .sub-title {
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s6-head .sub-title {
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s6-head .sub-title {
    font-size: 28px;
    line-height: 34px;
  }
}

.s6-head .gray-p {
  max-width: 688px;
  margin-bottom: 32px;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.02em;
}

@media (max-width: 699px) {
  .s6-head {
    align-items: flex-start;
  }

  .s6-head .gray-p {
    text-align: left;
    margin-bottom: 24px;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .s6-head {
    align-items: flex-start;
  }

  .opened-left-panel .s6-head .gray-p {
    text-align: left;
    margin-bottom: 24px;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .s6-head {
    align-items: flex-start;
  }

  .opened-right-panel .s6-head .gray-p {
    text-align: left;
    margin-bottom: 24px;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .s6-head {
    align-items: flex-start;
  }

  .opened-contests-panel .s6-head .gray-p {
    text-align: left;
    margin-bottom: 24px;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .s6-head {
    align-items: flex-start;
  }

  .opened-left-panel.opened-right-panel .s6-head .gray-p {
    text-align: left;
    margin-bottom: 24px;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .s6-head {
    align-items: flex-start;
  }

  .opened-left-panel.opened-contests-panel .s6-head .gray-p {
    text-align: left;
    margin-bottom: 24px;
  }
}

.s6-cont {
  position: relative;
  width: 100%;
}

.s6-cont {
  padding: 38px 24px 24px;
  background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
  border-radius: 14px;
  position: relative;
  overflow: hidden;
}

.s6-cont .sub-title2 {
  margin-bottom: 8px;
  position: relative;
  z-index: 3;
  padding-right: 60px;
}

.s6-cont .gray-p {
  margin-bottom: 18px;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  position: relative;
  z-index: 3;
}

.s6-cont img {
  top: 0;
  right: 0;
  position: absolute;
  width: 100%;
  height: auto;
}

.all-s8 {
  padding: 72px 0 86px;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.all-s8 .sub-title {
  margin-bottom: 12px;
}

.all-s8 .gray-p {
  margin-bottom: 24px;
  max-width: 512px;
  text-align: center;
}

@media (max-width: 699px) {
  .all-s8 .gray-p {
    text-align: left;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all-s8 .gray-p {
    text-align: left;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all-s8 .gray-p {
    text-align: left;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all-s8 .gray-p {
    text-align: left;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all-s8 .gray-p {
    text-align: left;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all-s8 .gray-p {
    text-align: left;
  }
}

@media (max-width: 699px) {
  .all-s8 {
    padding: 28px 0 33px;
    align-items: flex-start;
  }
}

@media (max-width: 931px) {
  .opened-left-panel .all-s8 {
    padding: 28px 0 33px;
    align-items: flex-start;
  }
}

@media (max-width: 1024px) {
  .opened-right-panel .all-s8 {
    padding: 28px 0 33px;
    align-items: flex-start;
  }
}

@media (max-width: 1039px) {
  .opened-contests-panel .all-s8 {
    padding: 28px 0 33px;
    align-items: flex-start;
  }
}

@media (max-width: 1256px) {
  .opened-left-panel.opened-right-panel .all-s8 {
    padding: 28px 0 33px;
    align-items: flex-start;
  }
}

@media (max-width: 1271px) {
  .opened-left-panel.opened-contests-panel .all-s8 {
    padding: 28px 0 33px;
    align-items: flex-start;
  }
}

.all-s7 {
  position: relative;
  padding: 66px 0 54px;
  border-top: 1px solid #1c2532;
}

.all-s7 .sub-title {
  margin-bottom: 32px;
}

@media (max-width: 850px) {
  .all-s7 .sub-title {
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .all-s7 .sub-title {
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .all-s7 .sub-title {
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .all-s7 .sub-title {
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .all-s7 .sub-title {
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .all-s7 .sub-title {
    margin-bottom: 24px;
    font-size: 28px;
    line-height: 34px;
  }
}

@media (max-width: 850px) {
  .all-s7 {
    padding: 40px 0 20px;
  }

  .all-s7 .for-srcl {
    top: -22px;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .all-s7 {
    padding: 40px 0 20px;
  }

  .opened-left-panel .all-s7 .for-srcl {
    top: -22px;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .all-s7 {
    padding: 40px 0 20px;
  }

  .opened-right-panel .all-s7 .for-srcl {
    top: -22px;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .all-s7 {
    padding: 40px 0 20px;
  }

  .opened-contests-panel .all-s7 .for-srcl {
    top: -22px;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .all-s7 {
    padding: 40px 0 20px;
  }

  .opened-left-panel.opened-right-panel .all-s7 .for-srcl {
    top: -22px;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .all-s7 {
    padding: 40px 0 20px;
  }

  .opened-left-panel.opened-contests-panel .all-s7 .for-srcl {
    top: -22px;
  }
}

.s7-blocks {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(182px, 1fr));
  grid-gap: 16px;
  gap: 16px;
}

@media (max-width: 850px) {
  .s7-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .s7-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .s7-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .s7-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .s7-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .s7-blocks {
    grid-gap: 20px;
    gap: 20px;
  }
}

.s7-block {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #161f2c, rgba(22, 31, 44, 0));
  border-radius: 14px;
  padding: 32px 0 24px 28px;
}

.s7-block .gray-p,
.s7-block .sub-title2,
.s7-block .white-p {
  max-width: 280px;
}

.s7-block .sub-title2 {
  margin-bottom: 6px;
}

.s7-block .white-p {
  margin-bottom: 8px;
  max-width: 260px;
}

.s7-block .gray-p {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #93acd3;
}

@media (max-width: 1050px) {
  .s7-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1282px) {
  .opened-left-panel .s7-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1375px) {
  .opened-right-panel .s7-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1390px) {
  .opened-contests-panel .s7-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1607px) {
  .opened-left-panel.opened-right-panel .s7-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 1622px) {
  .opened-left-panel.opened-contests-panel .s7-block .rg-img {
    transform: translateX(30px);
  }
}

@media (max-width: 980px) {
  .s7-block .rg-img {
    transform: translateX(60px);
  }
}

@media (max-width: 1212px) {
  .opened-left-panel .s7-block .rg-img {
    transform: translateX(60px);
  }
}

@media (max-width: 1305px) {
  .opened-right-panel .s7-block .rg-img {
    transform: translateX(60px);
  }
}

@media (max-width: 1320px) {
  .opened-contests-panel .s7-block .rg-img {
    transform: translateX(60px);
  }
}

@media (max-width: 1537px) {
  .opened-left-panel.opened-right-panel .s7-block .rg-img {
    transform: translateX(60px);
  }
}

@media (max-width: 1552px) {
  .opened-left-panel.opened-contests-panel .s7-block .rg-img {
    transform: translateX(60px);
  }
}

@media (max-width: 899px) {
  .s7-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1131px) {
  .opened-left-panel .s7-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1224px) {
  .opened-right-panel .s7-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1239px) {
  .opened-contests-panel .s7-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1456px) {
  .opened-left-panel.opened-right-panel .s7-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 1471px) {
  .opened-left-panel.opened-contests-panel .s7-block .rg-img {
    width: 100%;
    height: auto;
    top: auto;
    bottom: 0;
    transform: none;
  }
}

@media (max-width: 899px) {
  .s7-block {
    padding: 28px 20px 50%;
  }

  .s7-block .gray-p,
  .s7-block .sub-title2,
  .s7-block .white-p {
    max-width: none;
  }
}

@media (max-width: 1131px) {
  .opened-left-panel .s7-block {
    padding: 28px 20px 50%;
  }

  .opened-left-panel .s7-block .gray-p,
  .opened-left-panel .s7-block .sub-title2,
  .opened-left-panel .s7-block .white-p {
    max-width: none;
  }
}

@media (max-width: 1224px) {
  .opened-right-panel .s7-block {
    padding: 28px 20px 50%;
  }

  .opened-right-panel .s7-block .gray-p,
  .opened-right-panel .s7-block .sub-title2,
  .opened-right-panel .s7-block .white-p {
    max-width: none;
  }
}

@media (max-width: 1239px) {
  .opened-contests-panel .s7-block {
    padding: 28px 20px 50%;
  }

  .opened-contests-panel .s7-block .gray-p,
  .opened-contests-panel .s7-block .sub-title2,
  .opened-contests-panel .s7-block .white-p {
    max-width: none;
  }
}

@media (max-width: 1456px) {
  .opened-left-panel.opened-right-panel .s7-block {
    padding: 28px 20px 50%;
  }

  .opened-left-panel.opened-right-panel .s7-block .gray-p,
  .opened-left-panel.opened-right-panel .s7-block .sub-title2,
  .opened-left-panel.opened-right-panel .s7-block .white-p {
    max-width: none;
  }
}

@media (max-width: 1471px) {
  .opened-left-panel.opened-contests-panel .s7-block {
    padding: 28px 20px 50%;
  }

  .opened-left-panel.opened-contests-panel .s7-block .gray-p,
  .opened-left-panel.opened-contests-panel .s7-block .sub-title2,
  .opened-left-panel.opened-contests-panel .s7-block .white-p {
    max-width: none;
  }
}

@media (max-width: 850px) {
  .s7-block {
    padding: 24px 20px 157;
  }
}

@media (max-width: 1082px) {
  .opened-left-panel .s7-block {
    padding: 24px 20px 157;
  }
}

@media (max-width: 1175px) {
  .opened-right-panel .s7-block {
    padding: 24px 20px 157;
  }
}

@media (max-width: 1190px) {
  .opened-contests-panel .s7-block {
    padding: 24px 20px 157;
  }
}

@media (max-width: 1407px) {
  .opened-left-panel.opened-right-panel .s7-block {
    padding: 24px 20px 157;
  }
}

@media (max-width: 1422px) {
  .opened-left-panel.opened-contests-panel .s7-block {
    padding: 24px 20px 157;
  }
}

.com-soon {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 0;
}

.com-soon span {
  font-weight: 600;
  font-size: 14px;
  color: #55657e;
  margin-right: 6px;
}

.s7img1 {
  content: url(../../assets/images/s6img1_big.9b8a347.png);
}

@media (max-width: 899px) {
  .s7img1 {
    content: url(../../assets/images/s6img1_low.e9d602e.png);
  }
}

@media (max-width: 1131px) {
  .opened-left-panel .s7img1 {
    content: url(../../assets/images/s6img1_low.e9d602e.png);
  }
}

@media (max-width: 1224px) {
  .opened-right-panel .s7img1 {
    content: url(../../assets/images/s6img1_low.e9d602e.png);
  }
}

@media (max-width: 1239px) {
  .opened-contests-panel .s7img1 {
    content: url(../../assets/images/s6img1_low.e9d602e.png);
  }
}

@media (max-width: 1456px) {
  .opened-left-panel.opened-right-panel .s7img1 {
    content: url(../../assets/images/s6img1_low.e9d602e.png);
  }
}

@media (max-width: 1471px) {
  .opened-left-panel.opened-contests-panel .s7img1 {
    content: url(../../assets/images/s6img1_low.e9d602e.png);
  }
}

.s7img2 {
  content: url(../../assets/images/s6img2_big.ea21181.png);
}

@media (max-width: 899px) {
  .s7img2 {
    content: url(../../assets/images/s6img2_low.b33aa97.png);
  }
}

@media (max-width: 1131px) {
  .opened-left-panel .s7img2 {
    content: url(../../assets/images/s6img2_low.b33aa97.png);
  }
}

@media (max-width: 1224px) {
  .opened-right-panel .s7img2 {
    content: url(../../assets/images/s6img2_low.b33aa97.png);
  }
}

@media (max-width: 1239px) {
  .opened-contests-panel .s7img2 {
    content: url(../../assets/images/s6img2_low.b33aa97.png);
  }
}

@media (max-width: 1456px) {
  .opened-left-panel.opened-right-panel .s7img2 {
    content: url(../../assets/images/s6img2_low.b33aa97.png);
  }
}

@media (max-width: 1471px) {
  .opened-left-panel.opened-contests-panel .s7img2 {
    content: url(../../assets/images/s6img2_low.b33aa97.png);
  }
}

.s7-glow {
  position: absolute;
  z-index: -1;
  top: -40%;
  left: 26%;
  width: 370px;
}

@media (max-width: 899px) {
  .s7-glow {
    display: none;
  }
}

@media (max-width: 1131px) {
  .opened-left-panel .s7-glow {
    display: none;
  }
}

@media (max-width: 1224px) {
  .opened-right-panel .s7-glow {
    display: none;
  }
}

@media (max-width: 1239px) {
  .opened-contests-panel .s7-glow {
    display: none;
  }
}

@media (max-width: 1456px) {
  .opened-left-panel.opened-right-panel .s7-glow {
    display: none;
  }
}

@media (max-width: 1471px) {
  .opened-left-panel.opened-contests-panel .s7-glow {
    display: none;
  }
}

.s7-blue-glow {
  left: 76%;
}

.gray-p {
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #93acd3;
}

.s7-block .gray-p {
  margin-bottom: 15px;
}

.news__body {
  line-height: 24px;
  font-weight: normal;
  color: #9cb3df;
}

.has-bottom__body {
  margin-bottom: 40px;
}

.news__body p {
  line-height: 24px;
  font-weight: normal;
  color: #9cb3df;
  margin: 10px 0;
  font-size: 15px;
}

.custom-dialog .el-dialog__body {
  max-height: 400px;
  /* padding:20px 20px 30px 20px; */
  overflow-y: auto;
  font-size: 15px;
}

@media (min-width: 980px) {
  .custom-dialog .el-dialog__body {
    max-height: 600px;
  }
}

.s3-block-foot {
  text-align: center;
  margin-top: 40px;
}

div.rg-img {
  width: 100%;
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: right top;
}

.rg-img-bg-0 {
  background-image: url('../../assets/images/rain_1.png');
}

.rg-img-bg-1 {
  background-image: url('../../assets/images/rain_2.png');
}

.rg-img-bg-2 {
  background-image: url('../../assets/images/rain_3.png');
}

.sub-title {
  font-weight: 700;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #fff;
  display: flex;
  justify-content: center;
}

@media (min-width: 1200px) {
  ::v-deep .custom-dialog {
    max-width: 530px;
  }
}

.hall-block {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(22, 31, 44, 0), #161f2c);
  border-radius: 14px;
  height: 100%;
}

.hall-grid {
  padding: 15px;
}

.hall-photo {
  cursor: pointer;
}

.hall-photo img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.hall-block .gray-p {
  margin-bottom: 10px;
}

.hall-row {
  flex-wrap: wrap;
}

.hall-row > div {
  padding-top: 16px;
  padding-bottom: 16px;
}

@media (max-width: 768px) {
  .hall-row > div {
    padding-top: 8px;
    padding-bottom: 8px;
  }
}

.hall-block .sub-title2 {
  margin-bottom: 10px;
}

@media (max-width: 750px) {
  .hall-photo img {
    height: 275px;
  }
}

.m-b-80 {
  margin-bottom: 80px;
}

@media (max-width: 750px) {
  .m-b-80 {
    margin-bottom: 0px;
  }
}

::v-deep .tabs-item {
  padding: 0 20px;
  background-color: #1C2532;
  border-radius: 8px;
  color: #FFF;
  margin-right: 16px;
  display: flex;
  align-items: center;
}

::v-deep .tabs-item-ac {
  background-color: #db1de7;
}

::v-deep .tabs-item:hover {
  background-color: #db1de7;
  color: #FFF;
}

::v-deep .bar {
  display: none;
}

.tabs-icon {
  width: 14px;
  margin-right: 10px;
  opacity: .4;
}

::v-deep .tabs-item-ac .tabs-icon,
::v-deep .tabs-item:hover .tabs-icon {
  opacity: 1;
}

.redemption-code {
  font-size: 16px !important;
  width: 100%;
  /* padding: 36px 42px; */
  background: #29374B;
  border-radius: 14px;
  margin-top: 30px;
  margin-bottom: 30px;
  color: #fff;
  font-size: 20px;
  padding: 15px 24px;
}


.redemption-opt {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  margin-top: 15px;
}

.redemption-input {
  width: 100%;
  background: #34258A;
  border: 1px solid #AFB5B3;
  border-radius: 11px;
  outline: none;
  margin-bottom: 20px;
  padding: 8px 14px;

}

.redemption-input::placeholder {
  color: #4F5B6D;
}


@media (max-width: 1024px) {
  .redemption-input {
    width: 100%;
    margin-right: 0;
  }
}

.redemption-btn {
  margin: 0 auto;
  background: #FF7D1E;
  border-radius: 10px;
  padding: 6px 36px;
  display: flex;
}


@keyframes dots {
  0% {
    transform: translateY(0)
  }

  50% {
    transform: translateY(3px)
  }

  100% {
    transform: translateY(0)
  }
}

.animate--loading {
  display: flex;
  list-style: none;
  margin-left: 6px;
}

.animate--loading > li {
  animation-name: dots;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-duration: 300ms;

}

.animate--loading > li:nth-child(1) {
  animation-delay: 100ms;
}

.animate--loading > li:nth-child(2) {
  animation-delay: 200ms;
}

.animate--loading > li:nth-child(3) {
  animation-delay: 300ms;
}

.underLine{
  width: 100%;
  height: 1px;
  opacity: 0;
}
</style>
