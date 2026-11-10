<template>
  <div>
    <!-- pc端 -->
    <div class="features" v-if="this.$store.state.windowWidth>640">
      <div class="features__inner">
        <!-- 活动者反馈 -->
        <button class="features__cell features__cell_small">
          <img width="100" v-lazy="bg1" v-if="this.$t('features_pic1') == 'features_pic1'"/>
          <span class="features__label" v-if="this.$t('features_pic1') == 'features_pic1'">
            {{ $t("活跃者奖励") }}
            <p class="features__desc">{{ $t("home-nologin-desc1") }}</p>
          </span>
          <div class="img-full" v-else>
            <img v-lazy="$t('features_pic1')" alt="" >
          </div>
        </button>

        <!-- 现金回馈 -->
        <a href="/#/cashback" class="features__cell features__cell_small">
          <img width="94" height="98" v-lazy="bg2" v-if="this.$t('features_pic2') == 'features_pic2'"/>
          <span class="features__label" v-if="this.$t('features_pic2') == 'features_pic2'">
            {{ $t("现金返利最高1.3%") }}
            <p class="features__desc">{{ $t("home-nologin-desc2") }}</p>
          </span>

          <div class="img-full" v-else>
            <img v-lazy="$t('features_pic2')" alt="" >
          </div>
        </a>

        <!-- 新使用者奖励 -->
        <button
          class="features__cell features__cell_small"
          style="display:none;"
        ></button>
        <button class="features__cell spin">
          <div class="features__preview" style="width:100%; text-align:left;" v-if="this.$t('features_pic3') == 'features_pic3'">
            <span class="features__label">
              {{ $t("home-新用户首存奖励") }}
              <p class="features__desc">{{ $t("home-nologin-desc3") }}</p>
            </span>
          </div>

          <div class="img-full" v-else>
            <img v-lazy="$t('features_pic3')" alt="" >
          </div>
          <div class="bonus-preview">
            <div class="bonus-preview__blur-bg" v-if="this.$t('features_pic3') == 'features_pic3'"></div>
            <img
              v-lazy="bg3"
              class="bonus-preview__box-img"
              v-if="this.$t('features_pic3') == 'features_pic3'"
            />
            <img
            v-if="this.$t('features_pic3') == 'features_pic3'"
              src="@/assets/images/confetti.1cc58a5.png"
              class="bonus-preview__confetti-img"
            />
            <img
            v-if="this.$t('features_pic3') == 'features_pic3'"
              src="@/assets/images/confetti.1cc58a5.png"
              class="bonus-preview__confetti-img bonus-preview__confetti-img--help1"
            />
            <img
            v-if="this.$t('features_pic3') == 'features_pic3'"
              src="@/assets/images/confetti.1cc58a5.png"
              class="bonus-preview__confetti-img bonus-preview__confetti-img--help2"
            />
          </div>
        </button>
        <!-- 每日首存 -->
        <button class="features__cell features__cell_small">
          <img width="90" v-lazy="bg4" v-if="this.$t('features_pic4') == 'features_pic4'"/>
          <span class="features__label" v-if="this.$t('features_pic4') == 'features_pic4'">
            {{ $t("每日首存") }}
            <p class="features__desc">{{ $t("home-nologin-desc4") }}</p>
          </span>

          <div class="img-full" v-else>
            <img v-lazy="$t('features_pic4')" alt="" >
          </div>
        </button>
        <!-- vip等级奖励 -->
        <a class="features__cell" style="display:none;"></a>
        <a href="/#/rank-system" class="features__cell">
          <img width="90" height="98" v-lazy="bg5" alt v-if="this.$t('features_pic5') == 'features_pic5'"/>
          <span class="features__label" v-if="this.$t('features_pic5') == 'features_pic5'">
            {{ $t("home-等级成长奖励") }}
            <p class="features__desc">{{ $t("home-nologin-desc5") }}</p>
          </span>

          <div class="img-full" v-else>
            <img v-lazy="$t('features_pic5')" alt="" >
          </div>
        </a>
      </div>
    </div>

    <!-- 移动端 -->
    <div class="features" v-else>
      <div class="">
        <!-- 新使用者奖励 -->
        <button
          class="features__cell features__cell_small"
          style="display:none;"
        ></button>
        <button class="features__cell new-user spin">
          <div class="features__preview" style="width:100%; text-align:left;" v-if="this.$t('features_pic3') == 'features_pic3'">
            <span class="features__label">
              {{ $t("home-新用户首存奖励") }}
              <p class="features__desc">{{ $t("home-nologin-desc3") }}</p>
            </span>
          </div>
          <div class="img-full" v-else>
            <img v-lazy="$t('features_pic3')" alt="" >
          </div>
          <div class="bonus-preview">
            <div class="bonus-preview__blur-bg" v-if="this.$t('features_pic3') == 'features_pic3'"></div>
            <img
              src="@/assets/images/box.2d093c0.png"
              class="bonus-preview__box-img"
              v-if="this.$t('features_pic3') == 'features_pic3'"
            />
            <img
              src="@/assets/images/confetti.1cc58a5.png"
              class="bonus-preview__confetti-img"
              v-if="this.$t('features_pic3') == 'features_pic3'"
            />
            <img
              src="@/assets/images/confetti.1cc58a5.png"
              class="bonus-preview__confetti-img bonus-preview__confetti-img--help1"
              v-if="this.$t('features_pic3') == 'features_pic3'"
            />
            <img
              src="@/assets/images/confetti.1cc58a5.png"
              class="bonus-preview__confetti-img bonus-preview__confetti-img--help2"
              v-if="this.$t('features_pic3') == 'features_pic3'"
            />
          </div>
        </button>
      </div>
      <swiper
        class="swiper gallery-thumbs"
        :options="swiperOptionThumbs"
        ref="swiperThumbs"
      >
        <swiper-slide>
          <!-- 现金回馈 -->
          <a href="/#/cashback" class="features__cell features__cell_small">
            <img width="94" height="98" src="@/assets/images/bg-2@1x.png" v-if="this.$t('features_pic2') == 'features_pic2'"/>
            <span class="features__label" v-if="this.$t('features_pic2') == 'features_pic2'">
              {{ $t("现金返利最高1.3%") }}
              <p class="features__desc">{{ $t("home-nologin-desc2") }}</p>
            </span>

            <div class="img-full" v-else>
              <img v-lazy="$t('features_pic2')" alt="" >
            </div>
          </a>
        </swiper-slide>
        <swiper-slide>
          <!-- 活动者反馈 -->
          <button class="features__cell features__cell_small">
            <img width="100" src="@/assets/images/bg-1@1x.png" v-if="this.$t('features_pic1') == 'features_pic1'"/>
            <span class="features__label" v-if="this.$t('features_pic1') == 'features_pic1'">
              {{ $t("活跃者奖励") }}
              <p class="features__desc">{{ $t("home-nologin-desc1") }}</p>
            </span>
            <div class="img-full" v-else>
              <img v-lazy="$t('features_pic1')" alt="" >
            </div>
          </button>
        </swiper-slide>
        <swiper-slide>
          <!-- 每日首存 -->
          <button class="features__cell features__cell_small">
            <img width="90" src="@/assets/images/bg-4@1x.png" v-if="this.$t('features_pic4') == 'features_pic4'"/>
            <span class="features__label" v-if="this.$t('features_pic4') == 'features_pic4'">
              {{ $t("每日首存") }}
              <p class="features__desc">{{ $t("home-nologin-desc4") }}</p>
            </span>

            <div class="img-full" v-else>
              <img v-lazy="$t('features_pic4')" alt="" >
            </div>
          </button>
        </swiper-slide>
        <swiper-slide>
          <a href="/#/rank-system" class="features__cell">
            <img width="90" height="98" src="@/assets/images/bg-6@1x.png" alt v-if="this.$t('features_pic5') == 'features_pic5'"/>
            <span class="features__label" v-if="this.$t('features_pic5') == 'features_pic5'">
              {{ $t("home-等级成长奖励") }}
              <p class="features__desc">{{ $t("home-nologin-desc5") }}</p>
            </span>
  
            <div class="img-full" v-else>
              <img v-lazy="$t('features_pic5')" alt="" >
            </div>
          </a>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptionThumbs: {
        autoplay: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".splide__arrow--next",
          prevEl: ".splide__arrow--prev",
        },
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 16,
        breakpoints: {
          640: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          1200: {
            slidesPerView: 3,
          },
        },
      },
      bg1:require('@/assets/images/bg-1@1x.png'),
      bg2:require('@/assets/images/bg-2@1x.png'),
      bg3:require('@/assets/images/box.2d093c0.png'),
      bg4:require('@/assets/images/bg-4@1x.png'),
      bg5:require('@/assets/images/bg-6@1x.png')
    };
  },
};
</script>

<style scoped>
.new-user {
  min-height: 208px !important;
  margin-bottom: 10px;
}
.bonus-preview__bonus1-img,
.bonus-preview__box-img {
  position: absolute;
  transform: translate(0%) scale(1);
}

.bonus-preview__bonus1-img {
  width: 80px;
  height: 67px;
  bottom: 28%;
  left: 38%;
  z-index: 2;
  -webkit-animation: pulse-data-v-40468d4e 3s linear 0.8s infinite;
  animation: pulse-data-v-40468d4e 3s linear 0.8s infinite;
}
.bonus-preview__box-img {
  width: 128px;
  height: 119px;
  bottom: 10px;
  left: 50%;
  z-index: 3;
}
.img-full{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.img-full img{
  position: static;
  transform: translateY(0);
  width: 100%;
  object-fit: cover;
}
</style>
