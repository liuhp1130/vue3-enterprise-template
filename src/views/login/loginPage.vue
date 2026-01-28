<template>
  <h1>登录页</h1>
  <button @click="login">登录</button>
  <button>获取用户</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
const router = useRouter()
function login() {
  router.push("/home")
}
</script>

<style>
button {
  padding: 10px 20px;
  background-color: #42b883aa;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
