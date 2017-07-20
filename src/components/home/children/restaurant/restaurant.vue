<template>
  <div class="restaurant">
    <h3 class="title">推荐商家</h3>
    <ul class="shops-list">
      <li class="shop-item" v-for="(shop,index) in shops" :key="shop">
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
              <span></span>
            </div>
          </section>
          <section class="info">
            <div class="ratingWrapper">
              <star :size="24" :score="shop.rating"></star>
              <span class="score">{{shop.rating}}</span>
              <span class="order-num">月售{{shop.recent_order_num}}单</span>
            </div>
            <div class="delivery-text"></div>
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
            <div v-for="active in shop.activities" class="active-item">
              <i class="icon">{{active.icon_name}}</i>
              <span>{{active.description}}</span>
            </div>
            <div v-show="shop.activities.length" class="activityBtn">{{shop.activities.length}}活动</div>
          </section>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import star from '@/components/common/star/star';

  export default {
    props: {
      shops: {
        type: Array
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
        distance >= 1000 ? distance = distance / 1000 + 'km' : distance = distance + 'm';
        return distance;
      }
    },
    components: {
      star
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../../../static/stylus/mixin.styl';

.restaurant
  .title
    padding 10px 15px 
    font-size 16px
    font-weight 600
  .shops-list
    .shop-item
      display flex
      box-pack justify
      justify-content space-between
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
          .ratingWrapper
            display flex
            align-items center
            box-align center
            .score
              color #ff6000
              margin 0 5px
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
          .icon
            display inline-block
            box-sizing border-box
            text-align center
            width 12px
            height 12px
            font-size 10px
            border-radius 2px
            position relative
</style>
