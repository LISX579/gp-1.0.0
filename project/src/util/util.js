export default {
  methods: {
    'dateFormat': function (date) {
      const _date = new Date(date)
      return _date.getFullYear() + "年" + _date.getMonth()+ "月" + _date.getDate() + "日"
    }
  }
}
