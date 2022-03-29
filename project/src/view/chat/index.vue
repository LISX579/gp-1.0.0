<template>
  <div class="current-content-wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 100%">
      <el-tab-pane label="通讯" name="chat" style="height: 100%">
        <div class="container">
          <div class="left">
            <contact
              :id="id"
              @selectId="selectId"
            ></contact>
          </div>
          <div class="center">
            <chat
              :id="id"
              :selectedID-="selectedId"
            ></chat>
          </div>
          <div class="right">ccc</div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import chat from './chat/index';
import contact from './contacts/index';

export default {
  components: {
    chat,
    contact
  },
  data() {
    return {
      activeName: 'chat',
      id: JSON.parse(localStorage.getItem('userLogin')).id,
      selectedId: ''
    };
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    selectId (id) {
      this.selectedId = id
    }
  },

};
</script>

<style scoped>
.current-content-wrap {
  height: 100%;
}

.container {
  display: flex;
  height: 100%;
}

.left {
  flex-basis: 25%;
  height: 100%;
  background-color: pink;
}

.center {
  flex-grow: 1;
  height: 100%;
  background-color: powderblue;
}

.right {
  flex-basis: 25%;
  height: 100%;
  background-color: pink;
}

>>> .el-tabs {
  height: 100%;
}

>>> .el-tabs--top {
  height: 100%;
}

>>> .el-tabs__content {
  height: 94%;
}

>>> .el-tab-pane {
  height: 100%;
}
</style>
