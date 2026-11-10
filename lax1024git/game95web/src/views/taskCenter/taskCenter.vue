<template>
  <div class="wrapper">
    <div class="wrapper__inner">
      <div class="container">
  <div class="root">
    <myTabs
      :list="type_list"
      @change="tabsChange"
      class="tabs"
      :showIcon="false"
    >
      <!-- <template v-slot:icon="{ i }">
        <img :src="type_list[i].icon" class="tabs-icon" />
      </template> -->
    </myTabs>
    <!-- <picture class="task-banner" v-if="$t('task_banner')!='task_banner'">
      <source media="(min-width: 768px)" :srcset="$t('task_banner')">
      <img :src="$t('task_banner_mobile')" >
    </picture> -->
    <div class="task-container" v-loading="loading">
      <div class="task-wapper">
        <!-- <div class="task-left" v-if="stageData">
          <div class="task-title">{{ $t("刷新倒计时") }} {{ timeEnd(stageData.end_time) }}</div>
          <div class="task-subtitle">
            <span>{{ $t("当前活跃值") }}</span>
            <img class="bi-icon" :src="require('@/assets/images/task-num.png')" alt="">
            <span>{{ stageData.activity }}</span>
          </div>
          <swiper class="task-swiper" :options="swiperOptionThumbs" ref="task-swiper">
						<swiper-slide class="task-slide" v-for="item,index in stageData.reg_json" :key="index">
              <TaskBoxItem @tabItem="stage_receive(item)" :loading="item.loading" :data="item" :progress="progress(stageData.activity,stageData.reg_json,index)"></TaskBoxItem>
						</swiper-slide>
					</swiper>
        </div> -->
        <div class="right-wapper">
          <div class="task-right" v-if="initList.length">
            <div class="task-item" v-for="item,index in initList" :key="index">
              <img src="../../assets/images/taskTabs/before.png" class="item_img" alt="">
              <div class="itme-content">
                <div class="itme-name">
                  <span class="name">{{ item.title }}</span>
                </div>
                <div class="itme-desc">{{ item.introduce }}</div>
                <div class="item-progress-box">
                  <div class="item-progress-wapper">
                    <div :class="[item.finish_num / item.task_num != 1 ? `item-progress-content` : `item-progress-content-full`]" :style="`width:${item.finish_num / item.task_num * 100}%`"></div>
                    <div class="item-progress-txt">{{ item.finish_num }}/{{ item.task_num }}</div>
                  </div>

                </div>
              </div>
              <div class="doubt"  @click="showInfo(item)">
                <img src="@/assets/images/taskTabs/doubt.png">
              </div>
              <div class="item-btn-wapper">
                <!-- 五福次数奖励 -->
                <!-- <div class="item-bi-wapper" v-if="item.reward_type==2">
                  <img class="bi-icon" :src="require('@/assets/images/fiveB.png')" >
                  <span>x{{ item.w_count }}</span>
                </div> -->

                <!-- 积分和活跃值 -->
                <div class="item-bi-wapper">
                  <!-- <img class="bi-icon" :src="require('@/assets/images/task-num.png')" v-if="item.activity>0">
                  <img class="bi-icon" :src="require('@/assets/images/vnd.png')" v-else-if="item.reward_type==0">
                  <img class="bi-icon" style="transform: scale(.9);" :src="require('@/assets/images/integral.png')" v-else-if="item.reward_type==1">
                  <span>{{ item.activity>0 ? item.activity : item.amount_or_integral }}</span> -->
                  <img src="../../assets/images/taskTabs/gift.png" class="img_gift" alt="">
                </div>
                <!-- 点击按钮，加载显示  :loading="item.loading" :loading="item.loading" -->
                <el-button  class="item-btn"  @click="receive(item)" :disabled="!(item.is_receive==0&&item.is_finsh==1)">{{ $t(itemBtnTxt(item)) }}</el-button>
              </div>
            </div>
          </div>
          <none v-else></none>
        </div>
      </div>
    </div>
    <TaskInfo ref="taskInfo"></TaskInfo>
  </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskBoxItem from "./taskBoxItem.vue";
