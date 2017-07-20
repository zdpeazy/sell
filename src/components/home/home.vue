<template>
  <div class="home" ref="home">
    <div>
      <headerWrapper></headerWrapper>
      <category></category>
      <div class="split"></div>
      <restaurant :shops="shops"></restaurant>
    </div>
    <footerWrapper></footerWrapper>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import footerWrapper from '@/components/common/footer/footer';
  import headerWrapper from '@/components/home/children/header/header';
  import category from '@/components/home/children/category/category';
  import restaurant from '@/components/home/children/restaurant/restaurant';
  import {config} from '@/static/js/config';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        shops: []
      };
    },
    created() {
      this.$http.get(config().URL + '/api/restaurants').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.shops = response.data;
          // console.log(this.goods);
          this.$nextTick(() => {
            this._initScroll();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        this.scroll = new BScroll(this.$refs.home, {
          click: true
        });
      }
    },
    components: {
      footerWrapper,
      headerWrapper,
      category,
      restaurant,
      BScroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home
  width 100%
  position absolute
  top 0px
  bottom 54px
  overflow hidden
  .split
    height 10px
    width 100%
    background #f3f5f7
</style>
