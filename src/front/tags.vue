<template>
  <div class="tags">
    <side-bar></side-bar>
    <i-header :home="true"></i-header>
    <div class="tags-content">
      <ul class="tags-item-list">
        <li class="tags-item" v-for="(tag, index) in tags" :key="index">
          <router-link class="tags-item-link" :to="{name: 'TagsArticle', params: {tag: tag.tag}}">{{tag.tag}} （{{tag.num}}）</router-link>
        </li>
      </ul>
    </div>
    <i-footer></i-footer>
  </div>
</template>

<script>
export default {
  name: 'Tags',
  asyncData ({store}) {
    return store.dispatch('getTags');
  },
  computed: {
    tags () {
      return this.$store.getters.tags;
    }
  }
}
</script>

<style lang="less">
.tags-content{
  width: 700px;
  min-height: 300px;
  margin: 60px auto;
  .tags-title{
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #454040;
    margin-bottom: 50px;
  }
  .tags-item-list{
    text-align: center;
  }
  .tags-item{
    height: 50px;
    line-height: 50px;
  }
  .tags-item-link{
    font-size: 18px;
    text-decoration: none;
    color: #49b1f5;
  }
}
@media screen and(max-width: 780px) {
  .tags-content{
    width: auto;
    margin: 60px 30px;
  }
}
</style>
