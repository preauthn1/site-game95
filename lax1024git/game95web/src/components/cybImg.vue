<template>
  <el-image v-bind="$attrs" >
    <div slot="placeholder" class="image-slot" v-if="isPlaceholder">
        <img :src="$t('placeholder_img')=='placeholder_img'?require('@/assets/images/anwen.png'):$t('placeholder_img')" class="placeholder">
    </div>
  </el-image>
</template>

<script>
export default {
  props:{
    isPlaceholder:{
      default:true
    }
  },
  mounted(){
  }
}
</script>

<style scoped>
.image-slot{
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.placeholder{
  width: 60%;
  height: 60%;
  object-fit: contain;
}
</style>
