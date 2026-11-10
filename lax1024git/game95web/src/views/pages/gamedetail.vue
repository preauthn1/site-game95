<template>
  <div
    class="app game-detail-app"
    :class="
      `${openedleft ? 'opened-left-panel' : ''}${
        openedcontests ? ' opened-contests-panel' : ''
      }`
    "
  >
    <Head
      :flagShow="openedleft"
      :isMobile="isMobileFlag"
      @menuClick="menuClick"
    />
    <div class="wrapper">
      <div class="wrapper__inner">
        <div class="container">
          <div class="page-game joined">
            <div class="game-container">
              <el-skeleton :rows="1" :count="1" animated :throttle="500" v-if="skeletonShow">
                <template slot="template">
                  <div class="game-panel" id="gamePanel">
                    <div class="game-pc-card">
                      <div class="game-pc-photo">
                        <el-skeleton-item variant="image" style="width:100%;height:210px;border-radius:10px;" />
                      </div>
                      <div class="game-pc-grid">
                        <div class="game-title">
                          <el-skeleton-item variant="h1"  />
                        </div>
                        <div class="game-foot">
                          <el-skeleton-item variant="h1"  />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </el-skeleton>
              <div class="game-panel" v-else id="gamePanel">
                <div
                  :class="['collect', isAn ? 'collect-an' : '']"
                  @click.stop="collect(gameInfos)"
                >
                  <cyb-img
                    :class="['c-img', gameInfos.is_collect == 0 ? '' : 'hide']"
                    :lazy="false"
                    :src="require('@/assets/images/collect.png')"
                  ></cyb-img>
                  <cyb-img
                    :class="['c-img-ac', , gameInfos.is_collect == 1 ? 'show' : '']"
                    :lazy="false"
                    :src="require('@/assets/images/collect-ac.png')"
                  ></cyb-img>
                </div>
                <div class="game-close" @click="gameBack">
                  <span class="iconfont icon-arrowback" ></span>
                </div>
                <div class="game__container" v-if="gameVisible">
                  <div class="game-close" id="moveDiv" v-drag @click="gameClose" 
                    @mousedown="down()"
                    @touchstart="down()"
                    @mousemove.prevent.stop="move()"
                    @touchmove.prevent.stop="move()"
                    @mouseup="end()"
                    @touchend="end()"
                  >
                    <span
                      class="iconfont icon-menu-close"
                    ></span>
                  </div>
                  <iframe
                    v-if="isLink"
                    class="js-game-iframe"
                    :src="gameUrl"
                    frameborder="0"
                  ></iframe>
                  <iframe
                    v-else
                    class="js-game-iframe"
                    :srcdoc="gameUrl"
                    frameborder="0"
                  ></iframe>
                </div>
                <div class="game-pc-card" v-else>
                  <div class="game-pc-photo">
                    <img :src="gameInfos.g_icon" alt="" />
                  </div>
                  <div class="game-pc-grid">
                    <div class="game-title">{{ $t(gameInfos.gi_name) }}</div>
                    <div class="game-foot">
                      <el-button v-loading.fullscreen.lock="loadGame"
                        @click="showGame(gameInfos.url)"
                        class="button_red button_fullwidth"
                        >{{ $t("Play Game") }}</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
              <!-- 记录 -->
              <betRecord></betRecord>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
    <el-dialog
      fullscreen
      class="game-dialog"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :visible.sync="mGameVisible"
      @closed="gameClose"
      custom-class="full-dialog"
    >
      <div class="game__container">
        <div
          class="game-close"
          @click="gameClose"
          id="moveDiv"
          @mousedown="down()"
          @touchstart="down()"
          @mousemove.prevent.stop="move()"
          @touchmove.prevent.stop="move()"
          @mouseup="end()"
          @touchend="end()"
        >
          <span class="iconfont icon-menu-close"></span>
        </div>
        <iframe v-if="isLink" class="js-game-iframe" :src="gameUrl" frameborder="0"></iframe>
        <iframe v-else class="js-game-iframe" :srcdoc="gameUrl" frameborder="0"></iframe>
      </div>
    </el-dialog>
    <asidebar :flagShow="openedleft" @menuClick="menuClick"></asidebar>
    <tabbar @menuClick="menuClick" @contestsShow="contestsShow"></tabbar>
    <div
      class="app-overlay"
      v-if="isMobileFlag"
      :class="openedleft ? 'visible' : ''"
      @click="menuClick"
    ></div>
  </div>
