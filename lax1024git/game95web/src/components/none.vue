<template>
  <div class="none-wapper">
    <el-empty :image="$t('no_empty')" :description="$t('暂无数据')" />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.none-wapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10vh;
  color: #656c79;
}
</style>