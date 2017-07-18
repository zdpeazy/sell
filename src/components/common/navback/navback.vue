<template>
  <div class="back" @click="goback">
    <i class="icon-arrow_lift"></i>
  </div>
</template>

<script>
  export default {
    methods: {
      goback() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.back
  position absolute
  top 10px
  left 0
  .icon-arrow_lift
    display block
    padding 10px
    font-size 20px
    color #fff
</style>
