<template>
  <div class="search">
    <i-header></i-header>
    <div class="search-content" v-if="searchRes.length > 0">
      <div class="search-item" v-for="item in searchRes" :key="item.articleId">
        <span class="search-item-time">{{item.date | dateFormat}}</span>
        <router-link
          class="search-item-link"
          :to="{name: 'Article', params: {id: item.articleId}}"
        >{{item.title}}</router-link>
      </div>
    </div>
    <div class="search-none" v-else>无 {{$route.params.content}} 相关的文章</div>
    <i-footer></i-footer>
  </div>
</template>

<script>
export default {
  name: "Search",
  asyncData({ store, route }) {
    return store.dispatch("searchArticles", {
      search: route.params.content
    });
  },
  computed: {
    searchRes() {
      return this.$store.getters.searchRes;
    }
  }
};
</script>

<style lang="less">
.search-none{
  text-align: center;
  margin: 100px auto;
  font-size: 18px;
  color: #454040;
}
.search-content {
  width: 700px;
  margin: 60px auto;
  border-left: 2px solid #00aeff;
}
.search-item {
  padding-left: 30px;
  position: relative;
  margin-bottom: 40px;
  &:before {
    content: "";
    width: 8px;
    height: 8px;
    border: 2px solid #00aeff;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: -7px;
    top: 5px;
    transition: all 0.2s;
  }
  &:hover:before {
    border: 2px solid #ff7242;
  }
  .search-item-time {
    position: absolute;
    font-size: 14px;
    color: #bbb;
    line-height: 22px;
  }
  .search-item-link {
    display: block;
    margin-left: 100px;
    text-decoration: none;
    color: #454040;
    font-size: 16px;
    line-height: 22px;
    &:hover {
      color: #00aeff;
    }
  }
}
@media screen and(max-width: 780px) {
  .search-content {
    width: auto;
    margin: 60px 30px;
  }
}
</style>
