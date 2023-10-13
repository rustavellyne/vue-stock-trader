const state = {
    stocks: []
   
};

const getters = {
    getStocks (state) {
        return state.stocks;
    }
}

const mutations = {
  'INIT_STOCKS' (state, stocks) {
    state.stocks = stocks
  },
  'RND_PRICES' (state) {
    state.stocks.map(stock => {
      stock.price = Math.round(stock.price * (1 + Math.random() - 0.5));
    })
  }
};

const actions = {
  buyStock ({ dispatch }, payload) {
    dispatch('portfolio/buyStock', payload, { root: true });
  },
  initStocks({ commit }, payload) {
    commit('INIT_STOCKS', payload);
  },
  randomizePrices ({ commit }) {
    commit('RND_PRICES');
  }
};


export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions,
}
