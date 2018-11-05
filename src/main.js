// 入口函数配置
import Vue from 'vue'
import App from './App.vue'
import { Button } from 'mint-ui'
import router from './router'
import store from './store'
import './mock/mockServer'
import './filters'
//注册全局组件
Vue.component(Button.name,Button)
new Vue({
    el:'#app',
    render:h => h(App),
    router,
    store, //使用vuex
})