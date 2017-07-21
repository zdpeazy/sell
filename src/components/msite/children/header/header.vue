<template>
  <div class="headerwrapper">
    <svg style="display: none;position:absolute;width:0;height:0">  
      <!-- 定位图标 -->
      <symbol id="location" viewBox="0 0 1024 1024">  
         <path d="M512,64c-185.281,0-336,150.719-336,336c0,70.587,21.958,138.304,63.424,195.891l8.818,12.359l241.363,340.54
        C494.896,955.844,503.209,960,512,960c8.79,0,17.103-4.156,22.395-11.21L772.75,612.297L784.509,596
        C826.043,538.304,848,470.587,848,400C848,214.719,697.281,64,512,64z M512,512c-61.77,0-112-50.23-112-112s50.23-112,112-112
        c61.77,0,112,50.23,112,112S573.77,512,512,512z"/>  
      </symbol>
      <!-- 箭头图标 -->
      <symbol id="arrow" viewBox="0 0 14 8">  
         <path d="M5.588 6.588c.78.78 2.04.784 2.824 0l5.176-5.176c.78-.78.517-1.412-.582-1.412H.994C-.107 0-.372.628.412 1.412l5.176 5.176z"/>  
      </symbol>    
    </svg>
    <div class="index-header">
      <div class="location">
        <svg class="locationIcon">
          <use xlink:href="#location"></use>
        </svg>
        <span class="name">小满云创文化产业有限公司有限公司</span>
        <svg class="arrow">
          <use xlink:href="#arrow"></use>
        </svg>
      </div>
      <aside class="weather">
        <div>
          <h2 class="temperature">33°</h2>
          <p>晴天</p>
        </div>
        <img alt="天气图标" class="temperatureIcon" src="http://fuss10.elemecdn.com/9/b9/c8e482821be2080edcffbb3a8d376png.png">
      </aside>
    </div>
    <input type="text" placeholder="输入商家、商品名称" aria-label="搜索商家、商品" class="searchbox">
  </div>
</template>

<script>
  export default {
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
.headerwrapper
  padding 10px
  background-image linear-gradient(90deg,#0af,#0085ff) 
  .index-header
    display flex
    box-align center
    align-items center
    box-pack justify
    justify-content space-between
    .location
      width 60%
      display flex
      box-align center
      align-items center
      .locationIcon 
        width 20px
        height 22px
        fill #fff
      .name
        margin 0 3px
        font-size 18px
        max-width: 80%
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        color #fff
      .arrow
        width 10px
        height 5px
        fill #fff
    .weather
      display flex
      box-align center
      align-items center
      text-align right
      color #fff
      font-size 14px
      img
        margin-left 4px
        width 28px
        height 28px  
  .searchbox
    width 100%
    height 36px
    margin 8px 0
    text-align center
    border-radius 5px
    box-shadow 0 1px 3px rgba(0,0,0,.2)
    font-size 14px
</style>
