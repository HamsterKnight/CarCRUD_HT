<template>
  <div class="common-title">
    <h6>{{commonTitle}}</h6>
  </div>
</template>
<script>
export default {
  props: {
    commonTitle: {
      type: String,
      default: "banner信息列表"
    }
  }
};
</script>
<style scoped>
.common-title {
  padding: 5px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  margin-bottom: 5px;
  width: 100%;
}
</style>

