<template>
  <div>{{responseRef}}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import qs from 'qs'
import axios from '../../src'
// import axios from 'axios'

export default defineComponent({
  name: 'axiosTestPage',
  setup() {
    const responseRef = ref<any>(1)

    onMounted(async() => {
      // const instance = axios.create({})
      // const source = CancelToken.source();

      const instance = axios.create({
        baseURL: 'http://localhost:8080/'
      })

      const res = await instance.request<string>(
        {
          // baseURL: 'http://localhost:8080',
          url: '/api/test',
          method: 'post',
          params: {
            page: 1,
            postId: [4, 5, 6],
            name: null,
            obj: 111,
          },
          // params: new URLSearchParams('a=b&c=d'),
          data: {
            page: 1,
            postId: [4, 5, 6],
            name: null,
          },
          auth: {
            username: 'liuxueyong',
            password: '1997qaz'
          },
          validateStatus: (status) => {
            return (status >= 200 && status < 300) || status === 403
          },
          // paramsSerializer: (params) => {
          //   return qs.stringify(params, { arrayFormat: 'brackets' })
          // }
        }
      )

      console.log(res)
    })

    return { responseRef }
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
