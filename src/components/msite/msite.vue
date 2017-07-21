<template>
  <div class="msite" ref="msite">
    <div>
      <headerWrapper></headerWrapper>
      <category></category>
      <div class="split"></div>
      <h3 class="recommend-shop">推荐商家</h3>
      <shoplist :shops="shops" :scroll="scroll"></shoplist>
    </div>
    <footerWrapper></footerWrapper>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import footerWrapper from '@/components/common/footer/footer';
  import headerWrapper from '@/components/msite/children/header/header';
  import category from '@/components/msite/children/category/category';
  import shoplist from '@/components/common/shoplist/shoplist';
  import {config} from '@/static/js/config';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        shops: [],
        scroll: {},
        pulldown: true
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
        this.scroll = new BScroll(this.$refs.msite, {
          click: true
        });
        this.scroll.on('touchend', (pos) => {
          // 下拉动作
          if (pos.y > 50) {
          }
        });
      }
    },
    components: {
      footerWrapper,
      headerWrapper,
      category,
      shoplist,
      BScroll
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.msite
  width 100%
  position absolute
  top 0px
  bottom 54px
  overflow hidden
  .split
    height 10px
    width 100%
    background #f3f5f7
  .recommend-shop
    padding 10px 15px 
    font-size 16px
    font-weight 600
</style>
