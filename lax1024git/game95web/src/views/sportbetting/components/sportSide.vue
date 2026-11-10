<template>
  <div class="bt3720" style="z-index: 999;">
    <div class="bt3724">
      <div class="bt3725" style="background: rgb(17, 25, 35);">
				<div class="bt3733 bt3734" style="background: rgb(17, 25, 35);">
					<div class="col">
						<router-link to="/sport-betting?sportsId=0" :class="$route.query.sportsId == '0' ? 'router-link-active2' : ''" @click="resetAll" class="bet-link">
							<span class="iconfont icon-home"></span>
						</router-link>
					</div>
					<div class="col">
						<router-link style="margin-top:3px;" to="/sport-betting?sportsId=1" :class="$route.query.sportsId == '1' ? 'router-link-active2' : ''" class="bet-link">
              <svgIcon widthName="32" heightName="32" class="loc" icon="sport-soccer"></svgIcon>
            </router-link>
					</div>
					<!-- <div class="col">
						<router-link to="/sport-favorites" class="bet-link">
							<span class="iconfont icon-fav-kong"></span>
						</router-link>
					</div> -->
					<div class="col">
						<router-link v-if="$store.state.isLoginStatu" to="/sport-bets" :class="['bet-link',$route.path=='/sport-bets'?'bet-link-ac':'']">
							<span class="iconfont icon-fuzhi"></span>
						</router-link>
						<div v-else @click="showLoginReg(0)" :class="['bet-link',$route.path=='/sport-bets'?'bet-link-ac':'']">
							<span class="iconfont icon-fuzhi"></span>
						</div>
					</div>
					<div class="col" v-if="isMobile">
						<div class="bet-link" :class="curSports ? 'router-link-active' : ''">
							<!-- <span class="iconfont icon-zuqiu"></span> -->
              <div style="padding:8px;" @click="navMenuToggle()">
                <svg :width="32" :height="32" focusable="false" aria-hidden="true">
                  <use :xlink:href="require('@/assets/fonts/svg-sprite.svg')+'#'+ (curSports ? curSports.icon : 'sport-soccer')" class="svg-use"></use>
                </svg>
              </div>
              <i @click="navMenuToggle" class="el-icon-caret-bottom"></i>
						</div>
            <div class="bt20774" v-if="navMenuShow">
              <div class="bt24557 bt24558 bt20782">
                <div class="bt20784">
                  <div class="bt24559">
                    <div class="bt24561" v-for="(sport, index) in sportsMenu" :key="`mobile-sport${index}`">
                        <a class="bt24563 bt24560" @click="selectSportsId(sport.sid, true)" :class="sportsId == sport.sid ? 'bt24564' : ''" href="javascript:;">
                            <div class="bt24566">
                                <div class="bt24565">
                                  <svgIcon widthName="32" heightName="32" class="loc" :icon="sport.icon"></svgIcon>
                                </div>
                            </div>
                            <span class="bt24568">{{ $t(sport.name) }}</span>
                        </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
					</div>
					<!-- <div class="col">
						<router-link to="/sport-search" class="bet-link">
							<span class="iconfont icon-search"></span>
						</router-link>
					</div> -->
				</div>
			</div>
			<div class="collapse-cells collapse-top-cells" v-if="!isMobile && leagueList.length > 0">
				<el-collapse v-model="activeNamesA">
					<el-collapse-item name="1">
						<template slot="title">
							<div class="bt7019">
								<span class="iconfont icon-tag"></span>{{ $t('QUICK LINKS') }}
							</div>
						</template>
						<div class="collapse-list">
							<div class="bt7025" v-for="(item,index) in leagueList" :key="index" @click="selectLeagueId(item.id, item.sid)">
                <img class="ico" :src="item.lurl" alt height="24" width="24" />
                <span>{{ item.na }}</span>
                <span style="margin-left: 5px; opacity: 0.4;">{{ item.mt }}</span>
							</div>
						</div>
					</el-collapse-item>
				</el-collapse>
      </div>
      <div class="bt3726 bt3727" v-if="!isMobile">
				<div class="bt3729" @click="resetAll">
					<span class="bt3730">
						<span class="iconfont icon-fcat"></span>
					</span>{{ $t('所有运动') }}
				</div>
				<div class="collapse-cells collapse-main-cells">
					<el-collapse v-model="collapseSport">
						<el-collapse-item v-for="(sport,index) in sportsMenu" :name="`sport${index}`" :key="`sport${index}`">
							<template slot="title">
								<div class="bt99 ">
                  <svgIcon widthName="24" heightName="24" class="loc" :icon="sport.icon"></svgIcon>
									<div class="tit" @click="selectSportsId(sport.sid)">{{ $t(sport.name) }}</div>
								</div>
							</template>
							<div class="collapse-list" v-if="sportsLeaugues[sport.sid]">
								<div class="bt1387" @click="selectLeagueId(item.id, sport.sid)" v-for="(item,index2) in sportsLeaugues[sport.sid]" :key="`leagues${sport.sid}-${index2}`">
                  <img class="ico"
                    :src="item.lurl ? item.lurl : defaultLeagueLogo"
                    height="24"
                    width="24"
                  />
									<span>{{item.na ? item.na : item.rnm}}</span>
                  <span style="margin-left: 5px; opacity: 0.4;">{{item.mt}}</span>
								</div>
							</div>
						</el-collapse-item>
					</el-collapse>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";
