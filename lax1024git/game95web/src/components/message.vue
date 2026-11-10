<template>
  <div>
  <div class="notifications-container" v-show="msgShow" :class="msgShow?'opened-message-panel':''">
    <div class="notifications__header">
      <div class="notifications__title">{{$t('通知')}}</div>
<!--      <div class="notifications__right">-->
        <button class="notifications__close" @click="messageClose">
          <svgIcon
            icon="icon-close"
            class="contests-header__close-icon"
            widthName="24"
            heightName="24"
          ></svgIcon>
        </button>
<!--      </div>-->
    </div>
    <div class="message-dropdown dropdown_sm dropdown_bottom dropdown_opened">
      <el-dropdown @command="handleCommand" size="small" class="dropdown__trigger">
            <span class="text">
              {{ this.command == 0 ? $t('查看全部') : $t('未读') }} <svgIcon className="icon-arrow" icon="icon-arrow-down-small"></svgIcon>
            </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item :command="0">{{ $t('查看全部') }}</el-dropdown-item>
          <el-dropdown-item :command="1">{{ $t('未读') }}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
<!--      <el-tooltip class="item" effect="dark" :content="$t('标记为已读')" placement="bottom-start">-->
          <img src="@/assets/images/message/1.png" :title="$t('标记为已读')" @click="setMessageSetread(0)">
<!--      </el-tooltip>-->

    </div>
    <div class="notifications-list">
      <div class="notifies">
        <div class="binary-switcher">
          <button class="switch-option" :class="index == cur ?'highlighted':''" v-for="(item,index) in tabs"
            :key="index" @click="msgtab(index)">
            <span class="option-title">{{ $t(item.name) }}</span>
            <div class="option-counter" v-if="index == 1 && $store.state.messageUnreadCount > 0">{{$store.state.messageUnreadCount}}</div>
          </button>
          <div class="switch-highlight" :class="'highlight-'+cur"></div>
        </div>
        <div class="notifies__body">
          <div class="scroll-area">
            <div class="lists" style="min-height: 200px" v-loading="isLoading"
              element-loading-background="rgba(0, 0, 0, 0.2)" :infinite-scroll-distance="15" v-infinite-scroll="loadMore"
              :infinite-scroll-disabled="scrollDisabled">
              <!-- platform -->
              <template v-if="cur == 0">
                <div class="notify" v-for="(item,index) in messageSystemMsgList" :key="`messageSystemMsgList${index}`">
                  <div class="notify__inner">
                    <div class="notify__content">
                      <p class="notify__title">{{$t(item.title)}}</p>
                      <div class="notify__image-block">
                        <picture class="notify__image">
                          <img :src="item.img" alt />
                        </picture>
                      </div>
                      <p class="notify__text notify__text--overflow" v-html="item.content"></p>
                    </div>
                    <div class="notify__footer">
                      <div class="notify__header">
                        <span class="datetime notify__date">{{item.add_time}}</span>
                      </div>
                      <div v-if="!item.link" class="link link_md" @click="setMessageDetail(item)">
                        <span class="link__text">{{$t('阅读更多')}}</span>
                        <svgIcon icon="icon-arrow-right-small" class="link__icon" widthName="24" heightName="24"></svgIcon>
                      </div>
                      <a v-else :href="item.link" class="link link_md">
                        <span class="link__text">{{$t('阅读更多')}}</span>
                        <svgIcon icon="icon-arrow-right-small" class="link__icon" widthName="24" heightName="24"></svgIcon>
                      </a>
                    </div>
                  </div>
                </div>
                <none v-if="!isLoading&&messageSystemMsgList.length==0"></none>
              </template>

              <!-- 个人 -->
              <template v-if="cur == 1">
                <div class="notifies__date-label" v-for="(item,index) in msgSystemMsgList" :key="`msgSystemMsgList${index}`">
                  <!-- <p class="notifies__label">2022/11/15</p> -->
                  <div class="red-dot" v-if="item.read == 0"></div>
                  <div class="notify">
                    <div class="notify__inner">
                      <div class="notify__icon" v-if="item.type == 1 || item.type == 2 || item.type == 10 || item.type == 11 || item.type == 14">
                        <img :src="require(`../assets/images/message/svg${item.type}.svg`)" class="notify__img"/>
                      </div>
                      <div class="notify__content">
