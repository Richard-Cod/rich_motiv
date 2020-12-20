<template>
  <div class="container">
    <div class="row text-center">
      <div class="col-lg-6 offset-lg-3 col-sm-6 offset-sm-3 col-12 p-3 error-main">
        <div class="row">
          <div class="col-lg-8 col-12 col-sm-10 offset-lg-2 offset-sm-1">
            <h1 class="m-0">Page 404 à customiser plus tard</h1>
            <p>Rich Motiv 2020 .... 🤔 🤔 </p>

            <router-link to="/sign_in">page d'acceuil</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import DashBoardLayout from '@/components/Layout/DashBoardLayout'
// import User from '@/components/User/User.vue'

export default {
  components: {},
  data() {
    return {};
  },
  async mounted() {
    console.log(this.$route);
  },
};
</script>
<style>
</style>
