const state = {
  items: [],
}

const mutations = {
  'SET_ITEMS' (state, items) {
    state.items = items;
  },
  'BUY_STOCK'(state, { stockId, qty }) {
    const findStock = state.items.find(stock => stock.id === stockId);
    if (findStock) {
      findStock.qty += qty;
    } else {
      state.items.push({
        id: stockId,
        qty,
      });
    }
  },
  'SELL_STOCK' (state, { stockId: id, qty }) {
    const record = state.items.find(stock => stock.id === id);
    if (record.qty > qty) {
      record.qty -= qty;
    } else {
      state.items.splice(state.items.indexOf(record), 1)
    }
  }
}

const getters = {
  getItems (state, getters, rootState, rootGetters) {
    return state.items.map(myStock => {
      const record = rootGetters['stocks/getStocks'].find(
        stock => stock.id === myStock.id
      );
      return {
        id: record.id,
        qty: myStock.qty,
        name: record.name,
        price: record.price,
      }
    });
  }
}

const actions = {
  sellStock ({ commit, dispatch }, payload) {
    console.log({ payload })
    commit('SELL_STOCK', payload);
    dispatch('user/receive', payload.qty * payload.stockPrice, { root: true });
  },
  buyStock ({ commit, dispatch, rootGetters }, payload) {
    const userFunds = rootGetters['user/getFunds'];
    let totals = payload.qty * payload.stockPrice;
    
    if (totals > userFunds) {
      const maxBuyUserQty = parseInt(userFunds / payload.stockPrice);
      payload.qty = maxBuyUserQty;
      totals = maxBuyUserQty * payload.stockPrice;
    }
    commit('BUY_STOCK', payload);
    dispatch('user/pay', totals, { root: true });
  },
  initPortfolio ({ commit }, portfolio) {
    commit('SET_ITEMS', portfolio || []); 
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}
