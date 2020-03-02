<!--
 * @Author: chen_huang
 * @Date: 2020-02-29 16:45:40
 * @LastEditors: chen_huang
 * @LastEditTime: 2020-03-02 09:49:04
 * @Description: 
 -->
<template>
    <div id = 'app'>
        <div>我是app应用的Main组件</div>

         <button @click = '$router.push({  path: "/yyy" })'>跳转app应用的yyy路径</button>

        <button @click = 'jump'>点我跳转到moduleA应用</button>



        <div id = 'moduleA'></div>
        <router-view />



    </div>
</template>
<script>
import hosts from '../config/host'

export default {

    mounted() {
        this.createModuleEntry()
    },

    methods: {
        createModuleEntry() {
             
        },

        jump() {
            

            this.$router.push({path: "/test"}).then(() => {
            const $script = document.createElement("script");
            $script.id = `module-moduleA`;
            $script.src = `${hosts.moduleA.dev}/moduleA.js`;
            $script.onload = () => {
                window.mp[`render_moduleA_demo`]('#moduleA');
            };
            document.body.appendChild($script);
            })
        }
    }
}
</script>
<style lang='postcss' scoped>

</style>