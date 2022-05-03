<template>
  <div class="dialog-wrap">
    <el-table
      :data="data"
      v-if="data.length"
    >
      <el-table-column label="标题" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <a @click.stop="showDetail(scope.row)"> {{ scope.row.title }}</a>
        </template>
      </el-table-column>
      <el-table-column label="ID号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">
          {{ scope.row.tName }}
        </template>
      </el-table-column>
      <el-table-column label="内容" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>

    </el-table>
    <div v-else style="text-align:center;">暂无公告</div>

    <el-drawer
      :visible.sync="drawerVisible"
      size="30%"
      :modal="false"
      :title="drawerTitle"
    >
      <drawer-notice-detail
        :data="drawerData"
        @drawerClose="drawerClose"
      ></drawer-notice-detail>
    </el-drawer>
    <div class="footer">
      <el-button @click="close">关闭</el-button>
    </div>
  </div>
</template>

<script>
import drawerNoticeDetail from "@/view/overview/drawer_notice_detail";
export default {
  components: {
     drawerNoticeDetail
  },
  data() {
    return {
      drawerVisible: false,
      drawerData: null,
      drawerTitle: ''
    };
  },
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  computed: {},
  methods: {
    showDetail(val) {
      this.drawerTitle = '更多公告';
      this.drawerData = val;
      this.drawerVisible = true;
    },
    drawerClose() {
      this.drawerVisible = false;
      this.drawerData = null;
    },
    close() {
      this.$emit('close')
    }
  },
  mounted () {
  }
};
</script>

<style>
.footer {
  text-align: right;
}
</style>