import Vue from 'vue'
// 更新state状态
import {
    RECIEVE_ADDRESS,
    RECIEVE_CATEGORYS,
    RECIEVE_SHOPS,
    RECIEVE_USER_INFO,
    CLEAR_USER_INFO,
    RECEIVE_GOODS,
    RECEIVE_RATINGS,
    RECEIVE_INFO,
    RECEIVE_FOOD_COUNT,
    DECEIVE_FOOD_COUNT,
    CLEAR_CART,
    RECEIVE_SEARCH_INFO
} from './mutations-type.js'

export default {
    [RECIEVE_ADDRESS] (state,{address}) {
        state.address = address
    },

    [RECIEVE_CATEGORYS] (state,{categorys}) {
        state.categorys = categorys
    },

    [RECIEVE_SHOPS] (state,{shops}) {
        state.shops = shops
    },
    [RECIEVE_USER_INFO] (state,{userinfo}) {
        state.userinfo = userinfo
    },
    [CLEAR_USER_INFO] (state) {
        state.userinfo = {}
    },

    [RECEIVE_INFO](state, {info}) {
        state.info = info
    },
    
    [RECEIVE_RATINGS](state, {ratings}) {
      state.ratings = ratings
    },

    [RECEIVE_GOODS](state, {goods}) {
      state.goods = goods
    },

    [RECEIVE_FOOD_COUNT] (state,{food}) {
        //因为food没有count的值，所以当点击时没有这个值，就直接创建出来
        if (!food.count) {
           Vue.set(food,'count',1)
           //将food添加到cartFoods中
           state.cartFoods.push(food)
        } else {
            food.count++;
        }
    },

    [DECEIVE_FOOD_COUNT] (state,{food}) {
       if (food.count) {
        food.count--
        if (food.count === 0) {
            //选中的food为0时，将它从cartFoods中去除
            state.cartFoods.splice(state.cartFoods.indexOf(food),1)
        }
       }
    },

    [CLEAR_CART] (state) {
        //清除food中的count
        state.cartFoods.forEach(food => {
            food.count = 0
        });
        //清空购物车
        state.cartFoods = []
    },
    
    //搜索
    [RECEIVE_SEARCH_INFO] (state,{searchShops}) {
        state.searchShops = searchShops
    }
    


}