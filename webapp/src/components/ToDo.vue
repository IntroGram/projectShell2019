<template>
  <div class="todo">
    <b-checkbox v-model="todo.done" @input.capture="checked" />
    <span class="todo-title">
      {{ todo.title }}
      <b-button size="is-small" type="is-danger" style="height:1.8em; margin-left:20px; float:right" @click="onDelete">
        DELETE
      </b-button>
    </span>
  </div>
</template>

<script>
export default {
  name: "ToDo",
  props: {
    todo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    checked: function() {
      this.$store.dispatch("updateChecked", this.todo.id);
    },
    onDelete: function() {
      this.$store.dispatch("deleteTodo", this.todo.id);
    }
  }
};
</script>
