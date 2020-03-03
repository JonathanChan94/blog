<template>
  <div class="article-side" :class="{active: active}">
    <div class="side-arrow" @click="showSide"></div>
    <div class="side-title">目录</div>
    <!-- <tree
      class="side-menu"
      :menu-data="menuTree"
    ></tree> -->
    <tree-node
      class="side-menu"
      :menu-data="menuTree"
    ></tree-node>
  </div>
</template>

<script>
import { renderTree, throttle } from '../utils/func.js';
// import Tree from './tree.vue';
import TreeNode from './treeNode.vue';

export default {
  name: 'ArticleSide',
  components: {TreeNode},
  props: {
    titleArr: {
      required: true
    }
  },
  data () {
    return {
      active: false,
      linkArray: null
    }
  },
  computed: {
    menuList () {
      return renderTree(this.titleArr);
    },
    menuTree () {
      return this.menuList.filter(menu => menu._break !== true);
    },
    menuTop () {
      return this.menuList.map(menu => menu.offsetTop - 10);
    }
  },
  updated () {
    if (!this.linkArray) {
      if (document.querySelector('.side-arrow').offsetHeight > 0) {
        this.showSide();
      }
      this.linkArray = Array.from(document.querySelectorAll('.side-menu a'));
      window.addEventListener('scroll', throttle(() => {
        let top = document.documentElement.scrollTop;
        for (let i = 0; i < this.menuTop.length; i++) {
          if (top >= this.menuTop[i]) {
            this.linkArray.map(item => item.classList.remove('active'));
            this.linkArray[i].classList.add('active');
          }
        }
      }, 100));
    }
  },
  beforeDestroy () {
    document.body.style.paddingLeft = '0';
  },
  methods: {
    showSide() {
      this.active = !this.active;
      document.body.style.paddingLeft = this.active ? '300px' : '0';
    }
  }
}
</script>

<style lang="less">
.article-side {
  width: 300px;
  height: 100%;
  background: #f3f3f3;
  color: #454040;
  position: fixed;
  left: -300px;
  top: 0;
  transition: all 0.2s ease;
  .side-arrow {
    width: 16px;
    height: 16px;
    background: url(../assets/arrow.png);
    background-size: cover;
    position: absolute;
    bottom: 20px;
    right: -36px;
    cursor: pointer;
    transform-origin: 50%;
  }
  &.active {
    transform: translateX(300px);
    .side-arrow {
      left: 20px;
      transform: rotate(180deg);
    }
  }
  .side-title{
    padding-top: 60px;
    text-align: center;
    font-size: 18px;
  }
  .side-menu{
    margin-top: 60px;
    padding-left: 30px;
  }
}
@media screen and(max-width: 1000px) {
  .article-side .side-arrow{
    display: none;
  }
}
</style>
