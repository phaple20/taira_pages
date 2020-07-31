<template>
  <div>
    <!-- <button v-on:click="show = !show">Toggle</button>
    <transition name="harvey-fade">
      <p v-if="show">testtoggle</p>
    </transition> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true
    };
  }
};
</script>
<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.harvey-fade-enter-active {
  transition: all 0.3s ease;
}
.harvey-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.harvey-fade-enter, .harvey-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
