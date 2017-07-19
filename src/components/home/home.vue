<template>
  <div class="home">
    <headerWrapper></headerWrapper>
    <category></category>
    <restaurant></restaurant>
    <footerWrapper></footerWrapper>
  </div>
</template>

<script>
  import footerWrapper from '@/components/common/footer/footer';
  import headerWrapper from '@/components/home/children/header/header';
  import category from '@/components/home/children/category/category';
  import restaurant from '@/components/home/children/restaurant/restaurant';

  export default {
    components: {
      footerWrapper,
      headerWrapper,
      category,
      restaurant
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.home
  width 100%
  height 100%
</style>
