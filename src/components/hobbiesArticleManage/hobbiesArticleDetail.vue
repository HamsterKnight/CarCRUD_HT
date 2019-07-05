<template>
  <div class="my-container">
    <div class="articleDetail">
      <common-title common-title="兴趣部落文章详情"></common-title>
    </div>
    <div class="container_view">
      <div class="addrole-content">
        <div class="systemCommon-content ">
          <el-form class="show_articleDetail"
            ref="form"
            :model="article"
            label-width="126px">
            <el-form-item label="作者：">
              <p>{{article.author}}</p>
            </el-form-item>
            <el-form-item label="所属模块：">
              <span>{{article.channelName}}</span>
            </el-form-item>
            <el-form-item label="发布状态：">
              <span>{{article.state === 1 ? '发布': '下架'}}</span>
            </el-form-item>
            <el-form-item label="上传时间：">
              <p>{{article.createTime}}</p>
            </el-form-item>
            <el-form-item label="最后修改时间：">
              <p>{{article.updateTime}}</p>
            </el-form-item>
            <el-form-item label="文章图片">
              <img v-for="(img, index) in article.picList"
                :key="index"
                :src="`${path}${img.url}`">
            </el-form-item>
            <el-form-item label="文章内容：">
              <div>
                <p v-html="article.articleContent"></p>
              </div>
            </el-form-item>
            <el-form-item label="文章标签：">
              <p v-if="article.articleTag && article.articleTag.length > 0">{{articleTag}}</p>
            </el-form-item>
            <el-form-item label="附件：">
              <video v-if="article.articleVideo"
                class="picSize"
                :src="`${path}${article.articleVideo}`"
                alt=""> </video>
            </el-form-item>
            <el-form-item v-if="article.faildContent"
              label="审核不通过原因：">
              <p>{{article.faildContent}}</p>
            </el-form-item>
            <el-form-item v-if="article.state == 1"
              label="审核">
              <p>通过</p>
            </el-form-item>
            <!-- 审核才会出现的内容 starting-->
            <div v-if="auditFlag">
              <el-form-item label="审核：">
                <el-radio v-model="audit"
                  label="1">通过</el-radio>
                <el-radio v-model="audit"
                  label="2">审核不通过</el-radio>
              </el-form-item>
              <el-form-item v-if="audit == '2'"
                label="审核不通过原因：">
                <el-input v-model="faildContent"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="confirmAudit">确定</el-button>
                <el-button type="primary"
                  plain
                  @click="backToList">返回列表页</el-button>
              </el-form-item>
            </div>
            <!-- ending -->
            <el-form-item v-if="!auditFlag">
              <el-button type="primary"
                @click="editarticle"
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
      article: {},
      path: path,
      audit: "",
      faildContent: "" // 审核不通过的理由
    };
  },
  mounted() {
    console.log(this.$route.query.audit);
    let id = "";
    if (!this.$route.params.id.toString()) {
      id = sessionStorage.getItem("id");
    } else {
      id = this.$route.params.id.toString();
    }
    this.getArticleDetail(id);
  },
  computed: {
    imgUrl() {
      return path + this.article.articlePic;
    },
    auditFlag() {
      let auditFalg = this.$route.query.audit;
      if (auditFalg) {
        return true;
      } else {
        return false;
      }
    },
    articleTag() {
      return this.article.articleTag.join();
    }
  },
  methods: {
    getArticleDetail(id) {
      // 获取数据的url是和文章一样的
      let _id = id;
      this.axios
        .get("/api/ht/getArticleDetail", { params: { id: _id } })
        .then(res => {
          this.article = res.data.data;
        });
    },
    /* 派发一个修改当前article事件 */
    editarticle() {
      let id = this.$route.params.id;
      this.$router.push({ name: "addArticle", query: { id } });
    },
    // 删除这个article
    confirmDelete() {
      let id = this.$route.params.id;
      // articleManage.deletearticle([id]);
    },
    // 审核
    confirmAudit() {
      if (this.auditFlag) {
        if (this.audit == "1") {
          // 改变状态为发布
          this.article.state = 1;
          this.axios.post("/api/ht/auditArticle", this.article).then(res => {
            if (res.data.code == 0) {
              this.$message({ type: "success", message: res.data.msg });
              this.$nextTick(() => {
                this.$router.push("/ht/index/hobbiesArticleList");
              });
            }
          });
        } else if (this.audit == "2" && this.faildContent) {
          // 审核不通过
          this.article.state = 4;
          this.article.faildContent = this.faildContent;
          this.axios.post("/api/ht/auditArticle", this.article).then(res => {
            if (res.data.code == 0) {
              this.$message({ type: "success", message: res.data.msg });
              this.$nextTick(() => {
                this.$router.push("/ht/index/hobbiesArticleList");
              });
            }
          });
        } else {
          this.$message({
            type: "warning",
            message: "请填写完整的审核信息"
          });
        }
      }
    },
    backToList() {
      this.$router.push("/ht/index/hobbiesArticleList");
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
.show_articleDetail {
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
