<template>
  <div class="about">
    <h4 v-if="loading">Loading...</h4>
    <div v-else>
      <!-- <h1>{{ continentName }} </h1> -->
      <table>
        <tr v-for="player in squad" v-bind:key="player.id">
          <router-link :to="{name: 'Player', params: {playerId: player.id}}">
            <td> {{ player.name }} </td>
          </router-link>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Club',
  props: ['clubId'],
  data() {
    return {
      loading: false,
      squad: null,
    };
  },
  created() {
    this.loading = true;
    this.getSquad();
  },
  watch: {
    // call again the method if the route changes
    $route: 'getSquad',
  },
  methods: {
    async getSquad() {
      const instance = axios.create({
        baseURL: 'https://api.football-data.org/v2',
        timeout: 60000,
        headers: {
          'X-Auth-Token': 'c146a6e19e384f519b9ff4ac1650961f',
        },
      });

      try {
        const res = await instance.get(`/teams/${this.clubId}`);
        const { squad } = res.data;
        this.squad = squad;
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
