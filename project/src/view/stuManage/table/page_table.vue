<template>
  <div>
    <div class="action-menu">
      <!--    左操作按钮 操作-->
      <div class="action-left">
        <el-tooltip content="刷新" placement="top-end">
          <el-button @click="refresh" size="mini" icon="el-icon-refresh-right"/>
        </el-tooltip>
        <el-dropdown style="margin-left: 10px" @command="dropClick">
          <el-button size="mini">
            操作<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="modalDelete" :disabled="selectItem.length!==1">删除</el-dropdown-item>
            <el-dropdown-item command="modalEdit" :disabled="selectItem.length!==1">编辑</el-dropdown-item>
            <el-dropdown-item command="modalIncrease">增加</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

      <!--    右操作按钮 控制列消失显示-->
      <div class="action-right">
        <el-button type="text" style="font-size: 20px;padding-top: 0px; margin-right: 5px" icon="el-icon-bell"/>

          <el-button size="mini" @click="drawerShow">
            <i class="el-icon-setting"></i>
          </el-button>

      </div>
    </div>

    <el-dialog
      class="dialog"
      style="z-index: 1990"
      :title="modalTitle"
      :visible.sync="dialogVisible"
      :width="'800px'"
      @close="modalClose"
    >
      <component
        :is="modalName"
        :id="id"
        :selectItem="selectItem"
        @close="modalClose"
      ></component>
    </el-dialog>
    <el-drawer
      :visible.sync="drawerVisible"
      size="30%"
      title="自定义列"
    >
      <drawer-list
        :allColumnList="allColumnList"
        :columnList="columnList"
        @changeColunmArr="changeColunmArr"
        @close="drawerClose"
      ></drawer-list>
    </el-drawer>


    <table-view
      :data="data"
      :loading="loading"
      @selectItem="getSelectItem"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column :min-width="colMinWidth" fixed="left" label="学号" v-if="columnList.includes('学号')">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" fixed="left" label="姓名" v-if="columnList.includes('姓名')">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="性别" v-if="columnList.includes('性别')">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="曾用名" v-if="columnList.includes('曾用名')">
        <template slot-scope="scope">
          {{ scope.row.usedName }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="身份证号" v-if="columnList.includes('身份证号')">
        <template slot-scope="scope">
          {{ scope.row.idNumber }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="生源地" v-if="columnList.includes('生源地')">
        <template slot-scope="scope">
          {{ scope.row.PlaceOfOrigin }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="血型" v-if="columnList.includes('血型')">
        <template slot-scope="scope">
          {{ scope.row.bloodType }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="民族" v-if="columnList.includes('民族')">
        <template slot-scope="scope">
          {{ scope.row.nation }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="政治面貌" v-if="columnList.includes('政治面貌')">
        <template slot-scope="scope">
          {{ scope.row.politicalOutlook }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="国籍" v-if="columnList.includes('国籍')">
        <template slot-scope="scope">
          {{ scope.row.nationality }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="地址" v-if="columnList.includes('地址')">
        <template slot-scope="scope">
          {{ scope.row.registeredResidence }}
        </template>
      </el-table-column>
    </table-view>

    <div class="content-footer">
      <div class="content-footer-left">
        共有&nbsp;&nbsp;{{total}}&nbsp;&nbsp;条记录<br>&emsp; 共&nbsp;&nbsp;{{totalPage}}&nbsp;&nbsp;页
      </div>
      <div class="content-footer-right">
        <el-button @click="pageChange('first')" type="text">
          <i class="el-icon-d-arrow-left" style="font-size: 20px"/>
        </el-button>
        <el-button :disabled="currentPage === 1" @click="pageChange('previous')" type="text">
          <i class="el-icon-arrow-left" style="font-size: 20px"/>
        </el-button>
        <el-tag type="info">{{currentPage}}</el-tag>
        <el-button :disabled="currentPage===totalPage" @click="pageChange('next')" type="text">
          <i class="el-icon-arrow-right" style="font-size: 20px"/>
        </el-button>
        <el-button @click="pageChange('last')" type="text">
          <i class="el-icon-d-arrow-right" style="font-size: 20px"/>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import pageTable from "@/global/pageTable";
import tableView from "@/view/stuManage/tableView";
import modalDelete from "@/view/stuManage/table/modal_delete";
import modalEdit from "@/view/stuManage/table/modal_edit";
import modalIncrease from "@/view/stuManage/table/modal_increase";
import drawerList from "@/view/stuManage/table/drawer_list";
export default {
  props: {
    data: {
      type: Array,
      default: []
    },
    loading: {
      type: Boolean,
      default: false
    },
    total: {
      type: Number,
      default: 0
    },
    totalPage: {
      type: Number,
      default: 0
    }
  },
  components: {
    tableView,
    modalDelete,
    modalEdit,
    modalIncrease,
    drawerList
  },
  mixins: [pageTable],
  data() {
    return {
      tableData: [],
      id: JSON.parse(localStorage.getItem('userLogin')).id,
      selectItem: [],
      modalTitle: '',
      modalName: '',
      dialogVisible: false,
      limit: 0,
      currentPage: 1,
      drawerVisible: false,
      allColumnList: ['学号','姓名','性别','曾用名','身份证号','生源地','血型','民族','政治面貌','国籍','地址'],
      columnList: ['学号','姓名','性别','曾用名','身份证号','生源地','血型','民族','政治面貌','国籍','地址']
    };
  },
  methods: {
    getSelectItem (val) {
      this.selectItem = val
    },
    refresh () {
      this.$emit('refresh')
    },
    dropClick (val) {
      switch (val) {
        case 'modalDelete':
          this.modalTitle = '删除'
          break;
        case 'modalEdit':
          this.modalTitle = '编辑'
          break;
        case 'modalIncrease':
          this.modalTitle = '增加'
          break;
      }
      this.dialogVisible = true
      this.modalName = val;
    },
    modalClose() {
      this.modalName = null;
      this.dialogVisible = false;
    },
    pageChange (val) {
      switch (val) {
        case 'first':
          this.currentPage = 1
          break;
        case 'previous':
          this.currentPage = this.currentPage - 1
          break;
        case 'next':
          this.currentPage = this.currentPage + 1
          break;
        case 'last':
          this.currentPage = this.totalPage
          break;
      }
      this.$emit('pageChange', this.currentPage)
    },
    drawerShow () {
      this.drawerVisible = true
    },
    drawerClose() {
      this.drawerVisible = false
    },
    changeColunmArr (val) {
      localStorage.setItem('columnList',JSON.stringify(val))
      this.columnList = val
    }
  },
  mounted() {
    const columnList = JSON.parse(localStorage.getItem('columnList'))
    if (columnList !== null) {
      this.columnList = columnList
    }
  }
};
</script>

<style scoped>
.table-wrap {

}
.action-menu {
  position: relative;
  /*background-color: darkolivegreen;*/
}

.action-left {
  display: inline-block;
}

.action-right {
  display: inline-block;
  position: absolute;
  right: 10px;
}
.content-footer {
  margin-top: 10px;
  font-size: 18px;
  /*background-color: forestgreen;*/
  position: relative;
  height: 50px;
}
.content-footer-left {
  /*background-color: red;*/
  margin-left: 10px;
  display: inline-block;
}
.content-footer-right {
  display: inline-block;
  position: absolute;
  right: 10px;
}
</style>