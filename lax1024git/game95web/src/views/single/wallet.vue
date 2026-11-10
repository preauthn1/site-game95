<template>
	<div>
	</div>
</template>

<script>
export default {
  components: {},
  props: {
  },
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
    this.$router.push({ path: '/', query: {dialog: 'wallet'} })
  },
  created() {
  }
};
</script>
<style scoped>
</style>
