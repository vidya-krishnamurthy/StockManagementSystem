import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth/`;

class AuthService {
  login(email, password) {
    return axios
      .post(API_URL + 'login', { email, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(name, email, password) {
    return axios.post(API_URL + 'signup', {
      name,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();