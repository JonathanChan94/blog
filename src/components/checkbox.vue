<template>
  <label class="comp-checkbox-container">
    <span class="comp-checkbox" :class="{'comp-checkbox-checked': currentValue}">
      <span class="comp-checkbox-inner"></span>
      <input
        class="comp-checkbox-input"
        type="checkbox"
        :checked="currentValue"
        @change="change"
      >
    </span>
    <span class="comp-checkbox-text">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'iCheckbox',
  props: {
    value: {
      type: Boolean
    }
  },
  data () {
    return {
      currentValue: this.value
    }
  },
  methods: {
    change (e) {
      let checked = e.target.checked;
      this.currentValue = checked;
      this.$emit('input', checked);
      this.$emit('change');
    }
  }
}
</script>

<style lang="less">
.comp-checkbox-container{
  display: inline-block;
  cursor: pointer;
  font-size: 12px;
  line-height: 1;
}
.comp-checkbox{
  display: inline-block;
  vertical-align: middle;
  width: 16px;
  height: 16px;
  position: relative;
  .comp-checkbox-inner{
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 1px solid #dcdee2;
    position: relative;
    transition: all .2s ease-in-out;
    &:before{
      display: block;
      content: '';
      width: 4px;
      height: 8px;
      border: 2px solid #fff;
      border-top: none;
      border-left: none;
      position: absolute;
      top: 1px;
      left: 4px;
      transform: rotate(45deg) scale(0);
      transition: all .2s ease-in-out;
    }
  }
  .comp-checkbox-input{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    cursor: pointer;
  }
}
.comp-checkbox-checked .comp-checkbox-inner{
  background: #49b1f5;
  border-color: #49b1f5;
  &:before{
    display: block;
    content: '';
    width: 4px;
    height: 8px;
    border: 2px solid #fff;
    border-top: none;
    border-left: none;
    position: absolute;
    top: 1px;
    left: 4px;
    transform: rotate(45deg) scale(1);
    transition: all .2s ease-in-out;
  }
}
.comp-checkbox-text{
  vertical-align: middle;
  margin-left: 5px;
}
</style>
