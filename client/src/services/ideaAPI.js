import axios from 'axios';

class IdeasApi {
  constructor() {
    this._URL = '/api/ideas';
  }
  getIdeas() {
    return axios.get(this._URL);
  }

  createIdea(data) {
    return axios.post(this._URL, data);
  }

  deleteIdea(id) {
    const username = localStorage.getItem('username')
      ? localStorage.getItem('username')
      : '';
    return axios.delete(`${this._URL}/${id}`, {
      data: {
        username,
      },
    });
  }
}

export default new IdeasApi();
