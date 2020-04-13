<template>
  <div class="login">
    <div v-if="loggingIn" class="container-loading">
      <img src="/loading.gif" alt="Loading Icon">
    </div>
    <form @submit.prevent="doLogin">
      <input v-model="username" type="text" placeholder="username" required>
      <br>
      <input v-model="password" type="password" placeholder="password" required>
      <br>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed: {
    ...mapState([
      'loggingIn',
    ]),
  },
  methods: {
    ...mapActions([
      'doLogin',
    ]),
    loginSubmit() {
      this.doLogin({
        username: this.username,
        password: this.password,
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .login {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1.5rem;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    .container-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,.3);
      img {
        width: 2rem;
        height: 2rem;
      }
    }
    form {
      display: flex;
      flex-flow: column;
      *:not(:last-child) {
        margin-bottom: 1rem;
      }
      input {
        padding: .5rem;
      }
      button {
        padding: .5rem;
        background-color: lightgray;
        border: 1px solid gray;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background-color: lightslategray;
        }
      }
    }
  }
</style>
