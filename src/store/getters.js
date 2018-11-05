export default {
    //统计数量
    totalCount (state) {
        return state.cartFoods.reduce((preTotal,food) => preTotal + food.count,0)
    },
    //统计金额
    totalPrice (state) {
        return state.cartFoods.reduce((preTotal,food) => preTotal  + food.count * food.price,0)
    },
    positiveSize (state) {
        return state.ratings.reduce((preTotal,rating) => preTotal  + (rating.rateType === 0?1:0),0)
    }
}