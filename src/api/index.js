// 与后台交互的模块
import ajax from './ajax'
// 测试接口所用
const Base_url = '/api'
// [1、根据经纬度获取位置详情](#1根据经纬度获取位置详情)<br/>
export const reqAddress = (geohash) =>ajax(`${Base_url}/position/${geohash}`)
// [2、获取食品分类列表](#2获取食品分类列表)<br/>
export const reqCategorys = () =>ajax(Base_url+'/index_category')
// [3、根据经纬度获取商铺列表](#3根据经纬度获取商铺列表)<br/>
export const reqShops = (longitude,latitude) =>ajax(Base_url+'/shops',{longitude,latitude})
// [4、根据经纬度和关键字搜索商铺列表](#4根据经纬度和关键字搜索商铺列表)<br/>
 export const reqSearchshops = (geohash,keyword) =>ajax(Base_url+'/search_shops',{geohash,keyword})

//  [5、获取一次性验证码](#5获取一次性验证码)<br/>
// export const reqCaptcha = () =>ajax(Base_url+'/captcha')

// [6、用户名密码登陆](#6用户名密码登陆)<br/>
export const reqLoginPwd = ({name,pwd,captcha}) =>ajax(Base_url+'/login_pwd',{name,pwd,captcha},'POST')
// [7、发送短信验证码](#7发送短信验证码)<br/>
export const reqSendCode = (phone) =>ajax(Base_url+'/sendcode',{phone})
// [8、手机号验证码登陆](#8手机号验证码登陆)<br/>
export const reqSms = (phone,code) =>ajax(Base_url+'/login_sms',{phone,code},'POST')
// [9、根据会话获取用户信息](#9根据会话获取用户信息)<br/>
export const reqUserinfo = () =>ajax(Base_url+'/userinfo')
// [10、用户登出](#10用户登出)<br/>
export const reqLogout = () =>ajax(Base_url+'/logout')

/**
* 获取商家信息
*/
export const reqShopInfo = () => ajax('/info')
/**
* 获取商家评价数组
*/
export const reqShopRatings = () => ajax('/ratings')
/**
* 获取商家商品数组
*/
export const reqShopGoods = () => ajax('/goods')
