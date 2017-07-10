<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script>
  import Vue from 'vue';
  // 引入中央事件总线
  import eventBus from '@/assets/eventBus';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    created() {
      // console.log(this.food);
    },
    methods: {
      addCart(event) {
        if (!event._constructed) { // 自己默认派发出来的事件,出去点击两次
          return;
        }
        if (!this.food.count) {
          // this.food.count = 1;不生效因为vue无法检测到自定义添加的属性
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count ++;
        }

        // this.$dispatch('cart.add', event.target); vue2.0废除事件通过$emit派发
        eventBus.$emit('cart.add', event.target);
        // console.log(this.food.count);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        if (this.food.count) {
          this.food.count --;
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
      font-size 0
      .cart-decrease
        display inline-block
        padding 6px
        transition all 0.4s linear
        .inner
          display inline-block
          font-size 24px
          line-height 24px
          color rgb(0, 160, 220)
          transition all 0.4s linear
        &.move-enter-active
          opacity 1
          transform translate3D(0, 0, 0)
          .inner
            transform rotate(0)
        &.move-enter, &.move-leave-active
          opacity 0
          transform  translate3D(24px, 0, 0)
          .inner
            transform rotate(180deg)
      .cart-count
        display inline-block
        font-size 10px
        vertical-align top
        width 12px
        padding-top 6px
        line-height 24px
        text-align center
        color rgb(147, 153, 159)
      .cart-add
        display inline-block
        padding 6px
        font-size 24px
        line-height 24px
        color rgb(0, 160, 220)
        
</style>
