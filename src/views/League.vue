<template>
  <div class="about">
    <h4 v-if="loading">Loading...</h4>
    <div v-else>
      <!-- <h1>{{ continentName }} </h1> -->
      <table>
        <tr v-for="club in clubs" v-bind:key="club.id">
          <router-link :to="{name: 'Club', params: {clubId: club.id}}">
            <td> {{ club.name }} </td>
          </router-link>
          <td v-if="club.crestUrl !== null"><img :src="club.crestUrl" @error="(() => club.crestUrl = null)" width="16" height="16"></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'League',
  props: ['leagueId'],
  data() {
    return {
      loading: false,
      clubs: null,
    };
  },
  created() {
    this.loading = true;
    this.getClubs();
  },
  watch: {
    // call again the method if the route changes
    $route: 'getClubs',
  },
  methods: {
    async getClubs() {
      const instance = axios.create({
        baseURL: 'https://api.football-data.org/v2',
        timeout: 60000,
        headers: {
          'X-Auth-Token': 'c146a6e19e384f519b9ff4ac1650961f',
        },
      });

      try {
        const res = await instance.get(`/competitions/${this.leagueId}/teams`);
        const { teams } = res.data;
        this.clubs = teams;
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
