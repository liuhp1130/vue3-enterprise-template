<script setup lang="ts">
import { ref } from "vue"
import HelloWorld from "@/components/HelloWorld.vue"
let abc = 0
const abc2 = ref(0)
function add(a: number, b: number) {
  console.log("emit", a + b)
  abc = a + b
  abc2.value = a + b
}
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" @add="add" :abc="abc" :abc2="abc2" />
</template>