import TaskInfo from "./taskInfo.vue";
import { task_list_api , task_receive_api,task_stage_receive_api} from "@/api/task.js";
import myTabs from "../../components/myTabs.vue";
import socketRouter from '@/utils/SocketRouter'

export default {
  data() {
    return {
      timeId:null,
      curTime: new Date().getTime(),
      list: [],
      type_list: [],
      current_symbol: "",
      cur:0,
      loading:true,
      swiperOptionThumbs: {
				loop: false,
				autoplay:false,
				spaceBetween: 0,
        slidesPerView:4,
        breakpoints: {
            540:{slidesPerView: 3},
            768:{slidesPerView: 4},
            1024:{slidesPerView: 3}
					},
			},
    };
  },
  components: { TaskBoxItem, TaskInfo, myTabs },
  async mounted() {
    // 注册长连接监听
    socketRouter.addRouter("task",this.getList)
    this.loading = true
    await this.getList();
    this.loading = false
    this.timeId = setInterval(()=>{
      this.curTime = new Date().getTime()
    },1000)
  },
  computed:{
    stageData(){
      if(this.list.reg_json){
        console.log(this.list,'这是stageData')
        return this.list
      }else{
        return null
      }
    },
    initList(){
      return this.list.task_list || this.list
    }
  },
  methods: {
    itemBtnTxt(item){
      if(item.is_finsh==0){
        return "未完成"
      }
      if(item.is_receive==1){
        return "已领取"
      }
      return "领取"
    },
    timeEnd(timeStamp){
      const time = timeStamp*1000 - this.curTime
      const d = parseInt(time/86400000) || 0;
      const h = parseInt(time/3600000)%24 || 0;
      const m = parseInt(time/60000)%60 || 0;
      const s = parseInt(time/1000)%60 || 0;
      return `${d.toString().padStart(2,0)}D ${h.toString().padStart(2,0)}:${m.toString().padStart(2,0)}:${s.toString().padStart(2,0)}`
    },
    progress(allNum,list,i){
      if(list[i].max_activity<=allNum){
        if(!list[i+1]){
          return 100
        }
        if(list[i+1].max_activity<=allNum){
          return 100
        }
        return 50
      }else{
        return 0
      }
    },
    showInfo(item) {
      this.$refs.taskInfo.show(item);
    },
    async tabsChange(i) {
      this.cur = i
      this.loading = true
      await this.getList(this.type_list[i].id)

      this.loading = false
    },
    // 获取任务列表
    async getList(task_type="") {
      const { data } = await task_list_api({task_type});
      if (data.code == 1) {
        this.list = data.data.list;
        if(!task_type){
					this.$store.commit("msg/updateNoMsgTask",this.list.filter(item=>item.is_finsh==1&&item.is_receive!=1).length)
        }
        this.current_symbol = data.data.current_symbol;
        this.type_list = [
          {
            name: this.$t("全部任务"),
            icon: require("@/assets/images/allA.png"),
            id: "",
          },
          ...data.data.task_type_list,
        ];
        console.log('任务列表',this.type_list)
      }
    },

    // 领取任务奖励
    async receive(item){
      item.loading = true
      this.$forceUpdate()
      const {data} = await task_receive_api({task_id:item.id})
      if(data.code==1){
        this.successTips(this.$t('领取成功'))
        await this.getList(this.type_list[this.cur].id)
        // 计算消息
				this.$store.commit("msg/updateNoMsgTask",this.$store.state.msg.taskNoMsg - 1)

      }else{
        this.errorTips(data.msg)
      }
      item.loading = false
      this.$forceUpdate()
    },

    // 领取阶段奖励
    async stage_receive(item){
      item.loading = true
      this.$forceUpdate()
      const {data} = await task_stage_receive_api({stage:item.stage,stage_id:this.stageData.id})
      if(data.code==1){
        this.successTips(this.$t('领取成功'))
        await this.getList(this.type_list[this.cur].id)
      }else{
        this.errorTips(data.msg)
      }
      item.loading = false
      this.$forceUpdate()
    }
  },
  beforeDestroy(){
    // 消除副作用
    clearInterval(this.timeId)
    socketRouter.removeRouter("task",this.getList)
  }
};
</script>

<style lang="less" scoped src="@/assets/css/taskCenter.less"></style>
