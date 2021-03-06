// 路由模块
import Vue from 'vue'
import Vuerouter from 'vue-router'

import Miste from '../pages/Miste/Miste.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods.vue'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo.vue'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings.vue'



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
    {
        path:'/shop',
        component:Shop,
        children:[
            {
                path:'/shop/goods',
                component:ShopGoods
            },
            {
                path:'/shop/info',
                component:ShopInfo
            },
            {
                path:'/shop/ratings',
                component:ShopRatings
            },
        ]
    },
];
export default new Vuerouter({
    routes
})