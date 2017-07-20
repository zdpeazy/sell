<template>
  <swiper :options="swiperOption" ref="categoryWrapper" class="categoryWrapper">
    <swiper-slide class="category" v-for="(swiper,index) in swiperList" :key="swiper">
      <router-link class="slide"  v-for="item in swiper" :key="item" to="/seach">
        <img :src="item.image_url" alt="">
        <span class="name">{{item.name}}</span>
      </router-link>
    </swiper-slide>
    <div class="swiper-pagination"  slot="pagination"></div>
  </swiper>  
</template>

<script>
  import {config} from '@/static/js/config';

  const ERR_OK = 0;
  export default {
    name: 'category',
    data() {
      return {
        swiperOption: {
          notNextTick: true,
          initialSlide: 1,
          loop: true,
          pagination: '.swiper-pagination',
          debugger: true
        },
        category: []
      };
    },
    created() {
      this.$http.get(config().URL + '/api/category').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.category = response.data;
        }
      });
    },
    computed: {
      swiperList() {
        let leg = this.category.length;
        let group = Math.ceil(leg / 8);
        let arr = [];
        let swiperArr = [];
        for (let i = 0; i < group; i++) {
          let start = 8 * i + 1;
          let end = 8 * (i + 1) + 1;
          if (end > leg) {
            end = leg;
          }
          arr = this.category.slice(start, end);
          swiperArr.push(arr);
        }
        return swiperArr;
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.swiper-container-horizontal > .swiper-pagination-bullets
  bottom 0   
.categoryWrapper
  width 100%
  height 178px
  .category
    width 100%
    height 100%
    .slide
      display inline-block
      width 25%
      text-align center
      margin-top 12px
      img
        display inline-block
        width 45px
        height 45px
      .name 
        display block
        margin-top 5px
        color #666
        font-size 12px 
  .swiper-pagination-bullet
    width 4px
    height 4px
  .swiper-pagination-bullet-active
    background #666
</style>
