<template>
  <footer class="footer">
    <p>&copy;2019 By Jonathan Chan</p>
    <div class="footer-up" @click="scroll" v-show="show"></div>
  </footer>
</template>

<script>
import { throttle } from '../utils/func.js';

export default {
  name: 'iFooter',
  data () {
    return {
      timer: null,
      show: false
    }
  },
  mounted () {
    window.addEventListener('scroll', throttle(() => {
      if (document.documentElement.scrollTop > 800) {
        this.show = true;
      } else {
        this.show = false;
      }
    }, 100));
  },
  methods: {
    scroll () {
      const speed = Math.floor(document.documentElement.scrollTop / 20);
      this.timer = setInterval(() => {
        if (document.documentElement.scrollTop <= 0) {
          clearInterval(this.timer);
        }
        document.documentElement.scrollTop -= speed;
      }, 16)
    }
  }
}
</script>

<style>
.footer{
  width: 100%;
  height: 50px;
  padding-top: 30px;
  background-image: url(../assets/header-bg.jpg);
  background-position: center bottom;
  background-attachment: fixed;
  text-align: center;
  color: #fff;
}
.footer-up{
  width: 16px;
  height: 16px;
  background-image: url(../assets/arrow.png);
  background-size: cover;
  position: fixed;
  bottom: 20px;
  right: 20px;
  transform: rotate(-90deg);
  cursor: pointer;
}
@media screen and (max-width: 1000px) {
  .footer-up{
    bottom: 10px;
    right: 10px;
  }
}
</style>
