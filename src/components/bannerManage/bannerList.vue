<template>
  <div class="my-container">
    <div class="bannerList">
      <div class="bannerList-title">
        <common-title></common-title>
      </div>
      <div class="bannerList-header">
        <el-button @click="addBanner">新增</el-button>
      </div>
      <div class="bannerList-content">
        <el-table :data="tableData"
          border
          style="width: 100%">
          <el-table-column type="index"
            label="序号"
            width="55">
          </el-table-column>
          <el-table-column prop="bannerName"
            label="名字"
            min-width="180">
          </el-table-column>
          <el-table-column prop="startTime"
            label="上架时间"
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
                  @click="showBannerDetail(scope.$index)">查看</a><span class="table-split">|</span>
                <a href="javascript:;"
                  class="table-a"
                  @click="editBanner(scope.$index)">编辑</a><span class="table-split">|</span>
                <message-box class="table-a"
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
      defalultParams: {
        limit: 10,
        page: 1
      }
    };
  },
  mounted() {
    console.log(this.$route.params);
    this.init();
  },
  methods: {
    addBanner() {
      this.$router.push("/ht/index/addBanner");
    },
    showBannerDetail(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/showBannerDetail/${_id}`
      });
    },
    editBanner(index) {
      let _id = this.tableData[index]._id;
      this.$router.push({
        path: `/ht/index/addBanner?id=${_id}`
      });
    },
    confirmDelete(index) {
      let _id = this.tableData[index]._id;
      this.axios.delete("/api/ht/deleteBanner", { data: { _id } }).then(res => {
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
        .get("/api/ht/bannerList", { params: this.defalultParams })
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
.bannerList {
  min-height: 100px;
  .bannerList-header {
    text-align: right;
    margin-bottom: 10px;
  }
  .bannerList-content {
  }
  .table-a {
    color: #3f8de8;
  }
}
</style>
