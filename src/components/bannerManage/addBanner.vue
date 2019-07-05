<template>
  <div class="my-container">
    <div class="addBanner">
      <div class="addBanner-title">
        <common-title :common-title="title"></common-title>
      </div>
      <div class="addBanner-content">
        <el-form ref="form"
          :model="bannerObj"
          :rules="rules"
          label-position="left"
          label-width="150px">
          <el-form-item class="plate"
            prop="channel"
            label="选择所属板块：">
            <el-cascader :options="options"
              v-model="bannerObj.channel"
              @change="handlePlateChange"
              class="el-cascader-width">
            </el-cascader>
          </el-form-item>
          <el-form-item class="my-select-item"
            label="发布状态："
            prop="state">
            <el-select v-model="bannerObj.state"
              placeholder="请选择">
              <el-option v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上架/下架时间："
            prop="dateValue">
            <el-date-picker @change="setData"
              v-model="bannerObj.dateValue"
              type="datetimerange"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="w_input"
            label="banner名字："
            prop="bannerName">
            <el-input v-model="bannerObj.bannerName"></el-input>
          </el-form-item>
          <el-form-item label="banner描述："
            prop="bannerDescription">
            <el-input type="textarea"
              v-model="bannerObj.bannerDescription"></el-input>
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
            <el-dialog :visible.sync="dialogVisible">
              <img class="imgSize"
                :src="dialogImageUrl"
                alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item class="w_input"
            label="banner链接："
            prop="bannerLink">
            <el-input v-model="bannerObj.bannerLink"></el-input>
          </el-form-item>
          <el-form-item>
            <message-box 
              :message="message"
              :prompt="prompt"
              :successMsg="successMsg"
              :cancle-msg="cancleMsg"
              @confirm="confirmOperate"></message-box>
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
      title: "banner新增",
      message: "新增",
      prompt: "是否新增",
      successMsg: "新增成功",
      cancleMsg: "取消新增",
      // 状态选择
      bannerObj: {
        dateValue: [],
        state: 1,
        channel: []
      },
      options: [],
      myUploadUrl: uploadUrl,
      stateOptions: [{ value: 1, label: "发布" }, { value: 0, label: "下架" }],
      fileList: [],
      uploadName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      rules: {
        channel: [{ required: true, message: "请选择模块", trigger: "blur" }],
        dateValue: [
          { required: true, message: "请输入上下架时间", trigger: "blur" }
        ],
        bannerTitle: [
          { required: true, message: "请输入banner名字", trigger: "blur" }
        ],
        bannerLink: [
          { required: true, message: "请输入banner链接", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // 获取可选banner位置
    this.axios.get("/api/ht/bannerChannerlList").then(res => {
      this.options = res.data.data[0].bannerChannelList;
      this.options.forEach(item => {
        if (item.children.length <= 0) {
          delete item.children;
        }
      });
    });
    let id = this.$route.query.id || "";
    // 修改
    if (this.$route.query.id) {
      this.axios
        .get("/api/ht/getBannerDetail", { params: { id: id } })
        .then(res => {
          this.title = "banner修改";
          (this.message = "修改"),
            (this.prompt = "是否修改"),
            (this.successMsg = "修改成功"),
            (this.cancleMsg = "取消修改"),
            (this.bannerObj = res.data.data);
          this.bannerObj.channel = [this.bannerObj.firstChannel];
          if (this.bannerObj.secondChannel) {
            this.bannerObj.channel.push(this.bannerObj.secondChannel);
          }
          this.fileList = [{ url: path + this.bannerObj.bannerPic }];
          this.upDownData();
        });
    }
  },
  methods: {
    // 图片上传成功回调
    uploadPicSucc(res) {
      if (res.code == 0) {
        this.bannerObj.bannerPic = res.data.documentUrl;
        this.$message(res.data.msg);
      } else {
        this.$message("上传失败");
      }
    },
    beforeUpload(file) {
      console.log(file);
    },
    setData() {
      this.bannerObj.startTime = this.bannerObj.dateValue[0];
      this.bannerObj.endTime = this.bannerObj.dateValue[1];
    },
    handleRemove() {
      this.bannerObj.bannerPic = "";
    },
    handlePictureCardPreview() {},
    failedUpload() {},
    // 改变当前banner的模块
    handlePlateChange() {
      console.log(this.bannerObj.channel);
      this.bannerObj.firstChannel = this.bannerObj.channel[0];
      if (this.bannerObj.channel[1]) {
        this.bannerObj.secondChannel = this.bannerObj.channel[1];
      }
    },
    confirmOperate() {
      if (this.$route.query.id) {
        this.updateBannerOperate();
      } else {
        this.addBnnerOperate();
      }
    },
    updateBannerOperate() {
      this.axios.post("/api/ht/updateBanner", this.bannerObj).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message(res.data.data.msg);
          this.$nextTick(() => {
            this.$router.push("/ht/index/banenrList");
          });
        }
      });
    },
    addBnnerOperate() {
      this.axios.post("/api/ht/addBanner", this.bannerObj).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message(res.data.data.msg);
          this.$nextTick(() => {
            this.$router.push("/ht/index/banenrList");
          });
        }
      });
    },
    // 默认上下架日期
    upDownData() {
      if (!this.bannerObj.startTime && !this.bannerObj.endTime) {
        return;
      }

      let start = this.bannerObj.startTime;
      // this.dataForamt.push(start);
      let yearStart = parseInt(start.substr(0, 4));
      let monthStart = parseInt(start.substr(5, 2)) - 1;
      let dayStart = parseInt(start.substr(8, 2));
      let hourStart = parseInt(start.substr(11, 2));
      let minuteStart = parseInt(start.substr(14, 2));
      let secondStart = parseInt(start.substr(17, 2));

      let end = this.bannerObj.endTime;
      // this.dataForamt.push(end);
      let yearEnd = parseInt(end.substr(0, 4));
      let monthEnd = parseInt(end.substr(5, 2)) - 1;
      let dayEnd = parseInt(end.substr(8, 2));
      let hourEnd = parseInt(end.substr(11, 2));
      let minuteEnd = parseInt(end.substr(14, 2));
      let secondEnd = parseInt(end.substr(17, 2));
      this.bannerObj.dateValue = [
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
      // this.dataChangeFlag = this.bannerObj.dateValue[1];
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
    }
  }
}
</style>
