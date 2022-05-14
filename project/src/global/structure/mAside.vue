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
        <span slot="title">公告</span>
      </el-menu-item>
      <el-menu-item v-if="myLoginData.permission=='user'" index="selfInfo">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="chat">
        <el-badge :value="count" v-if="count!=0">
          <i class="el-icon-chat-round"></i>
        </el-badge>
        <i v-else class="el-icon-chat-round"></i>
        <span slot="title">
          通讯
        </span>
      </el-menu-item>
      <el-menu-item v-if="myLoginData.permission=='admin'" index="stuManage">
        <i class="el-icon-box"></i>
        <span slot="title">学生管理</span>
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
  sockets: {
    avgBadge(res) {
      this.count = res.data[0].count
    }
  },
  data() {
    return {
      isCollapse: false,
      menuActiveItme: 'overview',
      myLoginData: JSON.parse(localStorage.getItem('userLogin')),
      count: 0
    }
  },
  methods: {
    select(val) {
      this.$router.push({ name: val})
      this.menuActiveItme = val
    }
  },
  mounted() {
    this.$bus.$on ('countChange', ()=> {
      this.sockets.emit('avgCount', this.myLoginData.id)
    })
  }
}
</script>

<style scoped>
>>>.el-aside {
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

>>>.el-menu--collapse {
  width: 100%;
}
>>>.el-badge__content.is-fixed {
  top: 9px;
}
</style>
