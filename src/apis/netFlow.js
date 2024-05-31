import request from '@/http/http.js'

export const getNetFlow = (()=>{
  return request({
    url:'/decode',
    method:'GET',
  })
})