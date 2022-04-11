<template>
  <div id="app">
    <router-view
    ></router-view>
  </div>
</template>

<script>

export default {
  mounted() {
    // let beginTime = 0; //开始时间
    // let differTime = 0; //时间差
    // window.onunload = function () {
    //   differTime = new Date().getTime() - beginTime;
    //   if (differTime <= 5) {
    //     navigator.sendBeacon('http://127.0.0.1:9000/exit/' + JSON.parse(localStorage.getItem('userLogin')).id)
    //     localStorage.removeItem('userLogin');
    //   }
    // };
    //
    // window.onbeforeunload = function () {
    //   beginTime = new Date().getTime();
    // };
  }
};
</script>

<style>
#app {
  height: 99%;
  width: 99%;
  position: absolute;
}
</style>
