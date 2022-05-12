<template>
  <div>
    <div  v-if="align === 'right'" class="wrap">
      <el-avatar class="avaR" v-if="item.sex=='男'" size="large" :src="require('@/assets/img/boy.jpg')"></el-avatar>
      <el-avatar class="avaR" v-if="item.sex=='女'" size="large" :src="require('@/assets/img/girl.jpg')"></el-avatar>
      <span class="chatBox-right">
        {{item.content}}
      </span>
    </div>
    <div v-if="align === 'left'" class="wrap">
<!--      <el-avatar  class="avaL" icon="el-icon-user-solid"></el-avatar>-->
      <el-avatar class="avaL" v-if="item.sex=='男'" size="large" :src="require('@/assets/img/boy.jpg')"></el-avatar>
      <el-avatar class="avaL" v-if="item.sex=='女'" size="large" :src="require('@/assets/img/girl.jpg')"></el-avatar>
      <div class="chatBox-left">
        {{item.content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: null
    },
    align: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      id: JSON.parse(localStorage.getItem('userLogin')).id
    }
  }
}
</script>

<style scoped>
.avaR{
  display: inline-block;
  float: right;
}
.avaL {
  display: inline-block;
  float: left;
}
.wrap {
  width: 100%;
  float: right;
  position: relative;
  margin-bottom: 10px;
}
.chatBox-right {
  display: inline-block;
  word-wrap:break-word;
  float: right;
  position: relative;
  right: 2px;
  min-width: 50px;
  max-width: 150px;
  min-height: 31px;
  background: #409eff;;
  border-radius: 5px;
  margin: 5px 5px 5px 5px ;
  padding: 10px 10px;
}

.chatBox-right:after {
  content: '';
  position:absolute;
  top: 7px;
  right: -4px;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  background-color: #409eff;;
}

.chatBox-left {
  word-wrap:break-word;
  float: left;
  position: relative;
  left: 2px;
  min-width: 50px;
  max-width: 200px;
  min-height: 31px;
  background: #faecd8;
  border-radius: 5px;
  margin: 5px 5px 5px 5px ;
  padding: 10px 10px;
}

.chatBox-left:after {
  content: '';
  position:absolute;
  top: 7px;
  left: -4px;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  background-color:#faecd8;
}
</style>