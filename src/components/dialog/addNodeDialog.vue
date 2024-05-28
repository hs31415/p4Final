<script setup>
import { ElMessage } from 'element-plus';
import { ref } from 'vue'

const props = defineProps({
  data:{
    type: Object,
    default: () => ({})
  },
})

const addNode = (name) =>{
  if(name === ''){
    ElMessage.error('name is empty')
    return
  }
  console.log('addNode')
  for(let i = 0; i < props.data.length; i++){
    if(props.data[i].name === name){
      ElMessage.error(name +' already exists')
      return
    }
  }
  console.log("add " + name)
  NodeData.push({name: name})

}

const dialogVisible = ref(false)
const NodeData = props.data
const NodeName = ref('')

</script>

<template>
  <el-button plain @click="dialogVisible = true">
    点击添加节点
  </el-button>

  <el-dialog
    v-model="dialogVisible"
    title="添加节点"
    width="500"
  >
    <el-form>
      <el-form-item label="节点名称">
        <el-input v-model="NodeName" placeholder="请输入节点名称"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false;">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false;addNode(NodeName)">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
