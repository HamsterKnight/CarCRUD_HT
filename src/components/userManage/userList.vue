<template>
  <div class="my-container">
    <div class="userList">
      <div class="userList-title">
        <common-title common-title="用户列表"></common-title>
      </div>
      <div class="userList-content">
        <el-table :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="index"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column prop="account"
            label="账号"
            min-width="180">
          </el-table-column>
          <el-table-column prop="author"
            label="昵称"
            min-width="180">
          </el-table-column>
          <el-table-column label="电话"
            min-width="180">
            <template slot-scope="scope">
              <div>
                {{tableData[scope.$index].detailMessage ? (tableData[scope.$index].detailMessage.phoneNumber ?tableData[scope.$index].detailMessage.phoneNumber:"" ): ''}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="等级"
            min-width="180">
            <template slot-scope="scope">
              <div>
                {{tableData[scope.$index].detailMessage ? (tableData[scope.$index].detailMessage.level ==1? '专栏专家':'普通用户' ): '普通用户'}}
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作"
            min-width="180">
            <template slot-scope="scope">
              <div class="table-a-container">
                <a href="javascript:;"
                  class="table-a"
                  @click="showUserDetail(scope.$index)">查看</a><span class="table-split">|</span>
                <a href="javascript:;"
                  class="table-a"
                  @click="editUser(scope.$index)">编辑</a>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <page :limit="defalultParams.limit"
          :page="defalultParams.page"
          :total-count="defalultParams.totalCount"
          @pageChange="pageChange"
          @limitChange="limitChange"></page>
      </div>
    </div>
  </div>
</template>
<script>
import commonTitle from "components/common/title.vue";
import page from "components/common/page.vue";
export default {
  data() {
    return {
      message: "删除",
      prompt: "是否删除该tag",
      successMsg: "删除成功",
      cancleMsg: "取消删除",
      tableData: [],
      defalultParams: {
        limit: 10,
        page: 1
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    showUserDetail(index) {
      let authorId = this.tableData[index].authorId;
      this.$router.push({
        path: `/ht/index/userDetail/${authorId}`
      });
    },
    editUser(index) {
      let authorId = this.tableData[index].authorId;
      this.$router.push({
        path: `/ht/index/editUser/${authorId}`
      });
    },
    pageChange(page) {
      this.defalultParams.page = page;
      this.init();
    },
    limitChange(limit) {
      this.defalultParams.limit = limit;
      this.init();
    },
    init() {
      this.axios
        .get("/api/ht/userList", { params: this.defalultParams })
        .then(res => {
          this.tableData = res.data.list;
          this.defalultParams.totalCount = res.data.totalCount;
          this.defalultParams.allPage = res.data.allPage;
        });
    }
  },
  components: {
    "common-title": commonTitle,
    page
  }
};
</script>
<style lang="less" scoped>
.userList {
  min-height: 100px;
  .userList-header {
    text-align: right;
    margin-bottom: 10px;
  }
  .userList-content {
  }
  .table-a {
    color: #3f8de8;
  }
}
</style>
