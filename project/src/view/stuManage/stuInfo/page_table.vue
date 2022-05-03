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
        <el-button v-if="pdTableData.length == 0" type="text" @click="showPending" style="font-size: 20px;position: absolute;right: 66px;top: -8px; " icon="el-icon-bell"/>
        <el-badge v-else :value="pdTableData.length" class="item" style="position: absolute;right: 50px;">
          <el-button  type="text" @click="showPending" style="font-size: 20px; padding-top: 3px; margin-right: 15px" icon="el-icon-bell"/>
        </el-badge>


        <el-button style="position: absolute;right: -2px;" size="mini" @click="drawerShow">
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
        :tableData="pdTableData"
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
      <el-table-column :min-width="colMinWidth" label="年级" v-if="columnList.includes('年级')">
        <template slot-scope="scope">
          {{ scope.row.schoolYear }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="学院名称" v-if="columnList.includes('学院名称')">
        <template slot-scope="scope">
          {{ scope.row.collegeName }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="系名称" v-if="columnList.includes('系名称')">
        <template slot-scope="scope">
          {{ scope.row.departmentName }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="专业方向" v-if="columnList.includes('专业方向')">
        <template slot-scope="scope">
          {{ scope.row.professionalDirection }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="专业名称" v-if="columnList.includes('专业名称')">
        <template slot-scope="scope">
          {{ scope.row.major }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="班级名称" v-if="columnList.includes('班级名称')">
        <template slot-scope="scope">
          {{ scope.row.className }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="学制" v-if="columnList.includes('学制')">
        <template slot-scope="scope">
          {{ scope.row.trainingMode }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="学籍状态" v-if="columnList.includes('学籍状态')">
        <template slot-scope="scope">
          {{ scope.row.studentStatus }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="职务" v-if="columnList.includes('职务')">
        <template slot-scope="scope">
          {{ scope.row.office }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="是否在校" v-if="columnList.includes('是否在校')">
        <template slot-scope="scope">
          {{ scope.row.inScholl }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="报到注册状态" v-if="columnList.includes('报到注册状态')">
        <template slot-scope="scope">
          {{ scope.row.registStatus }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="报到注册备注" v-if="columnList.includes('报到注册备注')">
        <template slot-scope="scope">
          {{ scope.row.registRemark }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="报到时间" v-if="columnList.includes('报到时间')">
        <template slot-scope="scope">
          {{ scope.row.checkinTime }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="学历层次" v-if="columnList.includes('学历层次')">
        <template slot-scope="scope">
          {{ scope.row.cultivationLevel }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="培养方式" v-if="columnList.includes('培养方式')">
        <template slot-scope="scope">
          {{ scope.row.cultureMethod }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="培养层次" v-if="columnList.includes('培养层次')">
        <template slot-scope="scope">
          {{ scope.row.cultivationLevel }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="学生类别" v-if="columnList.includes('学生类别')">
        <template slot-scope="scope">
          {{ scope.row.typeOfStu }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="招生季度" v-if="columnList.includes('招生季度')">
        <template slot-scope="scope">
          {{ scope.row.enrollmentquarter }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="所属学院" v-if="columnList.includes('所属学院')">
        <template slot-scope="scope">
          {{ scope.row.affiliationSchool }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="招生专业" v-if="columnList.includes('招生专业')">
        <template slot-scope="scope">
          {{ scope.row.admissionsMajor }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="招生年度" v-if="columnList.includes('招生年度')">
        <template slot-scope="scope">
          {{ scope.row.enrollmentYear }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="毕业学院" v-if="columnList.includes('毕业学院')">
        <template slot-scope="scope">
          {{ scope.row.office }}
        </template>
      </el-table-column>
      <el-table-column :min-width="colMinWidth" label="毕业专业" v-if="columnList.includes('毕业专业')">
        <template slot-scope="scope">
          {{ scope.row.graduatedMajor }}
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
import modalDelete from "@/view/stuManage/stuInfo/modal_delete";
import modalEdit from "@/view/stuManage/stuInfo/modal_edit";
import modalIncrease from "@/view/stuManage/stuInfo/modal_increase";
import drawerList from "@/view/stuManage/stuInfo/drawer_list";
import pending from "@/view/stuManage/stuInfo/modal_pending";
export default {
  sockets: {
    refreshStu(res) {
      if (!res.data) this.pdTableData=[]
      else {
        this.pdTableData = res.data.map(item => {
          item.data = JSON.parse(item.data)
          return item
        })
      }
    }
  },
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
    drawerList,
    pending
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
      allColumnList: ['学号','姓名','年级','学院名称','系名称','专业方向','专业名称','班级名称','学制','学籍状态','职务','是否在校','报到注册状态','报到注册备注','报到时间','学历层次','培养方式','培养层次','学生类别','招生季度','所属学院','招生专业','招生年度','毕业学院','毕业专业'],
      columnList: ['学号','姓名','年级','学院名称','系名称','专业方向','专业名称','班级名称','学制','学籍状态','职务','是否在校','报到注册状态','报到注册备注','报到时间','学历层次','培养方式','培养层次','学生类别','招生季度','所属学院','招生专业','招生年度','毕业学院','毕业专业'],
      pdTableData: []
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
      localStorage.setItem('stu_columnList',JSON.stringify(val))
      this.columnList = val
      this.$bus.$emit('tableRelayout')
    },
    showPending () {
      this.modalTitle = '待处理'
      this.dialogVisible = true
      this.modalName = 'pending' ;
    },
  },
  mounted() {
    this.$socket.emit('stuPending', this.id)
    const columnList = JSON.parse(localStorage.getItem('stu_columnList'))
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
>>> .el-badge__content.is-fixed {
  top: 8px;
  right: 20px;
}
</style>