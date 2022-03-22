<template>
  <div>
    <el-menu
        class="el-menu-vertical-demo"
        :collapse="true"
        :default-active="menuActiveItme"
        @select="select"
    >
      <div><img
          src="https://www.cnlogo8.com/d/file/20210809/zhajj2fywlqcnlogo8.png"
          class="smallImg"></div>
      <el-menu-item index="overview">
        <i class="el-icon-s-home"/>
        <span slot="title">概览</span>
      </el-menu-item>
      <el-menu-item index="selfInfo">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="chat">
        <i class="el-icon-chat-round"></i>
        <span slot="title">通讯</span>
      </el-menu-item>
<!--      <el-menu-item index="2">-->
<!--        <i class="el-icon-menu"></i>-->
<!--        <span slot="title">导航二</span>-->
<!--      </el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menuActiveItme: 'overview'
    }
  },
  methods: {
    select(val) {
      this.$router.push({ name: val})
      this.menuActiveItme = val
    }
  }
}
</script>

<style>
.el-aside {
  color: #333;
}

.btn {
  width: 100%;
  border: 0px solid #DCDFE6;
}

.smallImg {
  margin-left: 0px;
  height: 54px;
}

.el-menu--collapse {
  width: 100%;
}
</style>
