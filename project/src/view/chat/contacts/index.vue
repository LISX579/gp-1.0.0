<template>
  <div class="current-content-wrap">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick" style="height: 100%">
      <el-tab-pane label="好友" name="single" style="height: 100%">
        <single
          :id="id"
        >
        </single>
      </el-tab-pane>
      <el-tab-pane label="群聊" name="group" style="height: 100%">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import single from './single'
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  components: {
    single
  },
  data () {
    return {
      activeName: 'single',
    }
  },
  methods: {
    handleClick (val) {
      console.log(val);
    },
  }

};
</script>

<style scoped>
>>> .el-tabs__content {
  padding: 0;
}
</style>