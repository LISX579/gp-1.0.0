<template>
  <div class="control-bar">
    <el-dropdown trigger="click" placement="top-start">
      <span class="el-dropdown-link">
        <i class="el-icon-more" style="font-size: 30px"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>菜单栏一</el-dropdown-item>
        <el-dropdown-item>菜单栏一</el-dropdown-item>
        <el-dropdown-item>菜单栏一</el-dropdown-item>
        <el-dropdown-item>菜单栏一</el-dropdown-item>
        <el-dropdown-item>菜单栏一</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
export default {
name: "controlBar"
}
</script>

<style scoped>
.control-bar {
  margin-left: 10px;
  position: absolute;
  bottom: 0
}
/*>>> .el-dropdown-menu {*/
/*  left: 93px;*/
/*}*/
</style>