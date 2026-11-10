<template>
  <div class="tip-wapper" v-if="isShow">
    <div class="container" id="tip-wapper">
      <span v-html="data.content" class="content"></span>
      <el-button
        size="mini"
        class="button_blue button"
        @click="toPage(data.jump_url)"
        >{{ $t("了解更多") }}</el-button
      >
    </div>
    <i
      class="el-icon-close el-icon"
      @click="hide"
      v-if="$store.state.isLoginStatu"
    ></i>
  </div>
</template>

<script>
import { gsap } from "gsap";
import { notice_list_api } from "@/api";
export default {
  data() {
    return {
      timeId: null,
      hideTimeId: null,
      isShow: false,
      data: null,
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    clearTimeout(this.timeId);
    clearTimeout(this.hideTimeId);
  },
  methods: {
    toPage(url) {
      this.hide();
      this.$router.push(url);
    },
    init() {
      this.timeId = setTimeout(async () => {
        await this.getData();
        if (this.data) {
          this.show();
        }
      }, 1000);
    },
    async getData() {
      const res = await notice_list_api({
        page: 1,
        limit: 1,
        type: 3,
        show_loca: 1,
      });
      if (res.data.code == 1) {
        if (res.data.data.length) {
          this.data = res.data.data[0];
        }
      }
    },
    async show() {
      this.isShow = true;
      this.$nextTick(() => {
        // 获取框的高度
        const height = document.querySelector(".tip-wapper").offsetHeight;
        gsap.to(".header", {
          transform: `translateY(${height}px)`,
          duration: 0.5,
        });
        gsap.to(".tip-wapper", {
          transform: `translateY(0)`,
          duration: 0.5,
        });
        gsap.to("#home-wapper", {
          paddingTop: `${height}px`,
          duration: 0.5,
        });
        gsap.to(".left-menu-container__outer", {
          paddingTop: `${height}px`,
          duration: 0.5,
        });
      });
    },
    hide() {
      gsap.to(".header", {
        transform: "translateY(0)",
        duration: 0.5,
        onComplete: () => {
          this.isShow = false;
        },
      });
      gsap.to(".tip-wapper", {
        transform: "translateY(-100%)",
        duration: 0.5,
      });
      gsap.to("#home-wapper", {
        paddingTop: `0`,
        duration: 0.5,
      });
      gsap.to(".left-menu-container__outer", {
        paddingTop: `0`,
        duration: 0.5,
      });
    },
  },
};
</script>

<style scoped>
.tip-wapper {
  background: linear-gradient(0deg, #ca7846, #ed1d49);
  height: var(--height);
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  transform: translateY(-100%);
  z-index: 2000;
  padding: 10px 0;
}
.container {
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: space-between;
}
.button {
  --color: linear-gradient(176deg, #d70a84, #51127f);
  --active-color: linear-gradient(176deg, #d70a84, #51127f);
  --hover-color: linear-gradient(176deg, #d70a84, #51127f);
  border-radius: 100vh;
}
.el-icon-close {
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 24px;
}
.content {
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
@media screen and (max-width: 1200px) {
  .button {
    margin: 0 40px 0 50px;
  }
  .el-icon-close {
    right: 16px;
  }
}
</style>
