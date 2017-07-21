<template>
  <div class="restaurant">
    <svg style="display: none;position:absolute;width:0;height:0">  
      <!-- 箭头图标 -->
      <symbol id="activity-more" viewBox="0 0 12 6">  
         <path d="M4.577 5.423c.79.77 2.073.767 2.857 0l4.12-4.026C12.345.625 12.09 0 10.985 0H1.027C-.077 0-.33.63.457 1.397l4.12 4.026z"/>  
      </symbol>    
    </svg>
    <ul class="shops-list">
      <router-link to="/shop" class="shop-item" v-for="(shop,index) in shops" :key="shop">
        <div class="item-left">
          <div class="img-wrapper">
            <img :src="imgUrl(shop.image_path)" alt="">
          </div>
        </div>
        <div class="item-right">
          <section class="info">
            <div class="shopname">
              <span class="name">{{shop.name}}</span>
            </div>
            <div class="supportWrap">
              <span class="support-item" v-for="support in shop.supports" :style="{'color':'#' + support.icon_color}">{{support.icon_name}}</span>
            </div>
          </section>
          <section class="info">
            <div class="ratingWrapper">
              <star :size="24" :score="shop.rating"></star>
              <span class="score">{{shop.rating}}</span>
              <span class="order-num">月售{{shop.recent_order_num}}单</span>
            </div>
            <div class="delivery-text" v-if="shop.delivery_mode">{{shop.delivery_mode.text}}</div>
          </section>
          <section class="info border-1px">
            <div class="deliveryWrap">
              <span>¥{{shop.float_minimum_order_amount}}起送</span>
              <span>配送费¥{{Math.ceil(shop.float_delivery_fee)}}</span>
              <span>{{shop.average_cost}}</span>
            </div>
            <div class="timedistanceWrap">
              <span>{{reducedUnit(shop.distance)}}</span>
              <span class="timeWrap">{{shop.order_lead_time}}分钟</span>
            </div>
          </section>
          <section class="activities">
            <div v-for="(active, index) in shop.activities" v-if="showNumber(shop, index)" class="active-item">
              <i class="icon" :style="{backgroundColor: '#' + active.icon_color}">{{active.icon_name}}</i>
              <span>{{active.description}}</span>
            </div>
            <div v-show="shop.activities.length>2" class="activityBtn" @click.stop.prevent="showActivities(shop)">
              <span>{{shop.activities.length}}活动</span>
              <svg class="arrow" :class="{'open':shop.activeMore}">
                <use xlink:href="#activity-more"></use>
              </svg>
            </div>
          </section>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
  import Vue from 'vue';
  import star from '@/components/common/star/star';

  export default {
    props: {
      shops: {
        type: Array
      },
      scroll: {
        type: Object
      }
    },
    data() {
      return {
        offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
        showBackStatus: false, // 显示返回顶部
        showLoading: true,
        touchend: false
      };
    },
    created() {
    },
    methods: {
      // 处理图片链接
      imgUrl(path) {
        let suffix = path.substring(path.length - 3, path.length);
        switch (suffix) {
          case 'png':
          path = path + '.png';
          break;
          case 'peg':
          path = path + '.jpeg';
          break;
        }
        let pathOne = path.substring(0, 1);
        let pathTwo = path.substring(1, 3);
        let pathThr = path.substring(3, path.length);
        path = 'http://fuss10.elemecdn.com/' + pathOne + '/' + pathTwo + '/' + pathThr;
        return path;
      },
      reducedUnit(distance) {
        distance >= 1000 ? distance = (distance / 1000).toFixed(2) + 'km' : distance = distance + 'm';
        return distance;
      },
      showActivities(shop) { // 涉及到给shop添加自定义属性，通过检测属性来让箭头变化
        if (shop.activeMore === undefined) {
          // console.log(1);
          Vue.set(shop, 'activeMore', true);
        } else {
          // Vue.set(shop, 'activeMore', false);
          shop.activeMore = !shop.activeMore;
        }
        console.log(this.scroll);
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      showNumber(shop, index) {
        if (shop.activeMore) {
          return index + 1;
        } else {
          return index < 2;
        }
      }

    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../static/stylus/mixin.styl';

.restaurant
  .shops-list
    .shop-item
      display flex
      box-pack justify
      justify-content space-between
      border-1px(#eee)
      &:last-child
        border-none()
      .item-left
        position relative
        padding 15px 10px
        .img-wrapper
          width 60px
          height 60px
          img
            display block
            width 100%
            height 100%
            border-radius 2px
      .item-right
        flex 1
        position relative
        padding 15px 10px
        font-size 12px
        color #666
        .info
          display flex
          align-items center
          box-pack justify
          justify-content space-between
          margin-top 8px
          &:first-child
            margin-top 0
          .shopname
            display flex
            align-items center
            box-align center
            margin 0
            padding 0
            max-width 188px
            height 16px
            font-size 16px
            .name
              font-weight 700
              color #000
              overflow hidden
              text-overflow ellipsis
              white-space nowrap
          .supportWrap
            .support-item
              border 1px solid #eee
              margin-left 3px
          .ratingWrapper
            display flex
            align-items center
            box-align center
            .score
              color #ff6000
              margin 0 5px
          .delivery-text
            color #fff
            background #2395FF
            padding 1px 2px
            border-radius 2px
          .deliveryWrap
            span:before
              content '/'
              margin 0 3px
              color #ddd
            span:first-child:before
              content '';
              margin-left 0
            span:nth-of-type(2)
              overflow: hidden;
              max-width: 100px;
              text-overflow: ellipsis;
              white-space: nowrap;
          .timedistanceWrap
            .timeWrap
              color #2395ff
              &:before
                content '/'
                margin 0 3px 
                color #ddd
        .activities
          position relative
          margin-top 10px
          overflow hidden
          .active-item
            margin-top 10px
            &:first-child
              padding-right 70px
              padding-top 10px
              margin-top 0
              border-top 1px solid #eee
            .icon
              display inline-block
              width 13px
              height 13px
              box-sizing border-box
              border-radius 1px
              line-height 14px
              text-align center
              font-size 12px
              position relative
              color #fff
              font-style normal
              margin-right 3px
          .activityBtn
            display block
            height 100%
            box-sizing border-box
            position absolute
            right 0
            top 0
            padding 10px 0
            .arrow
              width 6px
              height 6px
              fill #666
              vertical-align middle
              position relative
              top -1px
              transition:all .3s ease-in-out;
              transform:rotate(0deg);
              &.open
                transform rotate(180deg)
</style>
