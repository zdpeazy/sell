<template>
  <div class="msite" ref="msite">
    <div>
      <headerWrapper></headerWrapper>
      <category></category>
      <div class="split"></div>
      <h3 class="recommend-shop">推荐商家</h3>
      <shoplist :shops="shops" :scroll="scroll"></shoplist>
      <loadmore :pullup="pullup" :loadingHei="loadingHei" :scroll="scroll" :loadText="loadText"></loadmore>
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
  import loadmore from '@/components/common/loadmore/loadmore';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        itemlength: 15,
        shops: [],
        scroll: {},
        pullup: true,
        loadingHei: 50,
        setTimer: {},
        offset: 15,
        loadText: '正在加载...',
        scrollY: 0
      };
    },
    created() {
      this.$http.get(config().URL + '/api/restaurants?offset=0').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
          this.shops = response.data;
          this.$nextTick(() => {
            this._initScroll();
            this._loadingdata();
          });
        }
      });
    },
    methods: {
      _initScroll() {
        this.scroll = new BScroll(this.$refs.msite, {
          click: true,
          probeType: 3
        });
      },
      _loadingdata() {
        this.scroll.on('scrollEnd', (pos) => {
          if (this.scroll.y <= this.scroll.maxScrollY) {
            this._getData(this.offset);
          }
        });
      },
      _getData(offset) {
        if (this.itemlength !== 0) {
          this.$http.get(config().URL + '/api/restaurants?offset=' + offset).then((response) => {
            response = response.body;
            this.offset += 15;
            if (response.errno === ERR_OK) {
              let arr = response.data;
              if (arr.length < this.itemlength) {
                this.itemlength = 0;
              }
              for (var i = 0; i < arr.length; i++) {
                this.shops.push(arr[i]);
              }
            }
            this.$nextTick(() => { // 数据变化的时候滑动组件更新一定要放到这个里面
              this.scroll.refresh();
            });
          });
        } else {
          this.pullup = false;
          this.loadText = '没有更多啦~~';
          this.scroll.refresh();
          return;
        }
      }
    },
    components: {
      footerWrapper,
      headerWrapper,
      category,
      shoplist,
      BScroll,
      loadmore
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
