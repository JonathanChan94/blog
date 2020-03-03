<template>
  <div class="article-item">
    <router-link class="article-title" :to="{name: 'Article', params: {id: articleId}}">{{title}}</router-link>
    <div class="article-info">
      <span class="article-time">{{date | dateFormat}}</span>
      <span class="line"></span>
      <template v-for="(tag, index) in tags">
        <router-link
          class="article-tag"
          :to="{name: 'TagsArticle', params: {tag: tag}}"
          :key="index"
        >{{tag}}</router-link>
      </template>
    </div>
    <div class="article-content" v-html="content"></div>
    <router-link class="article-link" :to="{name: 'Article', params: {id: articleId}}">阅读全文>></router-link>
  </div>
</template>

<script>
export default {
  name: "ArticlePart",
  props: {
    title: {
      type: String
    },
    date: {
      type: Number
    },
    tags: {
      type: Array
    },
    content: {
      type: String
    },
    articleId: {
      type: Number
    }
  },
  data() {
    return {};
  },
  methods: {
    toArticle() {
      this.$router.push({ name: "Article", params: { id: this.articleId } });
    }
  }
};
</script>

<style lang="less">
.article-item {
  padding: 20px;
  background: #fff;
  box-shadow: 0 0 12px #ddd;
  border-radius: 2px;
  margin-bottom: 80px;
  transition: all 0.2s;
  &:hover {
    box-shadow: 0 0 12px #bbb;
  }
  .article-title {
    display: block;
    font-size: 24px;
    // font-weight: bold;
    color: #3e3e3e;
    text-decoration: none;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
    transition: all 0.1s;
    &:hover {
      color: #49b1f5;
      border-bottom: 1px solid #49b1f5;
    }
  }
  .article-info {
    margin: 10px auto;
    .article-time {
      font-size: 14px;
      color: #bbb;
    }
    .line {
      display: inline-block;
      margin: 0 10px;
      width: 1px;
      height: 12px;
      background: #bbb;
    }
    .article-tag {
      display: inline-block;
      text-decoration: none;
      margin-right: 10px;
      padding: 0 6px;
      font-size: 12px;
      height: 22px;
      line-height: 22px;
      background: #49b1f5;
      border-radius: 4px;
      color: #fff;
      cursor: pointer;
    }
  }
  .article-content {
    margin-top: 40px;
    font-size: 15px;
    color: #454040;
    h1 {
      margin: 10px 0;
      font-size: 20px;
      color: #3e3e3e;
    }
    h2 {
      margin: 10px 0;
      font-size: 19px;
      color: #3e3e3e;
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
      li {
        padding-left: 5px;
        line-height: 25px;
      }
    }
    ul {
      margin: 5px 0;
      padding-left: 18px;
      li {
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
      border-left: 0.25em solid #dfe2e5;
    }
    a {
      color: #49b1f5;
      text-decoration: none;
    }
    img {
      max-width: 100%;
      box-sizing: content-box;
      background-color: #fff;
    }
  }
  .article-link {
    display: block;
    width: 120px;
    height: 28px;
    line-height: 28px;
    margin-top: 30px;
    background: #49b1f5;
    border-radius: 2px;
    text-decoration: none;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s;
    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
