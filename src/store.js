import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    title: 'Todo App',
    todos: [
      {
        id: 1,
        text: 'Todo One',
        edit: false,
      },
      {
        id: 2,
        text: 'Todo Two',
        edit: false,
      },
    ],
  },

  getters: {
    countTodos: state => {
      return state.todos.length
    },
  },

  // we can directly change state of synchronos functions by using mutations
  // mutations come to change the state of data
  // current state + payload
  mutations: {
    ADD_TODO: (state, todo) => {
      let newTodo = {
        id: new Date().getTime(),
        text: todo,
        edit: false,
      }
      state.todos.push(newTodo)
      newTodo = {}
    },

    REMOVE_TODO: (state, index) => {
      state.todos.splice(index, 1)
    },
    UPDATE_TODO: (state, updTodo) => {
      const index = state.todos.findIndex(todo => todo.id === updTodo.id)
      if (updTodo !== -1) {
        state.todos.splice(index, 1, updTodo)
      }
    },
    REMOVE_ALL: state => {
      state.todos = []
    },
  },

  // for asynchronous functionality, we need actions to mutate
  actions: {
    removeTodo: (context, index) => {
      context.commit('REMOVE_TODO', index)
    },
    updateTodo: (context, todo) => {
      context.commit('UPDATE_TODO', todo)
    },

    removeAll({ commit }) {
      return new Promise(resolve => {
        setTimeout(() => {
          commit('REMOVE_ALL')
          resolve()
        }, 1500)
      })
    },
  },
})
