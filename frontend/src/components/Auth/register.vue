<template>
  <div>
    <input name="username" id="username"
    class="form-control" type="text"
    placeholder="Entrer votre pseudo"
    v-model="username">
    <br>
    <input name="email" id="email"
    class="form-control" type="text"
    placeholder="Entrer votre email"
    v-model="email">
    <br>
    <input name="password" id="password"
    class="form-control" type="password"
    placeholder="Entrer votre mot de passe"
    v-model="password">
    <input name="repassword" id="password"
    class="form-control" type="password"
    placeholder="Retapez le mot de passe"
    v-model="repassword">
    <button @click="register" class="btn btn-success" type="submit">Soumettre</button>
    <h6 class="error" v-html="error"></h6>
    <router-link to="/sign_in">Deja un compte ? se connecter</router-link>
  </div>
</template>

<script>
import AuthService from '../../services/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      repassword: '',
      username: '',
      error: '--',
    };
  },
  methods: {
    showPopup(message, type = 'success') {
      this.$toast.open({
        message,
        type,
        position: 'top',
        duration: 3000,
        // all of other options may go here
      });
    },
    async register(e) {
      e.preventDefault();
      console.log(this.email !== '' || this.password !== '' || this.username !== '');
      if (this.email === '' || this.password === '' || this.username === '') {
        this.showPopup('Remplissez tous les champs', 'warning');
        return;
      }
      if (this.repassword !== this.password) {
        this.showPopup('Les mots de passe sont pas conformes', 'warning');
        return;
      }
      try {
        const response = await AuthService.register({
          username: this.username,
          email: this.email,
          password: this.password,
        });

        const { user, token } = response.data;
        console.log('Le token est : ', token);
        this.$store.dispatch('setToken', token);
        this.$store.dispatch('setUser', user);

        this.showPopup(`Inscription réussite ! ${user.username}`);

        setTimeout(() => {
          // window.location = "/profile"
          this.$router.push('/profile');
        }, 1000);
      } catch (result) {
        console.log('result ', result.response);
        this.error = result.response.data;
        const { data } = result.response;
        let message = "Erreur au cours de l'inscription";
        if (data.error === 'User already registered.') message = 'Ce compte existe deja';
        if (data.error === 'username must be unique') message = 'Ce username est déja prit';
        if (data === '"email" must be a valid email') message = 'Email invalide';
        this.showPopup(message, 'error');
      }
    },
  },
  watch: {
    email(value) {
      console.log("L'email a changé ", value);
    },
  },
  mounted() {
    setTimeout(() => {
      console.log('Le component est mounted ');
    }, 3000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
