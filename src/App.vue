<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import home from '@/components/home/home.vue';

  export default {
    components: {
      home
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.app
  overflow hidden
  width 100%
  height 100%
</style>
