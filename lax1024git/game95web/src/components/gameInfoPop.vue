<template>
    <transition name="fade">
    <div v-show="isShow" class="mask" @click.self="hide">
        <div class="content">
            <div class="game-wapper">
                <div class="close-btn" @click="hide">
                    <img class="cs-btn" src="@/assets/images/b-close.png" alt="">
                </div>
           
                <cyb-img :src="item.gi_headimg" class="cover" fit="cover"></cyb-img>
                <div class="game-name-wapper">
                    <div class="name">
                        <span>{{ item.game_name }}</span>
                        <div :class="['collect', isAn ? 'collect-an' : '']" @click.stop="collect(item)">
                            <cyb-img :class="['c-img', item.is_collect == 0 ? '' : 'hide']" :lazy="false"
                                :src="require('@/assets/images/collect.png')"></cyb-img>
                            <cyb-img :class="['c-img-ac', , item.is_collect == 1 ? 'show' : '']" :lazy="false"
                                :src="require('@/assets/images/collect-ac.png')"></cyb-img>
                        </div>
                    </div>
                    <div class="desc">{{ $t("Cyber Raccoon") }}</div>
                </div>
            </div>
            <button type="button" @click="jumpPage" class="play-game-btn">{{ $t("真实模式") }}
                 <svgIcon icon="icon-play" class="play-icon"></svgIcon>
                </button>
        </div>
    </div>
</transition>
</template>

<script>
import { EventBus } from "@/common/eventBus.js";
import {  collect_collect } from "@/api/cybSports";
import svgIcon from "@/components/svg.vue";
export default {
    components:{
        svgIcon
    },
    data() {
        return {
            isShow: false,
            isAn: false,
            item: {}
        }
    },
    watch: {
        $route: {
            handler(to, from) {
                if (to.query.gameInfo == "show") {
                    this.show()
                } else {
                    this.hide()
                }
            },
            immediate: true
        },
        isShow(v) {
            if (!v) {
                // this.$router.replace({query:{}})
            }
        }
    },
    mounted(){
        EventBus.$on("gameInfo", (ele) => { 
            this.item = ele, this.isShow = true
        });
        if(!this.item.game_name){
            this.hide()
        }
    },
    methods: {
        show() {
            this.isShow = true
        },
        hide() {
            this.isShow = false
        },
        jumpPage(){
            this.$router.push({ path: '/game-detail', query: { id: this.item.id } })
        },
        async collect(item, isLoading) {
            // 判断登录
            if (!this.$store.state.isLoginStatu) {
                this.showLoginReg(1);
                return;
            }

            // 定义切换收藏状态的函数
            const change = () => {
                item.is_collect = item.is_collect == 1 ? 0 : 1;
                this.isAn = item.is_collect == 1;
                this.$forceUpdate();
            };
            change();

            // 发送请求,处理失败之后的功能,失败后提示收藏失败并更改图标
            try {
                let loading;
                // 显示loading
                if (isLoading) {
                    loading = Loading.service({
                        fullscreen: true,
                        background: "rgba(0,0,0,.6)",
                    });
                }
                const res = await collect_collect({
                    type: 0,
                    other_id: item.id,
                });
                // 隐藏loading
                if (isLoading) loading.close()
                if (res.data.code == 1) {
                    if (item.is_collect == 0) {
                        this.$emit("cancelFavorite")
                    }
                } else if (res.data.code != 1) {
                    change();
                    this.$message.error(res.data.msg);
                }
            } catch (error) {
                change();
                this.$message.error(this.$t("收藏失败"));
            }
        },
    }
}
</script>

<style lang="less" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: transform 0.5s, opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
  transform: translateY(100%); 
}
.mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9999;
}

@media screen and (min-width:768px) {
  .mask{
    display: none;
  }
}

.content {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 240px;
    background-color: #161f2c;
    border-top-right-radius: 6px;
    border-top-left-radius: 6px;
    padding: 24px;
}

.game-wapper {
    position: relative;
    display: flex;
    margin-bottom: 24px;
}

.close-btn{
    position: absolute;
    top: -56px;
    right: 0;
    width: 24px;
    height: 24px;
}

.cover {
    width: 96px;
    height: auto;
    border-radius: 6px;
    margin-right: 19px;
    flex-shrink: 0;
}

.game-name-wapper {
    width: 100%;
}

.name {
    font-size: 16px;
    margin-bottom: 2px;
    padding-right: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.desc {
    color: #989898;
    margin-bottom: 38px;
}

.play-game-btn {
    color: #FFF;
    font-weight: bold;
    font-size: 14px;
    width: 100%;
    text-align: center;
    background-color: #3a07f2;
    border: none;
    border-radius: 6px;
    height: 43px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.play-icon{
    margin-left: 8px;
    width: 14px;
}

.collect {
    width: 22px;
    height: 22px;
    user-select: none;
}

.c-img,
.c-img-ac {
    width: 100%;
}

.c-img-ac {
    display: none;
}

.collect-an {
    animation: collect .6s;
}

@keyframes collect {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(2);
    }

    100% {
        transform: scale(1);
    }
}

.hide{
  display: none !important;
}
.show{
  display: block !important;
}

</style>