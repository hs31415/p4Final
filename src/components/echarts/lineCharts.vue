<script setup>
import * as echarts from 'echarts'
import { onMounted } from 'vue';
import { getNetFlow } from '@/apis/netFlow'

const getNetFlowData = async () => {
  const res = await getNetFlow()
  console.log(res)
  return res
}

const props = defineProps({
  type:{
    type: String,
    default: ""
  },
  data:{
    type: Number,
    default: 0
  }

})

let myChart
const type = props.type

onMounted(()=>{
  myChart = echarts.init(document.getElementById(`${type}`));
  getNetFlowData().then(res => {
    console.log(res)
  })
})
// 初始化 ECharts 实例

// 初始化横轴时间数据和初始折线数据
var timeData = [new Date().toLocaleTimeString()];
var lineData = [0,695,2143,3830,4325,4968];

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
  <div :id="type" style="height: 400px;width: 600px;"></div>
  <div>{{ this.data }}</div>
</template>