export default {
  methods: {
    'dateFormat': function (date) {
      const _date = new Date(date)
      return _date.getFullYear() + "年" + _date.getMonth()+ "月" + _date.getDate() + "日"
    },
    'formatDateTime': function (time) {
      const date = new Date(time)
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      var second = date.getSeconds();
      second = second < 10 ? ('0' + second) : second;
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    }
  }
}
