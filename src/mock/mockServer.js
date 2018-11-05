import Mock from 'mockjs'
import Data from './data.json'



//返回goods接口
Mock.mock('/goods',{code:0,data:Data.goods})
//返回评论接口
Mock.mock('/ratings',{code:0,data:Data.ratings})
//返回信息接口
Mock.mock('/info',{code:0,data:Data.info})