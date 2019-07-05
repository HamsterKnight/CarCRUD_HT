<template>
  <div class="my-container">
    <div class="addArticle">
      <div class="addArticle-title">
        <common-title :common-title="title"></common-title>
      </div>
      <div class="addArticle-content">
        <el-form ref="form"
          :model="articleObj"
          :rules="rules"
          label-position="left"
          label-width="150px">
          <el-form-item label="文章类型：">
            <el-radio-group v-model="articleObj.articleType">
              <el-radio label="1">原创</el-radio>
              <el-radio label="2">转载</el-radio>
              <el-radio label="3">翻译</el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- <el-form-item class="my-select-item"
            label="发布状态："
            prop="state">
            <el-select v-model="articleObj.state"
              placeholder="请选择">
              <el-option v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item class="w_input"
            label="文章标题："
            prop="articleTitle">
            <el-input v-model="articleObj.articleTitle"></el-input>
          </el-form-item>
          <el-form-item label="文章摘要："
            prop="articleDigest">
            <el-input type="textarea"
              v-model="articleObj.articleDigest"></el-input>
          </el-form-item>
          <el-form-item label="文章内容"
            class="quill-content">
            <quill-editor v-model="articleObj.articleContent"
              :options="editorOption"
              ref="myQuillEditor">
            </quill-editor>
          </el-form-item>
          <el-form-item label="文章封面图片上传,限一张：">
            <el-upload action="/api/ht/upload"
              ref="upload"
              name="upload"
              :on-success="uploadPicSucc"
              list-type="picture-card"
              :limit="1"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :before-upload="beforeUpload"
              :on-error="failedUpload"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img class="imgSize"
                :src="dialogImageUrl"
                alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="上传附件">
            <el-upload name="upload"
              action="/api/ht/upload"
              accept="video/*"
              :on-remove="handleVideoRemove"
              :before-remove="beforeVideoRemove"
              :on-success="uploadVideoSucc"
              :limit="1"
              :file-list="videoFileList">
              <el-button size="small"
                type="primary">点击上传</el-button>
              <div slot="tip"
                class="el-upload__tip">只能上传正确视频文件</div>
            </el-upload>
            <video v-if="articleObj.articleVideo"
              :src="`${path}${articleObj.articleVideo}`"></video>
          </el-form-item>
          <el-form-item class="plate"
            prop="articleChannel"
            label="选择所属板块：">
            <el-cascader :options="options"
              v-model="articleObj.articleChannel"
              @change="handlePlateChange"
              class="el-cascader-width">
            </el-cascader>
          </el-form-item>
          <el-form-item class="w_input"
            label="文章标签(多个标签之间请用英文逗号隔开)："
            prop="articleTag">
            <el-input v-model="articleObj.articleTag"></el-input>
          </el-form-item>
          <el-form-item>
            <message-box :message="message"
              :prompt="prompt"
              :successMsg="successMsg"
              :cancle-msg="cancleMsg"
              @confirm="confirmOperate(1)"></message-box>
            <message-box :message="draftMessage"
              :prompt="draftPrompt"
              :successMsg="draftSuccessMsg"
              :cancle-msg="draftCancleMsg"
              @confirm="confirmOperate(2)"></message-box>
            <el-button type="primary"
              @click="backToList"> 返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import commonTitle from "components/common/title";
