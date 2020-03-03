<template>
  <div class="sidebar" :class="{active: active}">
    <div class="side-arrow" @click="showSide"></div>
    <div class="author">
      <div class="avatar"></div>
      <div class="name">Jonathan Chan</div>
    </div>
    <ul class="menu-list">
      <li><router-link to="/archive">Archive</router-link></li>
      <li><router-link to="/tags">Tags</router-link></li>
      <!-- <li><router-link to="/category">Category</router-link></li> -->
      <li><router-link to="/about">About</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "sideBar",
  data() {
    return {
      active: false
    };
  },
  beforeDestroy () {
    document.body.style.paddingLeft = '0';
  },
  methods: {
    showSide() {
      this.active = !this.active;
      document.body.style.paddingLeft = this.active ? '300px' : '0';
    }
  }
};
</script>

<style lang="less">
.sidebar {
  width: 300px;
  height: 100%;
  background: #ddd;
  position: fixed;
  left: -300px;
  top: 0;
  transition: all 0.2s ease;
  background-image: url(../assets/side-bg.jpg);
  background-position: center bottom;
  .side-arrow {
    width: 16px;
    height: 16px;
    background: url(../assets/arrow.png);
    background-size: cover;
    position: absolute;
    bottom: 50px;
    right: -50px;
    cursor: pointer;
    transform-origin: 50%;
  }
  &.active {
    transform: translateX(300px);
    .side-arrow {
      left: 34px;
      transform: rotate(180deg);
    }
  }
  .author{
    padding-top: 100px;
    .avatar{
      width: 120px;
      height: 120px;
      margin: 0 auto;
      background-image: url(../assets/avatar.jpg);
      background-size: cover;
      border-radius: 50%;
    }
    .name{
      margin-top: 20px;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      text-align: center;
    }
  }
  .menu-list{
    margin-top: 80px;
    text-align: center;
    li{
      line-height: 40px;
    }
    a{
      text-decoration: none;
      color: #fff;
      font-size: 17px;
    }
  }
}
@media screen and (max-width: 1000px) {
  .sidebar .side-arrow{
    display: none;
  }
}
</style>
