<template>
  <div class="b-wapper" v-if="list.length>2">
    <scrollRow :list="list" :min="3">
      <div class="item-wapper" v-for="(item, index) in list" :key="index" @click="getGameGetUrl(1, item.gb_gid, item)">
        <!-- <div class="title-wapper">
          <img src="@/assets/images/jiangbei.png" class="title-icon" />
          <span class="title-txt">{{ $t("大赢家") }}</span>
          <span class="title-time">20秒前</span>
        </div> -->
        <div class="item">
          <img v-if="item.game_icon" v-lazy="item.game_icon" class="cover" />
          <div class="item-content">
            <div class="name-wapper">
              <div class="name" :title="item.username">{{ item.username }}</div>
              <div class="num-wapper">
                <img v-lazy="$store.state.vndIcon" class="games-logo" />
                <span>{{ numFormat(item.gb_winprice) }}</span>
              </div>
            </div>
            <div class="time-wapper">
              <div class="time">{{ $t("获胜") }} : </div>
              <div class="games-name" :title="$t(item.game_name)">
                {{ $t(item.game_name) }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </scrollRow>
    <gameDialog ref="gameDialog"></gameDialog>
    <LoginModal ref="loadinModal"></LoginModal>
  </div>
</template>

<script>
import gameDialog from "@/components/gameDialog.vue";
import scrollRow from "@/components/scrollRow.vue";
import LoginModal from "@/components/LoginModal.vue";
import {
  game_login_game_api,
} from "@/api/cybSports";
export default {
  components: { scrollRow, gameDialog ,LoginModal},
  props: ["list"],
  mounted() {
    // setTimeout(() => {
    //   console.log(this.list);
    // }, 1000);
  },
  methods: {
    // 获取游戏路径
    async getGameGetUrl(game_status, gid, item) {
      if (!this.$store.state.isLoginStatu) {
        // this.showLoginReg(0)
        this.$refs.loadinModal.loginVisible = true
        return
      }
      if (item && item.gb_tcid == 15) {
        this.goUrl('/sport-betting');
        return;
      }
      let platform = this.isMobileFlag ? 2 : 1;
      let param = {
        platform, gid
      }
      await game_login_game_api(param).then(res => {
        if (res && res.data.code == 1) {
          if(this.isMobileFlag){
            this.$refs.gameDialog.showDialog(res.data.data, {
              icon:item.game_icon,
              gid:item.gb_gid,
              game_name:item.game_name,
            });
          }else{
            let gameArray = []
            gameArray.push({
              icon:item.game_icon,
              gid:item.gb_gid,
              game_name:item.game_name,
              url:res.data.data
            })
            this.$helper.set("gameInfoHelper", gameArray);
            this.$router.push({ path: '/game-detail'});
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
              '<div class="notice-tit">'+this.$t('通知')+'</div>' +
              `<div class="notice-desc">${this.$t(res.data.msg)}</div>` +
              "</div>" +
              "</div>"
          });
        }
      });
    },
  }
};
</script>

<style scoped>
.b-wapper {
  background-color: #161f2c;
  margin-bottom: 18px;
  border-radius: 16px;
  padding: 10px;
  color: #93acd3;
}
.cover {
  width: 62px;
  height: 62px;
  border-radius: 4px;
  background-color: #000;
  margin-right: 15px;
  object-fit: cover;
}
.games-logo {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.item {
  display: flex;
  align-items: center;
  margin-right: 28px;
  cursor: pointer;
}
.item-content{
	flex: 1;
}
.item-content > div {
  display: flex;
  width: 210px;
  justify-content: space-between;
}
.item-content > div:first-child {
  margin-bottom: 16px;
  font-size: 16px;
}
.num-wapper {
  color: #ffcf73;
  display: flex;
  align-items: center;
}
.games-name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 5px;
  flex:1;
  max-width: 175px;
  text-align: right;
}
.name {
  max-width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hs {
  display: none;
}
.title-wapper {
  display: none;
}
.item-wapper{
	cursor: pointer;
	background-color: #202a39;
	border-radius: 10px;
	padding: 10px;
	font-size: 12px;
	min-width: 230px;
	margin-right: 10px;
}
@media (max-width: 650px) {
  .b-wapper {
    background-color: transparent;
    padding: 0;
    margin-left: -16px;
    margin-right: -16px;
  }
  .cover {
    width: 38px;
    height: 38px;
  }
  .item-content > div:first-child {
    margin-bottom: 0px;
    font-size: 12px;
  }
  .item-content > div {
    display: flex;
    width: auto;
    justify-content: space-between;
  }
  .name {
    margin-right: 20px;
  }
  .name-wapper {
    position: relative;
  }
  .games-logo {
    width: 12px;
    height: 12px;
    margin-right: 5px;
  }
  .item {
    margin-right: 0;
  }
  .hs {
    display: block;
    margin-right: 30px;
    color: #fff;
  }
  .title-wapper {
    display: flex;
    align-items: center;
  }
  .title-icon {
    width: 14px;
    height: 14px;
    margin-right: 8px;
  }
  .title-txt{
    color: #FFF;
    flex: 1;
  }
}
</style>
