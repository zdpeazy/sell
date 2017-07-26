<template>
  <div class="msite" ref="msite">
    <svg style="display: none;position:absolute;width:0;height:0">  
      <!-- 加载进度条 -->
      <symbol id="loading" viewBox="0 0 64 64">  
         <path d="M60 36h-8c-2.203 0-4-1.797-4-4 0-2.208 1.797-4 4-4h8c2.203 0 4 1.792 4 4 0 2.203-1.797 4-4 4zM48.973 20.686a4 4 0 0 1-5.66 0 3.995 3.995 0 0 1 0-5.655l5.66-5.653a3.99 3.99 0 0 1 5.65 0 4 4 0 0 1 0 5.655l-5.65 5.656zM32 64a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4c2.203 0 4 1.797 4 4v8c0 2.203-1.797 4-4 4zm0-48a4 4 0 0 1-4-4V4a4 4 0 1 1 8 0v8c0 2.208-1.797 4-4 4zM15.03 54.624a3.995 3.995 0 0 1-5.654 0 3.99 3.99 0 0 1 0-5.65l5.655-5.66a3.995 3.995 0 0 1 5.657 0 4.004 4.004 0 0 1 0 5.66l-5.655 5.65zm0-33.938L9.373 15.03a3.995 3.995 0 0 1 0-5.654 4 4 0 0 1 5.654 0l5.655 5.655a3.995 3.995 0 0 1 0 5.657 3.99 3.99 0 0 1-5.65 0zM16 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4 4 4 0 0 1 4-4h8a4 4 0 0 1 4 4zm32.973 11.314l5.65 5.66a3.99 3.99 0 0 1 0 5.65 3.992 3.992 0 0 1-5.65 0l-5.66-5.65a4 4 0 0 1 0-5.66 4 4 0 0 1 5.66 0z"/>  
      </symbol>
    </svg>
    <div>
      <div class="pulldown">
        <svg class="loading-icon" v-show="pullup">
          <use xlink:href="#loading"></use>
        </svg>
        <span>下拉刷新</span>
      </div>
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
        itemlength: 20, // 每组有多少的元素
        shops: [],
        scroll: {},
        pullup: true,
        pulldown: false,
        loadingHei: 50,
        setTimer: {},
        offset: 15,
        loadText: '正在加载...',
        scrollY: 0
      };
    },
    created() {
      this._initData();
    },
    methods: {
      _initScroll() {
        this.scroll = new BScroll(this.$refs.msite, {
          click: true,
          probeType: 3,
          startY: -50
        });
      },
      _initData() {
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
      _loadingdata() {
        this.scroll.on('touchend', (pos) => {
          if (pos.y > 50) {
            this.pulldown = true;
            this.$http.get(config().URL + '/api/restaurants?offset=0').then((response) => {
              response = response.body;
              if (response.errno === ERR_OK) {
                this.shops = response.data;
                this.$nextTick(() => {
                  this.pulldown = false;
                  this.itemlength = 20;
                  this.pullup = true;
                  this.offset = 15;
                  this.scroll.refresh();
                });
              }
            });
          }
        });
        this.scroll.on('scrollEnd', (pos) => {
          if (this.scroll.y <= this.scroll.maxScrollY) {
            this._getData(this.offset);
          }
          if (this.scroll.y > this.scroll.options.startY) {
            console.log('ttt');
            console.log(this.pulldown);
            if (!this.pulldown) {
              this.scroll.scrollTo(0, this.scroll.options.startY, 500, true);
            }
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
  .pulldown
    width 100%
    height 50px
    text-align center
    line-height 50px
    display flex
    box-align center
    align-items center
    box-pack center
    justify-content center
    .loading-icon
      display block
      width 20px
      height 20px
      fill #666
      margin-right 5px
      transform-origin: 50% 50%;
      animation LoadMore-loading 1s linear infinite
      @keyframes LoadMore-loading
        from
          transform:rotate(0deg)
        to
          transform:rotate(1turn)
</style>
