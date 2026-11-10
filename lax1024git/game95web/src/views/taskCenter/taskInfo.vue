<template>
  <el-dialog
  :visible.sync="dialogVisible"
  custom-class="custom-dialog el-dialog-center2" :modal-append-to-body="false">
  <div class="wapper">
    <!-- <div class="title">{{ data.title }}</div>
    <table>
      <tr>
        <td colspan="1" style="border-right: 0;">{{ $t("描述") }}</td>
        <td colspan="3" style="border-right: 0;">{{ data.introduce }}</td>
      </tr>
      <tr>
        <td rowspan="2">{{ $t("任务条件") }}</td>
        <td v-if="data.task_condition.includes(0)">{{ $t("最低下注") }}</td>
        <td v-if="data.task_condition.includes(1)">{{ $t("最低充值") }}</td>
        <td v-if="data.task_condition.includes(2)">{{ $t("获胜倍率") }}</td>
        <td v-if="data.task_condition.includes(3)">{{ $t("累计充值") }}</td>
        <td v-if="data.task_condition.includes(4)">{{ $t("在线时长") }}</td>
        <td v-if="data.task_condition.includes(5)">{{ $t("累计下注") }}</td>
        <td v-if="data.task_condition.includes(6)">{{ $t("游戏时长") }}</td>
      </tr>
      <tr>
        <td v-if="data.task_condition.includes(0)">{{ current_symbol }}{{ data.min_bet }}</td>
        <td v-else-if="data.task_condition.includes(1)">{{ current_symbol }}{{ data.min_recharge }}</td>
        <td v-else-if="data.task_condition.includes(2)">≥{{ data.multiple }}X</td>
        <td v-else-if="data.task_condition.includes(3)">≥{{ current_symbol }}{{ data.cumulative_recharge }}</td>
        <td v-else-if="data.task_condition.includes(4)">≥{{ data.online_time }}{{ $t("分钟") }}</td>
        <td v-else-if="data.task_condition.includes(5)">≥{{ current_symbol }}{{ data.cumulative_bet }}</td>
        <td v-else-if="data.task_condition.includes(6)">≥{{ data.game_online_time }}{{ $t("分钟") }}</td>
        <td v-else>--</td>
      </tr>
      <tr>
        <td>{{ $t("进度") }}</td>
        <td colspan="3">{{ data.finish_num }}/{{ data.task_num }}</td>
      </tr>
      <tr>
        <td>{{ $t("奖励") }}</td>
        <td colspan="3" v-if="data.reward_type==2">{{ $t("五福抽奖次数") }}x{{data.w_count}}</td>
        <td colspan="3" v-else>{{ data.reward_type==1?$t('积分'):current_symbol }} {{ data.amount_or_integral }}</td>
      </tr>
      <tr v-if="data.reward_type==0">
        <td>{{ $t("流水倍数") }}</td>
        <td colspan="3">{{ data.savings }}X</td>
      </tr>
      <tr v-if="data.activity">
        <td>{{ $t("任务活跃值") }}</td>
        <td colspan="3">{{ data.activity }}</td>
      </tr>
    </table> -->
    <div class="header_title">
      <h3>{{ $t('任务详情') }}</h3>
    </div>
    <div class="mb-2">
      <span class="title">{{ $t('任务描述') }}: &nbsp</span>
      <span class="title_name01" >{{ data.introduce }}</span>
    </div>
    <div class="mb-2">
        <span class="title">{{ $t('任务条件') }}: &nbsp</span>
        <div class="title_name">
          <span v-if="data.task_condition.includes(0)">{{ $t("最低下注") }}</span>
          <span v-if="data.task_condition.includes(1)">{{ $t("最低充值") }}</span>
          <span v-if="data.task_condition.includes(2)">{{ $t("获胜倍率") }}</span>
          <span v-if="data.task_condition.includes(3)">{{ $t("累计充值") }}</span>
          <span v-if="data.task_condition.includes(4)">{{ $t("在线时长") }}</span>
          <span v-if="data.task_condition.includes(5)">{{ $t("累计下注") }}</span>
          <span v-if="data.task_condition.includes(6)">{{ $t("游戏时长") }}</span>
          <span v-if="data.task_condition.includes(0)">{{ current_symbol }}{{ data.min_bet }} </span>
          <span v-else-if="data.task_condition.includes(1)">{{ current_symbol }}{{ data.min_recharge }}</span>
          <span v-else-if="data.task_condition.includes(2)">≥{{ data.multiple }}X</span>
          <span v-else-if="data.task_condition.includes(3)">≥{{ current_symbol }}{{ data.cumulative_recharge }}</span>
          <span v-else-if="data.task_condition.includes(4)">≥{{ data.online_time }}{{ $t("分钟") }}</span>
          <span v-else-if="data.task_condition.includes(5)">≥{{ current_symbol }}{{ data.cumulative_bet }}</span>
          <span v-else-if="data.task_condition.includes(6)">≥{{ data.game_online_time }}{{ $t("分钟") }}</span>
          <span v-else>--</span>
        </div>
    </div> 
    <div class="flex mb-2">
      <span class="title">{{ $t('任务进度') }}: &nbsp</span>
      <div class="item-progress-wapper">
        <div :class="[data.finish_num / data.task_num == 1 ? `item-progress-content-full` : `item-progress-content`]" :style="`width:${data.finish_num / data.task_num * 100}%`"></div>
        <span class="item-progress-txt">{{data.finish_num}}/{{ data.task_num }}</span>
      </div>
    </div>
    <div class="mb-2">
      <span class="title">{{ $t('奖励') }}: &nbsp &nbsp &nbsp &nbsp</span>
      <div class="title_name">
        <span v-if="data.reward_type==2">{{ $t("五福抽奖次数") }}x{{data.w_count}}</span>
        <span v-else>{{ data.reward_type==1?$t('积分'):current_symbol }} {{ data.amount_or_integral }}</span>
      </div>
    </div>
    <!-- <el-button class="button_red btn" @click="dialogVisible = false">{{ $t("关闭") }}</el-button> -->
     <button class="btn"  @click="dialogVisible = false">{{ $t("关闭") }}</button>
  </div>
