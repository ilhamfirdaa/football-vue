<template>
  <div class="about">
    <h4 v-if="loading">Loading...</h4>
    <div v-else>
      <h1>{{ player.firstName }} </h1>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Player',
  props: ['playerId'],
  data() {
    return {
      loading: false,
      player: null,
    };
  },
  created() {
    this.loading = true;
    this.getPlayer();
  },
  watch: {
    // call again the method if the route changes
    $route: 'getPlayer',
  },
  methods: {
    async getPlayer() {
      const instance = axios.create({
        baseURL: 'https://api.football-data.org/v2',
        timeout: 60000,
        headers: {
          'X-Auth-Token': 'c146a6e19e384f519b9ff4ac1650961f',
        },
      });

      try {
        const res = await instance.get(`/players/${this.playerId}`);
        this.player = res.data;
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
