<template>
  <div class="my-pagination">
    <el-pagination @size-change="handleSizeChange"
      background
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 30, 50]"
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    totalCount: {
      type: Number
    },
    limit: {
      type: Number,
      default: 10
    }
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit("pageChange", page);
    },
    handleSizeChange(limit) {
      this.$emit("limitChange", limit);
    }
  }
};
</script>
<style lang="less" scoped>
.my-pagination {
  margin-top: 20px;
  width: 100%;
  text-align: right;
}
</style>

