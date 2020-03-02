<template>
    <div id = 'app'>
        <div>我是moduleA应用的入口文件</div>
        <button @click = '$router.push({ path: "/moduleA" })'>点我</button>
        <router-view></router-view>
    </div>
    
</template>
<script>
export default {
    mounted() {
        
    }
};
</script>
<style lang='postcss' scoped>
</style>