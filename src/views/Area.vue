<template>
  <div class="about">
    <h1>Domestic Leagues & Cups</h1>
    <h4 v-if="loading">Loading...</h4>
    <div v-else>
      <table>
        <tr v-for="league in leagues" v-bind:key="league.id">
          <router-link :to="{name: 'League', params: {leagueId: league.id}}">
            <td> {{ league.name }} </td>
          </router-link>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Area',
  props: ['areaId'],
  data() {
    return {
      loading: false,
      leagues: null,
    };
  },
  created() {
    this.loading = true;
    this.getLeagues();
  },
  watch: {
    // call again the method if the route changes
    $route: 'getLeagues',
  },
  methods: {
    async getLeagues() {
      const instance = axios.create({
        baseURL: 'https://api.football-data.org/v2',
        timeout: 60000,
        headers: {
          'X-Auth-Token': 'c146a6e19e384f519b9ff4ac1650961f',
        },
      });

      try {
        const res = await instance.get('/competitions');
        const { competitions } = res.data;
        const league = competitions.filter((competition) => parseInt(competition.area.id) === parseInt(this.areaId));
        this.leagues = league;
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
