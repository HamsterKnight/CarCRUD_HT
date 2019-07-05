<template>
  <div class="login">
    <div class="login-head-bg">
    </div>
    <div class="login-content">
      <div class="login-title bottom-40px">汽车最前线</div>
      <el-form :model="ruleForm"
        :rules="rules"
        ref="ruleForm">
        <el-form-item prop="username">
          <el-input class="bottom-40px"
            placeholder="账号"
            v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input class="bottom-40px"
            type="password"
            placeholder="密码"
            v-model="ruleForm.password"></el-input>
        </el-form-item>
      </el-form>
      <el-button class="login-btn"
        type="primary"
        @click="login('ruleForm')">登陆</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
          // { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios({
            url: "/api/ht/login",
            method: "post",
            data: this.ruleForm
          }).then(res => {
            if (res.data.code == 0) {
              this.$router.push("/ht/index");
            } else {
              this.$message("账号或密码不正确");
            }
          });
        } else {
          this.$message("请输入账号和密码");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  min-height: 100%;
  width: 100%;
  .login-head-bg {
    height: 360px;
    background: url(../assets/images/login-bg.png) no-repeat center;
    background-size: cover;
  }
  .login-content {
    position: absolute;
    width: 500px;
    height: 320px;
    left: 50%;
    top: 50%;
    z-index: 5;
    box-sizing: border-box;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    padding: 49px 46px 54px 54px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 2px 0 rgba(11, 2, 5, 0.17);
    box-shadow: 0 2px 2px 0 rgba(11, 2, 5, 0.17);
    .login-title {
      font-size: 36px;
      font-weight: bold;
    }
    .login-btn {
      width: 100%;
      background-color: #2c5081;
    }
  }
  .bottom-40px {
    margin-bottom: 18px;
  }
}
</style>
