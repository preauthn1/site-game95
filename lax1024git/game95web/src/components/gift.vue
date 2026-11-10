<template>
  <div>
    <div class="mask" v-if="isShow" @click.stop="hide"></div>
    <div class="g-box" v-if="list.length">
      <transition name="run">
        <div class="g-list-wapper" v-if="isShow">
          <div class="list-item" v-for="item in list" :key="item.id"  @click="goActivehall(item.id)">
            <div class="item-content">
              <div class="item-name" :title="item.c_title">
                {{ item.c_title }}
              </div>
              <div class="item-num">
                <img
                  :src="require('@/assets/images/' + $store.state.currencyIcon)"
                  class="currency__icon"
                  style="width: 24px; height: 24px"
                />
                {{ numFormat(item.jyj_price) }}
              </div>
            </div>
            <el-button
              class="button_red btn"
              v-if="item.jyj_type == 2&&item.jyj_price"
              @click.stop="apply(item)"
              :loading="item.loading"
              >{{ $t("领取") }}</el-button
            >
            <el-button class="button_red btn btn2" v-else>{{
              $t("明日可领")
            }}</el-button>
          </div>
        </div>
      </transition>
      <div class="g-wapper" @click="isShow = !isShow">
        <img
          src="@/assets/images/liwu-fd.png"
          :class="['liwu-icon', isNew ? 'liwu-icon-an' : '']"
        />

        <div class="liwu-dian" v-if="isNew"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { action_jyjlist, action_apply_api } from "@/api/action.js";
export default {
  data() {
    return {
      isShow: false,
      list: [],
    };
  },
  computed: {
    isNew() {
      return this.list.findIndex((item) => item.jyj_type == 2) != -1;
    },
  },
  mounted() {
    this.getList();
  },
  watch: {
    "$store.state.isLoginStatu": function (v) {
      if (v) {
        this.getList();
      } else {
        this.list = [];
      }
    },
  },
  methods: {
    goActivehall(id){
      this.$router.push({ path: '/activity-hall', query: {id} })
    },
    hide(){
      this.isShow = false
    },
    // 活动申请
    async apply(item) {
      let data = {
        action_id: item.id,
      };
      item.loading = true;
      this.$forceUpdate();
      const res = await action_apply_api(data);
      item.loading = false;
      this.$forceUpdate();

      if (res && res.data.code == 1) {
        item.jyj_type = 1;
        this.successTips(res.data.msg, {
          showClose: false,
          duration: "2000",
        });
        this.getList();
        this.$forceUpdate();
      } else {
        this.errorTips(res.data.msg);
      }
    },
    async getList() {
      const { data } = await action_jyjlist({
        page: 1,
        limit: 50,
      });
      if (data.code == 1) {
        this.list = data.data;
      }
    },
  },
};
</script>

<style scoped lang="less">
.g-box {
  position: fixed;
  bottom: 150px;
  right: 30px;
  width: 60px;
  height: 60px;
  z-index: 999;
  @media (max-width: 768px) {
    bottom: 170px;
    right: 20px;
  }
}
.g-wapper {
  width: 60px;
  height: 60px;
  background-color: #513f46;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  z-index: 1001;
}
.item-content {
  flex: 1;
}
.liwu-icon {
  width: 90%;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -27px;
}
.g-list-wapper {
  width: 320px;
  max-height: 640px;
  height: calc(100vh - 310px);
  background-color: #262d3d;
  border-radius: 16px;
  position: absolute;
  right: 0;
  bottom: 0;
  overflow: auto;
  padding: 16px 12px;
  padding-bottom: 50px;
  z-index: 1000;
}
.list-item {
  height: 83px;
  background-image: url(~@/assets/images/gift-bg2.png);
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  margin-bottom: 10px;
}
.list-item:nth-child(even) {
  background-image: url(~@/assets/images/gift-bg1.png);
}
.item-name {
  color: #5e698c;
  font-weight: bold;
  margin-bottom: 16px;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1; /* 这里是超出几行省略 */
}
.item-num {
  font-weight: bold;
}
.btn {
  font-size: 12px;
  border-radius: 100vh;
  padding: 10px 20px;
  box-shadow: 0 -2px 2px rgba(255, 255, 255, 0.3) !important;
  background: linear-gradient(0deg, #b10e43, #ed1d49);
  flex-shrink: 0;
}
.btn2 {
  padding: 8px 10px;
  background: linear-gradient(0deg, #757071, #938d8f);
}
.liwu-dian {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #9e0f3e;
  position: absolute;
  right: 4px;
  top: 4px;
}

.run-enter-active {
  animation: run-scale 0.3s linear 0s;
  transform-origin: right bottom;
}

.run-leave-active {
  transform-origin: right bottom;
  animation: run-scale 0.3s linear 0s reverse;
}
@keyframes run-scale {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
::v-deep .el-icon-loading {
  position: absolute;
  left: 50%;
  margin-left: -6px;
}

.liwu-icon-an {
  animation: 0.8s liwu infinite;
}
@keyframes liwu {
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(-10deg);
  }
}
.mask{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
</style>