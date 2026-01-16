<!-- options api 示例 -->
<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      default: 'Hello Vue 3 + Vite'
    },
    abc: {
      type: Number,
      default: 0
    },
    cpst: {
      type: Number,
      default: 0
    }
  },
  emits: ['add'],
  data() {
    return {
      count: 0,
      test:'测试date中内容是否渲染'
    }
  },
  watch: {
    count(newVal, oldVal) {
      console.log(newVal, oldVal, 'count')
    }
  },
  mounted() {
    console.log('选项式 mounted')
  },
  computed: {
    doubleCount() {
      return 1 * 2
    }
  },
  methods: {
    addSelf() {
      
      this.count++
      console.log('按钮 ++ ');
      
    }
  }
}


</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <p>测试test获取：{{ test }}</p>
    <p>测试doubleCount获取：{{ doubleCount }}</p>
    <button type="button" @click="addSelf">count is {{ count }}</button>
    <button type="button" @click="$emit('add',1,2)">测试emit调用结果给普通变量abc{{ abc }}</button>
    <p>测试emit调用结果给响应式变量cpst：{{ cpst }}</p>
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
