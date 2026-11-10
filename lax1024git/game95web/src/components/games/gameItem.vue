<template>
  <div class="ganeitem">
    <div class="game-preview" @click="getGameGetUrl(item.game_status, item.id, item)">
      <div class="game-preview__inner">
        <div class="game-preview__shield game-preview__shield_top" v-if="item.g_is_optimum == 1 || type == 'top'"></div>
        <div class="game-preview__shield game-preview__shield_hot" v-if="item.g_hot == 1 || type == 'hot'"></div>
        <div class="game-preview__shield game-preview__shield_new" v-if="item.g_is_new == 1 || type == 'new'"></div>
        <div class="game-preview__image">
          <cyb-img :src="item.gi_headimg" :lazy="lazy" style="width:100%;height: 100%;" fit="cover"></cyb-img>
        </div>
      </div>
      <div class="game-preview__hover" v-if="!isCtr">
        <div :class="['collect', isAn ? 'collect-an' : '']" @click.stop="collect(item)">
          <cyb-img :class="['c-img', item.is_collect == 0 ? '' : 'hide']" :lazy="false"
            :src="require('@/assets/images/collect.png')"></cyb-img>
          <cyb-img :class="['c-img-ac', , item.is_collect == 1 ? 'show' : '']" :lazy="false"
            :src="require('@/assets/images/collect-ac.png')"></cyb-img>
        </div>
        <!-- <span class="game-preview__name">{{ $t(item.game_name) }}</span> -->
        <div class="game-preview__btn-play">
          <svgIcon icon="icon-play" class="play"></svgIcon>
        </div>
        <div class="game-preview__provider-wrap">
          <!-- <span class="game-preview__provider">{{ $t("Cyber Raccoon") }}</span> -->
        </div>
      </div>
      <transition name="el-fade-in-linear">
        <div class="game-preview__ctr" v-if="isCtr" @click.stop="collect(item, true)">
          <i class="el-icon-delete el-icon"></i>
        </div>
      </transition>

    </div>
    <p class="manufacturer">{{ item.tc_name }}</p>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";
import { Loading } from "element-ui";
import { game_login_game_api, collect_collect } from "@/api/cybSports";
import { EventBus } from "@/common/eventBus.js";
export default {
  props: {
    item: {
      default: () => ({}),
    },
    lazy: {
      default: true,
    },
    type: {
      default: ""
    },
    isCtr: {
      default: false
    }
  },
  components: { svgIcon },
  data() {
    return {
      isAn: false,
    };
  },
  methods: {
    // 获取游戏路径
    async getGameGetUrl(game_status, gid, item) {
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(1);
        return;
      }
      if (
        item &&
        item.g_is_self == 1 &&
        item.g_exfield != "" &&
        item.g_exfield != null
      ) {
        this.goUrl(item.g_exfield);
        return;
      }
      if (item && item.g_tcid == 15) {
        this.goUrl("/sport-betting");
        return;
      }
      if (game_status == 1) {
        this.isPhone();
        if (window.innerWidth<768){
          EventBus.$emit("gameInfo",item)
        }else{
          this.$router.push({ path: '/game-detail', query: { id: item.id } })
        }
      } else {
        this.$notify({
          customClass: "noticeClass",
          dangerouslyUseHTMLString: true,
          duration: "3000",
          message:
            '<div class="notice-bar">' +
            '<div class="bar-ico">⚔️</div>' +
            '<div class="flex_bd">' +
            `<div class="notice-tit">${this.$t("通知")}</div>` +
            `<div class="notice-desc">${this.$t("暂未开放")}</div>` +
            "</div>" +
            "</div>",
        });
      }
    },
    /**
     * 游戏收藏
     * @param {Object} item 游戏项的数据 
    */
    async collect(item, isLoading) {
      // 判断登录
      if (!this.$store.state.isLoginStatu) {
        this.showLoginReg(1);
        return;
      }

      // 定义切换收藏状态的函数
      const change = () => {
        item.is_collect = item.is_collect == 1 ? 0 : 1;
        this.isAn = item.is_collect == 1;
        this.$forceUpdate();
      };
      change();

      // 发送请求,处理失败之后的功能,失败后提示收藏失败并更改图标
      try {
        let loading;
        // 显示loading
        if (isLoading) {
          loading = Loading.service({
            fullscreen: true,
            background: "rgba(0,0,0,.6)",
          });
        }

        const res = await collect_collect({
          type: 0,
          other_id: item.id,
        });

        // 隐藏loading
        if (isLoading) loading.close()

        if (res.data.code == 1) {
          if (item.is_collect == 0) {
            this.$emit("cancelFavorite")
          }
        } else if (res.data.code != 1) {
          change();
          this.$message.error(res.data.msg);
        }
      } catch (error) {
        change();
        this.$message.error(this.$t("收藏失败"));
      }
    },
  },
};
</script>
<style lass="less" scoped>
.ganeitem{
  background: #191A1E;
  border-radius: 14px;
  .manufacturer{
    padding: 14px 0px 16px;
  }
}
</style>
<style scoped src="./gameItem.css"></style>