<!--                        <div class="notify__header">-->
<!--                          <span class="datetime notify__date">{{item.add_time}}</span>-->
<!--                          <span v-if="item.read == 0" class="notify__chip">{{ $t('新消息') }}</span>-->
<!--                        </div>-->
                        <p class="notify__title" v-if="item.title ===  $t('领取码奖励')" >{{  $t(item.data.title)}}</p>
                        <p class="notify__title" v-else >{{ $t(item.title) }}</p>
                        <p class="notify__text">
                          <b>{{$t(item.content)}}</b>
                        </p>
                      </div>
                    </div>
                    <div class="notify__footer2">
                        <span class="datetime notify__date">{{item.add_time}}</span>
                      <div>
                        <div v-if="item.type == 10">
                          <div>
                            <router-link to="/fund?tab=2" class="link link_sm">
                              <span class="link__text">{{ $t('查看收益') }}</span>
                              <svgIcon icon="icon-arrow-right-small" className="link__icon" widthName="16" heightName="16"></svgIcon>
                            </router-link>
                          </div>
                        </div>
                        <button @click="setMessageSetread(item.id)" :loading="$store.state.bottonLoading" class="notify__mark-btn" :class="item.type==10?'mt-3':''" v-if="item.read == 0">
                          <span class="mark-read mark-btn_text">
                            {{ $t('标记为已读') }}
                          </span>
                          <svgIcon icon="icon-checkmark-circle" widthName="16" heightName="16"></svgIcon>
                        </button>
                      </div>

                      </div>

                  </div>
                </div>
                <none v-if="!isLoading&&msgSystemMsgList.length==0"></none>
              </template>
            </div>
          </div>
        </div>
<!--        <div class="notifies__footer">-->
<!--          <el-button @click="setMessageSetread(0)" type="button" :loading="$store.state.bottonLoading"-->
<!--            class="button button_lg button_grey1 button_center button_fullwidth">-->
<!--            <span class="button__inner">-->
<!--              <span class="button__text">{{$t('标记为已读')}}</span>-->
<!--              <span class="button__icon">-->
<!--                <svgIcon icon="icon-checkmark-circle" class="icon" widthName="24" heightName="24"></svgIcon>-->
<!--              </span>-->
<!--            </span>-->
<!--          </el-button>-->
<!--        </div>-->
      </div>
    </div>
  </div>
  <el-dialog :visible.sync="msgVisible" custom-class="custom-dialog">
    <div class="custom-dialog-head" slot="title">
      <div class="header__title">
        <h1>{{ msgTitle }}</h1>
      </div>
    </div>
    <div class="news__body" v-html="msgContent"></div>
  </el-dialog>
  </div>
</template>

