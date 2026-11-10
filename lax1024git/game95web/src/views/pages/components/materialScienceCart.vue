<template>
  <section class="our_promo">
    <div class="our_promo__promo-img">
      <img src="@/assets/images/promo_materials.8abce42.png" />
    </div>

    <div class="our_promo-content">
      <h1>{{ $t("Our Promo materials") }}</h1>
      <p>
        {{ $t("promo_materials_desc1") }}
      </p>
      <a
        target="_blank"
        class="button button_lg button_red button_center"
        :href="$t('promo_download_url')"
      >
        <span class="button__inner">
          <span class="button__icon">
            <svgIcon
              className="icon-share-download"
              icon="icon-share-download"
            ></svgIcon>
          </span>
          <span class="button__text">{{ $t("download All promo") }}</span>
        </span>
      </a>
    </div>
  </section>
</template>

<script>
import svgIcon from '@/components/svg.vue'
export default {
  components:{svgIcon}
};
</script>

<style scoped>
.our_promo {
			min-height: 293px;
			width: 100%;
			background: #161f2c;
			border-radius: 20px;
			padding: 40px;
			display: flex;
			flex-direction: row-reverse;
			align-items: center;
      justify-content: space-between;
		}
    .our_promo-content{
      max-width: 60%;
    }
    
    .our_promo p {
			font-size: 15px;
			line-height: 26px;
			color: #55657e;
			margin: 0 0 30px
		}

		.our_promo .btn {
			display: flex;
			justify-content: space-evenly;
			align-items: center
		}

		.our_promo .btn img {
			width: 24px;
			height: 24px;
			margin-right: 5px
		}

		.our_promo .btn span {
			font-weight: 700;
			font-size: 15px;
			line-height: 23px;
			text-transform: uppercase;
			color: #fff;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap
		}
    .our_promo__promo-img img{
			width: 100%;
			transform: translate(-9%,-4%) scale(1.5);
		}
    .our_promo__promo-img {
			width: 30%;
			pointer-events: none;
      flex-shrink: 0;
		}
    @media(max-width:800px) {
      .our_promo{
        flex-direction: column;
        padding: 40px 20px;
      }
      .our_promo-content{
        max-width: 100%;
      }
      .our_promo__promo-img {
        width: 80%;
        pointer-events: none;
        flex-shrink: 0;
        margin-bottom: 20px;
      }
    }
</style>
