<template>
  <div class="my-container">
    <div class="hobbies-article">
      <div class="hobbies-article-title">
        <common-title common-title="兴趣部落文章列表"></common-title>
      </div>
      <!-- <div class="hobbies-article-header">
        <el-button @click="addArticle">新增</el-button>
      </div> -->
      <div class="hobbies-article-content">
        <el-table :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="index"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column prop="articleContent"
            label="文章内容"
            min-width="180">
          </el-table-column>
          <el-table-column prop="author"
            label="作者"
            min-width="180">
          </el-table-column>
          <el-table-column label="状态"
            min-width="180">
            <template slot-scope="scope">
              <span>{{tableData[scope.$index].state == 0 ? '下架': (tableData[scope.$index].state == 1 ? '发布' : (tableData[scope.$index].state == 2 ? '草稿' : tableData[scope.$index].state == 4 ? '审核不通过' : '审核'))}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime"
            label="创建时间"
            min-width="180">
          </el-table-column>
          <el-table-column prop="updateTime"
            label="更新时间"
            min-width="180">
          </el-table-column>
          <el-table-column label="操作"
            min-width="180">
            <template slot-scope="scope">
              <div class="table-a-container">
                <a href="javascript:;"
                  class="table-a"
                  @click="showArticleDetail(scope.$index)">查看</a><span class="table-split">|</span>
                <a href="javascript:;"
                  class="table-a"
                  v-if=" tableData[scope.$index].author == '汽车最前线'"
                  @click="editArticle(scope.$index)">编辑</a><span v-if=" tableData[scope.$index].author == '汽车最前线'"
                  class="table-split">|</span>
                <a href="javascript:;"
                  v-if="tableData[scope.$index].state === 1 &&tableData[scope.$index].hotState === false"
                  class="table-a"
                  @click="setHotArticle(scope.$index, true)">热门</a><span v-if="tableData[scope.$index].state === 1 &&tableData[scope.$index].hotState === false"
                  class="table-split">|</span>
                <a href="javascript:;"
                  v-if=" tableData[scope.$index].state === 1 && tableData[scope.$index].hotState === true"
                  class="table-a"
                  @click="setHotArticle(scope.$index, false)">取消热门</a><span v-if=" tableData[scope.$index].state === 1 && tableData[scope.$index].hotState === true"
                  class="table-split">|</span>
                <!-- 状态为3需要审核 -->
                <a href="javascript:;"
                  class="table-a"
                  v-if=" tableData[scope.$index].state === 3"
                  @click="auditArticle(scope.$index)">审核</a><span v-if=" tableData[scope.$index].state === 3"
                  class="table-split">|</span>
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
      prompt: "是否删除该兴趣文章",
      successMsg: "删除成功",
      cancleMsg: "取消删除",
      tableData: [
        // {
        //   articleTitle: "我是汽车标题",
        //   author: "夜锋咖",
        //   address: "上海市普陀区金沙江路 1518 弄",
        //   state: 1,
        //   createTime: "2019-02-15 20:18:01",
        //   updateTime: "2019-02-15 20:18:01",
        //   channelName: "视频"
        // }
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
    addArticle() {
      this.$router.push("/ht/index/addarticle");
    },
    showArticleDetail(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/showHobbiesArticleDetail/${_id}`
      });
    },
    editArticle(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/addarticle?id=${_id}`
      });
    },
    auditArticle(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/hobbiesArticleDetail/${_id}?audit=true`
      });
    },
    confirmDelete(index) {
      let _id = this.tableData[index]._id;
      this.axios
        .delete("/api/ht/deleteArticle", { data: { _id } })
        .then(res => {
          console.log(res);
          this.init();
          this.$nextTick(() => {
            this.$forceUpdate();
          });
        });
    },
    setHotArticle(index, type) {
      // 设置热门type为true, 取消为false
      let id = this.tableData[index]._id;
      this._setHotArticle(id, type);
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
        .get("/api/ht/getHobbiesArticleList", { params: this.defalultParams })
        .then(res => {
          this.tableData = res.data.list;
          console.log(this.tableData);
          this.defalultParams.totalCount = res.data.totalCount;
          this.defalultParams.allPage = res.data.allPage;
          this.tableData.forEach(element => {
            element.stateDes = element.state == 0 ? "下架" : "发布";
          });
        });
    },
    _setHotArticle(id, type) {
      this.axios
        .get("/api/ht/hotArticle", { params: { id, hotState: type } })
        .then(res => {
          if (res.data.code === 0) {
            this.$message("设置成功");
            this.$nextTick(() => {
              this.init();
            });
          }
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
<style lang="less">
.hobbies-article {
  min-height: 100px;
  .hobbies-article-header {
    text-align: right;
    margin-bottom: 10px;
  }
  .hobbies-article-content {
    // th.el-table_1_column_2 {
    //   .cell {
    //     overflow: hidden;
    //     text-overflow: ellipsis;
    //     white-space: nowrap;
    //   }
    // }
    .el-table_1_column_2 {
      .cell {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .table-a {
    color: #3f8de8;
  }
  .el-table__row {
    width: 180px !important;
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
  }
}
</style>
