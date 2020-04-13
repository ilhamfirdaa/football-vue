<template>
  <div class="about">
    <h4 v-if="loading">Loading...</h4>
    <div v-else>
      <h1>{{ continentName }} </h1>
      <table>
        <tr v-for="area in areas" v-bind:key="area.id">
          <router-link :to="{name: 'Area', params: {areaId: area.id}}">
            <td> {{ area.name }} </td>
          </router-link>
          <td v-if="area.ensignUrl !== null"><img :src="area.ensignUrl" @error="(() => area.ensignUrl = null)" width="16" height="16"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Continent',
  props: ['continentId'],
  data() {
    return {
      loading: false,
      areas: null,
      continentName: '',
    };
  },
  created() {
    this.loading = true;
    this.getAreas();
  },
  watch: {
    // call again the method if the route changes
    $route: 'getAreas',
  },
  methods: {
    async getAreas() {
      const instance = axios.create({
        baseURL: 'https://api.football-data.org/v2',
        timeout: 60000,
        headers: {
          'X-Auth-Token': 'c146a6e19e384f519b9ff4ac1650961f',
        },
      });

      try {
        const res = await instance.get(`/areas/${this.continentId}`);
        const { childAreas, name } = res.data;
        this.areas = childAreas;
        this.continentName = name;
      } catch (error) {
        console.log(error);
      }

      this.loading = false;
    },
  },
};
</script>

<style>
  a {
    text-decoration: none;
    color: black;
    text-align: left;
  }
  a:hover {
    text-decoration: underline;
  }
</style>
