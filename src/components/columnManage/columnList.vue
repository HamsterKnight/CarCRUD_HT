<template>
  <div class="my-container">
    <div class="columnList">
      <div class="columnList-title">
        <common-title common-title="文章列表"></common-title>
      </div>
      <div class="columnList-header">
        <el-button @click="addColumn">新增</el-button>
      </div>
      <div class="columnList-content">
        <el-table :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="index"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column prop="columnTitle"
            label="专栏标题"
            min-width="180">
          </el-table-column>
          <!-- <el-table-column prop="author"
            label="作者"
            min-width="180">
          </el-table-column> -->
          <el-table-column label="状态"
            min-width="180">
            <template slot-scope="scope">
              <span>{{tableData[scope.$index].state == 0 ? '下架': '发布'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="channelName"
            label="所属板块"
            min-width="180">
          </el-table-column>
          <el-table-column prop="createTime"
            label="创建时间"
            min-width="180">
          </el-table-column>
          <el-table-column label="操作"
            min-width="180">
            <template slot-scope="scope">
              <div class="table-a-container">
                <a href="javascript:;"
                  class="table-a"
                  @click="showColumnDetail(scope.$index)">查看</a><span class="table-split">|</span>
                <a href="javascript:;"
                  class="table-a"
                  @click="editColumn(scope.$index)">编辑</a><span class="table-split">|</span>
                <message-box class="table-a"
                  :message="message"
                  :prompt="prompt"
                  :successMsg="successMsg"
                  :cancle-msg="cancleMsg"
                  @confirm='confirmDelete(scope.$index)'
                  buttonType="text"></message-box>
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
import MessageBox from "components/common/MessageBox.vue";
import page from "components/common/page.vue";
export default {
  data() {
    return {
      message: "删除",
      prompt: "是否删除该专栏",
      successMsg: "删除成功",
      cancleMsg: "取消删除",
      tableData: [
        {
          columnTitle: "我是汽车标题",
          createTime: "2019-02-15 20:18:01",
          channelName: "视频",
          state: 1
        }
      ],
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
    addColumn() {
      this.$router.push("/ht/index/addColumn");
    },
    showColumnDetail(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/showColumnDetail/${_id}`
      });
    },
    editColumn(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/addColumn?id=${_id}`
      });
    },
    confirmDelete(index) {
      let _id = this.tableData[index]._id;
      this.axios.delete("/api/ht/deleteColumn", { data: { _id } }).then(res => {
        this.init();
        this.$nextTick(() => {
          this.$forceUpdate();
        });
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
        .get("/api/ht/columnList", { params: this.defalultParams })
        .then(res => {
          this.tableData = res.data.list;
          this.defalultParams.totalCount = res.data.totalCount;
          this.defalultParams.allPage = res.data.allPage;
          this.tableData.forEach(element => {
            element.stateDes = element.state == 0 ? "下架" : "发布";
          });
        });
    }
  },
  components: {
    "common-title": commonTitle,
    "message-box": MessageBox,
    page
  }
};
</script>
<style lang="less" scoped>
.columnList {
  min-height: 100px;
  .columnList-header {
    text-align: right;
    margin-bottom: 10px;
  }
  .columnList-content {
  }
  .table-a {
    color: #3f8de8;
  }
}
</style>
