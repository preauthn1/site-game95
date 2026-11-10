export default {
  created() {
    const name = this.$options.name
    if (!name) {
      console.warn('CacheMixin: 组件未设置名称，无法进行缓存。')
    } else {
      this.$store.commit('keepThisPage', name)
	  // console.log(this.$store.state.keepPages)
    }
  },
  beforeDestroy() {
    const name = this.$options.name
    if (name) {
      this.$store.commit('removeThisPage', name)
    }
  }
}