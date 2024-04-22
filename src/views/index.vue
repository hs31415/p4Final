<script setup>
import myEcharts from '@/components/echarts/myEcharts.vue';
import { ref } from 'vue';

const symbolSize = ref(20)
const data = ref([
  [40, -10],
  [-30, -5],
  [-76.5, 20],
  [-63.5, 40],
  [-22.1, 50]
])
const desc = ref([
  'A',
  'B',
  'C',
  'D',
  'E'
])



</script>

<template>
  <myEcharts :symbloSize="symbolSize" :data="data" :desc="desc"/>
</template>


<style scoped>
/* 在这里定义组件的样式 */
</style>
