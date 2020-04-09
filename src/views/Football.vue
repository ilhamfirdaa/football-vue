<template>
  <div id="football">
    <h1>World</h1>
    <h4 v-if="loading">Loading...</h4>
    <div v-else>
      <ul>
        <li v-for="area in continents" v-bind:key="area.id">
          <router-link :to="{name: 'Continent', params: {continentId: area.id}}">
            {{ area.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Football',
  data() {
    return {
      loading: false,
      continents: null,
    };
  },
  created() {
    this.loading = true;
    this.getContinents();
  },
  watch: {
    // call again the method if the route changes
    $route: 'getContinents',
  },
  methods: {
    async getContinents() {
      const instance = axios.create({
        baseURL: 'https://api.football-data.org/v2',
        timeout: 60000,
        headers: {
          'X-Auth-Token': 'c146a6e19e384f519b9ff4ac1650961f',
        },
      });

      const continentList = ['AFR', 'ASI', 'EUR', 'NCA', 'OCE', 'SAM'];

      try {
        const res = await instance.get('/areas');
        const { areas } = res.data;
        const world = areas.filter((area) => (area.parentAreaId === 2267 || area.parentArea === 'World') && continentList.includes(area.countryCode));
        this.continents = world;
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },
  },
};
</script>

<style>
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: black;
    text-align: leftq2;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
