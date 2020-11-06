<template>
  <div class="todos">
    <div class="left">
      <h1>{{ title }}</h1>

      <form @submit.prevent="addTodo">
        <input v-model="newTodo" type="text" placeholder="Add a Todo">
      </form>

      <ul>
        <li v-for="(todo, index) in todos" :key="index">
          {{ todo.text }}
          <button @click="update(todo)" class="edit">Edit</button>
          <button @click="removeTodos(index)" class="rm">Remove</button>
          <input v-if="todo.edit" type="text" @keyup.enter="updateTodos($event, todo)" class="upd-input" placeholder="Edit your Todo here">
        </li>
      </ul>
    </div>

    <div class="right">
      <Stats />
    </div>
  </div>
</template>

<script>
import Stats from './Stats'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Todos',
  data() {
    return {
      newTodo: '',
      flag: 0,  // for counting click of Edit button
    }
  },
  components: {
    Stats
  },

  // we can use object in mapState also 
  computed: {
    ...mapState(['title', 'todos'])
    // other stuff 
  },
  
  methods: {
    ...mapMutations(['ADD_TODO']),
    ...mapActions(['removeTodo', 'updateTodo']), 

    addTodo: function() {
      this.ADD_TODO(this.newTodo) // passing newTodo to the Mutations as a payload 
      this.newTodo = ''
    },

    removeTodos: function(index) {
      this.removeTodo(index)
    },

    update(item) {
      const val = (++this.flag) % 2
      console.log(val)
      val ? item.edit = true : item.edit = false
    },
    updateTodos(e, todo) {
      console.log(todo.id)
      console.log(e.target.value)

      todo.text = e.target.value
      todo.edit = false
      this.updateTodo(todo)
      this.flag = 0
    }
  }
}
</script>

<style>
  html, #app {
    height: 100%;
  }
  body {
    background-color: #F4F4F4;
    margin: 0;
    height: 100%;
  }

  .todos {
    display: grid;
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: 100%;
    grid-template-areas:
      "left right";
    height: 100%;
  }

  .left, .right {
    padding: 30px;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }
  ul li {
    padding: 20px;
    background: white;
    margin-bottom: 8px;
    max-height: 90px;
  }

  .right {
    grid-area: right;
    background-color: #E9E9E9;
  }

  input {
    border: none;
    padding: 20px;
    width: calc(100% - 40px);
    box-shadow: 0 5px 5px lightgrey;
    margin-bottom: 50px;
    outline: none;
  }

  .rm, .edit {
    float: right;
    text-transform: uppercase;
    font-size: .8em;
    border: none;
    padding: 5px;
    cursor:pointer;
    outline: none ;
    left: 12px;
  }

  .rm {
    color: #ff0076;
    background: #f9d0e3;
  }

  .edit {
    background: lightblue;
  }

  .upd-input {
    background: lavender;
    margin-top: 5px;
  }


</style>