<template>
  <div>{{responseRef}}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios, { AxiosTransformer } from '../../src'
// import axios from 'axios'

export default defineComponent({
  name: 'axiosTestPage',
  setup() {
    const responseRef = ref<any>(1)

    onMounted(async() => {
      const axios1 = axios.create({})
      const axios2 = axios.create({})

      axios.interceptors.request.use((config) => {
        config.data.a = 'axios'
        return config
      }, (error) => {
        console.log(error)
      })

      axios1.interceptors.request.use((config) => {
        config.data.a = 'axios1'
        return config
      }, (error) => {
        console.log(error)
      })

      axios2.interceptors.request.use((config) => {
        config.data.a = 'axios2'
        return config
      }, (error) => {
        console.log(error)
      })

      const res = await axios.request<string>(
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
        }
      )

      const res1 = await axios1.request<string>(
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
        }
      )

      const res2 = await axios2.request<string>(
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
        }
      )

      console.log(res.data)
      console.log(res1.data)
      console.log(res2.data)

      responseRef.value = res1

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
