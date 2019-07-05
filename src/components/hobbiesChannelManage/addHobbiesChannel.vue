<template>
  <div class="my-container">
    <div class="addchannel">
      <div class="addchannel-title">
        <common-title :common-title="title"></common-title>
      </div>
      <div class="addchannel-content">
        <el-form ref="form"
          :model="channelObj"
          :rules="rules"
          label-position="left"
          label-width="150px">
          <el-form-item class="w_input"
            label="频道标题："
            prop="channelTitle">
            <el-input v-model="channelObj.channelTitle"></el-input>
          </el-form-item>
          <el-form-item class="w_input"
            label="英文标题："
            prop="alphaTitle">
            <el-input v-model="channelObj.alphaTitle"></el-input>
          </el-form-item>
          <el-form-item class="my-select-item"
            label="发布状态："
            prop="state">
            <el-select v-model="channelObj.state"
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
            <el-button @click="backTochannelList"
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
export default {
  data() {
    let checkValue = (rule, value, callback) => {
      if (!value) {
        // 调用报异常的方法
        return callback(new Error("请输入英文标题"));
      } else {
        const reg = /[^a-zA-Z]/;
        if (reg.test(value)) {
          // 调用报异常的方法
          return callback(new Error("只能为英文"));
        } else {
          // 验证成功调用callback回调函数
          callback();
        }
      }
    };
    return {
      // 通用变量
      title: "二级分类新增",
      message: "新增",
      prompt: "是否新增",
      successMsg: "新增成功",
      cancleMsg: "取消新增",
      // 状态选择
      channelObj: {
        state: 1 // 默认发布
      },
      stateOptions: [{ value: 1, label: "发布" }, { value: 0, label: "下架" }],
      rules: {
        channelTitle: [
          { required: true, message: "请输入分类标题", trigger: "blur" }
        ],
        alphaTitle: [
          { required: true, validator: checkValue, trigger: "blur" }
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
        .get("/api/ht/getHobbiesChannelDetail", { params: { id: id } })
        .then(res => {
          this.title = "二级分类修改";
          this.message = "修改";
          this.prompt = "是否修改";
          this.successMsg = "修改成功";
          this.cancleMsg = "取消修改";
          this.channelObj = res.data.data;
        });
    }
  },
  methods: {
    confirmOperate() {
      // if (this.$route.query.id) {
      //   this.updatechannelOperate();
      // } else {
      //   this.addBnnerOperate();
      // }
      this.$refs.form.validate(valid => {
        if (valid) {
          if (this.$route.query.id) {
            this.addchannelOperate("/api/ht/updateHobbiesChannel");
          } else {
            this.addchannelOperate();
          }
        } else {
          return false;
        }
      });
    },
    addchannelOperate(url = "/api/ht/addHobbiesChannel") {
      console.log(this.channelObj);
      this.axios.post(url, this.channelObj).then(res => {
        console.log(res);
        if (res.data.code == 0) {
          this.$message({ type: "success", message: res.data.msg });
          this.$nextTick(() => {
            this.$router.push("/ht/index/hobbiesChannelList");
          });
        }
      });
    },
    backTochannelList() {
      this.$router.push("/ht/index/hobbiesChannelList");
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
  .addchannel {
    min-width: 800px;
    position: relative;
    .addchannel-content {
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