<script>
import { EventBus } from "@/common/eventBus.js";
import svgIcon from "@/components/svg.vue";
import {
  message_system_msg_api,
  message_list_api,
  message_setread_api
} from "@/api/user";
export default {
  components: {
    svgIcon
  },
  props: {},
  data() {
    return {
      // tab
      cur: 1,
      msgShow: false,
      tabs: [
        {
          name: "平台",
          num: 0
        },
        {
          name: "个人",
          num: 0
        }
      ],
      messages: [],
      // 系统消息
      messageSystemMsgList:[],
      messageSystemMsgList1: [
        {add_time:'2024-1-12',title:'测试',content:'123456789',img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
      ],
      messageSystemMsgPage: 1,
      getMessageSystemMsgDisabled: true,
      // 个人消息
      msgSystemMsgList: [],
      msgSystemMsgList1: [
        {read:0,type:10,add_time:'2024-1-12',title:'测试',content:'123456789',img:'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
      ],
      msgSystemMsgPage: 1,
      msgSystemMsgDisabled: true,
      msgSystemMsgEmpty: 0,

      scrollDisabled: true,

      msgVisible:false,
      msgTitle: '',
      msgContent: '',
      command: 0,
      isLoading:false
    };
  },
  mounted() {
    this.$nextTick(()=>{
      this.init()
    })
  },
  methods: {
    init(){
      // 勿修改
      this.getData()
    },
    show() {
      if (this.msgShow) {
        this.msgShow = false;
        return;
      }
      this.msgShow = true;
      this.messageSystemMsgPage = 1;
      this.messageSystemMsgList = [];
      this.getMessageSystemMsgDisabled = true;
      // this.getMessageSystemMsg("add");
      this.getData()
    },
    hide() {
      this.msgShow = false;
    },
    handleCommand(command) {
      this.command = command;
      this.getData()
    },
    setMessageDetail(item) {
      this.msgVisible = true;
      this.msgTitle = item.title;
      this.msgContent = item.content;
    },
    loadMore() {
      if (this.cur == 1) {
        this.getMsgList();
      } else {
        this.getMessageSystemMsg();
      }
    },
    async setMessageSetread(msg_id) {
      let data = {msg_id: 0};
      if (msg_id) {
        data.msg_id = msg_id;
      }
      this.isLoading = true
      await message_setread_api(data).then(res => {
        if (res && res.data.code == 1) {
          this.$store.commit("$vuexSetMessageUnreadCount", msg_id ? -1 : 0);
          this.msgSystemMsgList.map(function(val){
            if (msg_id) {
              val.read = msg_id == val.id ? 1 : val.read;
            } else {
              val.read = 1
            }
          })
        } else {
          this.errorTips(res.data.msg);
        }
        this.isLoading = false
      });
    },
    // 系统消息
    async getMessageSystemMsg(add) {
      if (add) {
        this.messageSystemMsgList = [];
        this.isLoading = true
      }
      this.scrollDisabled = this.getMessageSystemMsgDisabled = true;
      await message_system_msg_api(this.messageSystemMsgPage, 5).then(res => {
        if (res && res.data.code == 1) {
          this.isLoading = false
          if (add) {
            this.messageSystemMsgList = res.data.data;
          } else {
            this.messageSystemMsgList = this.messageSystemMsgList.concat(res.data.data);
          }
          if (res.data.data.length > 0) {
            this.messageSystemMsgPage = this.messageSystemMsgPage + 1;
            this.scrollDisabled = this.getMessageSystemMsgDisabled = false;
          } else {
            this.scrollDisabled = this.getMessageSystemMsgDisabled = true;
          }
        }
      });
    },
    // 个人消息
    async getMsgList(add) {
      if (add) {
        this.msgSystemMsgList = [];
        this.isLoading = true
      }
      this.scrollDisabled = this.msgSystemMsgDisabled = true;

      await message_list_api(this.msgSystemMsgPage, 10, this.command).then(res => {
        if (res && res.data.code == 1) {
          this.isLoading = false
          if (add) {
            this.msgSystemMsgList = res.data.data;
          } else {
            this.msgSystemMsgList = this.msgSystemMsgList.concat(res.data.data);
          }
          if (this.msgSystemMsgList.length > 0) {
            this.msgSystemMsgEmpty = 1;
          } else {
            this.msgSystemMsgEmpty = 2;
          }
          if (res.data.data.length > 0) {
            this.msgSystemMsgPage += 1;
            this.scrollDisabled = this.msgSystemMsgDisabled = false;
          } else {
            this.scrollDisabled = this.msgSystemMsgDisabled = true;
          }
          // 上报数据
          let arr = res.data.data;
          for (let i in arr) {
            if (arr[i].read == 0 && arr[i].type == 15 && arr[i].data && Object.keys(arr[i].data).length > 0) {
              this.onPurchase(arr[i].data, arr[i].id,arr[i]);
            }
          }
        }
      });
    },
    onPurchase (data, id,item) {
      if(data){
        let price = data.price;
        let currency = data.currency;
        this.$buryingPoint.recharge({price:price.toString(), currency:currency.toString()})
        // Pixel记录首次充值
        if(item.recharge_first==1){
          this.$buryingPoint.initialCharge({price:price.toString(), currency:currency.toString()})
        }
        if (id) {
          this.setMessageSetread(id)
        }
      }
    },
    ruleClick() {
      this.ruleshow = !this.ruleshow;
    },
    msgtab(i) {
      if (this.cur === i) {
        return;
      }
      this.cur = i;
      this.scrollDisabled = this.cur == 1 ? this.msgSystemMsgDisabled : this.getMessageSystemMsgDisabled;
      this.getData();
    },
    getData() {
      if (this.cur == 0 && this.msgShow) {
        this.messageSystemMsgList = [];
        this.messageSystemMsgPage = 1;
        this.getMessageSystemMsg("add");
      } else {
        this.msgSystemMsgList = [];
        this.msgSystemMsgPage = 1;
        this.getMsgList("add");
      }
    },
    messageClose() {
      this.msgShow = false;
    }
  },
  watch:{
    "$route.path":function(){
      this.init()
    }
  }
};
</script>
<style scoped lang="less">
.notifications-container {
  background-color: #191A1E;
  padding-top: 64px;
  position: fixed;
  z-index: 103;
  top: 0;
  bottom: 0;
  right: 0;
  width: 510px;
  transition: transform 0.2s ease-in-out;
  transform: translateX(100%);
}
.opened-message-panel.notifications-container {
  transform: translateX(0);
}
@media (max-width: 1000px) {
  .notifications-container {
    z-index: 100;
    padding-bottom: 60px;
  }
}

@media (max-width: 768px) {
  .notifications-container {
    width: 100%;
  }
}

.notifications__header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  //background-color: #202a39;
  background: linear-gradient(to right,rgba(255, 159, 3, 0.55),#191A1E);
  border-radius: 14px 0px 0px 0px;
  height: 60px;
  position: relative;
}

.notifications__title {
  margin: 0 0 0 4px;
  font-size: 20px;
}
.notifications__close{
  position: absolute;
  right: 10px;
  top: 10px;
}
.notifications__right {
  display: flex;
  justify-content: flex-end;
}

.select-css {
  cursor: pointer;
  display: inline-block;
  line-height: 1.3;
  padding: 0.3em 1.6em 0.3em 0.6em;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0;
  border: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  font-size: 14px;
  height: 100%;
  flex: 1;
  color: #fff;
  font-weight: 600;
}

.select-css::-ms-expand {
  display: none;
}

.select-css:focus,
.select-css:hover {
  border-color: #565e6f;
  outline: none;
}

.select-css:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.select-css option {
  font-weight: 400;
}

.notifications-list {
  margin-left: 12px;
  margin-right: 12px;
  margin-top: 12px;
  height: 100%;
}

.notify {
  position: relative;
  border-radius: 8px;
  background-color: #0A0605;
  cursor: pointer;
  transition: background-color 0.1s ease-in-out, border-color 0.1s ease-in-out;
}

.notify:not(:last-child) {
  margin-bottom: 8px;
}

.notify__btn-close {
  background-color: transparent;
  border: none;
  padding: 0;
  color: #55657e;
  font-size: 34px;
  width: 36px;
  line-height: 36px;
  position: absolute;
  top: 0;
  right: 0;
  transition: color 0.1s ease-in-out;
}

.notify__btn-close:hover {
  color: #fff;
}

.notify__header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
}

.notify__chip {
  background-color: #1bb83d;
  text-transform: uppercase;
  font-weight: 700;
  padding: 1px 7px;
  font-size: 11px;
  letter-spacing: 0.06em;
  border-radius: 56px;
  display: flex;
  align-items: center;
}

.notify__date {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: #A4A4A4;
}

.notify__inner {
  min-height: 44px;
  display: flex;
  flex-direction: column;
  padding: 12px 12px 0;
}

.notify__content {
  position: relative;
  flex-grow: 1;
}

.notify__title {
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}

.notify__image-block {
  position: relative;
  margin-bottom: 8px;
}
.notify__image-block img {
  width: 100%;
  object-fit: cover;
  max-height: 120px;
  border-radius: 6px;
}
.notify__image-link {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.notify__image-link svg {
  display: none;
}

.notify__image {
  height: 100px;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  margin-bottom: 8px;
  border-radius: 8px;
}

.notify__text {
  font-size: 12px;
  color: #A4A4A4;
  margin-bottom: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.notify__text--overflow {
  max-height: 36px;
  transition: all 0.3s;
}

.notify__text--all {
  max-height: 200px;
  margin-bottom: 30px;
  transition: all 0.3s;
}

.notify__footer {
  //border-top: 1px solid #2a3546;
  background-color: #0A0605;
  justify-content: space-between;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 0 -12px;
  padding: 10px 12px;
}

.notify__footer,
.notify__icon {
  display: flex;
  align-items: center;
}

.notify__icon {
  flex-direction: column;
  min-width: 40px;
  margin-right: 12px;
}
.notify__mark-btn {
  color: #55657e;
  font-weight: 600;
  letter-spacing: 0.02em;
  font-size: 11px;
  //margin-left: auto;
  display: flex;
  align-items: center;
  grid-gap: 4px;
  gap: 4px;
}

.notify__mark-btn,
.notify__mark-btn svg {
  transition: color 0.1s ease-in-out;
}

.notify__mark-btn:active,
.notify__mark-btn:hover svg {
  color: #fff;
}

.notify__show-all {
  position: absolute;
  bottom: 12px;
  right: 0;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  width: 115px;
  text-align: right;
  background: linear-gradient(270deg, #1c2532 68.52%, rgba(28, 37, 50, 0));
}

.notify__show-all svg {
  transition: all 0.5s;
}

.notify__show-all--hide {
  background: transparent;
}

.notify__show-all--hide svg {
  transform: rotate(180deg);
}

.binary-switcher {
  margin-top: 12px;
  margin-bottom: 16px;
  position: relative;
  background-color: #1c2532;
  border-radius: 50px;
}

.binary-switcher,
.switch-option {
  display: flex;
  align-items: center;
  justify-content: center;
}

.switch-option {
  flex: 1;
  padding-top: 7px;
  padding-bottom: 7px;
  z-index: 1;
}

.switch-option.highlighted .option-counter {
  color: #84F100;
  background-color: #fff;
}

.switch-option.highlighted .option-title {
  color: #fff;
}

.option-icon {
  margin-right: 2px;
}

.option-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 18px;
  color: #93acd3;
}

.option-counter {
  transition: color 0.1s ease-in-out, background-color 0.1s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  background-color: #84F100;
  border-radius: 50px;
  min-width: 18px;
  padding-left: 6px;
  padding-right: 6px;
  margin-left: 8px;
  height: 18px;
}

.option-counter--empty {
  background: #3c485c;
}

.option-counter--not-empty-inactive,
.switch-highlight {
  background-color: #84F100;
}

.switch-highlight {
  transition: transform 0.1s ease-in-out;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
  z-index: 0;
  border-radius: 32px;
}

.highlight-0 {
  transform: translateX(0);
}

.highlight-1 {
  transform: translateX(100%);
}

.notifies__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

@media (max-width: 1000px) {
  .notifies__footer {
    bottom: 60px;
  }
}

.link__icon {
  fill: #84F100;
  transition: transform 0.1s ease-in-out, fill 0.1s ease-in-out;
}
.link:focus .link__icon,
.link:hover .link__icon {
  fill: #fff;
  transform: translateX(10%);
}

.notifies {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.notifies .no-data {
  max-width: 165px;
  margin: 0 auto;
  text-align: center;
}

.notifies .no-data span {
  white-space: normal;
}

.notifies__body {
  flex: 1 1;
  position: relative;
  margin-right: -8px;
  min-height: 250px;
}

.notifies__footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

@media (max-width: 1000px) {
  .notifies__footer {
    bottom: 60px;
  }
}

.notifies__footer .button {
  border-top: 2px solid rgba(183, 207, 255, 0.05);
  border-radius: 0;
}

.notifies__date-label,
.notifies__label {
  margin-bottom: 12px;
  position: relative;
}
.red-dot{
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: red;
  position: absolute;
  right: 0;
  z-index: 100;
}
.notifies__label {
  font-weight: 600;
  font-size: 11px;
  line-height: 16px;
  color: #55657e;
  padding-bottom: 4px;
  border-bottom: 1px solid #202a39;
}

.scroll-area {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  padding-right: 8px;
  margin-bottom: 100px;
  padding-bottom: 16px;
  overflow-y: auto;
}
.notify__img--multi {
  width: 20px;
  height: 34px;
}
.notify__coin-ico--type-0 {
  margin-bottom: -19px;
}
.notify__coin-ico {
  width: 26px;
  height: 26px;
}
.notifies__date-label .notify__inner {
  flex-direction: row;
}
.notify__img {
  width: 40px;
  height: 40px;
}
.notify__footer2 {
  //border-top:1px solid #2a3546;
  background-color:#0A0605;
  justify-content:space-between;
  border-bottom-left-radius:8px;
  border-bottom-right-radius:8px;
  padding:10px 12px;
}
.notify__footer2,.notify__icon {
  display:flex;
  //align-items:center;
}
.link {
  color:#84F100;
  display:flex;
  font-weight:600;
  align-items:center;
  text-decoration:none;
  padding:0;
}
.link__text{
  word-break: break-all;
}
.link_sm.link,.link_sm .link__text {
  font-size:11px;
}
.link_sm .link__icon {
  width:18px;
  height:18px;
}
.dropdown__trigger{
    cursor: pointer;
    position: relative;
    display: flex;
    align-items: center;
    height: 100%;
    width: max-content;
    font-size: 10px;
    border-radius: 8px;
    padding: 3px 7px;
    border-width: 1px;
    background-color: #1c2532;
    border-color: #1c2532;
    border-style: solid;
    transition: background-color .1s ease-in-out,border-color .1s ease-in-out;
}
.dropdown__trigger:focus, .dropdown__trigger:hover {
    background-color: #2a3546;
    border-color: #2a3546;
}
 .dropdown__trigger>span.text {
    text-overflow: ellipsis;
    overflow-x: hidden;
    flex: 1 1;
    white-space: nowrap;
    display: flex;
    align-items: center;
    line-height: 16px;
}
.dropdown__trigger .icon-arrow {
    width: 16px;
    height: 16px;
    margin-left: 2px;
    margin-right: -4px;
}
.header__title{
  text-align: center;
  width: 100%;
  display: flex;
}
.header__title h1{
  width: 100%;
  margin: 0;
}
.message-dropdown{
  display: flex;
  justify-content: flex-end;
  padding: 10px 14px 0;
  img{
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
}
</style>
