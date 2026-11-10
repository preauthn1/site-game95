<template>
  <el-dialog
      :visible.sync="isShow" custom-class="custom-dialog el-dialog-center2" zIndex="9999" :modal-append-to-body="false"
    >
      <div class="wapper">
        <div class="title">{{ $t("更多奖励") }}</div>
        <div class="content">
          <div v-for="item,index in list" :key="index">
            <div class="sub-title">
              <span>{{ $t(`第${index+1}期`) }}</span>
            </div>
            <div class="list-wapper">
              <div class="item" v-for="itemData,i in item.day_list" :key="i">
                <div class="item-content">
                  <span :class="['item-num',itemData.status==2?'item-num2':'']">{{ itemData.day }}</span>
                  <div class="item-icon-wapper">
                    <img src="@/assets/images/vnd.png" class="item-icon" v-if="itemData.status==0&&itemData.reward_amount>0">
                    <img src="@/assets/images/integral.png" class="item-icon" v-else-if="itemData.status==0">
                    <img src="@/assets/images/singin-icon2.png" class="item-icon item-icon2" v-else>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
    </el-dialog>
</template>

<script>
import {sign_moreSign_api} from "@/api/singin.js"
export default {
  data(){
    return {
      isShow:false,
      list:[]
    }
  },
  methods:{
    async getData(){
      const {data} = await sign_moreSign_api()
      if(data.code==1){
        this.list = data.data
      }
    },
    async show(){
      if(this.list.length){
        this.getData()
      }else{
        await this.getData()
      }
      this.isShow =true
    }
  }
}
</script>

<style scoped lang="less">
.wapper{
  color: #FFF;
}
:deep(.custom-dialog){
  max-width: 640px;
}
:deep(.el-dialog__headerbtn){
  transform: translateY(-10px);
}
.title{
  text-align: center;
  font-size: 18px;
  padding: 13px;
  background-color: #192435;
  @media (max-width:768px) {
    font-size: 16px;
  }
}
:deep(.el-dialog__header){
  padding: 0;
  &::before{
    display: none;
  }
}
:deep(.el-dialog__body){
  padding: 0;
}
.content{
  background-color: #16202F;
  padding: 10px 0;
  max-height: 60vh;
  overflow: auto;
}
.sub-title{
  text-align: center;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  &::after,&::before{
    content: "";
    display: block;
    background-color: #fff;
    width: 1em;
    height: 1em;
    transform: rotate(45deg) scale(.5);
  }
  span{
    margin: 0 10px;
  }
}
.list-wapper{
  display: grid;
  grid-template-columns: repeat(7,1fr);
  gap: 10px;
  padding: 10px 20px;
  @media (max-width:540px) {
    grid-template-columns: repeat(5,1fr);
  }
}
.item{
  padding-bottom: 100%;
  background-color: #121A27;
  position: relative;
  border-radius: 10px;
}
.item-content{
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  padding: 20%;
}

.item-icon-wapper{
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.item-icon{
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.item-icon2{
  transform: scale(1.2) translate(0,10%);
}
.item-num{
  position: absolute;
  top: 6%;
  left: 6%;
  z-index: 2;
  font-size: 16px;
  white-space: nowrap;
}
.item-num2{
  opacity: .3;
}
</style>