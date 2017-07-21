<template>
  <div id="app" class="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
