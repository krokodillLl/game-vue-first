<template>
  <div class="app">
    <img class="logo" alt="Vue logo" src="./assets/logo.png">
    <h1 class="h1">Open all cubes</h1>
    <p class="h1">Remember and match all same cubes</p>

    <BoardComponent />
  </div>
</template>

<script>
import BoardComponent from './components/BoardComponent';
export default {
  name: 'App',
  components: {
    BoardComponent,
  }
}
</script>

<style scoped>
.app {
  font-family: Helvetica Neue, sans-serif;
  text-align: center;
  margin-top: 40px;
}
.logo {
  width: 100px;
}
</style>
