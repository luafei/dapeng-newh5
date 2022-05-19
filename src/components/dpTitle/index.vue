<template>
    <div :class="['title', isFixed ? 'fixed' : '']" >
        <span>
            <van-icon name="arrow-left" @click="goBack" v-if="isShowArrow" class="arrow-left"/>
        </span>
        <div class="text">{{title}}</div>
        <!-- <div class="right"></div> -->
        
    </div>
</template>
<script>
import { Icon } from 'vant';
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        isFixed: {
            type: Boolean,
            default: true
        },
        isShowArrow: {
            type: Boolean,
            default: true
        }
    },
    components: {
        [Icon.name]: Icon
    },
    data(){
        return {

        }
    },
    methods: {
        goBack(){
            this.$emit('goBack')
        }
    },
}
</script>
<style lang="scss" scoped>
    .title{
        position: relative;
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        // justify-content: space-between;
        background-color: #5076B8;
        color: #fff;
        .arrow-left{
            margin-left: 10px;
            font-size: 23px;
        }
        .text{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            font-size: 18px;
        }
        .right{
            width: 23px;
            margin-right: 10px;
        }
    }
    .fixed{
        position:fixed;
        width: 100%;
        z-index: 9999;
        left: 0;
        top: 0;
    }
</style>