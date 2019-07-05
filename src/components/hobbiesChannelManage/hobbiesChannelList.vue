<template>
  <div class="my-container">
    <div class="hobbies-channelList">
      <div class="hobbies-channelList-title">
        <common-title common-title="兴趣部落二级分类列表"></common-title>
      </div>
      <div class="hobbies-channelList-header">
        <el-button @click="addHobbiesChannel">新增</el-button>
      </div>
      <div class="hobbies-channelList-content">
        <el-table :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="index"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column prop="channelTitle"
            label="标题"
            min-width="180">
          </el-table-column>
          <el-table-column prop="stateDes"
            label="状态"
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
                  @click="editHobbiesChannel(scope.$index)">编辑</a><span class="table-split">|</span>
                <message-box class="table-a"
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
      tableData: [],
      prompt: "是否删除该分类",
      successMsg: "删除成功",
      cancleMsg: "取消删除",
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
    addHobbiesChannel() {
      this.$router.push("/ht/index/addHobbiesChannel");
    },
    editHobbiesChannel(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/addHobbiesChannel?id=${_id}`
      });
    },
    confirmDelete(index) {
      let _id = this.tableData[index]._id;
      this.axios
        .delete("/api/ht/deleteHobbiesChannel", { data: { _id } })
        .then(res => {
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
        .get("/api/ht/hobbiesChannelList", { params: this.defalultParams })
        .then(res => {
          this.tableData = res.data.list;
          console.log(res.data.list);
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
.hobbies-channelList {
  min-height: 100px;
  .hobbies-channelList-header {
    text-align: right;
    margin-bottom: 10px;
  }
  .hobbies-channelList-content {
  }
  .table-a {
    color: #3f8de8;
  }
}
</style>
