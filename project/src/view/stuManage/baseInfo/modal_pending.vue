<template>
  <div class="dialog-wrap">
    <el-table
      :data="tableData"
      v-if="tableData.length"
    >
      <el-table-column label="ID号">
        <template slot-scope="scope">
          <a @click.stop="showDetail(scope.row)"> {{scope.row.fromId}}</a>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="申请类型">
        <template slot-scope="scope">
          修改基本信息
        </template>
      </el-table-column>
      <el-table-column label="是否同意">
        <template slot-scope="scope">
          <el-button @click="agree(scope.row)" size="mini" type="success">同意</el-button>
          <el-button @click="refuse(scope.row)" size="mini" type="danger">拒绝</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div v-else style="text-align:center;">暂无需要处理事件</div>

    <el-drawer
      :visible.sync="drawerVisible"
      size="45%"
      :modal="false"
      :title="drawerTitle"
    >
      <drawerPendingInfo
        :data="drawerData"
        @drawerClose="drawerClose"
      ></drawerPendingInfo>
    </el-drawer>
    <div class="footer">
      <el-button @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
import drawerPendingInfo from "@/view/stuManage/baseInfo/drawer_pending_info";
export default {
  components: {
    drawerPendingInfo
  },
  data() {
    return {
      drawerVisible: false,
      drawerData: null,
      drawerTitle: ''
    }
  },
  props: {
    tableData: {
      type: Array,
      default: () => { return []}
    }
  },
  computed: {

  },
  methods: {
    agree(data){
      this.$socket.emit('xmBaseAgree', data)
    },
    refuse(data){
      this.$socket.emit('xmBaseRefuse', data)
    },
    close () {
      this.$emit('close')
    },
    confirm () {

    },
    transType(val) {
      switch (val){
        case 'addFriend':
          return '好友申请';
      }
    },
    showDetail(val) {
      this.drawerTitle = '修改详情'
      this.drawerData = val
      this.drawerVisible=true
    },
    drawerClose() {
      this.drawerVisible = false
      this.drawerData = null
    },
  },
  mounted() {
  }
}
</script>

<style scoped>
.footer {
  text-align: right;
}

</style>