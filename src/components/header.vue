<template>
  <div class="header">
    <div class="header-top">
      <div class="header-logo">
        <router-link to="/home">Jonathan's</router-link>
      </div>
      <div class="header-menu-mobile" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul class="header-menu" v-show="!isMobile || showMenu">
        <li>
          <div class="header-search">
            <input class="header-search-input" type="text" v-model.trim="searchValue" @keyup.enter="submit">
            <span class="header-search-icon" @click="submit"></span>
          </div>
        </li>
        <li>
          <router-link class="header-menu-link" to="/archive" active-class="active">Archives</router-link>
        </li>
        <li>
          <router-link class="header-menu-link" to="/tags" active-class="active">Tags</router-link>
        </li>
        <!-- <li>
          <router-link class="header-menu-link" to="/category" active-class="active">Category</router-link>
        </li> -->
        <li>
          <router-link class="header-menu-link" to="/about" active-class="active">About</router-link>
        </li>
      </ul>
    </div>
    <div class="header-article" v-if="currentRoute === 'Article'">
      <h1 class="header-article-title">{{title}}</h1>
      <div class="header-article-desc">
        <span class="header-article-time">{{date | dateFormat}}</span>
        <span class="line">|</span>
        <template v-for="(item, index) in tags">
          <span class="header-article-tag" :key="index">{{item}}</span>
        </template>
      </div>
    </div>
    <div class="header-home" v-else>
      <template v-if="currentRoute === 'Home' || currentRoute === 'HomePage'">
        <h1 class="header-home-title">Jonathan Chan's</h1>
        <p class="header-home-desc">talk less code more</p>
      </template>
      <h1 class="header-home-title" v-else-if="currentRoute === 'TagsArticle' || currentRoute === 'TagsArticlePage'">Tag - {{tag}}</h1>
      <h1 class="header-home-title" v-else-if="currentRoute === 'Search'">Search - {{searchContent}}</h1>
      <h1 class="header-home-title" v-else>{{currentRoute}}</h1>
    </div>
  </div>
</template>

<script>
import {throttle} from '../utils/func.js';
export default {
  name: "iHeader",
  props: {
    title: {
      type: String
    },
    tags: {
      type: Array
    },
    date: {
      type: Number
    }
  },
  data () {
    return {
      isMobile: false,
      showMenu: false,
      searchValue: ''
    };
  },
  computed: {
    currentRoute () {
      return this.$route.name;
    },
    tag () {
      return this.$route.params.tag;
    },
    searchContent () {
      return this.$route.params.content;
    }
  },
  mounted () {
    this.checkWidth();
    window.onresize = throttle(this.checkWidth, 400);
  },
  methods: {
    checkWidth () {
      if (document.body.clientWidth <= 780) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    toggleMenu () {
      this.showMenu = !this.showMenu;
    },
    submit () {
      if (this.searchValue !== '') {
        this.$router.push({name: 'Search', params: {content: this.searchValue}});
        this.searchValue = '';
      }
    }
  }
};
</script>

<style lang="less">
.header {
  width: 100%;
  height: 450px;
  background-image: url(../assets/header-bg.jpg);
  background-attachment: fixed;
}
.header-top {
  margin: 0 40px;
  padding-top: 10px;
  a {
    text-decoration: none;
    color: #454040;
    transition: all 0.2s;
    &:hover {
      color: #1d1d1d;
    }
  }
  .header-logo {
    float: left;
    font-size: 20px;
    font-weight: bold;
  }
  .header-menu-mobile{
    display: none;
    float: right;
    width: 15px;
    height: 15px;
    margin-top: 12px;
    cursor: pointer;
    span{
      display: block;
      width: 15px;
      height: 2px;
      background: #454040;
      margin-bottom: 3px;
    }
  }
  .header-menu {
    float: right;
    li {
      float: left;
      margin-left: 10px;
      color: #1d1d1d;
    }
  }
  .header-search{
    height: 40px;
    position: relative;
    .header-search-input{
      margin-top: 5px;
      width: 0px;
      height: 30px;
      -webkit-appearance: none;
      border: none;
      outline: none;
      background: rgba(0, 0, 0, 0.3);
      border-radius: 15px;
      color: #fff;
      transition: all .5s ease;
    }
    .header-search-icon{
      position: absolute;
      right: 10px;
      top: 12px;
      width: 16px;
      height: 16px;
      background: url(../assets/search.png) no-repeat;
      cursor: pointer;
    }
    &:hover{
      .header-search-input{
        width: 140px;
        padding-left: 10px;
      }
    }
  }
  .header-menu-link {
    display: inline-block;
    width: 90px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    transition: all 0.4s;
    &:before {
      content: "";
      width: 100%;
      height: 2px;
      background: #979696;
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 50%;
      transform: scale(0);
    }
    &:after {
      content: "";
      width: 100%;
      height: 2px;
      background: #979696;
      position: absolute;
      bottom: 0;
      left: 0;
      transform-origin: 50%;
      transform: scale(0);
    }
    &.active,
    &:hover {
      letter-spacing: 2px;
      &:before {
        transform: scale(1);
        transition: all 0.4s;
      }
      &:after {
        transform: scale(1);
        transition: all 0.4s;
      }
    }
  }
}
.header-home {
  margin-top: 190px;
  text-align: center;
  color: #454040;
  .header-home-title {
    font-size: 32px;
  }
  .header-home-desc {
    font-size: 20px;
    margin-top: 20px;
  }
}
.header-article {
  margin-top: 150px;
  text-align: center;
  color: #454040;
  .header-article-title {
    font-size: 30px;
  }
  .header-article-desc {
    margin-top: 20px;
    font-size: 16px;
  }
  .line {
    margin: 0 10px;
  }
  .header-article-tag {
    display: inline-block;
    height: 24px;
    line-height: 24px;
    margin-right: 10px;
    padding: 0 6px;
    font-size: 14px;
    background: #00aeff;
    border-radius: 4px;
    color: #fff;
    cursor: pointer;
  }
}
@media screen and (max-width: 780px) {
  .header{
    background-size: initial;
    background-position: center top;
  }
  .header-top .header-menu-mobile{
    display: block;
  }
  .header-top .header-menu{
    width: 150px;
    background: #eee;
    position: absolute;
    top: 40px;
    right: 40px;
    text-align: center;
    li {
      float: none;
      display: block;
      margin-left: 0;
    }
  }
}
</style>
