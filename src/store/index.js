import Vue from 'vue';
import Vuex from 'vuex';
import stocks from './stocks';
import portfolio from './portfolio';
import user from './user';
import stockService from '../services/stockService.js';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        first: 'Hello worlds!',
    },
    mutations: {
    },
    getters: {},
    actions: {
      async initApp ({ dispatch, getters }) {
        console.log(getters['user/isLoggin']);
        if (!getters['user/isLoggin']) {
          return;
        }
        const { localId: userId } = getters['user/getUser'];
        const { stocks } = await stockService.fetchStocks();
        const userData = await stockService.fetchUserData(userId);
        console.log({ stocks, userData, userId});
        const portfolio = userData.portfolio;
        const funds = userData.user.funds;
        dispatch('stocks/initStocks', stocks);
        dispatch('portfolio/initPortfolio', portfolio);
        dispatch('user/setFunds', funds);
      },
      saveAll ({ getters }) {
        const data = {
          stocks: getters['stocks/getStocks'],
          portfolio: getters['portfolio/getItems'],
          user: {
            ...getters['user/getUser'],
            funds: getters['user/getFunds'],
          }
        };
        stockService.saveStocks(data.stocks);
        stockService.saveUserData({ portfolio: data.portfolio, user: data.user });
       console.log ({ data }); 
      }
    },
    modules: {
      stocks,
      portfolio,
      user,
    }

});

const userCache = JSON.parse(localStorage.getItem('user'));

if (userCache?.idToken) {
  store.commit('user/SET_USER', userCache);
  store.dispatch('initApp');
}


export default store;
