<template>
  <el-dialog :modal-append-to-body="false" :visible.sync="isShow"
    v-if="list.length && $route.query.modal != 'LoginRegistration' && $route.query.pdd != 'show'" :show-close="false"
    :close-on-click-modal="true" custom-class="custom-dialog my-dialog">
    <!-- <div class="close">
      <i class="el-icon el-icon-error" @click="hide()"></i>
    </div> -->
    <div class=" relative">
      <i class=" absolute w-4 h-4 right-6 top-4 z-1200 el-icon el-icon-circle-close text-white" @click="hide()"></i>
      <swiper class="turntable-thumbs" :options="turntableThumbs" ref="swiperThumbs">

        <swiper-slide v-for="(item, index) in list" :key="index">
          <div class="dialog-wapper">
            <div class="html" v-html="list[index].content"></div>
            <div class="bottom-btn-wapper">
              <el-button class="button_red" @click="toPage(item.jump_url)">{{ $t("了解") }}</el-button>
              <div class="tip-txt" @click="hide(true)">{{ $t('今天不要提醒我') }}</div>
            </div>
            <div class="slider-wapper">
              <div :class="['slider-item', cur == index ? 'item-ac' : '']" v-for="item, cur in list" :key="cur"></div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div v-if="list.length != 0" class="splide__arrow--next-notice">
        <div>
          <img :src="require('@/assets/images/kno_next.png')">
        </div>

      </div>
      <div v-if="list.length != 0" class="splide__arrow--prev-notice">
        <img :src="require('@/assets/images/kno_next.png')">
      </div>
    </div>



  </el-dialog>
</template>

<script>
import { notice_list_api } from "@/api";
export default {
  data() {
    return {
      isShow: false,
      list: [],
      cur: 0,
      checked: false,
      turntableThumbs: {
        autoplay: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".splide__arrow--next-notice",
          prevEl: ".splide__arrow--prev-notice"
        },
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
      },
    };
  },
  mounted() {
    this.show();
  },
  watch: {
    "$store.state.isLoginStatu": function (v) {
      if (v) this.show()
    },
  },
  methods: {
    toPage(url) {
      this.hide()
      if (url.startsWith('http')) {
        location.href = url
      } else {
        this.$router.push(url)
      }
    },
    hide(isDay = false) {
      const key = "noticeHideTime";
      if (isDay) {
        const date = new Date();
        const time = `${date.getFullYear()}/${date.getMonth() +
          1}/${date.getDate()}`;
        localStorage.setItem(key, time);
      } else {
        localStorage.setItem(key, null);
      }
      this.isShow = false;
    },
    async show() {
      const key = "noticeHideTime";
      const date = new Date();
      const time = `${date.getFullYear()}/${date.getMonth() +
        1}/${date.getDate()}`;
      // 判断时间相等不显示，不相等进行显示
      if (time == localStorage.getItem(key)) return;
      const oldList = JSON.stringify(this.list)
      await this.getData();
      console.log(JSON.stringify(this.list) != oldList && this.list.length)

      // 监听数据有变化就显示
      if (JSON.stringify(this.list) != oldList && this.list.length) {
        this.isShow = true;
      }
    },
    async getData() {
      const res = await notice_list_api({
        page: 1,
        limit: 100,
        type: 2,
        show_loca: 1,
      });
      if (res.data.code == 1) {
        this.list = res.data.data;
      }
    },
    next() {
      if (this.list.length - 1 == this.cur) return;
      this.cur++;
    },
    pre() {
      if (this.list.length == 0) return;
      this.cur--;
    },
  },
};
</script>

<style scoped>
.slider-wapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4px;
  margin-top: 10px;
}

.slider-item {
  height: 100%;
  width: 10px;
  background-color: #1A283A;
  border-radius: 100vh;
  margin-right: 6px;
}

.item-ac {
  width: 20px;
  background-color: #253852;

}

.slider-item:last-child {
  margin-right: 0;
}

.dialog-wapper {
  color: #fff;
  background-color: #101823;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
}

.title-txt {
  color: #fff;
  font-size: 14px;
}

::v-deep .el-checkbox__inner {
  background-color: #a1a1a1 !important;
  border-color: #a1a1a1 !important;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #0075ff !important;
  border-color: #0075ff !important;
}

::v-deep .el-dialog__header {
  display: none;
}

::v-deep .el-dialog__body {
  background: transparent;
  padding: 0;
}

::v-deep .el-dialog {
  background-color: transparent;
  box-shadow: none;
  overflow: visible;
}

@media (max-width: 768px) {
  ::v-deep .el-dialog {
    padding: 20px;
  }
}

.title-wapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btns-wapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0;
}

.el-icon-arrow-right {
  margin-left: 6px;
}

.el-icon-arrow-left {
  margin-right: 6px;
}

.bottom-btn-wapper {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  flex-direction: column;
  align-items: center;
}

.hide {
  visibility: hidden;
}

.button_red {
  width: 100%;
  max-width: 366px;
  color: #FFFFFF;
  background-color: #ac0000;
  font-weight: bold;
  border-radius: 100vh;

  &:hover {
    color: #fff;
    background-color: #d87070;
  }
}

@media (max-width:540px) {
  .button_red {
    max-width: 90%;
  }
}

.close {
  margin-left: auto;
  display: block;
  font-size: 28px;
  text-align: right;
  transform: translateX(30px);
  color: #fff;
}

i {
  cursor: pointer;
}

@media (max-width: 768px) {
  .close {
    font-size: 20px;
    transform: translateX(20px);
  }
}

.tip-txt {
  color: #93acd3;
  font-size: 12px;
  margin-top: 12px;
  cursor: pointer;
}

.html {
  height: 60vh;
  overflow: auto;
}

@media (max-width:768px) {
  .html {
    height: 50vh;
    overflow: auto;
  }
}

.splide__arrow--next-notice,
.splide__arrow--prev-notice {
  width: var(--size);
  height: var(--size);
  position: absolute;
  top: 50%;
  transform: translateY(-60%);
  z-index: 9999;
  cursor: pointer;
  --bj: 10px;
  --size: 40px;
}

@media (max-width:768px) {

  .splide__arrow--next-notice,
  .splide__arrow--prev-notice {
    --bj: 25px;
    --size: 30px;
  }
}

.splide__arrow--next-notice img,
.splide__arrow--prev-notice img {
  width: 100%;
  height: 100%;
}

.splide__arrow--prev-notice,
.splide__arrow--next-notice {
  opacity: .8;
}

.splide__arrow--next-notice {
  right: var(--bj);
}


.splide__arrow--prev-notice {
  left: var(--bj);
  transform: translateY(-60%) rotate(180deg);
}


.swiper-button-disabled {
  opacity: 0;
}
[class*=" el-icon-"]{
  font-size: 26px;
}
</style>
