<template>
  <div class="layout">
    <div class="layout-menu">
      <h1 class="layout-menu-title">My Blog</h1>
      <ul class="layout-menu-list">
        <li class="layout-menu-item">
          <router-link class="layout-menu-item-link" to="/admin/home" active-class="active">首页</router-link>
        </li>
        <li class="layout-menu-item">
          <router-link class="layout-menu-item-link" to="/admin/article" active-class="active">文章管理</router-link>
        </li>
        <li class="layout-menu-item">
          <router-link class="layout-menu-item-link" to="/admin/add" active-class="active">发表文章</router-link>
        </li>
      </ul>
    </div>
    <div class="layout-header">
      <div class="layout-header-left"></div>
      <div class="layout-header-right">
        <span>Hi, Jonathan</span>
        <span class="layout-header-logout">退出</span>
      </div>
    </div>
    <div class="layout-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="less">
.layout-menu{
  width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: #304156;
  .layout-menu-title{
    height: 50px;
    line-height: 50px;
    font-size: 20px;
    color: #bfcbd9;
    text-align: center;
    box-shadow: 0 1px 4px rgba(0,21,41,.4);
  }
  .layout-menu-list{
    text-align: center;
  }
  .layout-menu-item{
    height: 50px;
    line-height: 50px;
    font-size: 15px;
  }
  .layout-menu-item-link{
    display: block;
    text-decoration: none;
    color: #bfcbd9;
    &:hover{
      background: #263445;
    }
    &.active{
      color: #49b1f5;
    }
  }
}
.layout-header{
  width: calc(100% - 200px);
  height: 50px;
  line-height: 50px;
  background: #fff;
  position: fixed;
  top: 0;
  left: 200px;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);
  z-index: 1501;
  .layout-header-left{
    margin-left: 20px;
    float: left;
  }
  .layout-header-right{
    margin-right: 20px;
    float: right;
    span{
      margin-left: 10px;
      font-size: 14px;
    }
    .layout-header-logout{
      cursor: pointer;
      &:hover{
        color: #49b1f5;
      }
    }
  }
}
.layout-container{
  padding: 70px 30px 20px 230px;
}
</style>
