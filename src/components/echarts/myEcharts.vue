<template>
  <div id="main" style="width: 100%; height: 400px;"></div>
</template>

<script setup>
import { onMounted, defineProps } from 'vue'
import * as echarts from 'echarts'

// 定义 props
const props = defineProps({
  symbolSize: {
    type: Number,
    default: 20
  },
  data:{
    type: Object,
    default: () => ({})
  },
  desc:{
    type: Object,
    default: () => ({})
  }
})
const echartsData = props.data
onMounted(() => {
  initChart();
})

const option = {
  title: {
    text: 'Try Dragging these Points',
    left: 'center'
  },
  tooltip: {
    triggerOn: 'none',
    formatter: function (params) {
      console.log(params)
      return (
        "这个节点的信息是" + props.desc[params.dataIndex]
      );
    }
  },
  grid: {
    top: '8%',
    bottom: '12%'
  },
  xAxis: {
    min: -100,
    max: 100,
    type: 'value',
    axisLine: { onZero: false }
  },
  yAxis: {
    min: -100,
    max: 100,
    type: 'value',
    axisLine: { onZero: false }
  },
  series: [
    {
      id: 'a',
      type: 'line',
      smooth: true,
      symbolSize: props.symbolSize,
      data: echartsData
    }
  ]
}

function initChart() {
  const myChart = echarts.init(document.getElementById('main'));

  myChart.setOption(option);

  setTimeout(function () {
    // Add shadow circles (which is not visible) to enable drag.
    myChart.setOption({
      graphic: echartsData.map(function (item, dataIndex) {
        return {
          type: 'circle',
          position: myChart.convertToPixel('grid', item),
          shape: {
            cx: 0,
            cy: 0,
            r: props.symbolSize / 2
          },
          invisible: true,
          draggable: true,
          ondrag: function () {
            onPointDragging(dataIndex, [this.x, this.y]);
          },
          onmousemove: function () {
            showTooltip(dataIndex);
          },
          onmouseout: function () {
            hideTooltip(dataIndex);
          },
          z: 100
        };
      })
    });
  }, 0);

  function showTooltip(dataIndex) {
    myChart.dispatchAction({
      type: 'showTip',
      seriesIndex: 0,
      dataIndex: dataIndex
    });
  }

  function hideTooltip() {
    myChart.dispatchAction({
      type: 'hideTip'
    });
  }

  function onPointDragging(dataIndex, pos) {
    echartsData[dataIndex] = myChart.convertFromPixel('grid', pos)
    echartsData[dataIndex][0]=Math.max(-100, Math.min(100, echartsData[dataIndex][0]))
    echartsData[dataIndex][1]=Math.max(-100, Math.min(100, echartsData[dataIndex][1]))
    myChart.setOption({
      graphic: echartsData.map(function (item) {
        return {
          position: myChart.convertToPixel('grid', item),
        };
      }),
      series: [
        {
          id: 'a',
          data: echartsData
        }
      ]
    })
  }
}

</script>

<style scoped>
/* 在这里定义组件的样式 */
</style>
