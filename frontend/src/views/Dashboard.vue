<template>

<div>
  <div style="max-width:600px ;border:solid" class="small mx-auto">
    <h4>Salut {{$store.state.user.username}}</h4>
    <button
    v-if="ableToPostWork" @click="createWork"
    class="btn btn-outline-success">
        J'ai djobé today !
    </button>
    <button disabled v-if="!ableToPostWork" class="btn btn-warning disabled">
      Vous avez deja travaillé today
    </button>
    <BarChart :chart-data="datacollection"></BarChart>
    <button v-if="false" @click="fillData()">Randomize</button>
  </div>

</div>

</template>

<script>

import moment from 'moment';
import BarChart from '@/components/BarChart';

import UsersServices from '../services/users';
import WorksServices from '../services/works';

const colors = ['#2F4F4F', '#B22222', '#00FFFF', '#4B0082', '#32CD32', '#7B68EE'];

export default {
  components: {
    BarChart,
  },
  data() {
    return {
      datacollection: {},
      ableToPostWork: null,
    };
  },
  async mounted() {
    await this.fillData();
  },
  methods: {
    moment,
    async createWork() {
      try {
        const response = await WorksServices.create({ userID: this.$store.state.user.id });
        console.log('responnse ', response);

        if (response.status === 200) {
          this.$toast.open({
            message: 'Bien enregistré   !',
            type: 'success',
            position: 'top',
            duration: 3000,
          // all of other options may go here
          });

          this.fillData();
        }
      } catch (result) {
        console.log('result ', result);
        console.log('res ', result.response);
        let message = 'Impossible de prendre votre taf en compte  !';
        // const { data } = result.response;

        const { data } = result.response;
        if (data.today) {
          message = "Tu as déja travaillé aujourd'hui";
        }
        if (data.thisweek) {
          message = 'Tu as déja travaillé 3 fois cette semaine';
        }

        this.$toast.open({
          message,
          type: 'error',
          position: 'top',
          duration: 3000,
          // all of other options may go here
        });
      }
    },
    async fillData() {
      try {
        const response = await UsersServices.list();
        console.log('responnse ', response);

        const { data } = response;

        if (response.status === 200) {
          this.$toast.open({
            message: 'Données chargés  !',
            type: 'info',
            position: 'top',
            duration: 3000,
          // all of other options may go here
          });

          this.datacollection = {
            labels: data.map((user) => user.username),
            datasets: [{
              label: 'Mon super graphe',
              backgroundColor: colors.slice(0, data.length).map((color) => color),
              borderColor: 'brown',
              data: data.map((user) => user.Works.length),
            }],
          };

          console.log('kekdnekdnkd');
          const myInfo = data.find((user) => user.email === this.$store.state.user.email);
          if (myInfo.Works.length > 0) {
            const myLastWork = myInfo.Works[myInfo.Works.length - 1];
            const d = new Date();

            if (d.toISOString().substr(0, 10) === myLastWork.date.substr(0, 10)) {
              this.ableToPostWork = false;
            } else {
              this.ableToPostWork = true;
            }
          } else {
            this.ableToPostWork = true;
          }
        }
      } catch (result) {
        console.log('result ', result);
        this.$toast.open({
          message: 'Impossible de charger les données  !',
          type: 'error',
          position: 'top',
          duration: 3000,
          // all of other options may go here
        });
      }
    },
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
