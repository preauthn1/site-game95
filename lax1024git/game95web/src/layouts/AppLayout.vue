<template>
  <div>
    <div class="app-head">
<!--      <el-icon name="el-icon-arrow-left" color="#A5A5A5"></el-icon>-->
      <i class="el-icon-arrow-left"></i>
      <div class="app-head-title">{{$t($route.meta.title)}}</div>
      <div>test</div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  mounted() {
    console.log(this.$route);
  }
}
</script>
<style scoped lang="less">
.app-head {
  width: 100%;
  height: 57px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  background: #191A1E;
  &-title{
    font-family: PingFang SC;
    font-weight: 500;
    font-size: 15px;
  }
}
</style>
