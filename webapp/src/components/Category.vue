<template>
  <div class="category">
    <span class="category-name subtitle column">
      {{ category.name }}
    </span>
    <template v-for="todo in category.tags">
      <ToDo :key="todo.id" :todo="todo" />
    </template>
  </div>
</template>

<script>
import ToDo from "@/components/ToDo.vue";
export default {
  name: "Category",
  props: {
    category: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    ToDo
  }
};
</script>

<style scoped>
.category {
  margin-bottom: 1.5em;
}
.subtitle{
  padding: 0 0 0 0;
  margin: 0 0 0.5em 0 !important;
}
</style>