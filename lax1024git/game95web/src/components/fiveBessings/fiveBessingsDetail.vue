<template>
  <el-dialog :visible.sync="isShow"  :destroy-on-close="true" custom-class="custom-dialog" :close-on-click-modal="true"
    :modal-append-to-body="false">
      <div class="content-box">
        <div class="bonus-wapper">
          <img :src="require('@/assets/images/bonus-img.png')" class="bonus-img">
          <span class="equal">=</span>
          <span>{{data.currency}} {{data.amount}}</span>
        </div>
        <div class="icon-item-box" v-for="item,index in data.card_list" :key="index">
          <img :src="item.image" class="bonus-icon">
          <span class="equal">=</span>
          <span>{{data.currency}} {{item.amount}}</span>
        </div>
      </div>
  </el-dialog>
</template>

<script>
export default {
  data(){
    return {
      isShow:false,
    }
  },
  props:{
    data:{
      default:()=>({})
    }
  },
  methods:{
    show(){
      this.isShow =true
    },
  }
}
</script>

<style scoped lang="less">
::v-deep .el-dialog {
  box-shadow: none;
  max-width: calc(100vw - 40px);
  min-width: 300px;
  width: 450px;
  .el-dialog__body{
    padding: 0;
    color: #FFF;
  }
}
.content-box{
  padding: 26px 50px 26px;
  font-size: 16px;
  display: grid;
  grid-template-columns: repeat(2,1fr);
  gap: 30px;
  justify-content: space-between;
  white-space: nowrap;
  @media (max-width:540px) {
    grid-template-columns: repeat(1,1fr);
    padding: 10px 20px 26px;
    gap: 15px;
    font-size: 13px;
  }
}
.bonus-img{
  width: 195px;
  @media (max-width:540px) {
    width: 147px;
  }
}
.bonus-wapper{
  display: flex;
  align-items: flex-end;
  width: 100%;
  grid-column: span 2;
  @media (max-width:540px) {
    grid-column: span 1;
    margin-bottom: 20px;
  }
  span{
    margin-bottom: 6px;
  }
}
.equal{
  margin:  0 20px;
}
.bonus-icon{
  width: 40px;
  @media (max-width:540px) {
    width: 32px;
  }
}
</style>