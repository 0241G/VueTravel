// vuex的action模块
import {
    RECIEVE_ADDRESS,
    RECIEVE_CATEGORYS,
    RECIEVE_SHOPS,
    RECIEVE_USER_INFO,
    CLEAR_USER_INFO,
    RECEIVE_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_FOOD_COUNT,
    DECEIVE_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_INFO,
} from './mutations-type'

import {
    reqAddress,
    reqCategorys,
    reqShops,
    reqUserinfo,
    reqLogout,
    reqShopInfo,
    reqShopRatings,
    reqShopGoods,
    reqSearchshops
} from '../api'

export default {
        // 异步获取地址
    async getAddress ({commit,state}) {
        // 发送异步ajax请求
        // 查看接口是否有参数
        const geohash = state.latitude + ","  + state.longitude
        const result = await reqAddress(geohash)
        // 提交一个mutation
        if (result.code === 0) {
            const address = result.data;
            commit(RECIEVE_ADDRESS,{address})
        }
    },
    // 异步获取分类列表
    async getCategorys ({commit}) {
        // 发送异步ajax请求
        // 查看接口是否有参数
        const result = await reqCategorys()
        // 提交一个mutation
        if (result.code === 0) {
            const categorys = result.data;
            commit(RECIEVE_CATEGORYS,{categorys})
        }
    },
    // 异步获取商店列表
    async getShops ({commit,state}) {
        // 发送异步ajax请求
        // 查看接口是否有参数
        const {latitude,longitude} = state
        const result = await reqShops(latitude,longitude)
        // 提交一个mutation
        if (result.code === 0) {
            const shops = result.data;
            commit(RECIEVE_SHOPS,{shops})
        }
    },
    // 同步更新登陆状态
    reqLogin ({commit},userinfo) {
        commit(RECIEVE_USER_INFO,{userinfo})
    },
    // 异步获取用户信息，并且保存,保存登陆状态
    async getUserinfo ({commit}) {
        const result = await reqUserinfo();
        if (result.code === 0) {
            const userinfo = result.data;
            commit(RECIEVE_USER_INFO,{userinfo})
        }
    },
    // 异步取消登陆
    async logout ({commit}) {
        const result = await reqLogout()
        if (result.code === 0) {
            commit(CLEAR_USER_INFO)
        }
    },
    // 异步获取商家信息
    async getShopInfo({commit}) {
        const result = await reqShopInfo()
        if (result.code === 0) {
          const info = result.data
          commit(RECEIVE_INFO, {info})
        }
      },
    // 异步获取商家评价列表
    async getShopRatings({commit},callback) {
        const result = await reqShopRatings()
        if(result.code===0) {
         const ratings = result.data
         commit(RECEIVE_RATINGS, {ratings})
         callback && callback()
        }
    },
    // 异步获取商家商品列表
    async getShopGoods({commit},callback) {
        const result = await reqShopGoods()
        if(result.code===0) {
         const goods = result.data
         commit(RECEIVE_GOODS, {goods})
         callback && callback()      
        }
    },
    //更新食物数量
    updateFoodCount ({commit},{food,isAdd}) {
        if (isAdd) {
            commit(RECEIVE_FOOD_COUNT,{food})
        } else {
            commit(DECEIVE_FOOD_COUNT,{food})
        }
    },
    //清除购物车
    clearCart ({commit}) {
        commit(CLEAR_CART)
    },

    //搜索列表
    async getSearchShops({commit,state},keyword) {
        const geohash = state.latitude + ","  + state.longitude
        const result = await reqSearchshops(geohash,keyword)
        if(result.code===0) {
         const searchShops = result.data
         commit(RECEIVE_SEARCH_INFO, {searchShops})         
        }
    },
    
}