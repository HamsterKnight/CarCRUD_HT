<template>
  <div class="index">
    <div class="index-header">
      <span class="title">汽车最前线</span>
    </div>
    <div class="index-content">
      <nav class="left-nav">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#ddd"
              text-color="#000"
              active-text-color="#fff">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>banner管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1"
                    @click="showList('/ht/index/banenrList')">banner信息列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>文章管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="2-1"
                    @click="showList('/ht/index/articleList')">文章信息列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>tag管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="3-1"
                    @click="showList('/ht/index/tagList')">tag信息列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="4">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>专栏管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="4-1"
                    @click="showList('/ht/index/columnList')">专栏信息列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="5">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>兴趣部落二级频道管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="5-1"
                    @click="showList('/ht/index/hobbiesChannelList')">二级频道信息列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="6">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>兴趣部落文章管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="6-1"
                    @click="showList('/ht/index/hobbiesArticleList')"
                    title="兴趣部落文章信息列表">兴趣部落文章信息列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="7">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>前端用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="7-1"
                    @click="showList('/ht/index/userList')"
                    title="前端用户信息列表">前端用户信息列表</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </nav>
      <div class="index-content-show">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    showList(url) {
      this.$router.push(url);
    }
  }
};
</script>
<style lang="less" scoped>
.index {
  text-align: left;
  .index-header {
    position: fixed;
    height: 60px;
    z-index: 9;
    width: 100%;
    top: 0;
    color: #fff;
    left: 0;
    text-align: left;
    background-image: url(../assets/images/index-header-bg.png);
    .title {
      padding-left: 60px;
      font-size: 30px;
      line-height: 60px;
    }
  }
  .index-content {
    position: relative;
    margin-top: 60px;
    .left-nav {
      position: fixed;
      width: 200px;
      height: 100vh;
      left: 0;
      top: 60px;
      box-shadow: 1px 0px 1px #888888;
      background-color: #ddd;
      .tac {
        width: 100%;
        .el-submenu {
          width: 200px;
        }
        .el-menu-item {
          box-sizing: border-box;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 0;
          padding-right: 20px;
          text-indent: 32px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: 1.5s all;
          &.is-active {
            color: #fff !important;
            background-color: #2c5081 !important;
          }
        }
      }
    }
    .index-content-show {
      margin-left: 200px;
      min-height: 90vh;
      padding: 100px;
      background-color: rgba(221, 221, 221, 0.3);
    }
  }
}
</style>

