<template>
  <el-container class="container1">
    <el-aside class="el-aside" style="width: auto">
      <m-aside></m-aside>
    </el-aside>
    <el-container class="container2">
      <el-header style="text-align: right; font-size: 12px">
        <m-header></m-header>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-aside {
  z-index: 5;
  background-color: rgb(238, 241, 246);
}
.container1 {
  height: 500px;
  border: 1px solid #eee;
  height: 100%;
}
.container2 {
  position: absolute;
  height: 100%;
  width: calc(100% - 54px);
  margin-left: 54px;
}
.el-main{
  padding: 0px 20px 15px 38px;
}
</style>

<script>
import mAside from "@/global/structure/mAside";
import mHeader from "@/global/structure/mHeader";
export default {
  components: {
    mAside,
    mHeader
  },
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
  }
};
</script>
