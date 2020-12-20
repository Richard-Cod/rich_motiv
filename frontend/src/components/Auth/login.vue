<template>
  <div>
    <input
    name="email" id="email" class="form-control"
    type="text" placeholder="Entrer votre email"
    v-model="email" />
    <br />
    <input name="password" id="password"
    class="form-control" type="password"
    placeholder="Entrer votre mot de passe"
    v-model="password" />

    <button @click="login" class="btn btn-success" type="submit">Soumettre</button>

    <h4 class="error" v-html="error"></h4>

    <router-link to="/sign_up">Pas de compte ? s'inscrire</router-link>
  </div>
</template>

<script>
import AuthService from '../../services/auth';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '--',
    };
  },
  methods: {
    async login(e) {
      e.preventDefault();
      try {
        const response = await AuthService.login({ email: this.email, password: this.password });
        const { user, token } = response.data;
        console.log('Le token est : ', token);
        this.$store.dispatch('setToken', token);
        this.$store.dispatch('setUser', user);

        this.$toast.open({
          message: `Connexion réussite ! ${user.username}`,
          type: 'success',
          position: 'top',
          duration: 3000,
          // all of other options may go here
        });

        setTimeout(() => {
          // document.location = "/profile"
          this.$router.push('/profile');
        }, 1000);
      } catch (result) {
        let message = "Erreur au cours de l'inscription";

        const { data } = result.response;

        if (data.error === '"email" must be a valid email') message = 'Email invalide';
        if (data.error === 'Invalid credentials.') message = 'Vérifiez vos identifiants';

        const errorObject = {
          message,
          type: 'error',
          position: 'top',
          duration: 3000,
          // all of other options may go here
        };
        this.$toast.open(errorObject);
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
