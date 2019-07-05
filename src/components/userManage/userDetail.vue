<template>
  <div class="my-container">
    <div class="userDetail">
      <common-title common-title="用户详情"></common-title>
    </div>
    <div class="container_view">
      <div class="addrole-content">
        <div class="systemCommon-content ">
          <el-form class="show_userDetail"
            ref="form"
            :model="user"
            label-width="126px">
            <el-form-item label="账号：">
              <p>{{user.account}}</p>
            </el-form-item>
            <el-form-item label="昵称：">
              <span>{{user.author}}</span>
            </el-form-item>
            <el-form-item label="用户头像：">
              <img v-if="user.authorAvatar"
                class="picSize"
                :src="`${path}${user.authorAvatar}`"
                alt="">
            </el-form-item>
            <el-form-item label="文章数：">
              <p>{{user.articleCount}}</p>
            </el-form-item>
            <el-form-item label="粉丝数：">
              <p>{{user.fensCount}}</p>
            </el-form-item>
            <el-form-item label="关注数：">
              <p>{{user.focusCount}}</p>
            </el-form-item>
            <el-form-item label="用户等级：">
              <p>{{user.detailMessag? (user.detailMessag.level == 1?'专栏专家': '普通用户') :'普通用户'}}</p>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"
                @click="edituser"
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
      user: {},
      path: path
    };
  },
  mounted() {
    this.getUserDetail(this.$route.params.authorId);
  },
  computed: {
    imgUrl() {
      return path + this.user.userPic;
    }
  },
  methods: {
    getUserDetail(authorId) {
      this.axios
        .get("/api/ht/getUserDetail", {
          params: { authorId }
        })
        .then(res => {
          this.user = res.data.data;
          console.log(this.user);
        });
    },
    /* 派发一个修改当前user事件 */
    edituser() {
      let id = this.$route.params.id;
      this.$router.push({ name: "adduser", params: { id } });
    },
    // 删除这个user
    confirmDelete() {
      let id = this.$route.params.id;
      // userManage.deleteuser([id]);
    },
    backToList() {
      this.$router.push("/ht/index/userList");
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
.show_userDetail {
  .form_textarea {
    width: 42% !important;
  }
  .el-form-item {
    color: #000;
  }
  .picSize {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  label {
    text-align: right;
  }
}
</style>
