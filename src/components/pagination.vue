<template>
  <div class="pagination">
    <ul>
      <li v-if="current > 1" @click="prev">‹</li>
      <li v-if="showFirst" @click="go(1)">1</li>
      <li v-if="showPrevMore" class="disabled">...</li>
      <li v-for="item in pageList" :key="item" :class="{active: item === current}" @click="go(item)">{{item}}</li>
      <li v-if="showNextMore" class="disabled">...</li>
      <li v-if="showLast" @click="go(totalPage)">{{totalPage}}</li>
      <li v-if="current < totalPage" @click="next">›</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {
      type: Number,
      required: true
    },
    total: {
      type: Number,
      required: true
    },
    size: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      current: this.page,
      perPages: 3,
      showFirst: false,
      showLast: false,
      showPrevMore: false,
      showNextMore: false
    }
  },
  computed: {
    totalPage () {
      return Math.ceil(this.total / this.size);
    },
    pageList () {
      const array = [];
      const perPages = this.perPages;
      const pageCount = this.totalPage;
      let index = this.current;
      const _offset = Math.ceil((perPages - 1) / 2);

      let offset = {
        start: index - _offset,
        end: index + _offset
      }

      if (offset.start < 1) {
        offset.end = offset.end + (1 - offset.start);
        offset.start = 1;
      }
      if (offset.end > pageCount) {
        offset.start = offset.start - (offset.end - pageCount);
        offset.end = pageCount;
      }
      if (offset.start < 1) offset.start = 1;

      for (let i = offset.start; i <= offset.end; i++) {
        array.push(i);
      }

      this.showFirst = (offset.start > 1);
      this.showLast = (offset.end < pageCount);
      this.showPrevMore = (offset.start > 2);
      this.showNextMore = (offset.end < pageCount - 1);

      return array;
    }
  },
  watch: {
    page (val) {
      this.current = val;
    }
  },
  methods: {
    prev () {
      this.go(this.current - 1);
    },
    next () {
      this.go(this.current + 1);
    },
    go (index) {
      this.current = index;
      this.$emit('change', this.current);
    }
  }
}
</script>

<style lang="less">
.pagination{
  width: 100%;
  margin: 20px 0;
  text-align: center;
  color: #454040;
  ul{
    display: inline-block
  }
  li{
    float: left;
    margin: 0 5px;
    padding: 3px 8px;
    cursor: pointer;
    &:hover{
      color: #49b1f5;
    }
    &.active{
      background: #49b1f5;
      color: #fff;
    }
    &.disabled{
      cursor: default;
      color: #454040;
    }
  }
}
</style>
