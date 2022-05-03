<template>
  <div>
    <el-table
      :data="data"
      :height="tableHeight"
      v-loading="loading"
      @select="select"
      ref="table"
    >                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 >
      <slot></slot>
    </el-table>
  </div>
</template>


<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    select (val) {
      this.$emit('selectItem', val)
    }
  },
  data() {
    return {
      id: JSON.parse(localStorage.getItem('userLogin')).id,
      tableHeight: window.innerHeight - 230, //表格动态高度
      screenHeight: window.innerHeight, //内容区域高度
    };
  },
  computed: {
    height: function () {
      return (window.innerHeight - 6666) + 'px';
    }
  },
  mounted() {
    this.$bus.$on('tableRelayout', () => {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    })
  }
};
</script>

<style scoped>

</style>