<template>
  <div class="admin-home">
    <div class="admin-card-container">
      <table>
        <thead>
          <tr>
            <th>新增浏览</th>
            <th>新增评论</th>
            <th>新增点赞</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{pv.length}}</td>
            <td>{{comment.length}}</td>
            <td>{{like.length}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="admin-section-container">
      <div class="admin-section-title">最新浏览</div>
      <template v-if="pv.length > 0">
        <ul>
          <li v-for="item in pv" :key="item._id">{{item.date | dateFormat}} {{item.content}}</li>
        </ul>
        <div class="admin-section-button" @click="remove('pv')">设为已读</div>
      </template>
      <template v-else>
        <div class="admin-section-none">暂无记录</div>
      </template>
    </div>
    <div class="admin-section-container">
      <div class="admin-section-title">最新评论</div>
      <template v-if="comment.length > 0">
        <ul>
          <li v-for="item in comment" :key="item._id">{{item.date | dateFormat}} {{item.content}}</li>
        </ul>
        <div class="admin-section-button" @click="remove('comment')">设为已读</div>
      </template>
      <template v-else>
        <div class="admin-section-none">暂无记录</div>
      </template>
    </div>
    <div class="admin-section-container">
      <div class="admin-section-title">最新点赞</div>
      <template v-if="like.length > 0">
        <ul>
          <li v-for="item in like" :key="item._id">{{item.date | dateFormat}} {{item.content}}</li>
        </ul>
        <div class="admin-section-button" @click="remove('like')">设为已读</div>
      </template>
      <template v-else>
        <div class="admin-section-none">暂无记录</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminHome",
  data() {
    return {
      pv: [],
      comment: [],
      like: []
    };
  },
  mounted() {
    this.getData();
  },
  filters: {
    dateFormat: function (value) {
      if (!value) return '';
      let date = new Date(value);
      let year = date.getFullYear(),
        month = date.getMonth() + 1,
        day = date.getDate(),
        hour = date.getHours(),
        minute = date.getMinutes();
      month = month < 10 ? "0" + month : month;
      day = day < 10 ? "0" + day : day;
      hour = hour < 10 ? '0' + hour : hour;
      minute = minute < 10 ? '0' + minute : minute;
      return `${year}-${month}-${day} ${hour}:${minute}`;
    }
  },
  methods: {
    getData() {
      this.$store.dispatch("getMsg").then(res => {
        this.pv = res.res.pv;
        this.comment = res.res.comment;
        this.like = res.res.like;
      }).catch(err => {});
    },
    remove(type) {
      this.$store.dispatch("removeMsg", {
        type: type
      }).then(res => {
        this.getData();
      }).catch(err => {
        console.log(err);
      });
    }
  }
};
</script>

<style lang="less">
.admin-card-container {
  margin-bottom: 40px;
}
.admin-card-container table {
  width: 100%;
  border: 1px solid #ebeef5;
  border-collapse: collapse;
  color: #606266;
  thead {
    background: #f5f7fa;
    tr {
      line-height: 60px;
      font-size: 15px;
    }
  }
  tbody tr {
    line-height: 50px;
    background: #fff;
    font-size: 14px;
    &:hover {
      background: #f5f7fa;
    }
  }
  th {
    padding-left: 20px;
    text-align: left;
    font-weight: normal;
    border: 1px solid #ebeef5;
  }
  td {
    padding-left: 20px;
    border: 1px solid #ebeef5;
  }
}
.admin-section-container {
  float: left;
  width: 48%;
  height: 350px;
  margin-left: 4%;
  margin-bottom: 40px;
  background: #fff;
  position: relative;
  border: 1px solid #ebeef5;
  color: #606266;
  box-sizing: border-box;
  &:nth-child(even) {
    margin-left: 0;
  }
  .admin-section-title {
    padding-left: 20px;
    font-size: 15px;
    height: 35px;
    line-height: 35px;
    background: #f5f7fa;
    border-bottom: 1px solid #ebeef5;
  }
  ul{
    height: 310px;
    overflow: auto;
  }
  li {
    font-size: 15px;
    padding-left: 20px;
    line-height: 35px;
  }
  .admin-section-button {
    width: 80px;
    height: 30px;
    line-height: 30px;
    background: #49b1f5;
    color: #fff;
    font-size: 14px;
    text-align: center;
    border-radius: 5px;
    position: absolute;
    bottom: 5px;
    right: 5px;
    cursor: pointer;
  }
  .admin-section-none {
    margin-top: 80px;
    text-align: center;
  }
}
</style>
