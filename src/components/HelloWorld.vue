<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string, abc: number, abc2: number }>()
// // 基于函数签名的类型声明
// const emit = defineEmits<{
//     (e: 'add', a: number, b: number): void
// }>()

// // 基于选项
// const emit = defineEmits({
//   add: (a: number, b: number) => {
//     console.log(a,b);
    
//     // 返回 `true` 或 `false`
//     // 仅表明验证通过或失败，不作为emit的调用结果
//     return true
//   },
// })
// : 可选的、更简洁的语法
const emit = defineEmits<{
  add: [a: number, b: number]
}>()

const count = ref<number>(0)

</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
    <button type="button" @click="emit('add',count,2)">测试emit调用结果给普通变量abc：{{ abc }}</button>
    <p>测试emit调用结果给响应式变量abc2：{{ abc2 }}</p>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank"
      >create-vue</a
    >, the official Vue + Vite starter
  </p>
  <p>
    Install
    <a href="https://github.com/vuejs/language-tools" target="_blank">Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
