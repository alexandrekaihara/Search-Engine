<template>
  <div class="search">
    <h3> Busca PAA </h3>
    <input v-model="searchField" type="text">
    <nuxt-link :to="'/search/'+searchField"><button>Buscar</button></nuxt-link>
  </div>
</template>

<script>
export default {
  data(){
    return {
      searchField: ''
    };
  }
}
</script>
<style scoped>
  .search {
    width: 100%;
    height: 90vh;
    color: #505050;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
  h3{
    font-size: 4rem;
  }
  button {
    width: 10rem;
    height: 3rem;
    margin: 1rem 0 auto 0;
    font-size: 1.5rem;
  }
  input {
    font-size: 1.5rem;
    padding: 0 1rem 0 1rem;
    width: 35rem;
    height: 2.5rem;
    border-radius: 18px;
    border: 1px solid #ccc;
  }
</style>