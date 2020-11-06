<template>
  <div id="app">
    <Todos msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import Todos from './components/Todos.vue'

export default {
  name: 'App',
  components: {
    Todos
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
</style>