import { statistical_api, getOnSaleLeagues_api } from "@/api/sports";
import fbSportsService from "@/common/fbSportsService";
import defaultLeagueLogo from "@/assets/images/country/international.svg";
export default {
  components: {
    svgIcon
  },
  props: {
    isMobile: {
      type: Boolean,
      default: false
    },
    matchesType: {
      default: '0'
    }
  },
  data() {
    return {
      defaultLeagueLogo: defaultLeagueLogo,
      navMenuShow: false,
      activeNamesA: [],
      collapseSport: [],
      collapselist: [],
      collapselist2: [],
      leagueList: [],
      leagueId: '',
      sportsId: 0,
      curSports: null,
      sportsMenu: [],
      sportsTypes: [],
      sportsLeaugues: [],
      sportsHotLeaugues: [],
      statisticalTime: null,
      isReq: false,
    };
  },
  destroyed(){
     clearTimeout(this.statisticalTime);
  },
  methods: {
    btpath(sportsId, leagueId, matchesId, type) {
      this.$router.push({
        name: "sportbetting",
        query: {
          'type': type,
          'sportsId': sportsId,
          'leagueId': leagueId,
          'matchesId': matchesId,
        }
      });
    },
    resetAll() {
      this.btpath(0, '')
    },
    selectSportsId(sportsId, toggle) {
      if (this.isReq) {
        return;
      }
      this.curSports = this.getSportsById(sportsId)
      // console.log(this.curSports)
      this.sportsId = sportsId;
      this.leagueId = '';
      this.league_getMatchList(this.leagueId, this.sportsId)
      if (toggle) {
        this.navMenuToggle()
      }
      this.btpath(this.sportsId, this.leagueId)
    },
    getSportsById(sportsId) {
      let sports = null;
      for(let i in this.sportsMenu) {
        if (this.sportsMenu[i].sid == sportsId){
          sports = this.sportsMenu[i];
          break
        }
      }

      return sports;
    },
    selectLeagueId(leagueId, sportsId) {
      if (sportsId) {
        this.curSports = this.getSportsById(sportsId)
        this.sportsId = sportsId;
      }
      this.leagueId = leagueId;
      this.btpath(this.sportsId, this.leagueId)
      this.league_getMatchList(this.leagueId, this.sportsId)
    },
    async getStatistical() {
      const cache_key = 'fb_side_sports';
      const self = this;
      if (self.$helper.get(cache_key)) {
        self.sportsMenu = self.$helper.get(cache_key)
      }
      let i18n = this.$helper.getLang();
      const languageType = fbSportsService.getLanguageType(i18n);
      await statistical_api({ languageType }).then(response => {
        if (response.data) {
          let result = response.data;
          if (!result.success) {
            setTimeout(() => {
              self.getStatistical();
            }, 1000);
            return
          }
          let data = result.data
          // this.leagueList = data.hls;
          // if (this.leagueList.length > 0 && this.leagueId == 0) {
          //   this.leagueId = this.leagueList[0].id;
          // }
          let arr = data.sl;
          let arr2 = [];
          for (let i in arr) {
            if (arr[i].ty === 0) {
              arr2 = arr[i].ssl;
            }
          }

          self.sportsTypes = data.sl.sort(this.handle("ty"))
          this.$emit("sportsType", self.sportsTypes);
          // console.log(self.sportsTypes, 'self.sportsTypes')
          for (let i in arr2) {
            arr2[i].name = fbSportsService.getName(arr2[i].sid);
            arr2[i].icon = fbSportsService.getSportsIconName(arr2[i].sid);
          }
          self.sportsMenu = arr2.sort(this.handle2("c"));
          if (self.sportsMenu.length > 0) {
            let param = {
              leagueId: self.leagueId,
              type: 0,
              sportId: self.sportsId
            };
            this.$emit("leagueIdChange", param);
            self.$helper.set(cache_key, self.sportsMenu)
          }
          clearTimeout(this.statisticalTime);
          this.statisticalTime = setTimeout(() => {
            this.getStatistical();
          }, 10000);
        }
      });
    },

    async getOnSaleLeagues() {
      const cache_key = 'fb_side_sports_leagues';
      const self = this;
      if (self.$helper.get(cache_key)) {
        self.sportsLeaugues = self.$helper.get(cache_key)
      }
      let i18n = this.$helper.getLang();
      const languageType = fbSportsService.getLanguageType(i18n);
      await getOnSaleLeagues_api({ languageType:languageType, type:self.matchesType }).then(response => {
        if (response.data) {
          let result = response.data;
          if (!result.success) {
            setTimeout(() => {
              self.getOnSaleLeagues();
            }, 1000);
            return
          }
          let data = result.data
          let sportsLeaugues = [];
          for(const i in data) {
            if (!sportsLeaugues[data[i].sid]) {
              sportsLeaugues[data[i].sid] = new Array();
            }
            sportsLeaugues[data[i].sid].push(data[i])
            if (data[i].hot) {
              self.leagueList.push(data[i])
            }
          }
          self.$helper.set(cache_key, sportsLeaugues)
          self.$emit("sportsLeaugue", sportsLeaugues);
          self.sportsLeaugues = sportsLeaugues;
          // console.log(self.sportsLeaugues, 'self.sportsLeaugues')
        }
      });
    },
    league_getMatchList(leagueId, sportId) {
      if (this.isReq) {
        return;
      }
      this.isReq = true;
      let data = {
        leagueId,
        sportId
      };
      this.$emit("leagueIdChange", data);
      let self = this;
      window.setTimeout(() => {
        self.isReq = false;
      }, 1000);
    },
    navMenuToggle() {
      this.navMenuShow = !this.navMenuShow;
    }
  },
  mounted() {
    if (!this.statisticalTime && this.$helper.get("sportsApi")) {
      this.getStatistical();
      this.getOnSaleLeagues()
    }
    // if(this.$route.name === 'sportbetting') {
    //   if (this.$route.query.sportsId) {
    //     this.selectLeagueId(this.$route.query.leagueId, this.$route.query.sportsId)
    //   } else {
    //     this.selectSportsId(0)
    //   }
    // }
  },
  updated() {
    if(this.$route.name === 'sportbetting') {
      if (this.$route.query.modal) {
        return;
      }
      if (this.$route.query.sportsId) {
        this.selectLeagueId(this.$route.query.leagueId, this.$route.query.sportsId)
      } else {
        this.selectSportsId(0)
      }
    }
  }
};
</script>
<style scoped>
.m-dropdown-panel {
  top: 64px;
  left: 0;
  width: 100%;
  z-index: 99;
  overflow: hidden;
  position: absolute;
  color: #ffffff;
  width: 100%;
  background: #19212b;
  box-shadow: none;
  box-sizing: border-box;
  height: 0;
  box-sizing: border-box;
  overflow-y: auto;
  transition: 0.3s all;
  overflow: hidden;
}
.m-dropdown-panel.show {
  padding-bottom: 30px;
  padding-top: 30px;
  height: calc(100vh - 120px);
}

.m-dropdown-panel .el-col {
  padding-top: 10px;
  padding-bottom: 10px;
}
.m-dropdown-panel .m-dropdown-link {
  display: block;
  text-decoration: none;
  color: #ffffff;
  opacity: 0.5;
}
.m-dropdown-panel .m-dropdown-link.router-link-active {
  opacity: 1;
}
.m-dropdown-link img {
  width: 24px;
  height: 24px;
}
.m-dropdown-link .link-label {
  text-decoration: none;
  margin-top: 5px;
}
.bt3734 .bet-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-decoration: none;
}
.bt3734 .bet-link-ac{
  color: #3a07f2;

}
.bt3734 .bet-link.router-link-active2 {
  color: #3a07f2;
}
.bet-link.show .el-icon-caret-bottom {
  transform: rotate(180deg);
}

.bt3740 {
  display: inline-block;
}

.bt3695 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;
  background: rgba(25, 33, 43, 0.8);
  align-items: flex-start;
  justify-content: center;
}

.bt3696 {
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 99998;
  position: fixed;
  max-width: 840px;
  align-items: flex-start;
  justify-content: center;
}

.bt3697 {
  color: #ffffff;
  width: 496px;
  display: flex;
  padding: 32px 16px 40px;
  position: relative;
  background: #19212b;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.16);
  box-sizing: border-box;
  margin-top: 40px;
  align-items: center;
  font-weight: 500;
  border-radius: 6px;
  margin-bottom: 40px;
  flex-direction: column;
}

.bt3698 {
  top: 34px;
  right: 34px;
  display: block;
  opacity: 0.6;
  position: absolute;
}

.bt3699 {
  color: #ffffff;
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
}

.bt3700 {
  padding: 0 30px;
  font-size: 14px;
  text-align: center;
  margin-bottom: 32px;
}

.bt3701 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.bt3702 {
  margin: 8px;
}

.bt3703 {
  padding: 32px 8px 40px;
}

.bt3769 {
  width: 24px;
  height: 24px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.bt3769::before {
  top: 7px;
  right: 11px;
  width: 2px;
  height: 10px;
  content: "";
  display: block;
  z-index: 2;
  position: absolute;
  font-size: 0;
  background: #ffffff;
}

.bt3769::after {
  top: 11px;
  right: 7px;
  width: 10px;
  height: 2px;
  content: "";
  display: block;
  z-index: 2;
  position: absolute;
  font-size: 0;
  background: #ffffff;
}

.bt3770 {
  background: rgba(255, 255, 255, 0.1);
}

.bt3770::before {
  transform: rotate(90deg);
  background: #ffffff;
}

.bt3770::after {
  background: #ffffff;
}

.bt4507 {
  width: 48px;
  border: 1px solid transparent;
  cursor: pointer;
  height: 24px;
  display: inline-block;
  z-index: 1;
  position: relative;
  background: rgba(255, 255, 255, 0.15);
  box-sizing: border-box;
  transition: background 0.3s;
  border-radius: 60px;
}

.bt4508 {
  background: #3a07f2;
}

.bt4509 {
  width: 44px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 6px;
}

.bt4511 {
  top: 2px;
  left: 3px;
  width: 18px;
  height: 18px;
  display: flex;
  z-index: 2;
  position: absolute;
  background: #ffffff;
  transition: transform 0.3s;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
}

.bt4512 {
  transform: translateX(22px);
  background: #ffffff;
}

.bt-theme-editor__elements * {
  pointer-events: none;
}

.bt-theme-editor__elements *[data-editor-id] {
  cursor: pointer;
  pointer-events: auto;
}

.bt3693 {
  width: 100%;
  display: flex;
  position: relative;
  font-weight: 400;
  flex-direction: column;
}

.bt3694 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}

.simplebar-track.simplebar-vertical {
  width: 8px;
}

@media (hover: hover) {
  .bt3736:hover {
    cursor: pointer;
  }
}

.bt7035 {
  top: 0;
  color: #fa305c;
  right: 3px;
  width: 20px;
  height: 20px;
  display: flex;
  z-index: 2;
  position: absolute;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  background-color: #fff;
}

.bt3745 {
  top: 0;
  left: 50%;
  z-index: 1;
  position: absolute;
}

.bt3746 {
  transform: scale(0);
}

.bt3747 {
  animation: bt3751 0.4s linear forwards;
}

.bt3748 {
  transform: scale(1);
}

.bt3749 {
  transform: scale(0);
  transition: transform 0.2s ease-in-out;
}

