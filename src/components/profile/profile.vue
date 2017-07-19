<template>
  <div class="profile">
    <div>个人中心</div>
    <footerWrapper></footerWrapper>
  </div>
</template>

<script>
  import footerWrapper from '@/components/common/footer/footer';

  export default {
    components: {
      footerWrapper
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home
  width 100%
  height 100%
</style>
