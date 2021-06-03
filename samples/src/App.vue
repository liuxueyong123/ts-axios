<template>
  <div>{{responseRef}}</div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import axios from '../../src'
// import axios from 'axios'

export default defineComponent({
  name: 'axiosTestPage',
  setup() {
    const responseRef = ref<any>(1)

    onMounted(async() => {
      try {
        const res = await axios.request<string>(
          {
            url: 'http://localhost:8080/api/test',
            method: 'get',
            params: {
              page: 1,
              postId: [4, 5, 6],
              name: null,
              obj: 111,
            }
          }
        )

        console.log(res.data)

        responseRef.value = res
      } catch(e) {
        console.error(e)
      }
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
