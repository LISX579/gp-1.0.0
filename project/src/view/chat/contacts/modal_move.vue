<template>
  <div class="dialog-wrap">
    <el-alert
      type="warning"
      :closable="false"
      show-icon
    ><span slot="title">移动联系人到目标分组。</span></el-alert>
    <div class="content">
      <el-select v-model="fclass" placeholder="请选择分组" :disabled="showInput">
        <el-option
          v-for="(item, index) in opData"
          :key="index"
          :label="item"
          :value="item"
        >
        </el-option>
      </el-select>
      <el-button @click="showInput=!showInput" style="margin-left: 5px">{{ showInput ?  '移动至原有分组' :'移动至新分组' }}</el-button><br>
      <el-input v-model="newFclass" v-if="showInput" placeholder="请输入内容" style="margin-top: 10px"></el-input>
    </div>
    <div class="footer">
      <el-button @click="close">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </div>
</template>

<script>


import fetch from "@/fetch/chat";

export default {
  data() {
    return {
      newFclass: '',
      fclass: '',
      id: JSON.parse(localStorage.getItem('userLogin')).id,
      opData: [],
      showInput: false
    }
  },
  props: {
    toID: {
      type: Number,
      default: ''
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    confirm () {
      const postData = {
        id: this.id,
        toID: this.toID,
        fclass: this.showInput ? this.newFclass : this.fclass
      }
      fetch.contact_move(postData).then(res => {
        this.$bus.$emit('contact_move')
      })
      this.close()
    }
  },
  mounted() {
    fetch.getContact(this.id).then(res => {
      this.opData = new Set(res.data.map(item => item.fclass))
      res.data.forEach(item => {
        if (item.id == this.toID) {
          this.fclass = item.fclass
        }
      })
    })
  }
}
</script>

<style scoped>
.footer {
  text-align: right;
}
.content {
  margin: 10px 10px 10px 0px;
}
>>> .el-select {
  width: 60%;
}
</style>