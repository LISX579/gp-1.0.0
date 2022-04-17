<template>
  <div class="current-content-wrap">

    <el-tabs v-model="activeName" @tab-click="handleClick" style="height: 100%">
      <el-tab-pane label="学生信息管理" name="stuInfo" style="height: 100%">
        <page-table
          :data="tableData"
          :loading="loading"
          :total="total"
          :totalPage="totalPage"
          @refresh="getList"
          @pageChange="getList"
        >
        </page-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import pageTable from "@/view/stuManage/table/page_table";
import fetch from "@/fetch/stuManage";
export default {
  components: {
    pageTable,
  },
  data() {
    return {
      activeName: 'stuInfo',
      tableData: [],
      id: JSON.parse(localStorage.getItem('userLogin')).id,
      loading: false,
      currentPage: 1,
      total: 0,
      totalPage : 0
    };
  },
  methods: {
    handleClick(tab, event) {
    },
    selectId (id) {
    },
    getList(val) {
      this.loading = true
      const _data = {
        id: this.id,
        page: this.currentPage
      }
      if (val) _data.page = (val - 1) * 10 + 1
      fetch.getMBaseInfo(_data).then(res => {
        this.tableData = res.res.data;
        this.total = res.total
        this.totalPage = res.totalPage
        this.loading = false
      });
    }
  },
  mounted() {
    this.getList()
    this.$bus.$on('stuRefresh', ()=> {
      this.getList()
    })
  }

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
}

.right {
  flex-basis: 25%;
  height: 100%;
  background-color: #ecf5ff;
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
