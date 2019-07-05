<template>
  <div class="my-container">
    <div class="addTag">
      <div class="addTag-title">
        <common-title :common-title="title"></common-title>
      </div>
      <div class="addTag-content">
        <el-form ref="form"
          :model="tagObj"
          :rules="rules"
          label-position="left"
          label-width="150px">
          <el-form-item class="w_input"
            label="tag名字："
            prop="tagName">
            <el-input v-model="tagObj.tagName"></el-input>
          </el-form-item>
          <el-form-item class="plate"
            prop="channel"
            label="选择所属板块：">
            <el-cascader :options="options"
              v-model="tagObj.channel"
              @change="handlePlateChange"
              class="el-cascader-width">
            </el-cascader>
          </el-form-item>
          <el-form-item class="my-select-item"
            label="发布状态："
            prop="state">
            <el-select v-model="tagObj.state"
              placeholder="请选择">
              <el-option v-for="item in stateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <message-box :message="message"
              :prompt="prompt"
              :successMsg="successMsg"
              :cancle-msg="cancleMsg"
              @confirm="confirmOperate"></message-box>
            <el-button type="primary"
              @click="backToList">返回列表页</el-button>
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
      title: "tag新增",
      message: "新增",
      prompt: "是否新增",
      successMsg: "新增成功",
      cancleMsg: "取消新增",
      // 状态选择
      tagObj: {
        dateValue: [],
        state: 1,
        channel: []
      },
      options: [
        { label: "首页", value: "1" },
        { label: "今日车闻", value: "2" },
        { label: "新能源", value: "3" },
        { label: "视频", value: "4" },
        { label: "兴趣部落", value: "5" }
      ],
      stateOptions: [
        { value: 1, label: "发布" },
        { value: 0 || 2 || 3 || 4, label: "下架" }
      ],
      rules: {
        channel: [{ required: true, message: "请选择模块", trigger: "blur" }],
        tagName: [
          { required: true, message: "请输入tag名字", trigger: "blur" }
        ],
        state: [{ required: true, message: "请选择状态", trigger: "blur" }]
      }
    };
  },
  mounted() {
    let id = this.$route.query.id || "";
    // 修改
    if (this.$route.query.id) {
      this.axios
        .get("/api/ht/getTagDetail", { params: { id: id } })
        .then(res => {
          this.title = "tag修改";
          (this.message = "修改"),
            (this.prompt = "是否修改"),
            (this.successMsg = "修改成功"),
            (this.cancleMsg = "取消修改"),
            (this.tagObj = res.data.data);
          this.tagObj.channel = [this.tagObj.channelId];
        });
    }
  },
  methods: {
    // 改变当前tag的模块
    handlePlateChange() {
      this.tagObj.channelId = this.tagObj.channel[0];
    },
    confirmOperate() {
      if (this.$route.query.id) {
        this.updateTagOperate();
      } else {
        this.addTagOperate();
      }
    },
    updateTagOperate() {
      this.axios.post("/api/ht/updateTag", this.tagObj).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message(res.data.msg);
          this.$nextTick(() => {
            this.$router.push("/ht/index/tagList");
          });
        }
      });
    },
    addTagOperate() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.axios.post("/api/ht/addTag", this.tagObj).then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$message(res.data.msg);
              this.$nextTick(() => {
                this.$router.push("/ht/index/tagList");
              });
            }
          });
        } else {
          return false;
        }
      });
    },
    backToList() {
      this.$router.push("/ht/index/tagList");
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
  .addtag {
    .addtag-content {
      position: relative;
      .my-select-item {
        position: relative;
      }
    }
  }
}
</style>
