<template>
  <footer class="footer">
    <!--  <livechat></livechat> -->
    <div class="container">
      <div class="footer__inner">
        <div class="footer__menus text-white">
          <div v-if="gameClassification.length > 0" class="submenu" :class="menuOpened == 'A' ? 'opened' : ''"
            @click="handleMenuOpen('A')">
            <p>{{ $t('游戏') }}</p>
            <svgIcon icon="icon-arrow" widthName="24" heightName="24"></svgIcon>
            <ul>
              <li v-for="(item2, index2) in gameClassification" :key="`submenu${index2}`">
                <router-link :to="`/all-game?tab=${item2.id}`">{{ $t(item2.name) }}</router-link>
              </li>
            </ul>
          </div>
          <!-- <div class="submenu" :class="menuOpened == 'B' ? 'opened' : ''" @click="handleMenuOpen('B')" v-for="(item,index) in menuB" :key="`menuB${index}`">
            <p>{{ $t(item.name) }}</p>
            <svgIcon icon="icon-arrow" widthName="24" heightName="24"></svgIcon>
            <ul>
              <li v-for="(item2,index2) in item.submenu" :key="`itemSubmenu${index2}`">
                <router-link v-if="item2.url" :to="item2.url">{{ $t(item2.name) }}</router-link>
              </li>
            </ul>
          </div> -->
          <!-- <div class="submenu" :class="menuOpened == 'C' ? 'opened' : ''" @click="handleMenuOpen('C')" v-for="(item,index) in menuC" :key="`menuC${index}`">
            <p>{{ $t(item.name) }}</p>
            <svgIcon icon="icon-arrow" widthName="24" heightName="24"></svgIcon>
            <ul>
              <li v-for="(item2,index2) in item.submenu" :key="`itemSubmenu2${index2}`">
                <router-link v-if="item2.url" :to="item2.url">{{ $t(item2.name) }}</router-link>
              </li>
            </ul>
          </div>
          <div class="submenu" :class="menuOpened == 'D' ? 'opened' : ''" @click="handleMenuOpen('D')" v-for="(item,index) in menuD" :key="`menuD${index}`">
            <p>{{ $t(item.name) }}</p>
            <svgIcon icon="icon-arrow" widthName="24" heightName="24"></svgIcon>
            <ul>
              <li v-for="(item2,index2) in item.submenu" :key="`itemSubmenu3${index2}`" v-if="item2.show != 'hidden'">
                <router-link v-if="item2.url" :to="item2.url">{{ $t(item2.name) }}</router-link>
              </li>
            </ul>
          </div> -->
          <div class="submenu" :class="menuOpened == 'E' ? 'opened' : ''" @click="handleMenuOpen('E')"
            v-for="(item, index) in menuE" :key="`menuE${index}`">
            <p>{{ $t(item.name) }}</p>
            <svgIcon icon="icon-arrow" widthName="24" heightName="24"></svgIcon>
            <ul>
              <li v-for="(item2, index2) in item.submenu" :key="`itemSubmenu4${index2}`">
                <router-link v-if="item2.url" :to="item2.url">{{ $t(item2.name) }}</router-link>
              </li>
              <li>
                <span @click="showTC(10)" class="menu-link">
                  {{ $t('Privacy Policy') }}
                  <svgIcon icon="icon-share" className="shareicon" widthName="12" heightName="12"></svgIcon>
                </span>
              </li>
              <li>
                <span @click="showTC(5)" class="menu-link">
                  {{ $t('Terms of Service') }}
                  <svgIcon icon="icon-share" className="shareicon" widthName="12" heightName="12"></svgIcon>
                </span>
              </li>
              <li>
                <span @click="showTC(9)" class="menu-link">
                  {{ $t('Sportsbetting TC') }}
                  <svgIcon icon="icon-share" className="shareicon" widthName="12" heightName="12"></svgIcon>
                </span>
              </li>
            </ul>
          </div>
          <div>
            <!-- <p class="join_community">加入我们的社区</p> -->
            <div class="social">
              <div class="social-icons">
                <a v-if="this.$t('telegram_is_hidden') != 1"
                  :href="isMobileFlag ? $helper.get('rule').mobile_service_url : $helper.get('rule').pc_service_url"
                  target="_blank" rel="noreferrer"
                  class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
                  style="--bg:linear-gradient(135deg, #18C8FF 0%, #0080DC 100%); --width:32px;">
                  <div class="social-icons__tooltip">Telegram</div>
                  <span class="iconfont icon-telegram-plane"></span>
                </a>
                <a :href="$t('instagram_public_url')" v-if="this.$t('instagram_public_url') != 'instagram_public_url'"
                  target="_blank" rel="noreferrer"
                  class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
                  style="--width:32px;">
                  <div class="social-icons__tooltip">Instagram</div>
                  <img src="@/assets/images/instagram.png" class="social-icons__icon__img">

                </a>
                <a :href="$t('facebook_public_url')" v-if="this.$t('facebook_public_url') != 'facebook_public_url'"
                  target="_blank"
                  class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
                  style="--bg:#1877f2; --width:32px;">
                  <div class="social-icons__tooltip">Facebook</div>
                  <span class="iconfont icon-facebook"></span>
                </a>
                <a :href="$t('tiktok_public_url')" v-if="this.$t('tiktok_public_url') != 'tiktok_public_url'"
                  target="_blank" rel="noreferrer"
                  class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
                  style="--bg:linear-gradient(135deg, #00C2FF 0%, #1875FF 31.77%, #FF002E 100%); --width:32px;">
                  <div class="social-icons__tooltip">Tiktok</div>
                  <span class="iconfont icon-tiktok"></span>
                </a>
                <a v-if="this.$t('line_public_url') != 'line_public_url'" :href="$t('line_public_url')" target="_blank"
                  rel="noreferrer"
                  class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
                  style="--bg:#00b900; --width:32px;">
                  <div class="social-icons__tooltip">LINE</div>
                  <span class="iconfont icon-line"></span>
                </a>
                <a v-if="this.$t('zalo_public_url') != 'zalo_public_url'" :href="$t('zalo_public_url')" target="_blank"
                  rel="noreferrer"
                  class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
                  style="--bg:#0090e6; --width:32px;">
                  <div class="social-icons__tooltip">Zalo</div>
                  <span class="iconfont icon-3" style="font-size:24px">
                  </span>
                </a>
                <a v-if="this.$t('whatsapp_public_url') != 'whatsapp_public_url'" :href="$t('whatsapp_public_url')"
                  target="_blank" rel="noreferrer"
                  class="social-icons__icon social-icons__icon--scale social-icons__icon--show-tip"
                  style="--bg:#0090e6; --width:32px;">
                  <div class="social-icons__tooltip">Whatsapp</div>
                  <img src="@/assets/images/whatsapp.png" class="social-icons__icon__img">
                </a>
              </div>
            </div>
          </div>
          <div class="footer-info">
            <!-- <i>18+</i> -->
            <!-- <span class="siq">
              <img width="48" height="22" v-lazy="siqpic" alt="SIQ" />
            </span>
            <img v-lazy="gcpic" alt width="120" height="45" /> -->
            <img src="../assets/images/eighteen.png" alt="">
            <p>
              {{ $t('18plus_desc') }}
            </p>
          </div>
        </div>
        <!-- <div class="footer-swiper">
          <swiper class="footer-logos" :options="swiperlogos" ref="swiperlogos">
            <swiper-slide v-for="(item,index) in logotypelist" :key="index">
              <div class="footer-logos__image">
                <el-image :src="item.pic" lazy></el-image>
              </div>
            </swiper-slide>
          </swiper>
        </div> -->
  <!--       <div class="social">
          <div class="social-icons">
            <a v-if="this.$t('telegram_is_hidden') != 1"
              :href="isMobileFlag ? $helper.get('rule').mobile_service_url : $helper.get('rule').pc_service_url"
              target="_blank" rel="noreferrer"
              class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
              style="--bg:linear-gradient(135deg, #18C8FF 0%, #0080DC 100%); --width:32px;">
              <div class="social-icons__tooltip">Telegram</div>
              <span class="iconfont icon-telegram-plane"></span>
            </a>
            <a :href="$t('instagram_public_url')" v-if="this.$t('instagram_public_url') != 'instagram_public_url'"
              target="_blank" rel="noreferrer"
              class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
              style="--width:32px;">
              <div class="social-icons__tooltip">Instagram</div>
              <img src="@/assets/images/instagram.png" class="social-icons__icon__img">

            </a>
            <a :href="$t('facebook_public_url')" v-if="this.$t('facebook_public_url') != 'facebook_public_url'"
              target="_blank"
              class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
              style="--bg:#1877f2; --width:32px;">
              <div class="social-icons__tooltip">Facebook</div>
              <span class="iconfont icon-facebook"></span>
            </a>
            <a :href="$t('tiktok_public_url')" v-if="this.$t('tiktok_public_url') != 'tiktok_public_url'"
              target="_blank" rel="noreferrer"
              class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
              style="--bg:linear-gradient(135deg, #00C2FF 0%, #1875FF 31.77%, #FF002E 100%); --width:32px;">
              <div class="social-icons__tooltip">Tiktok</div>
              <span class="iconfont icon-tiktok"></span>
            </a>
            <a v-if="this.$t('line_public_url') != 'line_public_url'" :href="$t('line_public_url')" target="_blank"
              rel="noreferrer"
              class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
              style="--bg:#00b900; --width:32px;">
              <div class="social-icons__tooltip">LINE</div>
              <span class="iconfont icon-line"></span>
            </a>
            <a v-if="this.$t('zalo_public_url') != 'zalo_public_url'" :href="$t('zalo_public_url')" target="_blank"
              rel="noreferrer"
              class="social-icons__icon social-icons__icon--background social-icons__icon--scale social-icons__icon--show-tip"
              style="--bg:#0090e6; --width:32px;">
              <div class="social-icons__tooltip">Zalo</div>
              <span class="iconfont icon-3" style="font-size:24px">
              </span>
            </a>
            <a v-if="this.$t('whatsapp_public_url') != 'whatsapp_public_url'" :href="$t('whatsapp_public_url')"
              target="_blank" rel="noreferrer"
              class="social-icons__icon social-icons__icon--scale social-icons__icon--show-tip"
              style="--bg:#0090e6; --width:32px;">
              <div class="social-icons__tooltip">Whatsapp</div>
              <img src="@/assets/images/whatsapp.png" class="social-icons__icon__img">
            </a>
          </div>
          <p class="copyright">{{ $t('copyright_foot') }}</p>
        </div> -->
        <p class="copyright">{{ $t('copyright_foot') }}</p>
      </div>
    </div>
    <el-dialog :visible.sync="tcVisible" custom-class="custom-dialog" :modal-append-to-body="false">
      <div class="custom-dialog-head" slot="title">
        <div class="header__title">
          <h1>{{ tcTitle }}</h1>
        </div>
      </div>
      <div class="news__body" v-html="tcContent"></div>
    </el-dialog>
  </footer>
