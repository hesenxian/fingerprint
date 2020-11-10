
//获取当前时间函数↓
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':') 
}
const getWeekByDate = dates => {
  let show_day = new Array('周日', '周一', '周二', '周三', '周四', '周五', '周六');
  let date = new Date(dates);
  date.setDate(date.getDate());
  let day = date.getDay();
  return show_day[day];
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//↑获取当前时间函数
module.exports = {
  formatTime: formatTime,
  getWeekByDate: getWeekByDate
 
}
