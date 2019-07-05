<template>
  <div class="my-container">
    <div class="addColumn">
      <div class="addColumn-title">
        <common-title :common-title="title"></common-title>
      </div>
      <div class="addColumn-content">
        <el-form ref="form"
          :model="columnObj"
          :rules="rules"
          label-position="left"
          label-width="150px">
          <el-form-item class="w_input"
            label="专栏标题："
            prop="columnTitle">
            <el-input v-model="columnObj.columnTitle"></el-input>
          </el-form-item>
          <el-form-item class="my-select-item"
            label="发布状态："
            prop="state">
            <el-select v-model="columnObj.state"
              placeholder="请选择">
              <el-option v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="plate"
            prop="columnChannel"
            label="选择所属板块：">
            <el-cascader :options="options"
              v-model="columnObj.columnChannel"
              @change="handlePlateChange"
              class="el-cascader-width">
            </el-cascader>
          </el-form-item>
          <el-form-item label="图片上传(专栏图片上传成功，才能填写标题和链接)：">
            <el-upload action="/api/ht/upload"
              ref="upload"
              name="upload"
              :on-success="uploadPicSucc"
              list-type="picture-card"
              :file-list="conectUrl"
              :before-upload="beforeUpload"
              :on-error="failedUpload"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
          <ul class="pic-list-box">
            <!-- <li class="list-item">
              <div class="img-item">
                <span class="item-tip">专栏图片:</span>
                <img src=""
                  alt="">
              </div>
              <div class="img-item">
                <span class="item-tip">图片标题:</span>
                <input type="text">
              </div>
              <div class="img-item">
                <span class="item-tip">图片链接:</span>
                <input type="text">
              </div>
            </li> -->
          </ul>
          <el-form-item>
            <message-box :message="message"
              :prompt="prompt"
              :successMsg="successMsg"
              :cancle-msg="cancleMsg"
              @confirm="confirmOperate"></message-box>
            <el-button @click="backToColumnList"
              type="primary">返回</el-button>
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
      title: "专栏新增",
      message: "新增",
      prompt: "是否新增",
      successMsg: "新增成功",
      cancleMsg: "取消新增",
      // 状态选择
      columnObj: {
        state: 1 // 默认发布
      },
      stateOptions: [{ value: 1, label: "发布" }, { value: 0, label: "下架" }],
      options: [
        { label: "今日车闻", value: "2" },
        { label: "新能源", value: "3" },
        { label: "视频", value: "4" }
      ],
      myUploadUrl: uploadUrl,
      stateOptions: [{ value: 1, label: "发布" }, { value: 0, label: "下架" }],
      fileList: [],
      notConnectList: [],
      uploadName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      videoFileList: [],
      rules: {
        columnChannel: [
          { required: true, message: "请选择模块", trigger: "blur" }
        ],
        columnTitle: [
          { required: true, message: "请输入专栏标题", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  computed: {
    conectUrl() {
      if (this.fileList.length > 0) {
        return this.fileList.map(item => {
          return item;
        });
      } else {
        return [];
      }
    }
  },
  mounted() {
    let id = this.$route.query.id || "";
    // 修改
    if (this.$route.query.id) {
      this.axios
        .get("/api/ht/getColumnDetail", { params: { id: id } })
        .then(res => {
          this.title = "专栏修改";
          this.message = "修改";
          this.prompt = "是否修改";
          this.successMsg = "修改成功";
          this.cancleMsg = "取消修改";
          this.columnObj = res.data.data;
          console.log("column", res);
          this.columnObj.columnChannel = [this.columnObj.channelId];
          this.fileList = res.data.data.picList;
          for (let i = 0; i < this.fileList.length; i++) {
            let ui = document.querySelector(".pic-list-box");
            let li = document.createElement("li");
            li.setAttribute("class", "list-item");
            li.innerHTML = `
            <div class="img-item">
                  <span class="item-tip">专栏图片:</span>
                  <img src="${path}${this.fileList[i].url}"
                    alt="专栏图片">
                </div>
                <div class="img-item">
                  <span class="item-tip">图片标题:</span>
                  <input class="el-input__inner img-title " type="text" value="${
                    this.fileList[i].imgTitle
                  }">
                </div>
                <div class="img-item">
                  <span class="item-tip">图片链接:</span>
                  <input class="el-input__inner img-link " type="text" value="${
                    this.fileList[i].imgLink
                  }">
                </div>
            `;
            ui.appendChild(li);
          }
        });
    }
  },
  methods: {
    // 图片上传成功回调
    uploadPicSucc(res) {
      if (res.code == 0) {
        //this.columnObj.columnPic = res.data.documentUrl;
        this.fileList.push({
          name: res.data.name,
          url: path + res.data.documentUrl
        });
        this.notConnectList.push({
          name: res.data.name,
          url: res.data.documentUrl
        });
        this.$message(res.data.msg);
        let ui = document.querySelector(".pic-list-box");
        let li = document.createElement("li");
        li.setAttribute("class", "list-item");
        li.innerHTML = `
         <div class="img-item">
                  <span class="item-tip">专栏图片:</span>
                  <img src="${path}${res.data.documentUrl}"
                    alt="专栏图片">
                </div>
                <div class="img-item">
                  <span class="item-tip">图片标题:</span>
                  <input class="img-title el-input__inner" type="text">
                </div>
                <div class="img-item">
                  <span class="item-tip">图片链接:</span>
                  <input class="img-link el-input__inner" type="text">
                </div>
        `;
        ui.appendChild(li);
      } else {
        this.$message("上传失败");
      }
    },
    beforeUpload(file) {
      console.log(file);
    },
    handleRemove(file, fileList) {
      let name = file.name;
      let index = this.fileList.findIndex(item => {
        return item.name == name;
      });
      console.log(index);
      this.fileList.splice(index, 1);
      this.notConnectList.splice(index, 1);
      // 删掉自己
      document.querySelectorAll(".list-item")[index].remove();
    },
    failedUpload() {
      this.$message({
        type: "error",
        message: "上传失败"
      });
    },
    // 改变当前column的模块
    handlePlateChange() {
      this.columnObj.channelId = this.columnObj.columnChannel;
    },
    confirmOperate() {
      // if (this.$route.query.id) {
      //   this.updatecolumnOperate();
      // } else {
      //   this.addBnnerOperate();
      // }
      this.$refs.form.validate(valid => {
        if (valid) {
          this.columnObj.channelId = this.columnObj.columnChannel[0];
          if (this.$route.query.id) {
            this.addColumnOperate("/api/ht/updateColumn");
          } else {
            this.addColumnOperate();
          }
        } else {
          return false;
        }
      });
    },
    addColumnOperate(url = "/api/ht/addColumn") {
      let titleList = document.querySelectorAll(".img-title");
      let linkList = document.querySelectorAll(".img-link");
      for (let i = 0; i < this.fileList.length; i++) {
        this.notConnectList[i].imgTitle = titleList[i].value;
        this.notConnectList[i].imgLink = linkList[i].value;
      }
      console.log(this.notConnectList);
      this.columnObj.picList = this.notConnectList;
      this.axios.post(url, this.columnObj).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({ type: "success", message: res.data.msg });
          this.$nextTick(() => {
            this.$router.push("/ht/index/columnList");
          });
        }
      });
    },
    backToColumnList() {
      this.$router.push("/ht/index/columnList");
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
  .addColumn {
    min-width: 800px;
    position: relative;
    .addColumn-content {
      position: relative;
      .my-select-item {
        position: relative;
      }
    }
    .el-cascader-menus {
      top: 1373px;
    }
    .pic-list-box {
      font-size: 14px;
      color: #606266;
      .img-item {
        margin-bottom: 20px;
        position: relative;
        img {
          width: 300px;
        }
        .item-tip {
          vertical-align: top;
        }
        .img-title,
        .img-link {
          width: 400px;
        }
      }
      .item-tip {
        display: inline-block;
        width: 150px;
        vertical-align: top;
      }
    }
    .w_input {
      .el-input {
        input {
          width: 50%;
        }
      }
    }
  }
}
.el-popper {
  margin-top: -50px !important;
}
</style>
