<template>
  <div class="app"
      :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''} ${j?' pl94':''}` ">
    <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick"/>
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <router-view></router-view>
        </div>
      </div>
      <Foot/>
    </div>
    <message></message>
    <template v-if="j">
      <asidebar @menuClick="menuClick" :flagShow="openedleft"></asidebar>
    </template>
    <template v-else>
      <asidebar v-if="i" @menuClick="menuClick" :flagShow="openedleft"></asidebar>
    </template>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>
    <!-- 不在tabbar上的页面，当点击菜单按钮时，弹出菜单目录，再点击菜单目录以外其他地方时，菜单目录关闭 -->
    <!-- <div
      class="app-overlay"
      v-if="isMobileFlag"
      :class="openedleft?'visible':''"
      @click="menuClick"
    ></div> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import message from "@/components/message.vue";

const size = window.innerWidth
let width_size = true
let app = true
if (size < 768) {
  width_size = false
  app = false
}
export default {
  name: "Home",
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    message
  },
  data() {
    return {
      i: width_size,
      j: app,
    };
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < 768
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()
        if (isMobile){
          this.i = false;
          this.j = false;
        }else {
          this.i = true;
          this.j = true;
        }

      }
    },
    menuClick() {
      this.i = !this.i
      this.openedleft = !this.openedleft;
    },
    contestsClick() {
      this.openedcontests = !this.openedcontests;
    },
    contestsShow() {
      this.openedcontests = true;
    },
  },
  mounted() {
  },
  created() {
    this.isPhone();
  }
};
</script>
<style scoped>
.pl94{
  padding-left: 94px;
}
</style>
