<template>
  <div class="top___container text-center">
    <form class="form-signin">
      <img class="mb-4"
           src="https://www.freelogodesign.org/file/app/client/thumb/ed452cd5-da75-4c57-ad85-455c068e1d58_200x200.png?1604775106998"
           alt="" height="72">
      <h1 class="h3 mb-3 font-weight-normal">S'inscrire</h1>
      <Register/>
    </form>
  </div>
</template>

<script>
import Register from '@/components/Auth/register.vue';

export default {
  components: {
    Register,
  },
  data() {
    return {};
  },
  // async mounted() {
  // },

};
</script>
<style>

/* html,
body {
  height: 100%;
} */

.top___container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

</style>
