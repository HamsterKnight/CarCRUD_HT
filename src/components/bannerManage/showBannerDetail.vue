<template>
  <div class="my-container">
    <div class="bannerDetail">
      <common-title common-title="banner详情"></common-title>
    </div>
    <div class="container_view">
      <div class="addrole-content">
        <div class="systemCommon-content ">
          <el-form class="show_bannerDetail"
            ref="form"
            :model="banner"
            label-width="126px">
            <el-form-item label="banner名字：">
              <p>{{banner.bannerName}}</p>
            </el-form-item>
            <el-form-item label="所属模块：">
              <span>{{banner.channelName}}</span>
            </el-form-item>
            <el-form-item label="发布状态：">
              <span>{{banner.state === 1 ? '发布': '下架'}}</span>
            </el-form-item>
            <el-form-item label="上传时间：">
              <p>{{banner.createTime}}</p>
            </el-form-item>
            <el-form-item label="最后修改时间：">
              <p>{{banner.updateTime}}</p>
            </el-form-item>
            <el-form-item label="上架时间：">
              <p>{{banner.startTime}}</p>
            </el-form-item>
            <el-form-item label="下架时间：">
              <p>{{banner.endTime}}</p>
            </el-form-item>
            <el-form-item label="banner描述：">
              <div>
                <p>{{banner.bannerDescription}}</p>
              </div>
            </el-form-item>
            <el-form-item label="banner图片：">
              <img v-if="banner.bannerPic"
                class="picSize"
                :src="`${path}${banner.bannerPic}`"
                alt="">
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                @click="editBanner"
                plain>修改</el-button>
              <!-- <message-box @confirm='confirmDelete'></message-box> -->
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
      banner: {},
      path: path
    };
  },
  mounted() {
    console.log(this.path);
    let id = "";
    if (!this.$route.params.id.toString()) {
      id = sessionStorage.getItem("id");
    } else {
      id = this.$route.params.id.toString();
    }
    this.getBannerDetail(id);
  },
  computed: {
    imgUrl() {
      return path + this.banner.bannerPic;
    }
  },
  methods: {
    getBannerDetail(id) {
      let _id = id;
      this.axios
        .get("/api/ht/getBannerDetail", { params: { id: _id } })
        .then(res => {
          this.banner = res.data.data;
        });
    },
    /* 派发一个修改当前banner事件 */
    editBanner() {
      let id = this.$route.params.id;
      this.$router.push({ name: "addBanner", params: { id } });
    },
    // 删除这个banner
    confirmDelete() {
      let id = this.$route.params.id;
      // bannerManage.deleteBanner([id]);
    },
    backToList() {
      this.$router.push("/ht/index/banenrList");
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
.show_bannerDetail {
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
