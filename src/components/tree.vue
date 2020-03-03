<template>
  <tree-node
    :menu-data="menuData"
  ></tree-node>
</template>

<script>
import TreeNode from './treeNode.vue';

export default {
  name: 'Tree',
  components: {TreeNode},
  props: {
    menuData: {
      type: Array,
      required: true,
      default () {
        return []
      }
    }
  }
}
</script>

<style>

</style>
