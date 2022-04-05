<template>
  <div>
    <div class="wrap">
      <el-avatar class="avaR" icon="el-icon-user-solid"></el-avatar>
      <span class="chatBox-right">
        {{item.content}}
      </span>
    </div>
    <div class="wrap">
      <el-avatar class="avaL" icon="el-icon-user-solid"></el-avatar>
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
  background: #f8ac09;
  border-radius: 5px;
  margin: 5px 5px 5px 5px ;
  padding: 5px 5px 5px 5px;
}

.chatBox-right:after {
  content: '';
  position:absolute;
  top: 7px;
  right: -4px;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  background-color: #f8ac09;
}

.chatBox-left {
  word-wrap:break-word;
  float: left;
  position: relative;
  left: 2px;
  min-width: 50px;
  max-width: 200px;
  min-height: 31px;
  background: #f8ac09;
  border-radius: 5px;
  margin: 5px 5px 5px 5px ;
  padding: 5px 5px 5px 5px;
}

.chatBox-left:after {
  content: '';
  position:absolute;
  top: 7px;
  left: -4px;
  width: 8px;
  height: 8px;
  transform: rotate(45deg);
  background-color: #f8ac09;
}
</style>