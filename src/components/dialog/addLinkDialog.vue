<script setup>
import { ref } from 'vue'

//{ source: 'Node 1', target: 'Node 2' },
const props = defineProps({
  data:{
    type: Object,
    default: () => ({})
  },
  links:{
    type: Object,
    default: () => ({})
  },
})

const addNode = (source,target) =>{
  if(source === '' || target === ''){
    ElMessage.error('link data error')
    return
  }

  let hasSource = false
  let hasTarget = false
  for(let i=0; i < nodeData.length; i++){
    if(nodeData[i].name === source){
      hasSource = true
    }
    if(nodeData[i].name === target){
      hasTarget = true
    }
    if(hasSource && hasTarget){
      break
    }
  }
  if(!hasSource || !hasTarget){
    ElMessage.error('node not found')
    return
  }
  // console.log('addLink')
  for(let i = 0; i < LinkData.length; i++){
    if(LinkData[i].source === source && LinkData[i].target === target){
      console.log( source + ' to ' + target +' already exists')
      return
    }
  }
  // console.log("add " + source + " to " + target) 
  LinkData.push({source: source,target: target})

}

const dialogVisible = ref(false)
const LinkData = props.links
const nodeData = props.data
const source = ref('')
const target = ref('')

</script>

<template>
  <el-button plain @click="dialogVisible = true">
    点击添加连接
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="添加节点"
    width="500"
  >
    <el-form>
      <el-form-item label="节点名称">
        <el-input v-model="source" placeholder="请输入节点名称"></el-input>
        <el-input v-model="target" placeholder="请输入节点名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false;">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false;addNode(source,target)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
