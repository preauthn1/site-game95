<template>
  <div>
    <transition name="left_to_right">
      <div class="s-wapper" v-show="value">
        <div class="content">
          <el-input
            :placeholder="$t('搜索游戏名称')"
            prefix-icon="el-icon-search"
            v-model="key"
            class="input"
          >
          </el-input>
          <div class="tips" v-if="key.length < 2">
            {{ $t("最少需要输入2个字符") }}
          </div>
          <div class="loading-wapper" v-if="loading">
            <div class="games-list">
              <div
                class="loading-item-wapper"
                v-for="(item, index) in 18"
                :key="index"
              >
                <el-skeleton :animated="true">
                  <el-skeleton-item
                    variant="image"
                    class="loading-item"
                    slot="template"
                  />
                </el-skeleton>
              </div>
            </div>
          </div>
          <div class="games-list" v-else-if="list.length">
            <gameItem
              :lazy="false"
              v-for="(item, index) in list"
              :item="item"
              :key="index"
            ></gameItem>
          </div>
          <none v-else-if="key.length >= 2"></none>

          <div v-else-if="!loading && list.length == 0">
            <!-- 常玩游戏列表 -->
            <div class="recommend-item" v-if="frequentlyPlayingGames.length">
              <div class="recommend-title">
                <img src="@/assets/images/games-icon-right.png" class="recommend-title-icon" />
                <span>{{ $t("常玩游戏") }}</span>
              </div>
              <swiper :options="swiperOpt">
                <swiper-slide v-for="(item, index) in frequentlyPlayingGames" :key="index">
                  <gameItem :lazy="false" :item="item"></gameItem>
                </swiper-slide>
              </swiper>
            </div>

            <!-- 推荐游戏列表 -->
            <div class="recommend-item" v-if="recommendGames.length">
              <div class="recommend-title">
                <img src="@/assets/images/games-icon-right.png" class="recommend-title-icon" />
                <span>{{ $t("推荐游戏") }}</span>
              </div>
              <swiper :options="swiperOpt">
                <swiper-slide v-for="(item, index) in recommendGames" :key="index">
                  <gameItem :lazy="false" :item="item"></gameItem>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
        <div class="ctr" @click="hide">
          <img src="@/assets/images/right-ctr.png" alt="" />
        </div>
      </div>
    </transition>
    <transition name="el-fade-in" >
      <div class="mask" v-if="value" @click.stop="hide"></div>
    </transition>
  </div>
</template>

<script>
import gameItem from "@/components/games/gameItem.vue";
import { game_list_api } from "@/api/cybSports";
export default {
  components: { gameItem },
  data() {
    return {
      swiperOpt: {
        loop: false,
        autoplay: false,
        slidesPerView: "3",
        spaceBetween: 16,
      },
      key: "",
      list: [],
      frequentlyPlayingGames:[],
      recommendGames:[],
      loading: false,
      timeId: null,
    };
  },
  props: {
    value: {
      default: false,
    },
  },
  model: {
    prop: "value",
    event: "change",
  },
  watch: {
    key(v) {
      // 做节流
      clearTimeout(this.timeId);
      this.list = [];
      if (v.length >= 2) {
        this.loading = true;
        this.timeId = setTimeout(async () => {
          await this.search();
          this.loading = false;
        }, 300);
      } else {
        this.loading = false;
      }
    },
    async value(v){
      if(v && this.frequentlyPlayingGames.length==0 && this.recommendGames.length==0){
        this.loading = true;
        this.frequentlyPlayingGames = await this.getGames({is_play:1})
        this.recommendGames = await this.getGames({hot:1})
        this.loading = false;
      }
    }
  },
  methods: {
    hide() {
      this.$emit("change", false);
    },
    async search() {
      const { data } = await game_list_api({
        page: 1,
        limit: 18,
        keywords: this.key,
      });
      if (data.code == 1) {
        this.list = data.data;
      }
    },
    // 获取推荐游戏
    async getGames({is_play,hot}){
      const { data } = await game_list_api({
        page: 1,
        limit: 6,
        is_play,
        hot
      });
      if (data.code == 1) {
        return data.data
      }else{
        return []
      }
    },
  },
  beforeDestroy() {
    clearTimeout(this.timeId);
  },
};
</script>

<style scoped lang="less">
.s-wapper {
  position: fixed;
  top: 64px;
  bottom: 0;
  z-index: 1500;
  right: 0;
  width: 338px;
  background-color: #111923;
  @media (max-width: 540px) {
    width: 310px;
    max-width: calc(100% - 40px);
  }
}
.content {
  overflow: auto;
  max-height: 100%;
  padding: 32px 15px;
}
.recommend-title-icon {
  width: 26px;
  height: 20px;
  object-fit: contain;
  margin-right: 10px;
}
.recommend-title {
  display: flex;
  align-items: center;
  margin: 19px 0;
  color: #657598;
}
.input {
  margin-bottom: 15px;
}
.recommend-item {
  margin-bottom: 30px;
}
.games-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
}
.tips {
  text-align: center;
  color: #3e5a78;
  margin-bottom: 15px;
}
.loading-item {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 14px;
}
.loading-item-wapper {
  position: relative;
  padding-bottom: 133.33%;
}
.ctr {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-100%, -50%);
  width: 36px;
  height: 67px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #111923;
  border-radius: 14px 0 0 14px;
  cursor: pointer;
  user-select: none;
  padding-right: 4px;
}
.ctr img {
  width: 18px;
  height: 16px;
}

.left_to_right-enter-active,
.left_to_right-leave-active {
  transition: all 0.4s;
}
.left_to_right-enter,
.left_to_right-leave-to {
  transform: translateX(calc(100% + 40px));
}
.mask{
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: calc(100% - 64px);
  background-color: rgba(0,0,0,.5);
  z-index: 1499;
  top: 64px;
  display: none;
  @media (max-width:768px) {
    display: block;
  }
}
</style>