/* eslint-disable import/no-cycle */
/* eslint-disable no-return-assign */
import Vue from 'vue';
import Vuex from 'vuex';
import Axios from 'axios';
import router from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggingIn: false,
    isLogin: false,
  },
  mutations: {
    loginStart: (state, status) => {
      state.loggingIn = status;
    },
    login: (state) => {
      state.isLogin = true;
    },
    logout: (state) => {
      state.isLogin = false;
    },
  },
  actions: {
    async doLogin({ commit }, loginData) {
      commit('loginStart', true);
      console.log('login data', loginData);
      try {
        const res = await Axios.get(`https://5e9012befe7f2a00165ef828.mockapi.io/api/v1/users/${1}`);
        console.log(res);
        commit('login');
        router.push({ name: 'Football' });
      } catch (error) {
        console.log(error);
      }
      commit('loginStart', false);
    },
    doLogout({ commit }) {
      commit('logout');
      router.push({ name: 'Home' });
    },
  },
  modules: {
  },
});