</template>

<script>
import svgIcon from "@/components/svg.vue";
import livechat from "@/components/liveChat.vue";
import { rule_index_api } from "@/api/index";
import { game_get_type_api } from "@/api/cybSports";
export default {
  components: {
    svgIcon, livechat
  },
  name: "Foot",
  data() {
    return {
      isShowChat: false,
      tcVisible: false,
      tcContent: '',
      tcTitle: '',
      menuOpened: '',
      gameClassification: [],
      menuA: [
        {
          name: "游戏",
          submenu: [
            {
              name: "All games",
              url: "/all-game"
            },
            {
              name: "区块链游戏",
              url: "/all-game?tab=DICE"
            },
            {
              name: "真人在线",
              url: "/all-game?tab=SLOTS"
            },
            {
              name: "电子游戏",
              url: "/all-game?tab=LIVE"
            },
            {
              name: "体育",
              url: "/sport-betting"
            },
            {
              name: "彩票",
              url: "/all-game?tab=lottery"
            }
          ]
        }
      ],
      menuB: [
        {
          name: "Features",
          submenu: [
            {
              name: "收益池",
              url: "/fund"
            },
            {
              name: "Cashback",
              url: "/cashback"
            }
          ]
        }
      ],
      menuC: [
        {
          name: "Promo",
          submenu: [
            {
              name: "Promo Materials",
              url: "/promo-materials"
            }
          ]
        }
      ],
      menuD: [
        {
          name: "About us",
          submenu: [
            {
              name: "News",
              url: "/news",
              show: this.$store.state.mediaShow
            },
            {
              name: "关于运动",
              url: "/about-sport",
            },
            {
              name: "About Cyber Raccoon Team",
              url: "/about-team"
            },
            // {
            //   name: "Official Mirrors",
            //   url: "/mirrors"
            // }
          ]
        }
      ],
      menuE: [
        {
          name: "HELP",
          submenu: [
            {
              name: "Fairness",
              url: "/fairness"
            },
            {
              name: "Responsible Gambling",
              url: "/responsible-gambling"
            }
          ]
        }
      ],
      swiperlogos: {
        loop: true,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        slidesPerView: "auto",
        spaceBetween: 16
      },
      logotypelist: [
        {
          pic: require("../assets/images/stakelogic@1x.png")
        },
        {
          pic: require("../assets/images/vulkania@1x.png")
        },
        {
          pic: require("../assets/images/slotegrator@1x.png")
        },
        {
          pic: require("../assets/images/stormgaming@1x.png")
        },
        {
          pic: require("../assets/images/sthlmgaming@1x.png")
        },
        {
          pic: require("../assets/images/softgaming@1x.png")
        },
        {
          pic: require("../assets/images/hotbit@1x.png")
        },
        {
          pic: require("../assets/images/bitcoin@1x.png")
        },
        {
          pic: require("../assets/images/coinmarketcap@1x.png")
        },
        {
          pic: require("../assets/images/coingecko@1x.png")
        },
        {
          pic: require("../assets/images/airnfts@1x.png")
        },
        {
          pic: require("../assets/images/itoken@1x.png")
        },
        {
          pic: require("../assets/images/onto@1x.png")
        },
        {
          pic: require("../assets/images/babyswap@1x.png")
        },
        {
          pic: require("../assets/images/cctip@1x.png")
        },
        {
          pic: require("../assets/images/tether@1x.png")
        }
      ],
      siqpic: require("../assets/images/siq.png"),
      gcpic: require("../assets/images/gc-logo.png")
    };
  },
  methods: {
    // 获取游戏分类
    async getGameGetType() {
      await game_get_type_api().then(response => {
        let res = response.data;
        if (res && res.code == 1) {
          this.gameClassification = res.data;
          if (this.gameClassification.length > 0) {
            this.gameClassification.unshift({
              icon: require("@/assets/images/icon-lobby.png"),
              id: 'all',
              name: '所有游戏',
              sort: 0
            });
          }
        }
      });
    },
    showTC(type) {
      this.tcContent = '';
      this.tcTitle = '';
      const key = 'tc_content_' + type + '_' + this.$helper.getLang()
      if (this.$helper.get(key)) {
        this.tcContent = this.$helper.get(key).content
        this.tcTitle = this.$helper.get(key).title
        this.tcVisible = true
        return
      }
      this.getRule(type)
    },
    getRule(type) {
      const self = this
      const key = 'tc_content_' + type + '_' + this.$helper.getLang()
      rule_index_api(type).then(response => {
        if (response && response.data.code == 1) {
          const data = response.data.data
          if (data) {
            self.$helper.set(key, data)
            self.showTC(type)
          } else {
            this.errorTips('没有内容');
          }
        }
      })
    },
    handleMenuOpen(act) {
      this.menuOpened = this.menuOpened === act ? '' : act
    },
    // 客服
    showChat(id) {
      this.isShowChat = true
      // 15161208
      window.__lc = window.__lc || {};
      window.__lc.license = id;
      (function (n, t, c) { function i(n) { return e._h ? e._h.apply(null, n) : e._q.push(n) } var e = { _q: [], _h: null, _v: "2.0", on: function () { i(["on", c.call(arguments)]) }, once: function () { i(["once", c.call(arguments)]) }, off: function () { i(["off", c.call(arguments)]) }, get: function () { if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load."); return i(["get", c.call(arguments)]) }, call: function () { i(["call", c.call(arguments)]) }, init: function () { var n = t.createElement("script"); n.async = !0, n.type = "text/javascript", n.src = "https://cdn.livechatinc.com/tracking.js", t.head.appendChild(n) } }; !n.__lc.asyncInit && e.init(), n.LiveChatWidget = n.LiveChatWidget || e }(window, document, [].slice))
    },
  },
  watch: {
    // 游戏界面隐藏客服
    $route: {
      handler(v) {
        const el = document.getElementById("chat-widget-container")
        if (v.path == "/game-detail") {
          el && (el.style.display = 'none')
        } else {
          if (this.$t('service_id') != 'service_id' && !this.isShowChat) {
            this.showChat(this.$t('service_id'))
          }
          el && (el.style.display = 'block')
        }
      },
      immediate: true
    }
  },
  created() {
    this.getGameGetType();
  }
};
</script>
<style lang="less" scoped>
.footer{
  background: #282f5a;
}
.footer__menus {
  grid-template-columns: 1fr 1fr 1fr 1fr;
}
.join_community{
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 24px;
  color: #FFFFFF;
  margin-bottom: 10px;
  @media (max-width:750px){
    font-size: 14px;
  }
}
.social-icons{
  justify-content: center;
}
.footer-info{
  justify-items: center;
  grid-template-columns: 1fr;
}
.copyright{
  text-align: center;
  padding-bottom: 30px;
}
.ss {
  content-visibility: auto;
  background-color: #161f2c;
}

.footer-logos {
  position: relative;
  padding-bottom: 20px;
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(85, 101, 126, 0.15);
}

.icon-arrow {
  display: none;
  fill: #93acd3;
}

@media (max-width: 576px) {
  .icon-arrow {
    position: absolute;
    display: block;
    right: 0;
    top: 12px;
  }
}

.footer-logos .swiper-slide {
  width: 130px;
}

.footer-logos__image {
  cursor: pointer;
  font-size: 0;
}

.footer-logos__image .el-image {
  filter: grayscale(100%);
  opacity: 0.5;
  width: 100%;
}

.footer-logos__image:hover .el-image {
  filter: grayscale(0%);
  opacity: 1;
}

.news__body p {
  font-size: 16px;
  line-height: 24px;
  color: #9cb3df;
  margin: 10px 0;
  padding: 10px 0 !important;
}

.social-icons__icon__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
