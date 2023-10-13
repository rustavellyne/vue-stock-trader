import axios from 'axios';

const stockAxios = axios.create({
  baseURL: 'https://vuejs-stock-trader-84ad2-default-rtdb.firebaseio.com/'
});

stockAxios.interceptors.request.use(
  config => {
    const token = localStorage.getItem('userToken');
    if (token) {
      const separator = config.url.includes('?') ? '&' : '?';
      config.url += `${separator}auth=${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

const saveStocks = async (stocks) => {
  const response = await stockAxios.put('/data.json', { stocks })
  console.log({ response });
  return response;
}

const saveUserData = async ({ portfolio, user }, token = null) => {
  let url = `/user_data/${user.localId}.json`;
  if (token) {
    url += `?auth=${token}`;
  }
  console.log({ url });
  const response = await stockAxios.put(url, {
    portfolio,
    user
  });
  return response;
}

const fetchStocks = async () => {
  const res = await stockAxios.get('data.json');
  const data = await res.data;
  return data;
}

const fetchUserData = async (id) => {
  const res = await stockAxios.get(`user_data/${id}.json`);
  const data = await res.data;
  return data;
}

export default {
  fetchUserData,
  fetchStocks,
  saveUserData,
  saveStocks,
}
