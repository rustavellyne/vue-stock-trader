import axios from 'axios';

const userAxios = axios.create({
  baseURL: 'https://identitytoolkit.googleapis.com/v1/'
})
const API_KEY = 'AIzaSyBR_v43aktZYe2RSLQHM0lHxEcJXbaSBLM';

const signUpUser = async (user) => {
  user.returnSecureToken = true;
  const response = await userAxios.post(
    `accounts:signUp?key=${API_KEY}`,
    user
  );
  return response;
}

const signInUser = async (user) => {
  user.returnSecureToken = true;
  const response = await userAxios.post(
    `accounts:signInWithPassword?key=${API_KEY}`,
    user
  );
  return response;
}

export default {
  signUpUser,
  signInUser,
}
