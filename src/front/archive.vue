<template>
  <div class="archive">
    <side-bar></side-bar>
    <i-header></i-header>
    <div class="archive-container">
      <div class="archive-title">Articles - {{archive.length}}</div>
      <div class="archive-item" v-for="item in archive" :key="item.articleId">
        <span class="archive-item-time">{{item.date | dateFormat}}</span>
        <router-link class="archive-item-link" :to="{name: 'Article', params: {id: item.articleId}}">{{item.title}}</router-link>
      </div>
    </div>
    <i-footer></i-footer>
  </div>
</template>

<script>
export default {
  name: 'Archive',
  asyncData ({store}) {
    return store.dispatch('getArchive');
  },
  data () {
    return {}
  },
  computed: {
    archive () {
      return this.$store.getters.archive;
    }
  }
}
</script>

<style lang="less">
.archive-container{
  width: 700px;
  margin: 60px auto;
  border-left: 2px solid #00aeff;
}
.archive-title{
  padding-left: 30px;
  margin-bottom: 40px;
  font-size: 18px;
  color: #454040;
}
.archive-item{
  padding-left: 30px;
  position: relative;
  margin-bottom: 40px;
  &:before{
    content: '';
    width: 8px;
    height: 8px;
    border: 2px solid #00aeff;
    background: #fff;
    border-radius: 50%;
    position: absolute;
    left: -7px;
    top: 5px;
    transition: all .2s;
  }
  &:hover:before{
    border: 2px solid #ff7242;
  }
  .archive-item-time{
    position: absolute;
    font-size: 14px;
    color: #bbb;
    line-height: 22px;
  }
  .archive-item-link{
    display: block;
    margin-left: 100px;
    text-decoration: none;
    color: #454040;
    font-size: 16px;
    line-height: 22px;
    &:hover{
      color: #00aeff;
    }
  }
}
@media screen and(max-width: 780px) {
  .archive-container{
    width: auto;
    margin: 60px 30px;
  }
}
</style>
