<template>
  <div class="about">
    <side-bar></side-bar>
    <i-header></i-header>
    <div class="about-container">
      <h2>About me</h2>
      <p>一名前端攻城狮</p>
    </div>
    <i-footer></i-footer>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="less">
.about-container{
  width: 700px;
  margin: 50px auto;
  min-height: 400px;
  h2{
    margin-bottom: 10px;
    font-size: 24px;
    color: #454040;
  }
}
@media screen and(max-width: 780px) {
  .about-container {
    width: auto;
    margin: 50px 30px;
  }
}
</style>