</template>

<script>
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";
import asidebar from "@/components/aside.vue";
import svgIcon from "@/components/svg.vue";
import tabbar from "@/components/tabbar.vue";
import betRecord from "@/components/betRecord.vue";
import { game_login_game_api,collect_collect ,game_detail_api} from "@/api/cybSports";
import Watch from '@/utils/Watch.js'
// 监听操作
const watch = new Watch("gameDetail","game_time")

export default {
  name: "Home",
  components: {
    Head,
    Foot,
    asidebar,
    svgIcon,
    tabbar,
    betRecord,
  },
  data() {
    return {
      isAn: false,
      tabCur: 0,
      gameInfos: "",
      isLink: true,
      gameUrl: "",
      gameVisible: true,
      activeName: "first",
      mGameVisible: false,
      flags: false,
      position: { x: 0, y: 0 },
      nx: "",
      ny: "",
      dx: "",
      dy: "",
      xPum: "",
      yPum: "",
      gameDetailInfo:[],
      skeletonShow:true,
      loadGame: false
    };
  },
  directives: {
    drag(el) {
      const oDiv = el;
      // 拖拽时间标识
      let firstTime = "";
      let lastTime = "";
      document.onselectstart = function() {
        return false;
      };
      oDiv.onmousedown = function(e) {
        // 为了区分点击还是拖拽，使用时间差来判断，200毫秒内为点击，200毫秒外为拖拽，初始化为点击
        document.getElementById("gamePanel").setAttribute("drag-flag", false);
        firstTime = new Date().getTime();

        // oDiv.offsetParent.offsetWidth - oDiv.offsetLeft - oDiv.offsetWidth
        // 表示元素距离父元素右边距的距离
        const disX =
          oDiv.offsetParent.offsetWidth -
          oDiv.offsetLeft -
          oDiv.offsetWidth +
          e.clientX;
        // oDiv.offsetTop 表示距离父元素顶边距的距离
        const disY = oDiv.offsetTop - e.clientY;
        // 设置最大右边距
        const maxRight = oDiv.offsetParent.offsetWidth - oDiv.offsetWidth;
        // 设置最大顶边距
        const maxTop = oDiv.offsetParent.offsetHeight - oDiv.offsetHeight;
        document.onmousemove = function(e) {
          // 计算当前右边距并设置
          const r = Math.min(maxRight, Math.max(disX - e.clientX, 0));
          oDiv.style.right = r + "px";
          // 计算当前顶边距并设置
          const t = Math.min(maxTop, Math.max(disY + e.clientY, 0));
          oDiv.style.top = t + "px";

          // 判断下当前时间与初始时间差，大于200毫秒则判断状态为拖拽
          lastTime = new Date().getTime();
          if (lastTime - firstTime > 200) {
            document
              .getElementById("gamePanel")
              .setAttribute("drag-flag", true);
          }
        };
        // 鼠标抬起时清除事件
        document.onmouseup = function(e) {
          document.onmousemove = null;
          document.onmouseup = null;
        };
        return false;
      };
    },
  },
  methods: {
    /**
     * 游戏收藏
     * @param {Object} item 游戏项的数据 
    */
    async collect(item) {
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
        const res = await collect_collect({
          type: 0,
          other_id: item.g_id,
        });
        if (res.data.code != 1) {
          change();
          this.$message.error(res.data.msg);
        }
      } catch (error) {
        change();
        this.$message.error(this.$t("收藏失败"));
      }
    },
    showGame() {
      if(this.$route.query.id){
        this.getGameGetUrl(this.$route.query.id)
      }
    },
    gameClose() {
      const isDrag = document.getElementById('gamePanel').getAttribute('drag-flag')
      if (isDrag === 'true') {
        return
      }
      this.gameUrl = ""
      // this.gameVisible = false
      this.mGameVisible = false
      this.updateUserInfo()
      setTimeout(() => {
        this.$store.commit("$vuexSetBlanceShowState", true);
      }, 1000);
      this.back()
    },
    gameBack() {
      this.back()
    },
    // 实现移动端拖拽
    down() {
      this.flags = true;
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      this.position.x = touch.clientX;
      this.position.y = touch.clientY;
      this.dx = moveDiv.offsetLeft;
      this.dy = moveDiv.offsetTop;
    },
    move() {
      if (this.flags) {
        let touch;
        if (event.touches) {
          touch = event.touches[0];
        } else {
          touch = event;
        }
        this.nx = touch.clientX - this.position.x;
        this.ny = touch.clientY - this.position.y;
        this.xPum = this.dx + this.nx;
        this.yPum = this.dy + this.ny;
        //添加限制：只允许在屏幕内拖动

        //屏幕宽度减去悬浮框宽高
        const maxWidth = document.body.clientWidth - 34;
        const maxHeight = document.body.clientHeight - 34;
        if (this.xPum < 0) {
          //屏幕x限制
          this.xPum = 0;
        } else if (this.xPum > maxWidth) {
          this.xPum = maxWidth;
        }
        if (this.yPum < 0) {
          //屏幕y限制
          this.yPum = 0;
        } else if (this.yPum > maxHeight) {
          this.yPum = maxHeight;
        }
        moveDiv.style.left = this.xPum + "px";
        moveDiv.style.top = this.yPum + "px";
        //阻止页面的滑动默认事件
        document.addEventListener(
          "touchmove",
          function() {
            // 1.2 如果碰到滑动问题，请注意是否获取到 touchmove
            // event.preventDefault(); //jq 阻止冒泡事件
            event.stopPropagation(); // 如果没有引入jq 就用 stopPropagation()
          },
          false
        );
      }
    },
    //鼠标释放时候的函数
    end() {
      this.flags = false;
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
    // 获取游戏路径
    async getGameGetUrl(gid) {
      this.loadGame = true;
      let platform = this.isMobileFlag ? 2 : 1;
      await game_login_game_api({ platform, gid }).then((res) => {
        this.loadGame = false;
        if (res && res.data.code == 1) {
          this.gameVisible = true;
          this.isLink = /^https?:\/\/|^www\./.test(res.data.data);
          this.gameUrl = res.data.data
          this.$store.commit("$vuexSetBlanceShowState", false);
        } else {
          this.errorTips(res.data.msg)
        }
      });
    },
    async getGameDetail(){
      this.skeletonShow = true
      let param = {
        g_id:this.$route.query.id
      }
      await game_detail_api(param).then(res => {
        if (res && res.data.code == 1) {
          this.gameInfos = res.data.data
          this.skeletonShow = false
        }
      });
    }
  },
  created() {
    this.isPhone();
    this.getGameDetail()
    this.getGameGetUrl(this.$route.query.id)
  },
  beforeDestroy(){
    watch.close()
  },
  watch:{
    mGameVisible(v){
      if(v){
        watch.open()
      }else{
        watch.close()
      }
    }
  }
};
</script>
<style scoped>
.statistics {
  margin-top: 48px;
}

