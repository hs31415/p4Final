<script setup>
import * as echarts from 'echarts'
import { ref,onMounted } from 'vue';

let num1 = ref(0)
let num2 = ref(0)
const getData = () => {
  fetch('http://10.133.72.190:8000/decode')
  .then(response => {
    // 检查响应是否成功
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    // 解析响应数据为 JSON 格式
    return response.json();
  })
  .then(data => {
    // 处理接收到的数据
    console.log(data);
    num1.value = data[0]  
    num2.value = data[1]
  })
  .catch(error => {
    // 处理请求错误
    console.error('There was a problem with your fetch operation:', error);
  });
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
})
// 初始化 ECharts 实例

// 初始化横轴时间数据和初始折线数据
var timeData = [new Date().toLocaleTimeString()];
var lineData = [0];

// 定义更新数据的函数
function updateData() {
  // 模拟获取当前时间和新的折线数据
  var currentTime = new Date().toLocaleTimeString();
  var newValue
  if(type == "line1"){
    newValue = num1.value
  }else{
    newValue = num2.value
  }

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
setInterval(() => {
  updateData()
  getData()
}, 2000);
</script>

<template>
  <div :id="type" style="height: 400px;width: 600px;"></div>
  <div>{{ type }}</div>
</template>