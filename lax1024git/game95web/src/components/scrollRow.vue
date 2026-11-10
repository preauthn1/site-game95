<template>
  <div class="tgs-box" v-if="list.length">
    <div
      class="tgs-wapper"
      :style="{
        animationDuration: (list.length >= min ? list.length * 8 : 0) + 's',
      }"
    >
      <slot></slot>
    </div>
    <div
      class="tgs-wapper"
      v-if="list.length >= min"
      :style="{
        animationDuration: (list.length >= min ? list.length * 8 : 0) + 's',
      }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "scrollRow",
  props: {
    list: Array,
    min: Number,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.tgs-box {
  display: flex;
  overflow: hidden;
}
.tgs-box:hover .tgs-wapper {
  animation-play-state: paused;
}
.tgs-wapper {
  display: flex;
  justify-content: space-between;
  flex-shrink: 0;
  animation: 0s tgs infinite linear;
}
@keyframes tgs {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
@media (max-width: 750px) {
  .tgs-box:hover .tgs-wapper {
    animation-play-state: running;
  }
}
</style>
