<template>
  <div id="app">
    <main>
      <Header />
      <Definition />
    </main>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Definition from "./components/Definition.vue";

export default {
  name: "App",
  components: {
    Header,
    Definition,
  },
};
</script>

<style lang="scss" scoped>
div#app {
  height: 100vh;
  overflow: hidden;
  background-color: #282c34;

  main {
    max-width: 1000px;
    height: 100vh;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    padding: 1rem;
    color: white;
  }
}
</style>>
