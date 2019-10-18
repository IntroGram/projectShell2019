import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: "project-template",
  storage: window.localStorage
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    todos: [
      {
        id: 1,
        done: false,
        title: "Test Todo1"
      },
      {
        id: 2,
        done: false,
        title: "Test Todo2"
      }
    ]
  },
  mutations: {
    addToDo(state, todo) {
      state.todos = [...state.todos, {...todo, done: false, id: state.todos.length+1}];
    },
    updateChecked(state, todoID) {
      var i = state.todos.map(todo => todo.id).indexOf(todoID);
      state.todos[i].done = !state.todos[i].done;
    },
    deleteTodo(state, todoID) {
      var i = state.todos.map(todo => todo.id).indexOf(todoID);
      state.todos.splice(i, 1);
      for (; i < state.todos.length; i++) {
        state.todos[i].id = i + 1;
      }
    }
  },
  actions: {
    addToDo({ commit }, toDo) {
      debugger;
      commit("addToDo", toDo);
    },
    updateChecked({ commit }, todoID) {
      commit("updateChecked", todoID);
    },
    deleteTodo({ commit }, todoID) {
      commit("deleteTodo", todoID);
    }
  }
});
