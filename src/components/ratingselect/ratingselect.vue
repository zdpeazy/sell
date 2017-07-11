<template>
  <div class="ratingseclect">
    <div class="rating-type">
      <span class="block positive" @click="select(2,$event)" :class="{'active':selectType===2}">{{desc.all}}<span class="count">{{ratings.length}}</span>
      </span>
      <span class="block positive" @click="select(0,$event)" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" @click="select(1,$event)" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" @click="toggleContent" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看内容的评价</span>
    </div>
  </div>
</template>

<script>
  // 引入中央事件总线
  import eventBus from '@/assets/eventBus';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  export default {
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter((rating) => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return;
        }
        // 这里报错因为vue2.0禁止子组件修改父组件传过来的props只能利用
        // this.selectType = type;
        // 向父组件传值通信
        // console.log(type);
        eventBus.$emit('ratingtype.select', type);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return;
        }
        // 报错同上
        // this.onlyContent = !this.onlyContent;
        eventBus.$emit('content.toggle', this.onlyContent);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
  
  .ratingseclect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, .1))
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        color rgb(77, 85, 93)
        font-size 12px
        &.active
          color #fff
        .count
          margin-left 2px
          font-size 8px
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, 0.2)
          &.active
            background rgb(77, 85, 93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(1, 17, 27, .1)
      color rgb(147, 153, 159)
      font-size 0
      &.on 
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
      .text
        display inline-block
        vertical-align top
        font-size 12px
</style>
