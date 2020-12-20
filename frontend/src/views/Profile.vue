<template>

<div>
    <div class="container mt-5 d-flex justify-content-center">
    <div class="card p-3 text-dark bg-white">
        <div class="row">
            <div class="image mx-2  mb-2"> <img src="https://picsum.photos/200/200" class="rounded" width="155"> </div>
            <div style="display:table-cell" class="mx-2">
                <table class="table table-sm">
                    <tr>
                    <th scope="row">Username  </th>
                    <td>{{$store.state.user.username}}</td>
                </tr>

                 <tr>
                    <th scope="row">Email  </th>
                    <td>{{$store.state.user.email}}</td>
                </tr>

                 <tr>
                    <th scope="row">Inscrit  </th>
                    <td>{{moment($store.state.user.createdAt).format("LL")}}</td>
                </tr>
                </table>

                <router-link to="/"  class="btn btn-sm btn-outline-primary ">
                    Voir mon dashBoard
                </router-link >

                <button v-if="false" @click="removeAccount" class="btn btn-sm btn-outline-danger ">
                    Supprimer mon compte
                </button>

            </div>
        </div>
    </div>
</div>

    <!-- <Profile /> -->
</div>

</template>

<script>

import moment from 'moment';

import UsersServices from '../services/users';

export default {
  components: {
  },
  methods: {
    moment,
    changePassword() {
      this.$toast.open({
        message: 'Votre mot de passe a bien été changé',
        type: 'info',
        position: 'top',
        duration: 3000,
        // all of other options may go here
      });
    },
    async removeAccount() {
      const test = window.confirm('Êtes vous sûr de vouloir supprimer votre compte ? ');
      if (!test) return;
      try {
        const response = await UsersServices.delete(this.$store.state.user.id);

        if (response.statusText === 'OK') {
          this.$toast.open({
            message: 'Votre compte a bien été supprimé',
            type: 'warning',
            position: 'top',
            duration: 3000,
            // all of other options may go here
          });

          // Creer l'appel API POUR LA DECONNEXION
          this.$store.dispatch('setToken', null);
          this.$store.dispatch('setUser', null);

          setTimeout(() => {
            document.location = '/sign_up';
          }, 1000);
        }
      } catch (error) {
        console.log('Erreur ', error);
      }
    },
  },
  data() {
    return {

    };
  },
};
</script>
<style>

.stats {
    background: #f2f5f8 !important;
    color: #000 !important
}

.articles {
    font-size: 10px;
    color: #a1aab9
}

.number1 {
    font-weight: 500
}

.followers {
    font-size: 10px;
    color: #a1aab9
}

.number2 {
    font-weight: 500
}

.rating {
    font-size: 10px;
    color: #a1aab9
}

.number3 {
    font-weight: 500
}

</style>
