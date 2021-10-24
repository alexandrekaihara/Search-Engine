<template>
  <div class="result">
    <div class="header">
      <h2> Resultados </h2>
    </div>
    <div class="search">
      <input v-model="searchField" type="text">
       <nuxt-link :to="'/search/'+searchField" :prefetch="false"><button>Buscar</button></nuxt-link>
    </div>
    <ul id="list">
      <li v-for="res in results" :key="res.message" >
        <a :href="res.url">
          <h2>{{res.name}}</h2>
          <span>{{res.description}}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  async asyncData({params, $axios}){
    const search = await $axios.$get(`/api/search/`);
    console.log(search)
    return {
      searchField: params.value,
      results: []
    };
  }
}
</script>


<style scoped>
  .result {
    margin: 0 10rem;
  }
  input {
    font-size: 1.5rem;
    padding: 0 1rem 0 1rem;
    width: 35rem;
    height: 2.5rem;
    border-radius: 18px;
    border: 1px solid #ccc;
  }
  button {
    width: 6rem;
    height: 2.5rem;
    font-size: 1.5rem;
  }
  .search {
    color: #505050;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: left;
  }
  .search input{
    margin: 0 1rem 0 2.5rem;
  }
  li {
    list-style: none;
  }
  a{
    text-decoration: none;
  }
  .header{
    margin-top: 2rem;
    font-size: 2rem;
    display: flex;
    align-content: center;
    justify-content: center;
    color: #707070;
  }

</style>
