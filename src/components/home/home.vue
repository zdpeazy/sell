<template>
  <div class="home">
    <router-link v-show="showShop" @click="homehide" to="/shop">商品详情</router-link>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        showShop: true,
      };
    },
    methods: {
      homehide() {
        console.log(this.showShop);
        this.showShop = false;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
</style>
