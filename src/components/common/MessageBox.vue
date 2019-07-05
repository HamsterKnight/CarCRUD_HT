<template>
  <el-button :type="buttonType"
    @click="cancle">{{message}}</el-button>
</template>

<script>
export default {
  props: {
    buttonType: {
      type: String,
      default: "primary"
    },
    message: {
      type: String,
      default: "删除"
    },
    prompt: {
      type: String,
      default: "是否永久删除该banner"
    },
    successMsg: {
      type: String,
      default: "删除成功"
    },
    cancleMsg: {
      type: String,
      default: "已取消删除"
    }
  },
  methods: {
    cancle() {
      this.$confirm(this.prompt, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          // 点击确定派发,确定删除事件
          this.$emit("confirm");
          // this.$message({
          //   type: 'success',
          //   message: this.successMsg
          // })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: this.cancleMsg
          });
        });
    }
  }
};
</script>
<style lang="less">
</style>
