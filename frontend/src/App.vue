<template>
  <div id="app">
    <br>
    <router-view/>

    <div id="nav">
      <router-link to="/">Dashboard </router-link> |
      <router-link v-if="$store.state.user === null" to="/sign_in">Connexion | </router-link>
      <router-link to="/profile">Profile</router-link> |
      <button v-if="$store.state.isUserLoggedIn" @click="disconnect"
      class="btn btn-info mx-1">
      Se deconnecter

      </button>

    </div>
  </div>
</template>

<script>
// import DashBoardLayout from '@/components/Layout/DashBoardLayout'
// import User from '@/components/User/User.vue'

export default {
  components: {},
  methods: {
    disconnect() {
      // Creer l'appel API POUR LA DECONNEXION
      this.$store.dispatch('setToken', null);
      this.$store.dispatch('setUser', null);
      this.$router.push('/sign_in');
    },
  },
  data() {
    return {};
  },
  async mounted() {
    console.log(this.$route);
  },
};

</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
