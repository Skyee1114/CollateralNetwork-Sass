import axios from 'axios';
import api from './api';

export default function setAuthToken({token}: {token: string}) {
  if (token) {
    api.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete api.defaults.headers.common['x-auth-token'];
  }
};