
<script setup>

import { onMounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data:{
    type: Object,
    default: () => ({})
  },
  links:{
    type: Object,
    default: () => ({})
  }
})

let echartsData = props.data
let echartsLinks = props.links

onMounted(() => {
  initChart()
})

watch(echartsData, () => {
  initChart()
})

watch(echartsLinks, () => {
  initChart()
})

const option = {
  series: [{
    type: 'graph',
    layout: 'force',
    force: {
      repulsion: 1000
    },
    label:"",
    roam:true,
    draggable: true, // 允许节点拖动
    data: echartsData,
    links: echartsLinks,
  }],
  tooltip: {
    triggerOn: 'none',
    formatter: function(params) {
      return (
        "节点名: " + params.data.name
      );
    }
  }
};

function initChart() {
  const myChart = echarts.init(document.getElementById('main'))


  // 添加节点悬停事件监听器
  myChart.on('mouseover', function (params) {
    if (params.dataType === 'node') { 
      getNodeInfo(params);
    }
  });

  myChart.on('mouseout', function () {
    hideTooltip()
  });

  const getNodeInfo = (params) => {
    showTooltip(params.dataIndex)
  }

  const showTooltip = (dataIndex) =>{
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: dataIndex
    });
  }

  const  hideTooltip = () =>{
    myChart.dispatchAction({
      type: 'hideTip'
    });
  }

  myChart.setOption(option)
}



</script>

<template>
  <div id="main" style="width: 500px; height: 400px;"></div>
</template>

<style scoped>

</style>
