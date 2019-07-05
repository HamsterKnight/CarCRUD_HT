<template>
  <div class="my-container">
    <div class="columnDetail">
      <common-title common-title="专栏详情"></common-title>
    </div>
    <div class="container_view">
      <div class="addrole-content">
        <div class="systemCommon-content ">
          <el-form class="show_columnDetail"
            ref="form"
            :model="column"
            label-width="126px">
            <el-form-item label="专栏标题：">
              <p>{{column.columnTitle}}</p>
            </el-form-item>
            <el-form-item label="所属模块：">
              <span>{{column.channelName}}</span>
            </el-form-item>
            <el-form-item label="发布状态：">
              <span>{{column.state === 1 ? '发布': '下架'}}</span>
            </el-form-item>
            <el-form-item label="创建时间：">
              <p>{{column.createTime}}</p>
            </el-form-item>
            <ul v-if="column.picList && column.picList.length > 0">
              <li v-for="(item, index) in column.picList"
                :key="index">
                <el-form-item label="专栏图片：">
                  <img :src="path + item.url"
                    alt="">
                </el-form-item>
                <el-form-item label="专栏标题：">
                  <p>{{item.imgTitle}}</p>
                </el-form-item>
                <el-form-item label="专栏链接：">
                  <p>{{item.imgLink}}</p>
                </el-form-item>
              </li>
            </ul>
            <el-form-item>
              <el-button type="primary"
                plain
                @click="backToList">返回列表页</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonTitle from "components/common/title";
import { path } from "@/http/commonValue.js";
export default {
  data() {
    return {
      column: {},
      path: path
    };
  },
  mounted() {
    let id = "";
    if (!this.$route.params.id.toString()) {
      id = sessionStorage.getItem("id");
    } else {
      id = this.$route.params.id.toString();
    }
    this.getColumnDetail(id);
  },
  computed: {
    imgUrl() {
      return path + this.column.columnPic;
    }
  },
  methods: {
    getColumnDetail(id) {
      let _id = id;
      this.axios
        .get("/api/ht/getColumnDetail", { params: { id: _id } })
        .then(res => {
          this.column = res.data.data;
          console.log(this.column);
        });
    },
    backToList() {
      this.$router.push("/ht/index/columnList");
    }
  },
  components: {
    "common-title": commonTitle
  }
};
</script>

<style lang="less" scoped>
.start-table {
  /* 消除表格中的padding */
  .el-table .cell,
  .el-table th div {
    padding-right: 20px;
  }
  .el-table .cell,
  .el-table th div,
  .el-table--border td:first-child .cell,
  .el-table--border th:first-child .cell {
    padding-left: 15px;
  }
}

.table-search {
  padding-bottom: 10px;
}
.table_input {
  &.el-input {
    width: 230px;
  }
}
.show_columnDetail {
  .form_textarea {
    width: 42% !important;
  }
  .el-form-item {
    color: #000;
  }
  .picSize {
    max-width: 400px;
  }
  label {
    text-align: right;
  }
}
</style>
