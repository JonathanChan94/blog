<template>
  <div class="home">
    <side-bar></side-bar>
    <i-header></i-header>
    <div class="home-container">
      <article-part
        v-for="article in articles"
        :key="article._id"
        :title="article.title"
        :content="article.introduction"
        :tags="article.tags"
        :date="article.date"
        :articleId="article.articleId"
      ></article-part>
    </div>
    <pagination :total="num" :size="pageSize" :page="currentPage" v-if="num > pageSize" @change="handleChange"></pagination>
    <i-footer></i-footer>
  </div>
</template>

<script>
import ArticlePart from "../components/articlePart.vue";
import Pagination from "../components/pagination.vue";
import { getArticles } from "../api/api";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: { ArticlePart, Pagination },
  asyncData({ store, route }) {
    return Promise.all([
      store.dispatch("getArticles", {
        page: route.params.page || 1,
        tag: route.params.tag
      }),
      store.dispatch("getArticlesNum", {
        tag: route.params.tag
      })
    ]);
  },
  computed: {
    ...mapGetters(["articles", "num", "pageSize"]),
    currentPage () {
      return parseInt(this.$route.params.page) || 1;
    },
    tag() {
      return this.$route.params.tag;
    },
    routeName () {
      return this.$route.name
    }
  },
  watch: {
    $route: function(to, from) {
      if (to.name !== from.name) {
        this.$options.asyncData({
          store: this.$store,
          route: to
        });
      }
    }
  },
  methods: {
    handleChange (page) {
      if (this.routeName === 'Home' || this.routeName === 'HomePage') {
        this.$router.push({name: 'HomePage', params: {page: page}});
      } else if (this.routeName === 'TagsArticle' || this.routeName === 'TagsArticlePage') {
        this.$router.push({name: 'TagsArticlePage', params: {tag: this.tag, page: page}});
      }
    }
  }
};
</script>

<style>
.home {
  width: 100%;
}
.home-container {
  width: 1000px;
  margin: 50px auto;
}
.home-none {
  text-align: center;
}
@media screen and (max-width: 1000px) {
  .home-container{
    width: auto;
    margin: 50px 30px;
  }
}
</style>
