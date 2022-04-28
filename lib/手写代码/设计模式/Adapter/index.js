const googleMap = {
  show: function () {
    console.log('开始渲染谷歌地图')
  }
}
const baiduMap = {
  show: function () {
    console.log('开始渲染百度地图')
  }
}
const renderMap = function (map) {
  map?.show();
}