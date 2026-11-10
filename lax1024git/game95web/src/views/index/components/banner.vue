<template>
  <div v-if="stakingthumbs.length > 0">
    <div class="banners dividends__banners" >
      <swiper
        class="swiper gallery-thumbs"
        :options="swiperOptionThumbs"
        ref="swiperThumbs"
      >
        <swiper-slide v-for="(item,index) in stakingthumbs" :key="index">
          <!-- <router-link to="/news-detail" class="picture__link-box"> -->
          <div @click="toPage(item.url,item.jump_url,item)" class="picture__link-box">
            <img :src="item.img"/>
          </div>
          <!-- </router-link> -->
        </swiper-slide>
      </swiper>
      <div class="splide__arrows" v-if="stakingthumbs.length>0">
        <button
          class="splide__arrow splide__arrow--prev"
          aria-controls="splide02-track"
          aria-label="Previous slide"
        >
          <button
            type="button"
            class="button button_sm button_grey1 button_center button_only-icon"
          >
            <svgIcon icon="icon-arrow-left-small" class widthName="18" heightName="18"></svgIcon>
          </button>
        </button>
        <button
          class="splide__arrow splide__arrow--next"
          aria-controls="splide02-track"
          aria-label="Next slide"
        >
          <button
            type="button"
            class="button button_sm button_grey1 button_center button_only-icon"
          >
            <svgIcon icon="icon-arrow-right-small" class widthName="18" heightName="18"></svgIcon>
          </button>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { banner_index_api } from "@/api/index";
import svgIcon from "@/components/svg.vue";
export default {
  components: {
    svgIcon
  },
  data() {
    return {
      banner: {},
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
    };
  },
  computed:{
    stakingthumbs(){
      const key = this._isMobile()?"mobile":"pc"
      return [
        ...(this.banner?.[key] || []),
        ...(this.$store.state.system.systemNew?.banner[key] || [])
      ]
      .filter(item=>item.lang == this.$helper.getLang())
      .sort((a,b)=>b.sort-a.sort);
    }
  },
  methods: {
    // 获取轮播图
    async getBanner() {
      const res = await banner_index_api();
      console.error({res})
      if (res && res.data.code == 1) {
        this.banner = res.data.data
        if(this.banner.pc.length){
          this.banner.pc.push({img:require('@/assets/images/index.png'),jump_url:'',lang:'CN',mobile_img:null,show_position:1,sort:0,type:0,url:""})
        }
        console.log(this.banner,'这是轮播的数据')
      }

    },
    // 页面跳转
    toPage(url,jump_url){
      if(url){
        this.platUrl(url)
      }else{
        this.$router.push({ path: jump_url })
      }
    },
  },
  mounted() {
    this.getBanner();
  },
};
</script>

<style scoped>

.dividends__banners {
  margin-bottom: 30px;
}
@media (max-width:768px) {
  .dividends__banners {
    margin-bottom: var(--padding);
  }
}
.dividends__banners .picture {
  border-radius: 14px;
  overflow: hidden;
  position: relative;
  height: 0;
  padding-top: 62.5%;
  background-color: #202a39;
  -webkit-transform: translateZ(0);
}

.dividends__banners .picture.double {
  padding-top: 30.5232%;
}

.dividends__banners .picture__inner {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.dividends__banners .picture__inner:hover img {
  transform: scale(1.025);
}
.dividends__banners img {
  border-radius: 8px;
}
@media (max-width: 640px) {
  .dividends__banners img,
  .dividends__banners .el-image {
    width: 100%;
  }
}
.picture__link-box {
  display: block;
  border-radius: 14px;
  overflow: hidden;
  max-height: 210px;
  position: relative;
  padding-bottom: 62.5%;

}

@media (max-width: 640px) {
  .picture__link-box {
    padding-bottom: 46.5%;
  }
}

.picture__link-box /deep/ img {
  -o-object-fit: cover;
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
  border-radius: 14px;
  position: absolute;

}
.picture__link-box:hover img {
  transform: scale(1.025);
}

.dividends__banners picture {
  position: relative;
  z-index: 1;
}

.dividends__banners img {
  -o-object-fit: cover;
  object-fit: cover;
  display: block;
  width: 100%;
  height: 100%;
  transition: transform 0.3s;
}
.dividends__banners .button_sm {
  width: 26px;
  height: 26px;
}
.dividends__banners .button_sm svg {
  width: 100%;
  height: 100%;
  display: block;
  transition: fill 0.1s ease-in-out;
}
.banners {
  position: relative;
}

.arrow {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  padding: 0;
  cursor: pointer;
}

.arrow__prev {
  left: 0;
}

.arrow__next {
  right: 0;
}
</style>
