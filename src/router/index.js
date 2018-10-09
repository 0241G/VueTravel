// 路由模块
import Vue from 'vue'
import Vuerouter from 'vue-router'

import Miste from '../pages/Miste/Miste.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'

Vue.use(Vuerouter)

const routes =[
    {
        path:'/',
        redirect: '/miste'
    },
    {
        path:'/miste',
        component:Miste,
        meta: {  
            showFooter:true
        }
    },
    {
        path:'/order',
        component:Order,
        meta: {  
            showFooter:true
        }
    },
    {
        path:'/profile',
        component:Profile,
        meta: {  
            showFooter:true
        }
    },
    {
        path:'/search',
        component:Search,
        meta: {  
            showFooter:true
        }
    },
    {
        path:'/login',
        component:Login
    },
];
export default new Vuerouter({
    routes
})