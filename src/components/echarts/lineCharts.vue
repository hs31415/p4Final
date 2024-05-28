<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue';

const props = defineProps({
  data:{
    type: String,
    default: ""
  },
})

let myChart
const data = props.data
console.log(data)

onMounted(()=>{
  myChart = echarts.init(document.getElementById(`${data}`));
  console.log(document.getElementById('line'))
})
// 初始化 ECharts 实例

// 初始化横轴时间数据和初始折线数据
var timeData = [new Date().toLocaleTimeString()];
var lineData = [0];

// 定义更新数据的函数
function updateData() {
  // 模拟获取当前时间和新的折线数据
  var currentTime = new Date().toLocaleTimeString();
  var newValue = Math.random() * 100;

  // 更新横轴时间数据，最多保留10条数据
  timeData.push(currentTime);
  if (timeData.length > 10) {
    timeData.shift();
  }

  // 更新折线数据，最多保留10条数据
  lineData.push(newValue);
  if (lineData.length > 10) {
    lineData.shift();
  }

  // 更新 ECharts 图表
  myChart.setOption({
    xAxis: {
      type: 'category',
      data: timeData
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: lineData,
      type: 'line'
    }]
  });
}

// 每隔一秒更新一次数据
setInterval(updateData, 1000);
</script>

<template>
  <div :id="data" style="height: 400px;width: 600px;"></div>
  <div>{{ this.data }}</div>
</template>