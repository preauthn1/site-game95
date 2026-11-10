<template>
  <div class="app bg-primary " 
       :class="`${openedleft ? 'opened-left-panel' : ''}${openedcontests ? ' opened-contests-panel' : ''}${j?' pl94':''}`">
    <Head :flagShow="openedleft" :isMobile="isMobileFlag" @menuClick="menuClick"/>
    <keep-alive :include="keepPages">
      <router-view></router-view>
    </keep-alive>
    <template v-if="j">
      <asidebar @menuClick="menuClick" :flagShow="openedleft"></asidebar>
    </template>
    <template v-else>
      <asidebar v-if="i" @menuClick="menuClick" :flagShow="openedleft"></asidebar>
    </template>
    <tabbar :openaside="openaside" @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import asidebar from "@/components/aside.vue";
import tabbar from "@/components/tabbar.vue";
const { body } = document
const size = window.innerWidth
let width_size = true
let app = true
if (size < 768) {
  width_size = false
  app = false
}
export default {
  name: 'AuthLayout',
  components: {
    Head,
    asidebar,
    tabbar,
  },
  data() {
    return {
      i: width_size,
      j: app,
      openaside: false,
    }
  },
  computed: {
    keepPages() {
      return this.$store.getters.getKeepPages.split(',');
    }
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
    contestsClick() {
      this.openedcontests = !this.openedcontests;
    },
    contestsShow() {
      this.openedcontests = true;
    },
    menuClick() {
      this.i = !this.i
      this.openaside = !this.openaside
      this.openedleft = !this.openedleft;
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
}
</script>
<style scoped>
.pl94{
  padding-left: 94px;
}
</style>