<template>
  <div class="my-container">
    <div class="tagList">
      <div class="tagList-title">
        <common-title common-title="tag列表"></common-title>
      </div>
      <div class="tagList-header">
        <el-button @click="addTag">新增</el-button>
      </div>
      <div class="tagList-content">
        <el-table :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="index"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column prop="tagName"
            label="名字"
            min-width="180">
          </el-table-column>
          <el-table-column prop="createTime"
            label="创建时间"
            min-width="180">
          </el-table-column>
          <el-table-column prop="channelName"
            label="所属板块"
            min-width="180">
          </el-table-column>
          <el-table-column prop="stateDes"
            label="状态"
            min-width="180">
          </el-table-column>
          <el-table-column label="操作"
            min-width="180">
            <template slot-scope="scope">
              <div class="table-a-container">
                <a href="javascript:;"
                  class="table-a"
                  @click="editTag(scope.$index)">编辑</a><span class="table-split">|</span>
                <message-box class="table-a"
                  :message="message"
                  :prompt="prompt"
                  :success-msg="successMsg"
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
    addTag() {
      this.$router.push("/ht/index/addTag");
    },
    editTag(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/addtag?id=${_id}`
      });
    },
    confirmDelete(index) {
      let _id = this.tableData[index]._id;
      this.axios.delete("/api/ht/deleteTag", { data: { _id } }).then(res => {
        console.log(res);
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
        .get("/api/ht/tagList", { params: this.defalultParams })
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
.tagList {
  min-height: 100px;
  .tagList-header {
    text-align: right;
    margin-bottom: 10px;
  }
  .tagList-content {
  }
  .table-a {
    color: #3f8de8;
  }
}
</style>