.bt3750 {
  fill: currentColor;
  width: 10px;
  height: 10px;
}

@-webkit-keyframes bt3751 {
  40% {
    transform: scale(1.2);
  }

  60% {
    transform: scale(1.2);
  }

  80% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}

.bt4000 {
  display: inline-block;
  position: relative;
}

.bt4001 {
  width: 100%;
  height: 100%;
  display: block;
}

.bt4002 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
}

.bt6262 {
  cursor: pointer;
  height: 40px;
  display: inline-flex;
  padding: 0 16px;
  position: relative;
  font-size: 14px;
  box-sizing: border-box;
  transition: background 0.5s, opacity 0.5s, color 0.5s;
  align-items: center;
  line-height: 40px;
  user-select: none;
  border-radius: 20px;
  vertical-align: middle;
}

.bt6263 .bt6272 {
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bt6264 {
  padding-right: 8px;
}

.bt6265 {
  padding: 0;
  overflow: hidden;
  max-width: 256px;
  padding-left: 16px;
  padding-right: 16px;
}

.bt6265 .bt6271 {
  display: inline-block;
  opacity: 0;
}

.bt6265 .bt6272 {
  top: 0;
  left: 0;
  position: absolute;
  transition: transform 2s;
}

.bt6266 .bt6274 {
  background: rgba(13, 19, 28, 0.3);
}

.bt6266 .bt6269 {
  color: #ffffff;
}

.bt6266:hover .bt6269 {
  color: #ffffff;
}

.bt6267 {
  height: 32px;
  font-size: 12px;
  line-height: 32px;
}

.bt6268 {
  cursor: default;
  opacity: 0.3;
}

.bt6269 {
  flex: 0 0 auto;
  color: #ffffff;
  height: 24px;
  display: flex;
  z-index: 2;
  align-items: center;
  line-height: 1;
  padding-left: 5px;
  border-radius: 20px 0 0 20px;
  padding-right: 5px;
}

.bt6270 {
  flex: 1;
  width: 100%;
  overflow: hidden;
  position: relative;
}

.bt6271 {
  display: none;
}

.bt6272 {
  width: 100%;
  display: inline-block;
  z-index: 1;
  white-space: nowrap;
}

.bt6273 {
  display: flex;
  align-items: center;
  padding-left: 0;
}

.bt6274 {
  color: #ffffff;
  padding: 2px 6px;
  font-size: 10px;
  background: #0d131c;
  line-height: 13px;
  margin-left: 4px;
  border-radius: 8px;
}

.bt6275 {
  margin-left: 4px;
  margin-right: 4px;
}

.bt7778 {
  color: #ffffff;
  font-size: 12px;
  background: #111923;
  font-weight: 700;
}

.bt7779 {
  color: #ffffff;
  background: #3a07f2;
}

.bt7780 {
  cursor: default;
  opacity: 0.3;
}

@media (hover: hover) {
  .bt7778:not(.bt7780):not(.bt7779):hover {
    box-shadow: none;
  }

  .bt7778:not(.bt7779):hover {
    background: rgba(17, 25, 35, 0.5);
  }

  .bt7779:hover {
    color: #ffffff !important;
    box-shadow: none;
  }
}

.bt6929 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

.bt6930 {
  display: inline-block;
  white-space: nowrap;
  vertical-align: top;
}

.bt6931 {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 50px;
}

.bt6931::-webkit-scrollbar {
  display: none;
}

.bt4255 {
  color: inherit;
  display: flex;
  transition: all 0.3s;
  align-items: center;
  justify-content: center;
}

.bt4255 svg {
  fill: currentColor;
}

.bt7782 {
  display: inline-flex;
  line-height: initial;
  margin-right: 8px;
}

.bt7782:last-of-type {
  margin-right: 40px;
}

.bt7766 {
  width: 100%;
  position: relative;
}

.bt7767 {
  display: block;
}

.bt7768 {
  flex-direction: column;
}

.bt7769 {
  width: max-content;
  display: flex;
  box-sizing: border-box;
  white-space: nowrap;
  margin-bottom: 8px;
}

.bt7770 {
  position: absolute;
  flex-wrap: nowrap;
  visibility: hidden;
}

.bt7771 {
  z-index: 3;
  position: sticky;
}

.bt7772 {
  z-index: 2;
}

.bt7773 {
  display: inline-flex;
}

.bt7774 {
  margin-right: 8px;
}

.bt7774:last-of-type {
  margin-right: 40px;
}

.bt7775 {
  opacity: 0.6;
  margin-left: 8px;
}

.bt7776 {
  margin-left: 8px;
  margin-right: -8px;
}

.bt7777 {
  width: 16px;
  height: 33px;
  overflow: hidden;
  position: absolute;
}

.bt7777 svg {
  top: -7px;
  fill: #0d131c;
  left: -45px;
  position: absolute;
}

.bt4250 {
  position: relative;
  font-size: 12px;
}

.bt4251 {
  color: #ffffff;
  width: 100%;
  cursor: pointer;
  height: 32px;
  display: flex;
  padding: 0 12px 0 16px;
  position: relative;
  background: #111923;
  box-sizing: border-box;
  align-items: center;
  font-weight: 600;
  line-height: 32px;
  user-select: none;
  border-radius: 16px;
  justify-content: space-between;
}

.bt4252 {
  box-shadow: none;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.bt4252:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  z-index: -1;
  position: absolute;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.16);
  border-radius: inherit;
}

.bt4253 {
  top: 32px;
  left: 0;
  color: #ffffff;
  width: 100%;
  padding: 0px 16px 8px;
  position: absolute;
  background: #111923;
  box-sizing: border-box;
  border-radius: 16px;
  margin-bottom: 8px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bt4253:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  z-index: -1;
  position: absolute;
  box-shadow: 0px 5px 16px rgba(0, 0, 0, 0.16);
  border-radius: inherit;
}

.bt4254 {
  color: inherit;
  padding: 8px 0;
  font-size: 12px;
  font-weight: 600;
  user-select: none;
  text-transform: capitalize;
}

@media (hover: hover) {
  .bt4254:hover {
    cursor: pointer;
  }
}

.bt4247 {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
}

.bt4248 {
  color: #ffffff;
  opacity: 0.5;
  font-size: 12px;
  margin-top: 8px;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 8px;
  letter-spacing: 3px;
  text-transform: uppercase;
}

.bt4249 {
  width: 168px;
  z-index: 2;
}

.bt4246 {
  margin: 40px auto 88px;
  max-width: 50%;
}

@media (max-width: 600px) {
  .bt4246 {
    padding: 0 16px;
    max-width: 100%;
    box-sizing: border-box;
  }
}

.bt4243 {
  max-width: 100%;
}

.bt4243 .bt4244 {
  padding: 0 16px;
}

.bt4244 {
  color: #ffffff;
  opacity: 0.5;
  font-size: 12px;
  margin-top: 32px;
  text-align: center;
  font-weight: 500;
  line-height: 18px;
}

.bt4245 {
  display: inline-block;
}

.bt6558 {
  display: inline-block;
  margin-right: 4px;
}

.bt6559 {
  color: inherit;
  display: block;
}

.bt6561 {
  margin: 0 2px;
  opacity: 0.5;
  transform: rotate(-90deg);
}

.bt6545 {
  display: inline-block;
}

.bt6542 {
  color: #ffffff !important;
  opacity: 0.5;
}

.bt6543 {
  color: inherit !important;
  opacity: 0.5;
}

.bt7174 {
  color: inherit;
  cursor: pointer;
  display: block;
  opacity: 0.4;
  outline: none;
  transition: opacity 0.3s ease-in-out;
  text-decoration: none;
}

@media (hover: hover) {
  .bt7174:hover {
    opacity: 1;
  }
}

.bt7175 {
  display: block;
}

.bt6958 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  z-index: 2;
  position: absolute;
  background: #3a07f2;
  align-items: center;
  justify-content: center;
}

