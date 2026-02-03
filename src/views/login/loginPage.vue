<template>
  <h1>登录页</h1>
  <button @click="getZoneList">获取专区列表</button>
  <button @click="cancelRequest()">取消请求</button>
  <button @click="login">登录</button>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router"
import { userApi } from "@/api/modules/user"
import { requestPool } from "@/utils/requestPool"

const router = useRouter()
function login() {
  router.push("/home")
}

function getZoneList() {
  Promise.all([userApi.getZoneList("login1"), userApi.getCoalTypeList("login")])
  // cancelRequest("login1")
}

function cancelRequest(pageKey: string = "login") {
  requestPool.clear(pageKey)
}
</script>

<style scoped>
button {
  padding: 10px 20px;
  background-color: #42b883aa;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
}
</style>
