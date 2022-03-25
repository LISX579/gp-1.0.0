<template>
  <div id="app">
    <router-view
    ></router-view>
  </div>
</template>

<script>

export default {
  mounted() {
    window.onbeforeunload = function(){
      var n = window.event.screenX - window.screenLeft;
      var b = n > document.documentElement.scrollWidth-20;
      if(b && window.event.clientY < 0 || window.event.altKey)
      {
        const data = JSON.parse(localStorage.getItem('userLogin')).id
        navigator.sendBeacon('http://127.0.0.1:9000/exit/' + data)
        localStorage.removeItem('userLogin')
      }
    }
  }
}
</script>

<style>
 #app {
   height: 99%;
   width: 100%;
   position: absolute;
 }
</style>
