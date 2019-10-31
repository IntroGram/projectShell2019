<template>
  <div class="todos">
    <div class="columns is-centered">
      <div class="column is-half is-block">
        <h5 class="is-5 title">My ToDos</h5>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-half">
        <template v-for="category in categories">
          <Category :key="category.id" :category="category" />
        </template>
      </div>
    </div>
    <section class="newTodo columns is-centered">
      <div class="column is-half">
        <h5 class="title is-5">New ToDo</h5>
        <form v-on:submit.prevent="onSubmit">
          <b-field label="Category">
            <b-select placeholder="Select a category" v-model="newTodo.category">
              <option
                v-for="category in categories"
                :value="category.id"
                :key="category.id">
                {{ category.name }}
              </option>
            </b-select>
          </b-field>
          <b-field label="Title">
            <b-input v-model="newTodo.title" />
          </b-field>
          <b-field>
            <div class="control is-block">
              <input type="submit" class="button is-link" value="Submit" />
            </div>
          </b-field>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import Category from "@/components/Category.vue";
export default {
  name: "ToDos",
  data: function() {
    return {
      newTodo: {
        title: null,
        category: null
      }
    };
  },
  computed: {
    todos() {
      return this.$store.state.todos;
    },
    categories() {
      return this.$store.state.categories;
    }
  },
  components: {
    Category
  },
  methods: {
    onSubmit() {
      if (this.newTodo.title === null || this.newTodo.category === null) {
        this.$buefy.dialog.alert("Category or Title may not be empty.");
        return;
      }
      this.$store.dispatch("addToDo", this.newTodo).then(() => {
          this.newTodo.title = null;
          this.newTodo.category = null;
        }).then(() => {
          this.$store.dispatch("loadCategories").catch(() => {
            // if we are not logged in redirect home
            this.$router.push("/");
          });
        });
    }
  },
  mounted: function() {
    this.$store.dispatch("loadToDos").catch(() => {
      // if we are not logged in redirect home
      this.$router.push("/");
    }),
      this.$store.dispatch("loadCategories");
  }
};
</script>
<style lang="scss" scoped></style>
