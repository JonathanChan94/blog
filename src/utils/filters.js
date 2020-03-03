import Vue from 'vue';

Vue.filter('dateFormat', function (value) {
  if (!value) return "";
  let date = new Date(value);
  let year = date.getFullYear(),
    month = date.getMonth() + 1,
    day = date.getDate();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  return `${year}-${month}-${day}`;
})