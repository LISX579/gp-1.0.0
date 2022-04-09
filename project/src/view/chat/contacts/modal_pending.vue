<template>
  <div class="dialog-wrap">
    <el-table
      :data="tableData"
      v-if="tableData.length"
    >
      <el-table-column label="ID号">
        <template slot-scope="scope">
          <a @click.stop="showDetail(scope.row)"> {{scope.row.fromID}}</a>
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{scope.row.username}}
        </template>
      </el-table-column>
      <el-table-column label="申请类型">
        <template slot-scope="scope">
          {{transType(scope.row.opType)}}
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
      size="30%"
      :modal="false"
      :title="drawerTitle"
    >
      <applyDetail
        :data="drawerData"
        @drawerClose="drawerClose"
      ></applyDetail>
    </el-drawer>
    <div class="footer">
      <el-button @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
import applyDetail from "@/view/chat/contacts/drawer_applyDetail";
export default {
  components: {
    applyDetail
  },
  data() {
    return {
      drawerVisible: false,
      drawerData: null,
      drawerTitle: ''
    }
  },
  props: {
    userId: {
      type: String,
      default: ''
    },
    tableData: {
      type: Array,
      default: []
    }
  },
  computed: {

  },
  methods: {
    agree(data){
      data.myID = JSON.parse(localStorage.getItem('userLogin')).id
      this.$socket.emit('applyAgree', data)
    },
    refuse(){

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
      this.drawerTitle = this.transType(val.opType)
      this.drawerData = val
      this.drawerVisible=true
    },
    drawerClose() {
      this.drawerVisible = false
      this.drawerData = null
    },
  },
  mounted() {
    console.log(this.tableData);
  }
}
</script>

<style>
.footer {
  text-align: right;
}
</style>