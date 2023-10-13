import userService from '../../services/userService.js';
import stockService from '../../services/stockService.js';

const state = {
  funds: 0,
  user: null,
}

const mutations = {
  'ADD_MONEY' (state, money) {
    state.funds += money;
  },
  'PAY_MONEY' (state, money) {
    state.funds -= money;
  },
  'SET_USER' (state, user) {
    state.user = user;
  },
  'SET_FUNDS' (state, funds) {
    state.funds = funds
  }
}

const getters = {
  getFunds (state) {
    return state.funds;
  },
  getUser (state) {
    return state.user;
  },
  isLoggin (state) {
    return !!state.user;
  },
  getToken (state) {
    return state.user?.idToken;
  }
}

const actions = {
  async register (context, user) {
    console.log({ user });
    const response = await userService.signUpUser(user);
    console.log({ response });
    const newUser = {
      ...response.data,
      funds: 10000,
    };
    await stockService.saveUserData({ portfolio: [], user: newUser }, newUser.idToken);
    return response;
  },
  async login ({ commit }, user) {
    console.log({ user });
    const response = await userService.signInUser(user);
    console.log({ response });
    commit('SET_USER', response.data);
    localStorage.setItem('userToken', response.data.idToken);
    localStorage.setItem('user', JSON.stringify(response.data));
    return response;
  },
  logout ({ commit }) {
    localStorage.removeItem('userToken');
    localStorage.removeItem('user');
    commit('SET_USER', null);
  },
  pay ({ commit }, money) {
    commit('PAY_MONEY', money);
  },
  receive ({ commit }, money) {
    commit('ADD_MONEY', money);
  },
  setFunds ({ commit }, funds) {
    commit('SET_FUNDS', funds);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