.statistics__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2;
  margin-bottom: 36px;
}

@media (max-width: 768px) {
  .statistics__head {
    display: block;
    margin-bottom: 15px;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .statistics__head {
    display: block;
    margin-bottom: 15px;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .statistics__head {
    display: block;
    margin-bottom: 15px;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .statistics__head {
    display: block;
    margin-bottom: 15px;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .statistics__head {
    display: block;
    margin-bottom: 15px;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .statistics__head {
    display: block;
    margin-bottom: 15px;
  }
}

.statistics__tabs {
  display: flex;
  align-items: center;
  overflow: inherit;
}

@media (max-width: 768px) {
  .statistics__tabs {
    overflow-x: auto;
    margin-bottom: 16px;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .statistics__tabs {
    overflow-x: auto;
    margin-bottom: 16px;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .statistics__tabs {
    overflow-x: auto;
    margin-bottom: 16px;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .statistics__tabs {
    overflow-x: auto;
    margin-bottom: 16px;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .statistics__tabs {
    overflow-x: auto;
    margin-bottom: 16px;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .statistics__tabs {
    overflow-x: auto;
    margin-bottom: 16px;
  }
}

.statistics__controls {
  display: flex;
  align-items: center;
}

.statistics__controls .dropdown {
  margin-left: 8px;
}

@media (max-width: 768px) {
  .statistics__controls {
    justify-content: right;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .statistics__controls {
    justify-content: right;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .statistics__controls {
    justify-content: right;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .statistics__controls {
    justify-content: right;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .statistics__controls {
    justify-content: right;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel .statistics__controls {
    justify-content: right;
  }
}

.statistics__body {
  position: relative;
  min-height: 200px;
}

.statistics__inner {
  overflow-x: auto;
  overscroll-behavior-y: auto;
}

.statistics.panel {
  margin-top: 0;
}

.tab-badge {
  font-family: Roboto, serif;
  position: relative;
  top: auto;
  display: block;
  transform-origin: 50% 50%;
  line-height: 1;
  height: 20px;
  font-weight: 600;
  font-size: 12px;
  color: #fff;
  background: #3a07f2;
  margin: 0 -8px 0 8px;
  border-radius: 10px;
  padding: 4px 9px;
}

table.table-all td:first-child,
table.table-all th:first-child,
table.table-battles td:first-child,
table.table-battles th:first-child,
table.table-high td:first-child,
table.table-high th:first-child,
table.table-my td:first-child,
table.table-my th:first-child,
table.table-rare td:first-child,
table.table-rare th:first-child {
  background-color: #0d131c;
  position: -webkit-sticky;
  position: sticky;
  left: 0;
  z-index: 2;
}

.panel table.table-all td:first-child,
.panel table.table-all th:first-child,
.panel table.table-battles td:first-child,
.panel table.table-battles th:first-child,
.panel table.table-high td:first-child,
.panel table.table-high th:first-child,
.panel table.table-my td:first-child,
.panel table.table-my th:first-child,
.panel table.table-rare td:first-child,
.panel table.table-rare th:first-child,
table.table-all .panel td:first-child,
table.table-all .panel th:first-child,
table.table-battles .panel td:first-child,
table.table-battles .panel th:first-child,
table.table-high .panel td:first-child,
table.table-high .panel th:first-child,
table.table-my .panel td:first-child,
table.table-my .panel th:first-child,
table.table-rare .panel td:first-child,
table.table-rare .panel th:first-child {
  background-color: #111923;
}

table {
  width: 100%;
  font-weight: 600;
  font-size: 12px;
}

table td,
table th {
  padding: 8px;
  height: 56px;
}

table td:first-child,
table th:first-child {
  padding-left: 16px;
}

table td:last-child,
table th:last-child {
  padding-right: 16px;
}

table th {
  color: #55657e;
  font-weight: 500;
  text-align: left;
  white-space: nowrap;
}

table thead th {
  position: relative;
  z-index: 1;
  background-color: #0d131c;
}

.panel table thead th {
  background-color: #111923;
}

table tbody tr {
  -webkit-animation-duration: var(--animation-duration);
  animation-duration: var(--animation-duration);
  -webkit-animation-direction: normal;
  animation-direction: normal;
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
  -webkit-animation-play-state: running;
  animation-play-state: running;
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  will-change: transform, opacity;
}

table tbody tr:first-child {
  -webkit-animation-name: horizont-1-data-v-47b53a9f;
  animation-name: horizont-1-data-v-47b53a9f;
}

table tbody tr:nth-child(2n) {
  -webkit-animation-name: horizont-2-data-v-47b53a9f;
  animation-name: horizont-2-data-v-47b53a9f;
}

table tbody tr:nth-child(odd) {
  -webkit-animation-name: horizont-3-data-v-47b53a9f;
  animation-name: horizont-3-data-v-47b53a9f;
}

table tbody td {
  position: relative;
  vertical-align: top;
  padding: 18px 8px;
}

table tbody td.align-middle {
  vertical-align: middle;
}

table tbody td:before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #161f2c;
}

table.no-animation tbody tr {
  -webkit-animation: none;
  animation: none;
}

table.clickable tbody tr {
  cursor: pointer;
}

table.table-battles td:nth-child(3),
table.table-battles th:nth-child(3) {
  min-width: 165px;
}

table.table-battles td:nth-child(4),
table.table-battles th:nth-child(4) {
  width: 200px;
  min-width: 200px;
}

table.table-battles td:last-child,
table.table-battles th:last-child {
  width: 150px;
  min-width: 150px;
}

table.table-online td:first-child,
table.table-online td:nth-child(2),
table.table-online th:first-child,
table.table-online th:nth-child(2) {
  width: 50%;
  min-width: 50%;
}

table.table-online td:nth-child(3),
table.table-online th:nth-child(3) {
  width: 125px;
  min-width: 125px;
}

table.table-rounds td:nth-child(3),
table.table-rounds th:nth-child(3) {
  width: 500px;
  min-width: 500px;
}

table.table-all td:nth-child(4),
table.table-all th:nth-child(4) {
  min-width: 135px;
}

table.table-all td:nth-child(6),
table.table-all th:nth-child(6) {
  width: 125px;
  min-width: 125px;
}

table.table-my td:nth-child(4),
table.table-my th:nth-child(4) {
  min-width: 116px;
}

table.table-my td:nth-child(6),
table.table-my th:nth-child(6) {
  width: 125px;
  min-width: 125px;
}

table.table-high td:nth-child(4),
table.table-high th:nth-child(4),
table.table-rare td:nth-child(4),
table.table-rare th:nth-child(4) {
  min-width: 116px;
}

table.table-high td:nth-child(6),
table.table-high th:nth-child(6),
table.table-rare td:nth-child(6),
table.table-rare th:nth-child(6) {
  width: 125px;
  min-width: 125px;
}

@media screen and (min-width: 1000px) {
  @-webkit-keyframes horizont-1-data-v-47b53a9f {
    0% {
      opacity: 0;
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-1-data-v-47b53a9f {
    0% {
      opacity: 0;
      transform: translateY(-99.99%);
    }
  }

  @-webkit-keyframes horizont-2-data-v-47b53a9f {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-2-data-v-47b53a9f {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @-webkit-keyframes horizont-3-data-v-47b53a9f {
    0% {
      transform: translateY(-99.99%);
    }
  }

  @keyframes horizont-3-data-v-47b53a9f {
    0% {
      transform: translateY(-99.99%);
    }
  }
}

.my-bet {
  background-color: #1c2532;
  border-radius: 14px;
}

.my-bet td:first-child {
  background-color: #1c2532 !important;
}

.user {
  display: flex;
  align-items: center;
}

.user--clickable {
  cursor: pointer;
}

.user__avatar {
  position: relative;
  flex-shrink: 0;
}

.user__inner {
  right: 0;
  overflow: hidden;
  border-radius: 50%;
}

.user__inner,
.user__inner img {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
}

.user__inner img {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  display: block;
  width: auto;
  height: 100%;
  max-width: none;
}

.user__level {
  right: -4px;
  bottom: -4px;
  position: absolute;
  background-color: #55657e;
  width: 15px;
  height: 15px;
  text-align: center;
  font-size: 10px;
  line-height: 15px;
  border-radius: 50%;
  color: #fff;
  pointer-events: none;
}

.user__additional-info,
.user__name {
  margin-left: 8px;
}

.user__wrap {
  display: flex;
  flex-direction: column;
}

.user__additional-info {
  letter-spacing: -0.02em;
  font-feature-settings: "tnum" on, "lnum" on;
  color: #93acd3;
}

.td-multiplier {
  display: inline-block;
  font-weight: 600;
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 8px;
  white-space: nowrap;
}

.td-multiplier.win {
  color: #1bb83d;
  background-color: rgba(27, 184, 61, 0.15);
}

.td-currency .win {
  color: #1bb83d;
}

.td-multiplier.lose {
  color: #55657e;
  background-color: rgba(85, 101, 126, 0.15);
}

/* detail */

.page-game {
  position: relative;
  height: calc(100vh - 112px);
}

.page-game.joined {
  height: auto;
}

.page-game.joined .game-container {
  opacity: 1;
}

.page-game .game-container {
  opacity: 0;
}

.page-game .page-game__statistic-btn {
  width: 100%;
  max-width: 650px;
  margin: 32px auto 0;
}

@media (max-width: 768px) {
  .page-game .page-game__statistic-btn {
    margin: 24px auto 0;
  }
}

@media (max-width: 1000px) {
  .opened-left-panel .page-game .page-game__statistic-btn {
    margin: 24px auto 0;
  }
}

@media (max-width: 1093px) {
  .opened-right-panel .page-game .page-game__statistic-btn {
    margin: 24px auto 0;
  }
}

@media (max-width: 1108px) {
  .opened-contests-panel .page-game .page-game__statistic-btn {
    margin: 24px auto 0;
  }
}

@media (max-width: 1325px) {
  .opened-left-panel.opened-right-panel .page-game .page-game__statistic-btn {
    margin: 24px auto 0;
  }
}

@media (max-width: 1340px) {
  .opened-left-panel.opened-contests-panel
    .page-game
    .page-game__statistic-btn {
    margin: 24px auto 0;
  }
}

.game-container__row {
  display: flex;
}

@media (max-width: 1332px) {
  .opened-left-panel .game-container__row {
    justify-content: center;
  }
}

@media (max-width: 1425px) {
  .opened-right-panel .game-container__row {
    justify-content: center;
  }
}

@media (max-width: 1440px) {
  .opened-contests-panel .game-container__row {
    justify-content: center;
  }
}

@media (max-width: 1657px) {
  .opened-left-panel.opened-right-panel .game-container__row {
    justify-content: center;
  }
}

@media (max-width: 1672px) {
  .opened-left-panel.opened-contests-panel .game-container__row {
    justify-content: center;
  }
}

.game-container__left {
  flex: 1 1;
}

@media (max-width: 1100px) {
  .game-container__left {
    flex: auto;
    width: 100%;
    max-width: 650px;
  }
}

@media (max-width: 1332px) {
  .opened-left-panel .game-container__left {
    flex: auto;
    width: 100%;
    max-width: 650px;
  }
}

@media (max-width: 1425px) {
  .opened-right-panel .game-container__left {
    flex: auto;
    width: 100%;
    max-width: 650px;
  }
}

@media (max-width: 1440px) {
  .opened-contests-panel .game-container__left {
    flex: auto;
    width: 100%;
    max-width: 650px;
  }
}

@media (max-width: 1657px) {
  .opened-left-panel.opened-right-panel .game-container__left {
    flex: auto;
    width: 100%;
    max-width: 650px;
  }
}

@media (max-width: 1672px) {
  .opened-left-panel.opened-contests-panel .game-container__left {
    flex: auto;
    width: 100%;
    max-width: 650px;
  }
}

.game-container__right {
  flex-shrink: 0;
  padding-left: 30px;
  overflow: hidden;
}

.list {
  top: 0;
}

.list,
.list:after {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

.list:after {
  pointer-events: none;
  content: "";
  height: 150px;
  background: linear-gradient(0deg, #0d131c, rgba(21, 22, 31, 0));
}

.list--is-panel:after {
  content: none;
}

.list__head {
  padding: 0 20px 0 58px;
  height: 20px;
  display: flex;
  justify-content: space-between;
}

.list__head span {
  font-size: 12px;
  line-height: 11px;
  color: #55657e;
}

.list__inner {
  overflow-y: scroll;
  overflow-x: hidden;
  height: calc(100% - 20px);
}

.list-item {
  height: 53px;
  background: #1b2233;
  border-radius: 7px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 5px 10px;
  border: 1px solid rgba(85, 101, 126, 0.28);
}

.list-item__num {
  min-width: 38px;
  font-weight: 900;
  font-size: 32px;
  text-align: center;
  color: #798dad;
  opacity: 0.24;
  margin-right: 10px;
}

.list-item__user {
  flex: 1 1;
}

.list-item__expected {
  font-weight: 600;
  font-size: 13px;
  color: #fff;
}

.list-item.sticky:last-child {
  margin-bottom: 0;
}

.list-item.sticky {
  position: -webkit-sticky;
  position: sticky;
  bottom: 0;
  z-index: 1;
  background-color: #1d2d42;
  border: 1px solid #297fe5;
}

.list-item.sticky .list-item__num {
  color: #297fe5;
  opacity: 1;
}

.item-user {
  position: relative;
  padding-left: 40px;
  min-height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.item-user__userpick {
  position: absolute !important;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}

.item-user__name {
  font-weight: 600;
  font-size: 15px;
  color: #fff;
}

.item-user__betsize {
  font-weight: 500;
  font-size: 12px;
  color: #297fe5;
}

.currency {
  display: flex;
  align-items: center;
}

.currency__coin {
  width: 14px;
  height: 14px;
  margin-left: 5px;
  flex-shrink: 0;
}

.my-tokens {
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 12px;
}

.my-tokens span {
  color: #798dad;
}

.my-tokens b {
  margin: 0 0 0 5px;
  font-style: normal;
  font-weight: 500;
  color: #fff;
}

.tab-rating {
  position: relative;
  margin: -20px;
  padding: 20px;
  height: 115px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tab-rating:after {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  pointer-events: none;
  position: absolute;
  top: 10px;
  bottom: 0;
  right: 0;
  width: 193px;
  height: 95px;
  content: "";
  display: block;
  background-size: 193px 95px;
  background-position: 50%;
  background-repeat: no-repeat;
}

.tab-rating h5 {
  margin: 0 0 5px;
  font-size: 35px;
  text-transform: uppercase;
  color: #fff;
}

.tab-rating h5,
.tab-rating h6 {
  font-weight: 600;
  line-height: 1;
}

.tab-rating h6 {
  margin: 0;
  font-size: 15px;
  color: #6f7c89;
}

.tab-rating h6 span {
  color: #fed700;
}

.game-panel {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  background-color: #202a39;
  border-radius: 16px;
  min-height: 86vh;
  overflow: hidden;
}

.game-pc-card {
  text-align: center;
  width: 300px;
  margin: 0 auto;
}

.game-pc-card .game-title {
  font-size: 26px;
  margin-bottom: 15px;
}

.game-pc-card .game-pc-photo {
  margin-bottom: 15px;
}
.game-pc-photo{
  height: 390px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-pc-photo img {
  display: block;
  border-radius: 16px;
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.game__container {
  position: absolute;
  background-color: #000000;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.js-game-iframe {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
}

.game-close {
  position: absolute;
  right: calc(100% - 55px);
  top: 15px;
  cursor: pointer;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  width: 44px;
  height: 44px;
  cursor: pointer;
  background-color: #222433;
  color: rgba(255, 255, 255, 0.7);
}
.game-close .iconfont {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  width: 44px;
  height: 44px;
  font-size: 18px;
}
/* 全屏弹窗 */
.game-detail-app ::v-deep .full-dialog .el-dialog__wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
}
.game-detail-app ::v-deep .full-dialog {
  border-radius: 0;
  background-color: #000000;
  color: #ffffff;
  width: calc(100% + 16px);
  height: calc(100% + 16px);
  margin: -8px;
}
.game-detail-app ::v-deep .full-dialog .el-dialog__header {
  display: none;
}
.game-detail-app ::v-deep .full-dialog .el-dialog__body {
  padding: 0;
  width: 100%;
  height: 100%;
}
.game__container {
  width: 100%;
  height: 100%;
}
.js-game-iframe {
  width: 100%;
  height: 100%;
}
@media (max-width: 750px) {
  .game__container{
    position: fixed;
    z-index: 9999;
  }
  .game__container .game-close {
    top: 10px;
    left: calc(100% - 50px);
  }
  .game-panel {
    padding: 80px 30px;
  }

  .game-pc-card {
    width: 220px;
  }
  .game-pc-photo{
    height: 280px;
  }
  .game-dialog ::v-deep .el-dialog__wrapper{
    z-index: 3147483639!important;
  }
}



.collect{
  position: absolute;
  right: 21px;
  top: 21px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
.c-img,.c-img-ac{
  width: 100%;
}
.c-img-ac{
  display: none;
}
.collect-an{
  animation: collect .6s;
}
@keyframes collect{
  0%{
    transform: scale(1);
  }50%{
    transform: scale(2);
  }100%{
    transform: scale(1);
  }
}
.hide{
  display: none !important;
}
.show{
  display: block !important;
}

</style>
