import Api from './Api';

const endpoint = '/api/users';

export default {
  list() {
    return Api.get(endpoint);
  },
  create(infos) {
    const { email, username } = infos;
    return Api.post(endpoint, { username, email });
  },
  update(infos) {
    const { id, email, username } = infos;
    return Api.put(`${endpoint}/${id}`, { email, username });
  },
  getOne(id) {
    return Api.get(`${endpoint}/${id}`);
  },
  delete(id) {
    return Api.delete(`${endpoint}/${id}`, {
      method: 'delete',
      headers: {},
    });
  },
  promoteToManager(id) {
    return Api.put(`${endpoint}/promoteToManager/${id}`, {});
  },
  addToTeam(infos) {
    const { userID, teamID } = infos;
    return Api.put(`${endpoint}/addToTeam/${userID}/${teamID}`, {});
  },

};
