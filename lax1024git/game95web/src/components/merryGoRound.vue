<template>
  <div class="m-wapper" v-if="list.length">
    <img src="@/assets/images/p-icon.png" alt="" class="m-icon">
    <div class="content-wapper">
        <div class="content-txt" ref="contentTxt" :style="`--d:${item.title.length*0.3<8?8:item.title.length*0.3}s;--cs:${list.length==1?'infinite':'1'}`" v-if="active==index" v-for="item,index in list" :key="index" @animationend="animationend">{{ item.title }}</div>
    </div>
    <div @click="toPage(list[active].jump_url)" v-if="list[active].jump_url">
        <el-button class="button_blue btn" size="mini">{{ $t("了解更多") }}</el-button>
    </div>
  </div>
</template>

<script>
import { notice_list_api } from "@/api";
export default {
    data(){
        return {
            list:[],
            active:0,
            flag:true,
            timeId:null
        }
    },
    async mounted(){
        await this.getData()
    },
    beforeDestroy(){
        clearTimeout(this.timeId)
    },
    methods:{
        toPage(url){
            console.log(123456)
            if(url.startsWith('http')){
				location.href = url
			}else{
				this.$router.push(url)
			}
        },
        async getData(){
            const {data} = await notice_list_api({
                type:1,
                show_loca:1
            })
            if(data.code==1){
                this.list = data.data
            }
        },
        animationend(){
            if(this.flag){
                this.active ++
                if(this.active>=this.list.length){
                    this.active=0
                }
                this.flag = false
                this.timeId = setTimeout(()=>{
                    this.flag = true
                },1000)
            }
        }
    }
}
</script>

<style scoped lang="less">
.m-wapper{
    height: 56px;
    display: flex;
    align-items: center;
    padding: 0 28px 0 16px;
    margin-bottom: 30px;
    background-image: url(~@/assets/images/p-bg.png);
    background-size: cover;
    @media (max-width:768px) {
        height: 42px;
        padding: 0 10px;
        margin-bottom: 20px;
        border-radius: 10px;
    }
}
.m-icon{
    width: 31px;
    height: 31px;
    @media (max-width:768px) {
        width: 20px;
        height: 20px;
    }
}
.btn{
    background-image: linear-gradient(64deg, #0DCCFF, #4760FF);
    border-radius: 100vh;
    min-width: 85px;
    @media (max-width:768px) {
        min-width: 0;
    }
}
.content-wapper{
    flex: 1;
    margin: 0 37px; 
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    @media (max-width:768px) {
        font-size: 14px;
        margin: 0 10px; 
    }
}
.content-txt{
    --d:4s;
    --cs:infinite;
    --left:1040px;
    animation: var(--d) an var(--cs) linear;
    display: inline-block;
    min-width: 100%;
    @media (max-width :1040px) {
    --left:100vw;
    }
}
@keyframes an {
    from{
        transform: translateX(var(--left));
    }
    to{
        transform: translateX(-100%);
    }
}
</style>