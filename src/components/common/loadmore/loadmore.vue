<template>
  <div class="loadmore" :style="{'height':this.loadingHei+'px','lineHeight':this.loadingHei+'px'}">
    <svg style="display: none;position:absolute;width:0;height:0">  
      <!-- 加载进度条 -->
      <symbol id="loading" viewBox="0 0 64 64">  
         <path d="M60 36h-8c-2.203 0-4-1.797-4-4 0-2.208 1.797-4 4-4h8c2.203 0 4 1.792 4 4 0 2.203-1.797 4-4 4zM48.973 20.686a4 4 0 0 1-5.66 0 3.995 3.995 0 0 1 0-5.655l5.66-5.653a3.99 3.99 0 0 1 5.65 0 4 4 0 0 1 0 5.655l-5.65 5.656zM32 64a4 4 0 0 1-4-4v-8a4 4 0 0 1 4-4c2.203 0 4 1.797 4 4v8c0 2.203-1.797 4-4 4zm0-48a4 4 0 0 1-4-4V4a4 4 0 1 1 8 0v8c0 2.208-1.797 4-4 4zM15.03 54.624a3.995 3.995 0 0 1-5.654 0 3.99 3.99 0 0 1 0-5.65l5.655-5.66a3.995 3.995 0 0 1 5.657 0 4.004 4.004 0 0 1 0 5.66l-5.655 5.65zm0-33.938L9.373 15.03a3.995 3.995 0 0 1 0-5.654 4 4 0 0 1 5.654 0l5.655 5.655a3.995 3.995 0 0 1 0 5.657 3.99 3.99 0 0 1-5.65 0zM16 32a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4 4 4 0 0 1 4-4h8a4 4 0 0 1 4 4zm32.973 11.314l5.65 5.66a3.99 3.99 0 0 1 0 5.65 3.992 3.992 0 0 1-5.65 0l-5.66-5.65a4 4 0 0 1 0-5.66 4 4 0 0 1 5.66 0z"/>  
      </symbol>
    </svg>
    <svg class="loading-icon" v-show="pullup">
      <use xlink:href="#loading"></use>
    </svg>
    <span>{{this.loadText}}</span>
  </div>
</template>

<script>
  export default {
    props: {
      loadingHei: {
        type: Number,
        default: 50
      },
      scroll: {
        type: Object
      },
      loadText: {
        type: String,
        default: '正在加载...'
      },
      pullup: {
        type: Boolean,
        default: true
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.loadmore
  width 100%
  border-top 1px solid #eee
  font-size 14px
  display flex
  box-align center
  align-items center
  box-pack center
  justify-content center
  .loading-icon
    display block
    width 20px
    height 20px
    fill #666
    margin-right 5px
    transform-origin: 50% 50%;
    animation LoadMore-loading 1s linear infinite
    @keyframes LoadMore-loading
      from
        transform:rotate(0deg)
      to
        transform:rotate(1turn)
    
</style>
