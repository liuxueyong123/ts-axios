<template>
  <div>{{responseRef}}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios, { AxiosTransformer } from '../../src'
// import axios from 'axios'
const isCancel = axios.isCancel
const CancelToken = axios.CancelToken;

export default defineComponent({
  name: 'axiosTestPage',
  setup() {
    const responseRef = ref<any>(1)

    onMounted(async() => {
      const source = CancelToken.source();

      axios.request<string>(
        {
          url: 'http://localhost:8080/api/test',
          method: 'post',
          params: {
            page: 1,
            postId: [4, 5, 6],
            name: null,
            obj: 111,
          },
          data: {
            page: 1,
            postId: [4, 5, 6],
            name: null,
          },
          cancelToken: source.token
        }
      ).then().catch(e => {
        if(isCancel(e)) {
          console.log('canceled')
          console.log(e.message)
          return
        }

        console.log(e)
      })

      source.cancel('request canceled')
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
