<template>
  <ul class="tree">
    <li class="tree-node" v-for="item in menuData" :key="item.innerText">
      <a href="javascript:void(0)" @click="handleClick(item.offsetTop)">{{item.innerText}}</a>
      <tree-node v-if="item._children && item._children.length > 0" :menu-data="item._children"></tree-node>
    </li>
  </ul>
</template>

<script>
export default {
  name: "TreeNode",
  props: {
    menuData: {
      type: Array,
      required: true,
      default() {
        return [];
      }
    }
  },
  data () {
    return {
      timer: null
    }
  },
  methods: {
    handleClick(top) {
      document.documentElement.scrollTop = top - 10;
    }
  }
};
</script>

<style lang="less">
.tree {
  padding-left: 15px;
}
.tree-node {
  font-size: 15px;
  line-height: 30px;
  cursor: pointer;
  a{
    display: block;
    text-decoration: none;
    color: #454040;
    &.active{
      color: #00aeff;
    }
  }
}
</style>
