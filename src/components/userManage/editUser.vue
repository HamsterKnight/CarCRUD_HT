<template>
  <div class="my-container">
    <div class="addBanner">
      <div class="addBanner-title">
        <common-title :common-title="title"></common-title>
      </div>
      <div class="addBanner-content">
        <el-form ref="form"
          :model="user"
          label-position="left"
          label-width="150px">
          <el-form-item label="账号:">
            <p>{{user.account}}</p>
          </el-form-item>
          <el-form-item label="昵称:">
            <p>{{user.author}}</p>
          </el-form-item>
          <el-form-item label="图片上传,限一张：">
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
          </el-form-item>
          <el-form-item class="my-select-item"
            label="用户等级："
            v-if="user.detailMessage">
            <el-select v-model="user.detailMessage.level"
              placeholder="请选择">
              <el-option v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="w_input"
            label="粉丝数："
            prop="fensCount">
            <el-input v-model="user.fensCount"></el-input>
          </el-form-item>
          <el-form-item label="关注数："
            class="w_input"
            prop="focusCount">
            <el-input v-model="user.focusCount"></el-input>
          </el-form-item>
          <el-form-item>
            <message-box :message="message"
              :prompt="prompt"
              :successMsg="successMsg"
              :cancle-msg="cancleMsg"
              @confirm="confirmOperate"></message-box>
            <el-button type="primary"
              @click="backToList">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import commonTitle from "components/common/title";
import MessageBox from "components/common/MessageBox";
import { uploadUrl } from "@/http/api";
import { path } from "@/http/commonValue";
export default {
  data() {
    return {
      // 通用变量
      path: path,
      title: "用户信息编辑",
      message: "修改",
      prompt: "是否修改",
      successMsg: "修改成功",
      cancleMsg: "取消修改",
      // 状态选择
      user: {
        dateValue: [],
        state: 0,
        channel: []
      },
      options: [],
      myUploadUrl: uploadUrl,
      stateOptions: [
        { value: 1, label: "专栏专家" },
        { value: 0, label: "普通用户" }
      ],
      fileList: [],
      uploadName: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  mounted() {
    let authorId = this.$route.params.authorId;
    // 修改
    this.axios
      .get("/api/ht/getUserDetail", { params: { authorId } })
      .then(res => {
        this.user = res.data.data;
        if (res.data.data.detailMessage.authorAvatar) {
          this.fileList = [
            { url: path + res.data.data.detailMessage.authorAvatar }
          ];
          document.querySelector(".el-upload").style.display = "none";
        }
      });
  },
  methods: {
    // 图片上传成功回调
    uploadPicSucc(res) {
      if (res.code == 0) {
        this.user.detailMessage.authorAvatar = res.data.documentUrl;
        this.fileList = [{ url: this.path + res.data.documentUrl }];
        this.$message(res.data.msg);
        document.querySelector(".el-upload").style.display = "none";
      } else {
        this.$message("上传失败");
      }
    },
    beforeUpload(file) {
      console.log(file);
    },
    handleRemove() {
      this.fileList = [];
      this.user.detailMessage.authorAvatar = "";
      document.querySelector(".el-upload").style.display = "inline-block";
    },
    handlePictureCardPreview() {},
    failedUpload() {},
    confirmOperate() {
      this.axios.post("/api/ht/updateUserMsg", this.user).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message(res.data.data.msg);
          this.$nextTick(() => {
            this.$router.push("/ht/index/userList");
          });
        }
      });
    },
    backToList() {
      this.$router.push("/ht/index/userList");
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
  .addBanner {
    .addBanner-content {
      position: relative;
      .my-select-item {
        position: relative;
      }
      .w_input {
        .el-input {
          width: 217px !important;
        }
      }
    }
  }
}
</style>
