import Api from './Api';

const endpoints = '/api/auth';
export default {
  register(infos) {
    // console.log('Fonction register');
    return Api.post('/api/users', infos);
  },
  login(infos) {
    // console.log('Fonction login');
    return Api.post(`${endpoints}/login`, infos);
  },

};
