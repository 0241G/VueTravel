<template>
 <div id="app">
   <router-view></router-view>
   <FootGuide v-show="$route.meta.showFooter"/>
 </div>
</template>

<script>
  import FootGuide from './components/FootGuide/FootGuide.vue'
  //  import {getAddress} from './api' 接口测试
  import {mapActions} from 'vuex'
  
 export default {
   data () {
     return {

     }
   },
   mounted () {
    //  this.$store.dispatch('getAddress')
    this.getAddress(),
    this.getUserinfo()
   },
   methods: {
     ...mapActions(['getAddress','getUserinfo'])
   },
   
   components: {
     FootGuide
   }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
</style>
