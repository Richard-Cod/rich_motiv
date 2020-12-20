import Api from './Api';

const endpoint = '/api/works';

export default {
  list() {
    return Api.get(endpoint);
  },
  create(infos) {
    const d = new Date();
    const date = d.toISOString();
    return Api.post(`${endpoint}/${infos.userID}`, { date });
  },
};