import MessageBox from "components/common/MessageBox";
import quillConfig from "@/myConfig/quillConfig.js";
import { uploadUrl } from "@/http/api";
import { path } from "@/http/commonValue";
export default {
  data() {
    return {
      // 通用变量
      path: path,
      title: "文章新增",
      message: "新增",
      prompt: "是否新增",
      successMsg: "新增成功",
      cancleMsg: "取消新增",
      draftMessage: "存为草稿",
      draftPrompt: "是否存为草稿",
      draftSuccessMsg: "存为草稿成功",
      draftCancleMsg: "取消",
      // 状态选择
      articleObj: {
        dateValue: [],
        state: 1,
        channel: [],
        articleType: "1"
      },
      options: [
        { label: "今日车闻", value: "2" },
        { label: "新能源", value: "3" },
        { label: "视频", value: "4" }
      ],
      // 富文本peizhi
      editorOption: quillConfig,
      myUploadUrl: uploadUrl,
      stateOptions: [{ value: 1, label: "发布" }, { value: 0, label: "下架" }],
      fileList: [],
      uploadName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      videoFileList: [],
      rules: {
        articleChannel: [
          { required: true, message: "请选择模块", trigger: "blur" }
        ],
        // dateValue: [
        //   { required: true, message: "请输入上下架时间", trigger: "blur" }
        // ],
        articleTitle: [
          { required: true, message: "请输入article名字", trigger: "blur" }
        ],
        articleLink: [
          { required: true, message: "请输入article链接", trigger: "blur" }
        ]
        // state: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  mounted() {
    let id = this.$route.query.id || "";
    // 修改
    if (this.$route.query.id) {
      this.axios
        .get("/api/ht/getarticleDetail", { params: { id: id } })
        .then(res => {
          this.title = "文章修改";
          this.message = "修改";
          this.prompt = "是否修改";
          this.successMsg = "修改成功";
          this.cancleMsg = "取消修改";
          this.articleObj = res.data.data;
          console.log(res);
          this.articleObj.articleChannel = [this.articleObj.channelId];
          this.fileList = this.articleObj.articlePic
            ? [{ url: path + this.articleObj.articlePic }]
            : [];
          if (this.articleObj.articleTag.length > 0) {
            this.articleObj.articleTag = this.articleObj.articleTag.join(",");
          } else {
            this.articleObj.articleTag = "";
          }
          this.upDownData();
        });
    }
  },
  methods: {
    // 图片上传成功回调
    uploadPicSucc(res) {
      if (res.code == 0) {
        this.articleObj.articlePic = res.data.documentUrl;
        document.querySelector(".el-upload").style.display = "none";
        this.$message(res.data.msg);
      } else {
        this.$message("上传失败");
      }
    },
    beforeUpload(file) {
      console.log(file);
    },
    setData() {
      this.articleObj.startTime = this.articleObj.dateValue[0];
      this.articleObj.endTime = this.articleObj.dateValue[1];
    },
    handleRemove() {
      this.articleObj.articlePic = "";
      document.querySelector(".el-upload").style.display = "block";
    },
    handlePictureCardPreview() {},
    failedUpload() {},
    // 改变当前article的模块
    handlePlateChange() {},
    confirmOperate(type) {
      // if (this.$route.query.id) {
      //   this.updatearticleOperate();
      // } else {
      //   this.addBnnerOperate();
      // }

      this.$refs.form.validate(valid => {
        if (valid) {
          this.articleObj.channelId = this.articleObj.articleChannel[0];
          if (this.$route.query.id) {
            this.addArticleOperate(type, "/api/ht/updateArticle");
          } else {
            this.addArticleOperate(type);
          }
        } else {
          return false;
        }
      });
    },
    updatearticleOperate() {
      this.axios.post("/api/ht/updateArticle", this.articleObj).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message(res.data.msg);
          this.$nextTick(() => {
            this.$router.push("/ht/index/articleList");
          });
        }
      });
    },
    // 传入类型，改变发布状态
    addArticleOperate(type = 1, url = "/api/ht/addArticle") {
      if (type === 2) {
        // 存为草稿
        this.articleObj.state = 2;
      }
      this.articleObj.authorId = "5bf091c0-4f63-11e9-a1dd-13fb298ff2a1";
      this.articleObj.author = "汽车最前线";
      this.axios.post(url, this.articleObj).then(res => {
        if (res.data.code == 0) {
          this.$message({ type: "success", message: res.data.msg });
          this.$nextTick(() => {
            this.$router.push("/ht/index/articleList");
          });
        }
      });
    },
    handleVideoRemove() {
      this.articleObj.articleVideo = "";
    },
    beforeVideoRemove() {},
    uploadVideoSucc(res) {
      if (res.code == 0) {
        this.articleObj.articleVideo = res.data.documentUrl;
        this.$message(res.data.msg);
      } else {
        this.$message("上传失败");
      }
    },
    // 默认上下架日期
    upDownData() {
      if (!this.articleObj.startTime && !this.articleObj.endTime) {
        return;
      }

      let start = this.articleObj.startTime;
      // this.dataForamt.push(start);
      let yearStart = parseInt(start.substr(0, 4));
      let monthStart = parseInt(start.substr(5, 2)) - 1;
      let dayStart = parseInt(start.substr(8, 2));
      let hourStart = parseInt(start.substr(11, 2));
      let minuteStart = parseInt(start.substr(14, 2));
      let secondStart = parseInt(start.substr(17, 2));

      let end = this.articleObj.endTime;
      // this.dataForamt.push(end);
      let yearEnd = parseInt(end.substr(0, 4));
      let monthEnd = parseInt(end.substr(5, 2)) - 1;
      let dayEnd = parseInt(end.substr(8, 2));
      let hourEnd = parseInt(end.substr(11, 2));
      let minuteEnd = parseInt(end.substr(14, 2));
      let secondEnd = parseInt(end.substr(17, 2));
      this.articleObj.dateValue = [
        new Date(
          yearStart,
          monthStart,
          dayStart,
          hourStart,
          minuteStart,
          secondStart
        ),
        new Date(yearEnd, monthEnd, dayEnd, hourEnd, minuteEnd, secondEnd)
      ];
      // this.dataChangeFlag = this.articleObj.dateValue[1];
    },
    backToList() {
      this.$router.push("/ht/index/articleList");
    }
  },
  components: {
    "common-title": commonTitle,
    "message-box": MessageBox
  }
};
</script>
<style lang="less">
.my-container {
  .addArticle {
    .addArticle-content {
      position: relative;
      .my-select-item {
        position: relative;
      }
    }
    .el-cascader-menus {
      top: 1373px;
    }

    .quill-content {
      min-width: 900px;
      min-height: 650px;
      .quill-editor {
        height: 500px;
      }
    }
  }
}
.el-popper {
  margin-top: -50px !important;
}
</style>
