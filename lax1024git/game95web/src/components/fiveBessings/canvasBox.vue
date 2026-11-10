<template>
  <div :class="['__canvas-box',disabled && isGray?'gray-image':'']" ref="canvasBox">
      <canvas ref="canvas" class="canvas-content" :width="width" :height="height"
      @mousedown="startScratch" @mousemove.stop.prevent="scratch" @mouseup="stopScratch" 
      @touchstart="startScratch" @touchmove.stop.prevent="scratch" @touchend="stopScratch" 
      v-if="!isFinish"
      ></canvas>
      <!-- 判断canvas是否初始化完成 ，不完成不显示 -->
      <slot v-if="isLoad"></slot>
  </div>
</template>

<script>
export default {
  data(){
    return {
      canvasCtx:null,
      isScratching:false,
      canvas:null,
      width:null,
      height:null,
      isLoad:false,
      isFinish:false
    }
  },
  props:{
     imgSrc:{
      default:require('@/assets/images/canvas-mask.png')
    },
    disabled:{
      default:false
    },
    isGray:{
      default:true
    }
  },
  methods:{

    // 初始化效果
    init(){
       this.isFinish = false
      // 设置刮刮卡图像
      this.$nextTick(()=>{
        const scratchImage = new Image();
        scratchImage.src = this.imgSrc;
        this.canvas = this.$refs.canvas
        this.canvasCtx = this.canvas.getContext('2d');
        scratchImage.onload = ()=>{
          this.width = this.$refs.canvasBox.offsetWidth
          this.height = this.$refs.canvasBox.offsetHeight
          this.$nextTick(()=>{
            this.canvasCtx.drawImage(scratchImage, 0, 0, this.width, this.height);
            this.canvasCtx.globalCompositeOperation = 'destination-out'; // 设置刮除效果
            this.isLoad = true
          })
        }
      })

    },

    // 按下
    startScratch(e){
      if(this.disabled) return
      this.isScratching = true;
      const opt = {}
      if(e.offsetX){
        opt.x = e.offsetX
        opt.y = e.offsetY
      }else if(e.changedTouches){
        const canvasRect = this.canvas.getBoundingClientRect();
        opt.x = e.changedTouches[0].clientX - canvasRect.left
        opt.y = e.changedTouches[0].clientY - canvasRect.top
      }
      this.clearCanvans(opt)
    },

    // 移动
    scratch(e){
      const opt = {}
      if(e.offsetX){
        opt.x = e.offsetX
        opt.y = e.offsetY
      }else if(e.changedTouches){
        const canvasRect = this.canvas.getBoundingClientRect();
        opt.x = e.changedTouches[0].clientX - canvasRect.left
        opt.y = e.changedTouches[0].clientY - canvasRect.top
      }
      this.clearCanvans(opt)
    },
    
    // 抬起
    stopScratch(){
      this.isScratching = false;
      this.isEnd()
    },

    // 根据位置清除画布上的内容
    clearCanvans({x,y}){
      if (!this.isScratching) return;
      this.canvasCtx.beginPath();
      this.canvasCtx.arc(x, y, 20, 0, Math.PI * 2);
      this.canvasCtx.globalCompositeOperation = 'destination-out'; // 设置刮除效果
        // 绘制一个红色矩形
      this.canvasCtx.fill();
      this.canvasCtx.closePath();
    },

    // 获取每和像素的颜色,并进行判断
    isEnd(){
      // 每隔几个像素获取一次颜色，越小越耗费性能
      const num = 4

      // 范围大小
      const range = 60

      // 中心点
      const  centerPointX = this.width / 2 
      const  centerPointY = this.height / 2 

      // 获取x轴范围 和 y轴范围进行验证
      const xStart = centerPointX - range/2;
      const xEnd = centerPointX + range/2;
      const yStart = centerPointY - range/2;
      const yEnd = centerPointY + range/2;

      // 擦除像素点 和 遮住像素点的个数 用来计算百分比返回出去
      let clearNum = 0
      let coverNum = 0
      // 遍历每个像素 获取颜色值
      for (let x = 0; x < this.width; x += num) {
        for(let y=0;y < this.height;y += num){
          if( x>xStart && x<xEnd && y>yStart && y<yEnd){
            // this.clearCanvansPoint(x,y)
            const {data} = this.canvasCtx.getImageData(x, y, 1, 1);
            data[3] == 0?clearNum++:coverNum++
          }
          
        }
      }

      // 判断擦除面积大于多少为完成这个操作，并进行后续操作
      this.isFinish = clearNum / (coverNum + clearNum) > 0.8
      if(this.isFinish){
        this.$emit("open")
      }
    },

    // 某一点擦除
    clearCanvansPoint(x,y){
      this.canvasCtx.beginPath();
      this.canvasCtx.arc(x, y, 1, 0, Math.PI * 2);
      this.canvasCtx.globalCompositeOperation = 'destination-out'; // 设置刮除效果
        // 绘制一个红色矩形
      this.canvasCtx.fill();
      this.canvasCtx.closePath();
    }
  },
  mounted(){
    this.$nextTick(()=>{
      this.init()
    })
  }
}
</script>

<style scoped lang="less">
.__canvas-box{
  position: relative;
  background-image: url(~@/assets/images/canvas-bg.png);
  background-size: 100% 100%;
  background-color: #183A60;
  border-radius: 19px;
  overflow: hidden;
  user-select: none;
}
.gray-image {
  filter: grayscale(80%);
}
.canvas-content{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
}
</style>