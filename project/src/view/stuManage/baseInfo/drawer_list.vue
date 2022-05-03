<template>
  <div>
    <div class="drawer-wrap">
      <el-checkbox-group v-model="listArr">
        <div v-for="item in allColumnList" style="font-size: 25px">
          <el-checkbox :disabled="item==='学号' || item==='姓名'" :label="item"></el-checkbox>
        </div>
      </el-checkbox-group>
    </div>
    <div class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    allColumnList: {
      type: Array,
      default: []
    },
    columnList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      listArr: []
    };
  },
  methods: {
    close() {
      this.$emit('close')
    },
    confirm() {
      this.$emit('changeColunmArr', this.listArr)
      this.$emit('close')
    }
  },
  mounted() {
    this.listArr = this.columnList
  }
};
</script>

<style scoped>
.drawer-wrap {
  margin-left: 20px;
}
.footer {
  position: absolute;
  text-align: right;
  bottom: 20px;
  right: 10px;
}
</style>