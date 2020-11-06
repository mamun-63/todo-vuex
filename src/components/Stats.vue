<template>
  <div class="stats">
    <h1>A Diiferent Component</h1>
    <p>There are currently {{ countTodos }} Todos</p>
    <button @click="removeAllTodos">Remove All Todos</button>
    <p v-if="!this.countTodos">{{ msg }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Stats',
  data() {
    return {
      msg: ''
    }
  },
  computed: {
    ...mapGetters(['countTodos'])
  },
  methods: {
    ...mapActions(['removeAll']),
    removeAllTodos() {  
      this.removeAll().then(() => {
        this.msg = 'They have been removed'
      })
    }
  }
}
</script>

<style scoped>
  button {
    padding: 10px;
    margin-top: 30px;
    width: 100%;
    background: none;
    border: 1px solid lightgray;
    outline: 0;
    cursor: pointer;
}
</style>