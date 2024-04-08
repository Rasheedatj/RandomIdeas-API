import axios from 'axios';

class IdeasApi {
  constructor() {
    this._URL = 'http://localhost:5000/api/ideas';
  }
  getIdeas() {
    return axios.get(this._URL);
  }
}

export default new IdeasApi();
