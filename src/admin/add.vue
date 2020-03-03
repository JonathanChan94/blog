<template>
  <div class="add">
    <div class="add-form-item">
      <label class="add-form-label">文章标题：</label>
      <input class="add-form-input" type="text" v-model.trim="title">
    </div>
    <div class="add-form-item">
      <label class="add-form-label">发表日期：</label>
      <input class="add-form-input" type="text" v-model.trim="date">
    </div>
    <div class="add-form-item">
      <label class="add-form-label">文章标签：</label>
      <input class="add-form-input" type="text" v-model.trim="tag" @keyup.enter="addTag">
      <span class="add-form-tag" v-for="(item, index) in tags" :key="index">
        {{item}}
        <b @click="removeTag(index)">×</b>
      </span>
    </div>
    <template v-if="render">
      <div class="add-form-item">
        <label class="add-form-label-editor">文章简介：</label>
        <mavon-editor ref="iEditor" class="intro-editor" v-model="introMd"/>
      </div>
      <div class="add-form-item">
        <label class="add-form-label-editor">文章内容：</label>
        <mavon-editor ref="cEditor" class="content-editor" v-model="contentMd"/>
      </div>
    </template>
    <div class="add-form-submit-container">
      <div class="add-form-submit" @click="submit">发表文章</div>
      <p class="add-form-error">{{error}}</p>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";

export default {
  name: "AdminAdd",
  components: { mavonEditor },
  data() {
    return {
      title: "",
      date: "",
      tag: "",
      tags: [],
      introMd: '',
      contentMd: '',
      render: false,
      error: ""
    };
  },
  computed: {
    today() {
      let date = new Date();
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      return `${year}-${month}-${day}`;
    }
  },
  mounted() {
    this.date = this.today;
    this.render = true;
  },
  methods: {
    addTag() {
      this.tags.push(this.tag);
      this.tag = "";
    },
    removeTag(index) {
      this.tags.splice(index, 1);
    },
    reset () {
      this.title = '';
      this.date = this.today;
      this.tags = [];
      this.introMd = '';
      this.contentMd = '';
    },
    submit() {
      if (this.title.length === 0) {
        this.error = '请输入文章标题';
      } else if (!/^\d{4}-\d{2}-\d{2}$/.test(this.date)) {
        this.error = '请输入正确的日期格式，如2019-04-12';
      } else if (this.tags.length === 0) {
        this.error = '请输入文章的标签';
      } else if (this.introMd === '') {
        this.error = '请输入文章简介';
      } else if (this.contentMd === '') {
        this.error = '请输入文章内容';
      } else {
        this.error = '';
        let introduction = this.$refs.iEditor.d_render;
        let content = this.$refs.cEditor.d_render;
        this.$store.dispatch('addArticle', {
          title: this.title,
          date: new Date(this.date).getTime(),
          tags: this.tags,
          introMd: this.introMd,
          introduction: introduction,
          contentMd: this.contentMd,
          content: content
        }).then(res => {
          this.reset();
          console.log('文章发表成功');
        }).catch(err => {
          console.log('发表失败');
        })
      }
    }
  }
};
</script>

<style lang="less">
.add-form-item {
  margin: 20px 0;
  .add-form-label {
    font-size: 14px;
    display: inline-block;
    width: 100px;
  }
  .add-form-input {
    width: 350px;
    height: 35px;
    appearance: none;
    outline: none;
    border: 1px solid #bbb;
    padding-left: 10px;
    line-height: 35px;
    border-radius: 5px;
    font-size: 14px;
    &:focus {
      border: 1px solid #49b1f5;
    }
  }
  .add-form-tag {
    margin-left: 20px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    padding-left: 12px;
    background: #49b1f5;
    color: #fff;
    vertical-align: middle;
    font-size: 14px;
    border-radius: 5px;
    b {
      padding: 0 8px;
      font-size: 16px;
      font-weight: normal;
      cursor: pointer;
    }
  }
  .add-form-label-editor {
    font-size: 14px;
    display: block;
    margin-bottom: 15px;
  }
  .content-editor {
    height: 550px;
  }
}
.add-form-submit-container{
  overflow: hidden;
}
.add-form-submit {
  float: left;
  width: 150px;
  height: 35px;
  background: #49b1f5;
  color: #fff;
  font-size: 15px;
  text-align: center;
  line-height: 35px;
  cursor: pointer;
}
.add-form-error {
  float: left;
  margin-left: 20px;
  line-height: 35px;
  font-size: 14px;
  color: red;
}
</style>
