<template>
  <div class="article">
    <article-side :titleArr="titleArr"></article-side>
    <i-header :title="title" :date="date" :tags="tags"></i-header>
    <div class="article-content">
      <div v-html="html" v-highlight></div>
    </div>
    <div class="article-link">
      <router-link class="article-prev" v-if="prev" :to="{name: 'Article', params: {id: prev.articleId}}">&lt; {{prev.title}}</router-link>
      <router-link class="article-next" v-if="next" :to="{name: 'Article', params: {id: next.articleId}}">{{next.title}} &gt;</router-link>
    </div>
    <i-footer></i-footer>
  </div>
</template>

<script>
import hljs from "highlight.js/lib/highlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import http from "highlight.js/lib/languages/http";
import php from "highlight.js/lib/languages/php";
import nginx from "highlight.js/lib/languages/nginx";
import xml from "highlight.js/lib/languages/xml";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("http", http);
hljs.registerLanguage("php", php);
hljs.registerLanguage("nginx", nginx);
hljs.registerLanguage("xml", xml);

import "highlight.js/styles/atom-one-dark.css";
import ArticleSide from "../components/articleSide.vue";
import { mapGetters } from "vuex";
import axios from 'axios';

export default {
  name: "Article",
  components: { ArticleSide },
  asyncData({ store, route }) {
    return store.dispatch("getArticle", route.params.id);
  },
  data() {
    return {
      titleArr: null,
      prev: null,
      next: null
    };
  },
  computed: {
    ...mapGetters(["html", "title", "date", "tags"]),
    articleId() {
      return this.$route.params.id;
    }
  },
  mounted() {
    this.getPrevNext();
    this.titleArr = Array.from(document.querySelectorAll("h2, h3, h4"));
  },
  watch: {
    '$route': function (to, from) {
      this.getPrevNext();
    }
  },
  directives: {
    highlight: {
      inserted: el => {
        let blocks = Array.from(el.querySelectorAll("pre code"));
        blocks.map(block => {
          hljs.highlightBlock(block);
        });
      }
    }
  },
  methods: {
    getPrevNext () {
      this.$store.dispatch('getPrevNextArticle', {
        articleId: this.$route.params.id
      }).then(res => {
        this.prev = res.res.prev[0];
        this.next = res.res.next[0];
      }).catch(() => {});
    }
  }
};
</script>

<style lang="less">
.article .article-content {
  width: 1000px;
  min-height: 500px;
  margin: 40px auto;
  font-size: 15px;
  h1 {
    margin: 10px 0;
    font-size: 20px;
    color: #3e3e3e;
  }
  h2 {
    margin: 10px 0;
    font-size: 19px;
    color: #3e3e3e;
    padding-bottom: 5px;
    border-bottom: 1px solid #eaecef;
  }
  h3 {
    margin: 10px 0;
    font-size: 17px;
    color: #3e3e3e;
  }
  h4 {
    margin: 10px 0;
    font-size: 16px;
    color: #3e3e3e;
  }
  p {
    font-size: 15px;
    line-height: 25px;
  }
  ol {
    margin: 5px 0;
    padding-left: 14px;
    li{
      padding-left: 5px;
      line-height: 25px;
    }
  }
  ul {
    margin: 5px 0;
    padding-left: 18px;
    li{
      list-style-type: disc;
      line-height: 25px;
    }
  }
  pre {
    margin: 15px 0;
  }
  pre code {
    font-family: Consolas, Monaco, monospace;
  }
  blockquote {
    padding: 0 20px;
    color: #6a737d;
    border-left: .25em solid #dfe2e5;
  }
  a {
    color: #49b1f5;
    text-decoration: none
  }
  img {
    max-width: 100%;
    box-sizing: content-box;
    background-color: #fff;
  }
}
.article .article-link{
  width: 1000px;
  margin: 0 auto 30px;
  overflow: hidden;
  .article-prev{
    float: left;
    color: #6b767b;
    &:hover{
      color: #49b1f5
    }
  }
  .article-next{
    float: right;
    color: #6b767b;
    &:hover{
      color: #49b1f5;
    }
  }
}
@media screen and (max-width: 1000px) {
  .article .article-content {
    margin: 40px 30px;
    width: auto;
  }
  .article .article-link{
    margin: 30px 30px;
    width: auto;
  }
}
</style>
