<template>
    <div class="iframe">
        <dp-title
            :title="title"
            :is-show-arrow="true"
            @goBack="goBack"
        ></dp-title>
        <div class="content">
            <iframe class="isframe" :src="frameSrc" frameborder=0 Border=0 Marginwidth=0 Marginheight=0 width=100% height="100%" scrolling=auto></iframe>
        </div>
    </div>
</template>
<script>
export default {
    name: "home",
    data() {
        return {
            name: "iframe",
            title: "嵌套页面",
            frameSrc: ''
        }
    },
    created() {
        console.log('created', this.$route)
        this.title = this.$route.query.title
        this.frameSrc = this.$route.query.url
    },
    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
* {
    box-sizing: border-box;
}
@mixin module {
    position: relative;
    width: 100%;
    height: 180px;
    background-color: #ffffff;
    color: #333333;
    margin: 10px 0;
}
@mixin header {
    color: #333333;
    font-size: 14px;
    font-weight: 600;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    white-space: nowrap;
}
.iframe {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    background-color: #f6f5f5;
    overflow-x: hidden;
    overflow-y: scroll;
    .content {
        position: absolute;
        top: 44px;
        bottom: 0;
        width: 100%;
    }
}

</style>