.bt6959 {
  width: 14px;
  border: 2px solid rgba(255, 255, 255, 1);
  height: 14px;
  animation: bt6960 1s linear infinite;
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

@-webkit-keyframes bt6960 {
  0% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.bt6961 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
}

.bt6962 {
  right: 2px;
  width: 0;
  bottom: 2px;
  height: 0;
  position: absolute;
  border-color: transparent transparent #fa305c transparent;
  border-style: solid;
  border-width: 0 0 8px 8px;
  animation-name: bt6964;
  animation-duration: 2s;
}

.bt6963 {
  top: 2px;
  right: 2px;
  width: 0;
  height: 0;
  position: absolute;
  border-color: transparent #2ddc4b transparent transparent;
  border-style: solid;
  border-width: 0 8px 8px 0;
  animation-name: bt6964;
  animation-duration: 2s;
}

@-webkit-keyframes bt6964 {
  16% {
    opacity: 1;
  }

  32% {
    opacity: 0;
  }

  48% {
    opacity: 1;
  }

  64% {
    opacity: 0;
  }

  80% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}

.bt6965 {
  height: 1.2em;
  display: flex;
  overflow: hidden;
  flex-direction: column;
}

.bt6966 .bt6968 {
  transform: translateY(110%);
}

.bt6966 .bt6969 {
  transform: translateY(0);
}

.bt6966 .bt6970 {
  transform: translateY(-100%);
}

.bt6966 .bt6971 {
  transform: translateY(-210%);
}

.bt6968 {
  transform: translateY(-110%);
}

.bt6969 {
  transform: translateY(0);
  transition: transform 400ms ease-in-out;
}

.bt6970 {
  transform: translateY(-100%);
}

.bt6971 {
  transform: translateY(10%);
  transition: transform 400ms ease-in-out;
}

.bt7193 {
  color: #ffffff;
  border: 1px solid;
  cursor: pointer;
  height: 48px;
  display: flex;
  padding: 1.5px;
  overflow: hidden;
  position: relative;
  min-width: 72px;
  background: #19212b;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  border-color: #19212b;
  border-radius: 8px;
  flex-direction: column;
  justify-content: center;
}

.bt7194 {
  color: rgba(255, 255, 255, 1);
  cursor: default;
  opacity: 0.3;
  background: rgba(25, 33, 43, 1);
  border-color: rgba(25, 33, 43, 1);
}

.bt7194 .bt7196 {
  color: rgba(255, 255, 255, 1);
}

.bt7195 {
  color: #ffffff;
  background: #3a07f2;
  border-color: #3a07f2;
}

.bt7195 .bt7196 {
  color: #ffffff;
}

.bt7196 {
  flex: 0 0 auto;
  color: #ffffff;
  display: flex;
  opacity: 0.5;
  overflow: hidden;
  font-size: 12px;
  max-width: 100%;
  box-sizing: border-box;
  text-align: center;
  word-break: break-all;
  font-weight: 600;
  white-space: nowrap;
  margin-bottom: 9px;
  justify-content: center;
}

.bt7197 {
  flex: none;
  font-size: 12px;
  align-self: center;
  text-align: center;
  line-height: 15px;
}

.bt7198 {
  margin-right: 4px;
}

.bt7199 {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  position: absolute;
  background: #3a07f2;
}

@media (hover: hover) {
  .bt7193:hover {
    color: #ffffff;
    background: rgba(25, 33, 43, 0.7);
    border-color: rgba(25, 33, 43, 0.7);
  }

  .bt7193:hover .bt7196 {
    color: #ffffff;
  }

  .bt7194:hover {
    color: rgba(255, 255, 255, 1);
    background: rgba(25, 33, 43, 1);
    border-color: rgba(25, 33, 43, 1);
  }

  .bt7194:hover .bt7196 {
    color: rgba(255, 255, 255, 1);
  }

  .bt7195:hover {
    color: #ffffff;
    background: rgba(34, 131, 246, 0.75);
    border-color: rgba(34, 131, 246, 0.75);
  }

  .bt7195:hover .bt7196 {
    color: #ffffff;
  }
}

.bt7190 {
  color: #ffffff;
  margin: 0;
  z-index: 4;
  position: relative;
  box-sizing: border-box;
  text-align: center;
  font-weight: 600;
}

.bt7191 {
  color: #ffffff;
  width: 100%;
  height: 16px;
  opacity: 0.5;
  overflow: hidden;
  font-size: 12px;
  box-sizing: border-box;
  line-height: 16px;
  border-radius: 2px;
  -webkit-mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
}

.bt7192 {
  cursor: pointer;
  display: inline;
}

.bt7186 {
  width: auto;
  display: flex;
  position: relative;
  margin-top: 0;
  margin-right: 10px;
  flex-direction: column;
  justify-content: space-between;
}

.bt7188 {
  display: flex;
  flex-wrap: nowrap;
}

.bt7189 {
  margin-right: 4px;
  border-radius: 0;
}

.bt7189:first-of-type {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.bt7189:last-of-type {
  margin-right: 0;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.bt7179 {
  height: 100%;
  display: flex;
  align-items: flex-end;
}

.bt7180 {
  display: flex;
}

.bt7181 {
  flex: 1;
  height: 100%;
  position: relative;
}

.bt7181::after {
  top: 0;
  right: -1px;
  width: 40px;
  height: 100%;
  content: "";
  position: absolute;
  background: linear-gradient(
    to left,
    rgba(17, 25, 35, 1),
    rgba(17, 25, 35, 0)
  );
}

.bt7182 {
  display: flex;
  align-items: flex-end;
}

.bt7183 {
  width: 100%;
  height: 48px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.bt7184 {
  color: rgba(255, 255, 255, 0.5);
  width: 100%;
  height: 48px;
  display: flex;
  font-size: 12px;
  background: rgba(25, 33, 43, 1);
  align-items: center;
  border-radius: 6px;
  justify-content: center;
}

.bt7185 {
  color: #ffffff;
  cursor: pointer;
  background: #19212b;
  transition: all 0.2s ease-in-out;
  font-weight: 600;
  text-decoration: none;
}

@media (hover: hover) {
  .bt7185:hover {
    color: #ffffff;
    background: rgba(25, 33, 43, 0.7);
    border-color: rgba(25, 33, 43, 0.7);
  }
}

.bt6547 {
  cursor: pointer;
  display: block;
  vertical-align: middle;
}

.bt6547 svg {
  display: block;
  opacity: 0.4;
  transition: opacity 0.3s;
}

.bt6547.bt6548 svg {
  opacity: 1;
}

.bt6549 {
  opacity: 0.4;
}

.bt6550 {
  opacity: 1;
  animation: bt6554 0.55s linear both;
}

.bt6551 {
  cursor: default;
  opacity: 0.3;
}

.bt6552 {
  opacity: 1;
}

.bt6553 {
  opacity: 0.4;
  animation: bt6555 0.55s linear both;
}

@media (hover: hover) {
  .bt6547:not(.bt6551):hover svg {
    opacity: 1;
  }
}

@-webkit-keyframes bt6554 {
  0% {
    transform: scale(1);
  }

  35% {
    transform: scale(1.3);
  }

  60% {
    transform: scale(1.4);
  }

  90% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1);
  }
}

@-webkit-keyframes bt6555 {
  0% {
    transform: scale(1);
  }

  35% {
    transform: scale(0.7);
  }

  50% {
    transform: scale(0.6);
  }

  65% {
    transform: scale(0.7);
  }

  100% {
    transform: scale(1);
  }
}

.bt7298 {
  flex: 0 0 auto;
  color: inherit;
  display: flex;
  min-width: 32px;
  box-sizing: border-box;
  justify-content: center;
}

.bt7299 .bt7301 {
  width: auto;
  border: none;
  padding: 0;
  font-size: 16px;
  background: none;
  line-height: 24px;
}

.bt7300 {
  flex: 1;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-between;
}

.bt7300 span {
  flex: 1;
  opacity: 1;
}

.bt7302 {
  margin-bottom: 8px;
}

.bt7304 {
  margin: 0 4px;
}

.bt7305 {
  font-size: 16px;
  font-weight: 600;
  flex-direction: row;
}

.bt7305 .bt7302 {
  margin-bottom: 0;
}

.bt6566 {
  color: rgba(255, 255, 255, 0.3);
}

.bt7173 {
  display: inline-block;
}

.bt7169 {
  margin: 0 0 0 4px;
  display: flex;
  min-width: 0;
  align-items: center;
  justify-content: flex-end;
}

.bt7170 {
  overflow: hidden;
  font-size: 11px;
  min-height: 14px;
  align-items: center;
  margin-left: 8px;
  text-overflow: ellipsis;
}

.bt7171:not(:empty) {
  display: inline-flex;
  font-size: 0;
  min-height: 14px;
  align-items: center;
  line-height: 0;
  margin-left: 8px;
  vertical-align: middle;
}

.bt7144 {
  color: #ffffff;
  width: 100%;
  border: 1px solid transparent;
  display: flex;
  opacity: 1;
  padding: 8px;
  direction: ltr;
  background: #111923;
  box-sizing: border-box;
  transition: background 0.5s;
  border-color: #111923;
  border-radius: 8px;
}

.bt7145 {
  flex: 1;
  display: flex;
  padding: 0 8px;
  justify-content: space-between;
}

.bt7146 {
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  letter-spacing: 0.4px;
}

.bt7147 {
  font-size: 11px;
  text-align: center;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.2px;
}

.bt7148 {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
}

.bt7149 {
  width: 24px;
  height: 24px;
  display: block;
  position: absolute;
  margin-right: 8px;
  vertical-align: middle;
}

.bt7150 {
  width: 100%;
  height: 24px;
  display: inline-block;
  overflow: hidden;
  position: relative;
  font-size: 12px;
  box-sizing: border-box;
  word-break: break-all;
  font-weight: 600;
  line-height: 24px;
  padding-left: 32px;
  vertical-align: middle;
}

.bt7151 {
  color: rgba(255, 255, 255, 0.5);
  height: 24px;
  margin: 0 8px;
  font-size: 14px;
  line-height: 24px;
}

.bt7152 {
  flex-wrap: wrap;
}

.bt7152 .bt7154 {
  width: 100%;
}

.bt7152 .bt7159 {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-left: none;
  padding-top: 8px;
  padding-left: 0;
}

.bt7152 .bt7164 .bt7165 {
  padding-right: 0;
}

.bt7152 .bt7164 .bt7158 {
  padding-right: 0;
}

.bt7153 {
  flex-direction: column;
}

.bt7153 .bt7154 {
  width: 100%;
  align-items: flex-end;
}

.bt7153 .bt7159 {
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  border-left: none;
  padding-top: 5px;
  padding-left: 0;
}

.bt7153 .bt7164 .bt7165 {
  padding-right: 0;
}

.bt7153 .bt7164 .bt7158 {
  padding-right: 0;
  flex-direction: column;
}

.bt7153 .bt7164 .bt7158::after {
  right: 24px;
  z-index: 2;
}

.bt7153 .bt7160 {
  margin-top: 8px;
}

.bt7153 .bt7161 {
  height: auto;
}

.bt7153 .bt7162 {
  flex: 0 0 auto;
  order: 2;
  right: 0;
  width: auto;
  border: 0;
  bottom: 0;
  padding: 8px;
}

.bt7153 .bt7162 .bt7158 {
  justify-content: flex-end;
}

.bt7153 .bt7164 {
  flex: 1;
  order: 1;
  padding: 8px;
}

.bt7153 .bt7166 {
  height: auto;
  align-items: flex-start;
}

.bt7154 {
  width: 560px;
  cursor: pointer;
  display: flex;
  transition: background 0.5s;
  border-radius: 6px;
}

.bt7155 {
  flex: 1;
  overflow: hidden;
}

.bt7156 {
  font-size: 11px;
}

.bt7157 {
  font-size: 11px;
}

.bt7158 {
  display: flex;
  position: relative;
}

.bt7158 .bt7155 {
  z-index: 3;
}

.bt7159 {
  width: calc(100% - 560px - 8px);
  display: flex;
  min-height: 72px;
  align-items: flex-end;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  padding-left: 8px;
}

.bt7160 {
  display: flex;
  position: relative;
}

.bt7161 {
  height: 72px;
  display: flex;
  padding: 0 14px 8px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  flex-direction: column;
  justify-content: space-between;
}

.bt7161:last-of-type {
  border-right: none;
}

.bt7162 {
  flex: 0 0 72px;
  color: #ffffff;
  align-items: center;
  padding-left: 0;
  padding-right: 8px;
  justify-content: center;
}

.bt7162 .bt7165 {
  justify-content: center;
}

.bt7163 {
  justify-content: space-between;
}

.bt7164 {
  flex: 1;
  overflow: hidden;
  padding-right: 0;
}

.bt7164 .bt7165 {
  box-sizing: border-box;
  padding-right: 14px;
}

.bt7164 .bt7158 {
  box-sizing: border-box;
  padding-right: 14px;
}

.bt7164 .bt7158::after {
  top: 0;
  right: 0;
  width: 40px;
  height: 100%;
  content: "";
  display: block;
  position: absolute;
  background: linear-gradient(
    to left,
    rgba(17, 25, 35, 1),
    rgba(17, 25, 35, 0)
  );
}

.bt7165 {
  display: flex;
}

.bt7166 {
  height: 24px;
  display: flex;
  align-items: center;
}

.bt7167 {
  height: 62px;
  display: flex;
  font-size: 12px;
  text-align: center;
  align-items: center;
  font-weight: 600;
  line-height: 16px;
  justify-content: center;
}

.bt7168 {
  margin-right: 20px;
  vertical-align: bottom;
}

.bt7134 {
  width: calc(100% + 16px);
  display: flex;
  margin-left: -16px;
  margin-bottom: -16px;
  flex-direction: column;
}

.bt7134::after {
  clear: both;
  content: "";
  display: block;
}

.bt7135 {
  margin-bottom: 0;
}

.bt7136 {
  position: relative;
}

.bt7136::before {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  z-index: 2;
  position: absolute;
}

.bt7137 {
  display: block;
}

.bt7138 {
  width: 100%;
}

.bt7138:last-of-type {
  margin-bottom: 0;
}

.bt7139 {
  color: #fff;
  float: left;
  width: 100%;
  box-sizing: border-box;
  padding-left: 16px;
  margin-bottom: 16px;
}

.bt7140 {
  width: 50%;
}

.bt7141 {
  width: 33.333%;
}

.bt7142 {
  width: 25%;
}

.bt7143 {
  float: right;
  order: 6;
  height: 644px;
  display: flex;
  justify-content: center;
}

.bt7088 {
  cursor: pointer;
}

.bt7088 .bt7091 path {
  fill: #ffffff;
}

.bt7089 {
  transition: opacity 0.3s;
}

.bt7090 {
  height: 26px;
  display: flex;
  align-items: center;
  margin-right: 8px;
  justify-content: center;
}

.bt7091 {
  height: 26px;
  opacity: 0.5;
  margin-left: 4px;
}

@media (hover: hover) {
  .bt7088:hover .bt7089 {
    opacity: 0.5;
  }
}

.bt7130 {
  display: flex;
  margin-left: -16px;
  flex-direction: column;
}

.bt7130::after {
  clear: both;
  content: "";
  display: block;
}

.bt7131 {
  color: #fff;
  float: left;
  width: 100%;
  height: 200px;
  box-sizing: border-box;
  padding-left: 16px;
  margin-bottom: 16px;
}

.bt7132 {
  display: flex;
  margin-top: 16px;
  justify-content: center;
}

.bt7133 {
  width: 100%;
  max-width: 213px;
}

.bt7082 {
  color: #ffffff;
  font-size: 22px;
  font-weight: 600;
  line-height: 27px;
  margin-bottom: 16px;
}

.bt7083 {
  display: flex;
  align-items: center;
}

.bt7084 {
  cursor: pointer;
}

.bt7786 {
  margin-top: 24px;
}

.bt7845 {
  color: #ffffff;
  border: 1px solid transparent;
  cursor: pointer;
  display: flex;
  opacity: 1;
  padding: 16px;
  background: #111923;
  box-sizing: border-box;
  min-height: 204px;
  transition: opacity 0.5s;
  align-items: center;
  border-color: #111923;
  border-radius: 6px;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
}

.bt7846 {
  margin-bottom: 24px;
}

.bt7847 {
  padding: 24px 0;
  min-height: auto;
  flex-direction: row;
}

.bt7847 .bt7846 {
  flex: 0 0 auto;
  margin: 0;
}

.bt7847 .bt7848 {
  flex: 0 0 auto;
  margin: 0 24px;
}

.bt7847 .bt7849 {
  flex: 0 0 auto;
}

.bt7848 {
  color: #ffffff;
  margin: 0 0 24px;
  font-size: 24px;
  text-align: center;
  font-weight: 300;
  line-height: 40px;
  text-shadow: 0 2px 24px 0 rgba(0, 0, 0, 0.2);
}

.bt7849 {
  color: #ffffff;
  height: 32px;
  display: inline-block;
  padding: 0 40px;
  font-size: 12px;
  background: #3a07f2;
  font-weight: bold;
  line-height: 32px;
  border-color: #3a07f2;
  border-radius: 24px;
  text-transform: uppercase;
}

@media (hover: hover) {
  .bt7849:hover {
    opacity: 0.75;
  }
}

.bt7072 {
  display: flex;
  align-items: center;
}

.bt7073 {
  flex: 0 0 auto;
  height: 152px;
  overflow: hidden;
  box-sizing: content-box;
  padding-right: 16px;
}

.bt7073:last-of-type {
  padding-right: 0;
}

.bt7074 {
  height: 152px;
  display: flex;
  align-items: center;
}

.bt7075 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.bt7075 img {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 8px;
}

.bt6234 {
  width: 100%;
  padding: 16px;
  position: relative;
  box-sizing: border-box;
}

.bt7030 {
  color: #ffffff;
  padding: 8px;
  position: relative;
  font-size: 14px;
  background: #111923;
  transition: background 0.5s;
  font-weight: 600;
  border-radius: 6px;
  margin-bottom: 8px;
}

.bt7031 {
  color: #ffffff;
  background: #19212b;
  margin-bottom: 8px;
}

.bt7032 {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.bt7033 {
  color: #3a07f2;
}

.bt7034 {
  top: 12px;
  right: 8px;
  cursor: pointer;
  position: absolute;
}

.bt7027 {
  margin-left: 8px;
}

.bt7028 {
  height: 0;
  overflow: hidden;
}

.bt7029 {
  height: auto;
  padding-top: 8px;
}

.bt3733 {
  width: 100%;
  display: flex;
  position: relative;
  background: #111923;
  box-shadow: none;
  box-sizing: border-box;
  align-items: center;
  padding-left: 8px;
  padding-right: 8px;
  justify-content: space-between;
}

.bt3735 {
  transform: rotate(180deg);
  margin-right: 8px;
}

.bt7025 {
  color: #ffffff;
  cursor: pointer;
  display: flex;
  padding: 8px;
  font-size: 12px;
  background: #19212b;
  box-sizing: border-box;
  margin-top: 8px;
  transition: opacity 0.5s;
  align-items: center;
  font-weight: 600;
  line-height: 14px;
  border-radius: 6px;
}

@media (hover: hover) {
  .bt7025:hover {
    opacity: 0.5;
  }
}

.bt7026 {
  color: #ffffff;
  background: #3a07f2;
}

.bt7024 {
  margin-right: 8px;
}

.bt7019 {
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  height: 40px;
  display: flex;
  position: relative;
  font-size: 11px;
  align-items: center;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.bt7020 {
  margin-right: 10px;
}

.bt7021 {
  top: 8px;
  right: 0;
  z-index: 2;
  position: absolute;
}

.bt7023 {
  height: 0;
  overflow: hidden;
}

.bt3771 {
  color: rgba(255, 255, 255, 0.5);
  height: 88px;
  display: flex;
  padding: 0 16px;
  background: #19212b;
  box-sizing: border-box;
  align-items: center;
  border-radius: 6px;
}

.bt3772 {
  padding: 0 8px 0 24px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.4px;
  vertical-align: middle;
}

.bt3773 {
  margin-left: 4px;
  vertical-align: middle;
}

.bt3774 {
  flex: none;
}

.bt3763 {
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  height: 40px;
  display: flex;
  position: relative;
  font-size: 11px;
  align-items: center;
  font-weight: 600;
  line-height: 13px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.bt3764 {
  margin-right: 10px;
}

.bt3765 {
  top: 8px;
  right: 0;
  z-index: 2;
  position: absolute;
}

.bt3767 {
  height: 0;
  overflow: hidden;
}

.bt3768 {
  margin-bottom: 8px;
}

.bt3768:last-of-type {
  margin-bottom: 0;
}

.bt3724 {
  color: #ffffff;
  width: 320px;
  height: 100%;
  position: relative;
  background: #111923;
  box-shadow: none;
  border-color: #111923;
}

.bt3725 {
  position: relative;
  height: 64px;
  display: flex;
  background: #111923;
  align-items: center;
  justify-content: space-between;
}

.bt3726 {
  padding: 0 16px;
  margin-bottom: 8px;
}

.bt3727 {
  padding: 0 8px;
}

.bt3727 .bt3729 {
  padding: 0 8px;
}

.bt3728 {
  padding: 0 8px;
  margin-top: 8px;
}

.bt3729 {
  color: rgba(255, 255, 255, 0.5);
  height: 40px;
  display: flex;
  position: relative;
  font-size: 11px;
  align-items: center;
  font-weight: 600;
  line-height: 13px;
  margin-bottom: 8px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.bt3730 {
  margin-right: 10px;
}

.bt3731 {
  vertical-align: text-top;
}

.bt3732 {
  width: 100%;
  height: auto;
  background-color: transparent;
}

.bt5136 {
  flex: 1;
  position: relative;
}

.bt5388 {
  color: #ffffff;
  display: flex;
  padding: 24px 16px 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-sizing: border-box;
  flex-direction: column;
}

.bt5389 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.bt5390 {
  min-width: 48px;
  margin-right: 16px;
}

.bt5391 {
  display: flex;
  flex-direction: column;
}

.bt5392 {
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
}

.bt5393 {
  font-size: 12px;
  margin-top: 8px;
  font-weight: 600;
  line-height: 16px;
}

.bt5394 {
  width: 240px;
  margin: 24px auto 0;
}

.bt5225 {
  position: relative;
}

.bt5226 .bt5227 {
  padding: 16px 16px 0px;
}

.bt5226 .bt5236 {
  margin-top: 0;
}

.bt5227 {
  padding: 16px 8px 0px;
}

.bt5228 {
  padding: 16px;
}

.bt5229 {
  margin: 8px 4px 2px 4px;
}

.bt5230 {
  margin: 0;
}

.bt5231 {
  transform: translateY(0);
  transition: transform 0.3s;
}

.bt5232 {
  transform: translateY(0);
}

.bt5233 {
  transform: translateY(15px);
  transition: transform 0.2s;
}

.bt5234 {
  margin-bottom: 16px;
}

.bt5235 {
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  padding: 0 0 12px;
  z-index: 3;
  position: absolute;
  box-sizing: border-box;
}

.bt5236 {
  margin-top: 8px;
}

.bt5112 {
  display: flex;
  flex-direction: column;
}

.bt5113 {
  display: flex;
  overflow: auto;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
}

.bt5113::-webkit-scrollbar {
  width: 8px;
  background-color: rgba(0, 0, 0, 0.15);
  -webkit-border-radius: 100px;
}

.bt5113::-webkit-scrollbar-thumb:vertical {
  background: rgba(255, 255, 255, 0.15);
  -webkit-border-radius: 100px;
}

.bt5113::-webkit-scrollbar-thumb:vertical:active {
  background: rgba(255, 255, 255, 0.15);
  -webkit-border-radius: 100px;
}

.bt5113::-webkit-scrollbar:hover {
  background-color: rgba(255, 255, 255, 0.15);
}

.bt5114 {
  flex: 1;
  display: flex;
  position: relative;
  min-height: 105px;
  flex-direction: column;
}

.bt5115 {
  min-height: 169px;
}

.bt5116 {
  display: flex;
  overflow: hidden;
  max-height: 105px;
  flex-direction: column;
}

.bt5116.bt5115 {
  max-height: initial;
}

.bt5117 {
  transform: translateY(-100%);
  will-change: transform;
}

.bt5118 {
  transform: translateY(0);
  transition: transform 0.3s ease-in-out;
}

.bt5119 {
  transform: translateY(0);
}

.bt5120 {
  transform: translateY(-100%);
  transition: transform 0.2s ease-in-out;
}

.bt5121 {
  top: 0;
  position: absolute;
  min-width: 100%;
}

.bt5122 {
  opacity: 0;
  pointer-events: none;
}

.bt5123 {
  opacity: 1;
  transition: opacity 0.3s linear;
  pointer-events: auto;
}

.bt5124 {
  opacity: 1;
  pointer-events: auto;
}

.bt5125 {
  opacity: 0;
  transition: opacity 0.2s linear;
  pointer-events: none;
}

.bt5126 {
  flex: 1;
  z-index: 1;
}

.bt4514 {
  overflow: hidden;
  position: relative;
}

.bt4515 {
  overflow: auto;
  overflow-x: hidden;
}

.bt4516 {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 4;
  position: absolute;
}

.bt3718 {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
}

.bt3719 {
  flex: 1;
  width: 100%;
  display: flex;
  position: relative;
  box-sizing: border-box;
}

.bt3720 {
  width: 320px;
}

.bt3721 {
  width: calc(100% - 320px);
  position: relative;
  box-sizing: border-box;
}

.bt3722 .bt3719 {
  flex-direction: column;
}

.bt3722 .bt3720 {
  flex: 0 0 auto;
  width: 100%;
}

.bt3722 .bt3721 {
  flex: 1;
  width: 100%;
  overflow: visible;
}

.bt3723 {
  box-sizing: border-box;
  margin-bottom: 16px;
}

.bt4513 {
  width: 32px;
  height: 32px;
}

.bt4501 {
  display: flex;
  flex-basis: 126px;
  align-items: center;
  justify-content: center;
}

.bt4502 {
  flex: none;
  width: 52px;
  border: 2px solid;
  background: rgba(0, 0, 0, 0);
  border-color: #ffffff;
}

.bt4503 {
  background: #ffffff;
  border-color: transparent;
}

.bt4503 .bt4504 {
  color: #ffffff;
  transform: translateX(28px);
  background: #fa305c;
}

.bt4504 {
  top: 1px;
  left: 1px;
  color: #3a07f2;
  background: #ffffff;
}

.bt4505 {
  color: #ffffff;
  font-size: 10px !important;
  text-align: right;
  font-weight: 700;
  line-height: 12px;
  margin-right: 8px;
  text-transform: uppercase;
}

.bt4506 {
  color: #ffffff;
}

.bt4485 {
  overflow: hidden;
  font-size: 16px !important;
  text-overflow: ellipsis;
}

.bt4486 {
  fill: currentColor;
  flex: none;
  width: 16px;
  cursor: pointer;
  height: 16px;
  opacity: 0.5;
  margin-left: 4px;
}

.bt4487 {
  transform: rotate(180deg);
}

.bt4488 {
  flex: none;
  margin-right: 4px;
}

.bt4489 {
  top: 0;
  flex: none;
  left: 0;
  color: #3a07f2;
  width: 20px;
  height: 20px;
  display: flex;
  position: relative;
  font-size: 14px;
  transform: scale(0);
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  align-items: center;
  font-weight: 600;
  line-height: 20px;
  margin-left: 8px;
  border-radius: 50%;
  justify-content: center;
}

.bt4489:after {
  top: 0;
  width: 100%;
  height: 100%;
  content: "";
  display: block;
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
}

.bt4490 {
  animation: bt4493 0.6s ease-in-out forwards;
}

.bt4491 {
  transform: scale(1);
}

.bt4492 {
  transform: scale(0);
  transition: transform 0.2s ease-in-out;
}

@-webkit-keyframes bt4493 {
  0% {
    transform: scale(0);
  }

  35% {
    transform: scale(1.2);
  }

  55% {
    transform: scale(1.3);
  }

  65% {
    transform: scale(1);
  }

  80% {
    transform: scale(0.8);
  }

  100% {
    transform: scale(1);
  }
}

.bt4494 {
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
}

.bt4495 {
  color: #ffffff;
  cursor: pointer;
  height: 56px;
  display: flex;
  padding: 0 16px;
  z-index: 1;
  position: relative;
  background: #3a07f2;
  box-sizing: border-box;
  align-items: center;
  border-radius: 6px 6px 0px 0px;
  justify-content: space-between;
}

.bt4495:before {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  content: "";
  opacity: 0;
  z-index: -1;
  position: absolute;
  background: linear-gradient(to right, #3a07f2, #fa305c);
  transition: opacity 300ms ease-in-out;
  border-radius: inherit;
}

.bt4496 {
  color: #ffffff;
}

.bt4496:before {
  opacity: 1;
}

.bt4497 {
  flex: 1;
  display: flex;
  font-size: 16px;
  min-width: 0;
  align-items: center;
  font-weight: 600;
}

.bt4498 {
  width: 20px;
  height: 20px;
  z-index: 1000;
  position: absolute;
  background: #ffffff;
  border-radius: 50%;
}

.bt4499 {
  width: 32px;
  height: 32px;
  margin-right: 8px;
}

.bt4476 {
  transition: all 300ms ease-in-out;
}

.bt4477 {
  opacity: 1;
  transform: translateY(0);
}

.bt4478 {
  opacity: 1;
  transform: translateY(0);
}

.bt4483 {
  transition: height 300ms ease-in-out;
  will-change: height;
}

.bt4484 {
  transition: none;
}

.spt-bet-slip {
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  position: fixed;
  pointer-events: none;
}

.bt-theme-editor__elements * {
  pointer-events: none;
}

.bt-theme-editor__elements *[data-editor-id] {
  cursor: pointer;
  pointer-events: auto;
}

.bt4460 {
  top: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  position: absolute;
}

.bt4461 .bt4462 .bt4466 {
  background: #111923;
  border-radius: 16px 16px 0 0;
}

.bt4462 {
  width: 320px;
  bottom: -120px;
  margin: 0 4px;
  position: absolute;
}

.bt4463 {
  transform: translateY(-120px);
  transition: transform 300ms ease-in-out;
}

.bt4464 {
  transform: translateY(-120px);
}

.bt4465 {
  transform: translateY(0);
  transition: transform 300ms ease-in-out;
}

.bt4466 {
  left: 0;
  right: 0;
  bottom: 120px;
  position: absolute;
  background: #111923;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.65);
  text-shadow: none;
  border-radius: 6px 6px 0 0;
  pointer-events: auto;
}

.bt4467 {
  left: 50%;
  position: absolute;
  margin-left: -29px;
  pointer-events: auto;
}

.bt4468 {
  position: absolute;
  pointer-events: auto;
}

.bt4469 {
  left: 0;
  right: 0;
  bottom: 0;
  height: 120px;
  position: absolute;
  background: #19212b;
  pointer-events: auto;
}

@media (max-width: 600px) {
  .bt4462 {
    width: calc(100% - 8px);
    box-sizing: border-box;
  }

  .bt4461 .bt4462 {
    width: 100%;
    margin: 0;
  }
}

.bt4460 * {
  box-sizing: border-box;
  word-break: keep-all;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

.bt3725 {
  text-align: center;
}
.bt3725 .iconfont {
  cursor: pointer;
  font-size: 22px !important;
}
.bt3725 .col {
  flex: 1;
}
.collapse-cells ::v-deep .el-collapse-item__header {
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  border-bottom: 0;
  height: 32px;
  line-height: 32px;
}
.collapse-cells ::v-deep .el-collapse-item__content {
  padding-bottom: 0;
}
.collapse-cells ::v-deep .el-collapse-item__wrap {
  background-color: transparent;
  border-bottom: 0 !important;
}
.collapse-cells ::v-deep .el-collapse {
  border-top: 0;
  border-bottom: 0;
}
.collapse-top-cells {
  padding: 0 16px;
}
.collapse-top-cells .el-collapse-item {
  margin-bottom: 12px;
}
.bt7019 .iconfont {
  margin-right: 10px;
  font-weight: normal;
  font-size: 12px;
}
.bt3730 .iconfont {
  font-weight: normal;
  font-size: 12px;
}
.bt7025 .ico {
  margin-right: 10px;
}
.collapse-main-cells .collapse-list {
  margin-top: 8px;
}
.collapse-main-cells .el-collapse-item {
  color: #ffffff;
  padding: 8px;
  position: relative;
  font-size: 14px;
  background: #111923;
  transition: background 0.5s;
  font-weight: 600;
  border-radius: 6px;
  margin-bottom: 8px;
}
.collapse-main-cells .el-collapse-item.is-active {
  background: #19212b;
}
.bt99 {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.bt99 .iconfont {
  font-size: 22px;
  margin-right: 10px;
}
.bt99 .tit {
  font-weight: 600;
}
.bt1387 {
  color: #ffffff;
  cursor: pointer;
  display: flex;
  padding: 8px;
  font-size: 13px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  align-items: center;
  font-weight: 400;
}
.bt1387 span {
  font-size: 13px;
}
.bt1387 .ico {
  margin-right: 10px;
  /* background: #FFF; */
}
.bt1375 {
  color: rgba(255, 255, 255, 0.5);
  height: 88px;
  display: flex;
  padding: 0 16px;
  background: #19212b;
  box-sizing: border-box;
  align-items: center;
  border-radius: 6px;
}
.bt1375 .iconfont {
  background-color: transparent;
  font-size: 40px;
}
.bt1376 {
  padding: 0 8px 0 24px;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.4px;
  vertical-align: middle;
}
.bt1377 {
  margin-left: 4px;
  vertical-align: middle;
}
.bt1378 {
  flex: none;
}
.bt1486 {
  color: #ffffff;
  border: 2px solid transparent;
  cursor: pointer;
  position: relative;
  background: #19212b;
  transition: all 0.5s;
  font-weight: 500;
  border-color: #19212b;
  border-radius: 6px;
  margin-top: 8px;
}

.bt1487 {
  margin-right: 8px;
}

.bt1488 {
  border-color: #3a07f2;
}

.bt1489 {
  display: flex;
}

.bt1490 {
  flex: 1;
  display: flex;
  padding: 1px 0 1px 8px;
  overflow: hidden;
  font-weight: inherit;
  flex-direction: column;
  justify-content: center;
}

.bt1491 {
  flex: 0 0 auto;
  display: flex;
  padding: 0 8px;
  box-sizing: border-box;
  text-align: right;
  flex-direction: column;
  justify-content: center;
}

.bt1492 {
  margin: 8px 0;
  font-size: 20px;
  text-align: right;
  line-height: 20px;
}

.bt1493 {
  margin: 8px 0;
  display: flex;
  overflow: hidden;
  font-size: 14px;
}

.bt1494 {
  color: #ffffff;
  display: flex;
  position: relative;
  box-sizing: border-box;
  padding-top: 4px;
  padding-left: 4px;
  border-bottom: 1px solid;
  padding-right: 4px;
  padding-bottom: 2px;
  border-bottom-color: rgba(255, 255, 255, 0.1);
}

.bt1495 {
  color: #ffffff;
  height: 25px;
  display: flex;
  padding: 2px 4px;
  font-size: 12px;
  border-top: 1px solid;
  box-sizing: border-box;
  align-items: center;
  border-top-color: rgba(255, 255, 255, 0.1);
}

.bt1496 {
  width: 100%;
  height: 20px;
  display: inline-block;
  overflow: hidden;
  position: relative;
  font-size: 14px;
  word-break: break-all;
  line-height: 20px;
  vertical-align: middle;
  -webkit-mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
}

.bt1497 {
  width: 20px;
  height: 20px;
  display: inline-block;
  margin-right: 8px;
  vertical-align: middle;
  font-size: 0;
}

.bt1497 img {
  width: auto;
  height: 100%;
}

.bt1498 {
  flex: 0 0 auto;
  color: #21a8f7;
  height: 16px;
  display: flex;
  z-index: 1;
  align-items: center;
}

.bt1498:last-of-type {
  text-align: right;
}

.bt1499 {
  color: #ffffff;
}

.bt1500 {
  margin-right: 8px;
}

.bt1501 {
  flex: 1;
  color: rgba(255, 255, 255, 0.5);
  height: 16px;
  display: flex;
  overflow: hidden;
  position: relative;
  align-items: center;
  font-weight: 600;
  -webkit-mask-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 1) 80%,
    rgba(0, 0, 0, 0) 100%
  );
}

@media (hover: hover) {
  .bt1486:not(.bt1488):hover {
    background: rgba(25, 33, 43, 0.5);
  }
}

.bt1502 {
  color: #ffffff;
  width: 100%;
  height: 73px;
  display: flex;
  font-size: 14px;
  align-items: center;
  font-weight: 600;
  justify-content: center;
}
.bt1505 {
  color: rgba(255, 255, 255, 0.5);
}
.bt1109 .iconfont {
  color: rgba(255, 255, 255, 0.5);
  margin-right: 5px;
  font-size: 12px;
}
.collapse-cells ::v-deep .el-icon-arrow-right {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}
.collapse-cells ::v-deep .el-collapse-item__arrow.is-active {
  transform: rotate(0);
}
.collapse-cells ::v-deep .el-icon-arrow-right:before {
  content: "\e6d9";
  color: #ffffff;
}
.collapse-cells ::v-deep .is-active .el-icon-arrow-right:before {
  content: "\e6d8";
}
.gm-header {
  display: flex;
  align-items: center;
}
.gm-header .bt7090 .iconfont {
  font-weight: normal;
  font-size: 24px;
}
.gm-header .icon-v {
  color: rgb(245, 166, 35);
}
.gm-header .el-icon-caret-bottom {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 5px;
}
.gm-list-title .iconfont {
  font-size: 10px;
  margin-right: 5px;
}
.gm-list-title {
  color: rgba(255, 255, 255, 0.5);
}
.gm-list-title:hover {
  color: rgba(255, 255, 255, 1);
}
.gm-action .iconfont {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

.show-more h2 {
  margin: 20px 0 0;
  font-size: 16px;
}

.show-more h2,
.show-more h3,
.show-more h4 {
  color: #93acd3;
  font-weight: 600;
}

.show-more strong {
  font-weight: 700;
}

.show-more h3,
.show-more h4 {
  margin: 20px 0 0;
  font-size: 14px;
}

.show-more li,
.show-more p {
  color: #55657e;
  font-size: 14px;
}

.show-more ul {
  list-style: disc outside;
  padding-left: 25px;
}

.show-more li {
  margin: 20px 0 0;
}

.show-more li:last-of-type {
  margin-bottom: 20px;
}

.show-more p + p {
  margin-top: 20px;
}

.show-more a {
  text-decoration: none;
}

.show-more__btn {
  display: block;
  margin: 10px auto 0;
}

.show-more__btn .button__icon {
  opacity: 0.5;
  transition: all 0.2s;
}

.show-more__btn--rotate-icon .button__icon {
  transform: rotate(180deg);
}

.show-more__content {
  max-height: var(--max-height);
  overflow: hidden;
  position: relative;
  transition: all 0.4s ease-in-out;
}

.show-more__content:after {
  content: "";
  width: 100%;
  height: 130px;
  background: linear-gradient(180deg, rgba(13, 19, 28, 0), #0d131c);
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  pointer-events: none;
}

.show-more__content--full {
  max-height: var(--full-height);
}

.show-more__content--full:after {
  display: none;
}
.splide__arrow {
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
  height: 100%;
  z-index: 99;
  transition: background-color 0.1s ease-in-out;
}

.splide__arrow:hover {
  background: rgba(13, 19, 28, 0.6);
}

.splide__arrow:hover .button {
  opacity: 1;
}

.splide__arrow .button {
  opacity: 0.6;
  transition: opacity 0.1s ease-in-out;
}

.splide__arrow--prev {
  left: 0;
}

.splide__arrow--next {
  right: 0;
}
.bt20774 {
  top: 64px;
  left: 0;
  width: 100%;
  z-index: 99;
  overflow: hidden;
  position: absolute;
  padding-bottom: 50px;
}
.bt24558 {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;
}
.bt20782 {
    color: #ffffff;
    width: 100%;
    position: relative;
    background: #19212b;
    box-shadow: none;
    box-sizing: border-box;
    padding-top: 60px;
}
.bt20784 {
    display: flex;
    padding: 0 16px;
    flex-wrap: wrap;
    box-sizing: border-box;
    justify-content: left;
}
.bt24559 {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: left;
}
.bt24561 {
    flex: 0 0 33.333%;
    display: flex;
    max-width: 33.333%;
    min-height: 70px;
    margin-bottom: 32px;
    justify-content: center;
}
.bt24563 {
    color: inherit;
    cursor: pointer;
    display: flex;
    max-width: 104px;
    box-sizing: border-box;
    text-align: center;
    align-items: center;
    flex-direction: column;
    justify-content: flex-start;
    text-decoration: none;
}
.bt24560 {
    color: #ffffff;
}
.bt24566 {
    width: 32px;
    height: 32px;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
}
.bt24568 {
    hyphens: auto;
    opacity: 0.7;
    font-size: 12px;
    margin-top: 8px;
    transition: opacity 0.5s;
}
.bt24565 {
    opacity: 0.5;
    transition: opacity 0.5s;
}
.bt24564 .bt24565, .bt24564 .bt24568 {
    opacity: 1;
}
</style>
