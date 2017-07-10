<template>
  <div class="rating">
    
  </div>
</template>

<script>
  export default {
    const POSITIVE = 0;
    const NEGATIVE = 1;
    const ALL =2;
    rating: {
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
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .split
    height 16px
    width 100%
    border-top 1px solid rgba(7, 17, 27, .1)
    border-bottom 1px solid rgba(7, 17, 27, .1)
    background #f3f5f7
</style>
