<template>
  <div class="admin-article">
    <table class="admin-article-table">
      <thead>
        <tr>
          <th>文章Id</th>
          <th>文章标题</th>
          <th>文章标签</th>
          <th>发表时间</th>
          <th>访问量</th>
          <th>点赞量</th>
          <th>评论量</th>
          <th>是否可见</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(article, index) in articles" :key="article.articleId">
          <td>{{article.articleId}}</td>
          <td>{{article.title}}</td>
          <td>{{article.tags}}</td>
          <td>{{article.date | dateFormat}}</td>
          <td>{{article.pv}}</td>
          <td>{{article.likeNum}}</td>
          <td>{{article.commentNum}}</td>
          <td>
            <i-checkbox v-model="article.show" @change="update(index)">
              <template v-if="article.show">可见</template>
              <template v-else>不可见</template>  
            </i-checkbox>
          </td>
          <td>
            <button class="admin-article-button" @click="edit(article.articleId)">修改</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import iCheckbox from '../components/checkbox.vue';

export default {
  name: 'AdminArticle',
  components: {iCheckbox},
  data () {
    return {
      articles: []
    }
  },
  mounted () {
    this.getArticles();
  },
  methods: {
    getArticles () {
      this.$store.dispatch('getAllArticles').then(res => {
        this.articles = res.res;
      }).catch(err => {

      })
    },
    update (index) {
      let data = {
        articleId: this.articles[index].articleId,
        show: this.articles[index].show
      };
      this.$store.dispatch('updateArticle', data).then(res => {
        console.log(res);
      }).catch(err => {
        
      })
    },
    edit (articleId) {
      this.$router.push({name: 'AdminEdit', params: {id: articleId}});
    }
  }
}
</script>

<style lang="less">
.admin-article-table{
  width: 100%;
  border: 1px solid #ebeef5;
  border-collapse: collapse;
  thead{
    background: #f5f7fa;
    tr{
      line-height: 60px;
      font-size: 15px;
    }
  }
  tbody tr{
    line-height: 50px;
    background: #fff;
    font-size: 14px;
    &:hover{
      background: #f5f7fa;
    }
  }
  th{
    padding-left: 20px;
    text-align: left;
    font-weight: normal;
    border: 1px solid #ebeef5;
  }
  td{
    padding-left: 20px;
    color: #606266;
    border: 1px solid #ebeef5;
  }
}
.admin-article-button{
  appearance: none;
  border: none;
  outline: none;
  background: none;
  color: #49b1f5;
  cursor: pointer;
}
</style>
