<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="number" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
        <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
         {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
        <transition name="drop" v-for="ball in balls" :key="ball" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div class="ball" v-show="ball.show">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
    </div>
  </div>
</template>

<script>
  // 引入中央事件总线
  import eventBus from '@/assets/eventBus';

  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: []
      };
    },
    created() {
      eventBus.$on('cart.add', (el) => {
        // console.log(el);
        this.drop(el);
      });
    },
    methods: {
      drop(el) {
        // 触发一次事件就会将所有小球进行遍历 http://www.cnblogs.com/yuxingyoucan/p/7063881.html
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) { // 将false的小球放到dropBalls
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);// 设置小球的el属性为一个dom对象
            return;
          }
        }
      },
      // 小球动画的钩子
      beforeEnter(el) { // 这个方法的执行是因为这是一个vue的监听事件
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            console.log(ball.el);
            let rect = ball.el.getBoundingClientRect(); // 获取小球的相对于视口的位移(小球高度)
            console.log(rect);
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22); // 负数,因为是从左上角往下的的方向
            console.log(y);
            el.style.display = ''; // 清空display
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            // 处理内层动画
            let inner = el.getElementsByClassName('inner-hook')[0]; // 使用inner-hook类来单纯被js操作
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          };
        };
      },
      enter(el, done) { // 这个方法的执行是因为这是一个vue的监听事件
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0, 0, 0)';
          inner.style.transform = 'translate3d(0, 0, 0)';
          el.addEventListener('transitionend', done); // Vue为了知道过渡的完成，必须设置相应的事件监听器
        });
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift(); // 完成一次动画就删除一个dropBalls的小球
        if (ball) {
          ball.show = false;
          el.style.display = 'none'; // 隐藏小球
        };
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach((food) => {
          count += food.count;
        });
        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough';
        } else {
          return 'enough';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    background #000
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top 
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
              .icon-shopping_cart
                color #fff
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
          .number
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px 
            font-weight 700
            color #fff
            background rgba(240, 20, 20, 1)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top 
          line-height 24px
          margin-top 12px
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color #fff
        .desc
          display inline-block
          vertical-align top 
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px 
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          background #2b333b
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-enter-active
          transform all 0.4s 
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0, 160, 220)
            transition all 0.4s
          
</style>
