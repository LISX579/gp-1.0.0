<template>
  <div class="current-content-wrap">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="height: 100%">
      <el-tab-pane label="好友" name="single" style="height: 100%">
        <single :id="id"/>
      </el-tab-pane>
      <el-tab-pane label="群聊" name="group" style="height: 100%">

      </el-tab-pane>
    </el-tabs>
    <control-bar :id="id"></control-bar>
  </div>
</template>

<script>
import single from './single'
import controlBar from "@/view/chat/contacts/controlBar";
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    single,
    controlBar
  },
  data () {
    return {
      activeName: 'single',
    }
  },
  methods: {
    handleClick() {

    }
  }

};
</script>

<style scoped>
>>> .el-tabs__content {
  padding: 0;
}
>>> .el-tabs__nav-scroll {
  background-color: #c6e2ff;
}
</style>