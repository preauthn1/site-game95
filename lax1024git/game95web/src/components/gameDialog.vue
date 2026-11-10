<template>
  <div class="game-dialog-wrapper">
    <el-dialog
      :modal-append-to-body="false"
      fullscreen
      :visible.sync="gameVisible"
      @closed="gameClose"
      custom-class="full-dialog"
    >
      <div class="game-top" :class="mshow?'menu-show':'menu-close'">
        <div class="menu-top">
          <div class="menu-icon" @click="actionMenu">
            <span class="iconfont icon-menu-close" v-if="mshow"></span>
            <span class="iconfont icon-dian" v-else></span>
          </div>
        </div>
        <div class="menu-actions">
          <div class="menu-icon" @click="gameClose"><span class="iconfont icon-arrowback" ></span></div>
        </div>
      </div>
      <div class="game__container">
        <iframe class="js-game-iframe" :src="gameUrl" frameborder="0"></iframe>
      </div>
    </el-dialog>
    
    <el-dialog :visible.sync="dialogShow" custom-class="custom-dialog game-dialog" :modal-append-to-body="false">
      <div class="modal__body">
        <div class="game-cell flex-center">
          <div class="game-preview__image">
            <img v-lazy="gameData.icon" alt="" >
          </div>
          <div class="flex_bd">
            <div class="game-intro">
              <h2>{{ $t(gameData.game_name) }}</h2>
              <!-- <p>{{ gameData.gi_content }}</p> -->
            </div>
            <el-button @click="showGame" class="button_red button_fullwidth" >{{$t('Play Game')}}</el-button>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import svgIcon from "@/components/svg.vue";
export default {
  components: {
    svgIcon,
  },
  data() {
    return {
      gameData:[],
      mshow:false,
      dialogShow:false,
      dialogmShow:false,
      gameVisible: false, //
      gameUrl:''
    }
  },
  methods: {
    showDialog(url,item){
      this.dialogShow = true
      this.gameUrl = url
      this.gameData = item
    },
    showGame() {
      this.dialogShow = false
      this.gameVisible = true
    },
    actionMenu(){
      this.mshow = !this.mshow
    },
    gameClose() {
      this.gameVisible = false
      this.mshow = false
      this.gameUrl = ''
      this.$emit("close");
    },
  },
  mounted() {
  }
};
</script>

<style scoped>
.game-top{
  position: absolute;
  right:10px;
  top:10px;
}
.menu-icon .iconfont{
  font-size: 20px;
}
.menu-actions{
  transition:.3s all;
  margin-top: 10px;
  transform: translateY(-30px);
  opacity: 0;
  visibility: hidden;
}
.menu-actions .iconfont{
  display: inline-block;
}
.menu-show .menu-actions{
  transform: translateY(0px);
  opacity: 1;
  visibility: visible;
}
.icon-menu-close{
  visibility: hidden;
  transition:.3s all;
  opacity: 0;
  transform: rotateZ(-45deg);
}
.menu-show .icon-dian{
  visibility: hidden;
  opacity: 0;
}
.menu-show .icon-menu-close{
  visibility: visible;
  opacity: 1;
  transform: rotateZ(0deg);
}
.menu-actions *{
  transition:.3s all;
}
.menu-icon{
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  background-color: #222433;
  color: rgba(255, 255, 255, 0.7);
}
  /* 全屏弹窗 */
.game-dialog-wrapper ::v-deep .el-dialog__wrapper{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0;
}
.game-dialog-wrapper ::v-deep .full-dialog{
  border-radius: 0;
  background-color: #000000;
  color: #ffffff;
  width: 100%;
}
.game-dialog-wrapper ::v-deep .full-dialog .el-dialog__header{
  display: none;
}
.game-dialog-wrapper ::v-deep .el-dialog__body{
  padding: 0;
  width: 100%;
  height: 100%;
}
.game__container{
  width: 100%;
  height: 100%;
}
.js-game-iframe{
  width: 100%;
  height: 100%;
}
::v-deep .game-dialog{
  margin-top: 0!important;
  max-width: 375px!important;
}
@media(max-width:750px){
  ::v-deep .game-dialog{
    margin: 0!important;
    width: 100%!important;
    max-width: 100%!important;
    border-radius: 12px 12px 0 0;
  }
  .game-dialog-wrapper ::v-deep .el-dialog__wrapper{
    justify-content: flex-end;
  }

}

.game-cell{
  padding:20px;
}
.game-preview__image{
  width: 120px;
  margin-right: 20px;
}
.game-preview__image img{
  width: 120px;
  height: 156px;
  border-radius: 16px;
  object-fit: cover;
}
.game-intro{
  margin-bottom: 20px;
}
@media(max-width:750px){
  .game-dialog-wrapper ::v-deep .dialog-fade-enter-active {
    animation: dialog-fade-in .3s
}

.game-dialog-wrapper ::v-deep .dialog-fade-leave-active {
    animation: dialog-fade-out .3s
}
}
@keyframes dialog-fade-in {
    0% {
        transform: translate3d(0,100px,0);
        opacity: 0
    }

    to {
        transform: translateZ(0);
        opacity: 1
    }
}

@keyframes dialog-fade-out {
    0% {
        transform: translateZ(0);
        opacity: 1
    }

    to {
        transform: translate3d(0,100px,0);
        opacity: 0
    }
}

</style>
