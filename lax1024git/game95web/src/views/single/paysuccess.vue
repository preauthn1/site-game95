<template>
	<div>
	</div>
</template>

<script>
export default {
  components: {},
  props: {
    amount: {
      type: String,
      default: ''
    },
    currency: {
      type: String,
      default: ''
    },
  },
  data() {
    return {};
  },
  methods: {
	showPurchase(){
		if (this.$route.query.amount && this.$route.query.currency) {
			let amount = this.$route.query.amount;
			let currency = this.$route.query.currency;
			this.onPurchase(amount, currency)
		} else if (this.amount && this.currency) {
			this.onPurchase(this.amount, this.currency)
		} 
		this.successTips('充值成功')
		this.goUrl('/')
	},

	onPurchase(amount, currency) {
		// if (window.Android && window.Android.onPurchase) {
			//上报支付，上报时不用区分是不是首次支付，只要支付成功就可以调用上报, app内部会自动区分，
			//参数类型都是字符串
			//第一个参数是金额（可以有小数点）
			//第二个参数是货币符号，比如"USD"
			//第三个参数保留，传空字符串
			// window.Android.onPurchase(amount, currency,'');
		// }
	}
  },
  mounted() {
		this.showPurchase()
  },
  created() {
  }
};
</script>
<style scoped>
</style>
