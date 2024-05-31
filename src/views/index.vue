<script setup>

//交换机图片https://s3.bmp.ovh/imgs/2024/05/28/411f113ead146b9e.png
//主机图片symbol:"image://https://s3.bmp.ovh/imgs/2024/05/28/1ec928c28a0248f0.png",
import myEcharts from '@/components/echarts/myEcharts.vue';
import addNodeDialog from '@/components/dialog/addNodeDialog.vue';
import addLinkDialog from '@/components/dialog/addLinkDialog.vue';
import lineCharts from '@/components/echarts/lineCharts.vue';
import { ref, onMounted } from 'vue';

const data = ref([
  { 
    name: 'Switch 1',
    symbol:"image://https://s3.bmp.ovh/imgs/2024/05/28/411f113ead146b9e.png",
    symbolSize: [30, 30]
  },
  { 
    name: 'Switch 2',
    symbol:"image://https://s3.bmp.ovh/imgs/2024/05/28/411f113ead146b9e.png",
    symbolSize: [30, 30]
  },
  { 
    name: 'Switch 3',
    symbol:"image://https://s3.bmp.ovh/imgs/2024/05/28/411f113ead146b9e.png",
    symbolSize: [30, 30]
  },
  { 
    name: 'Host 1' ,
    symbol:"image://https://s3.bmp.ovh/imgs/2024/05/28/1ec928c28a0248f0.png",
    symbolSize: [30, 30]
  },
  { 
    name: 'Host 2' ,
    symbol:"image://https://s3.bmp.ovh/imgs/2024/05/28/1ec928c28a0248f0.png",
    symbolSize: [30, 30]
  },
  { 
    name: 'Host 3' ,
    symbol:"image://https://s3.bmp.ovh/imgs/2024/05/28/1ec928c28a0248f0.png",
    symbolSize: [30, 30]
  },
])

const links = ref([
  { source: 'Switch 1', target: 'Switch 2' },
  { source: 'Switch 1', target: 'Switch 3' },
  { source: 'Switch 2', target: 'Switch 3' },
  { source: 'Switch 1', target: 'Host 1' },
  { source: 'Switch 2', target: 'Host 2' },
  { source: 'Switch 3', target: 'Host 3' },
])

import { getNetFlow } from '@/apis/netFlow'

const getNetFlowData = async () => {
  const res = await getNetFlow()
  console.log(res)
  return res
}

onMounted(()=>{
  getNetFlowData().then(res => {
    console.log(res)
  })
})


</script>

<template>
  <div class="contain">
    <h2 style="">拓扑图</h2>
    <ul class="table">
      <myEcharts :data="data" :links="links" />
    </ul>
    <h1>
      <addNodeDialog :data="data" />
      <addLinkDialog :data="data" :links="links" />
    </h1>
  </div>
  <div class="dataZone">
    <lineCharts type="line1"/>
    <lineCharts type="line2"/>
  </div>
</template>


<style scoped>
.contain {
  width: 600px;
  height: 70vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: center;
}
.table{
  border: #c3c3c3 1px solid;
}
h1{
  width: 500px;
  height: 100px;
  display: flex;
  justify-content: space-around;
}

.line{
  display: block;
}

</style>