</el-dialog>
</template>

<script>
export default {
  data(){
    return {
      dialogVisible:false,
      data:{
        task_condition:""
      }
    }
  },
  props:{
    current_symbol:{
      default:""
    }
  },
  methods:{
    show(data){
      this.data = data
      console.log(data)
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="less">
.item-progress-wapper{
  display: flex;
  flex: 1;
  justify-content: flex-end;
  margin: auto;
  height: 10px;
  border-radius: 5px;
  background: #2C3245;
  position: relative;
  margin-right: 5px;
}
.item-progress-content{
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #84F100;
  max-width: 100%;
  border-radius: 5px;
}
.item-progress-content-full{
  position: absolute;
  left: 0;
  height: 100%;
  background-color: #FFA905;
  max-width: 100%;
  border-radius: 5px;
}
.wapper{
  color: #FFF;
}

.title{
  font-family: PingFang SC;
  font-weight: 500;
  font-size: 16px;
  color: #FFFFFF;
}
.title_name{
  display: inline-block;
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #A4A4A4;
}
.title_name01{
  font-family: PingFang SC;
  font-weight: 400;
  font-size: 14px;
  color: #A4A4A4;
}
::v-deep .el-dialog__header{
  display: none;
}
.header_title{
  text-align: center;
}
.item-progress-txt{
  font-size: 10px;
  margin-right: 10px; 
  line-height: 1;
  z-index: 3;
}
.btn{
  width: 100%;
  background: #656667; 
  padding: 10px; 
  border-radius: 10px;
  margin: 50px auto;
}
</style>