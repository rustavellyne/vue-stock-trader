<template>
    <nav class="navbar">
        <div class="navbar__left">
            <router-link
              v-if="isLoggin"
              to="/" 
              exact 
              class="main-logo"
            > Stock Trader </router-link>
            <ul
              class="menu">
                <li
                  v-if="isLoggin"
                  class="menu__item">
                    <router-link to="/portfolio" class="menu__link"> Portfolio</router-link>
                </li>
                <li
                  v-if="isLoggin"
                  class="menu__item">
                    <router-link to="stocks" class="menu__link">Stocks </router-link>
                </li>
                <li class="menu__item">
                  <router-link
                    v-if="!isLoggin"
                    to="/login"
                    class="menu__link"
                  >Login</router-link>
                </li>
                <li class="menu__item">
                  <router-link
                    v-if="!isLoggin"
                    to="/register"
                    class="menu__link"
                  >Register</router-link>
                </li>
            </ul>
        </div>
        <div class="navbar__right">
            <ul class="menu">
                <li v-if="isLoggin" class="menu__item">
                    <a class="menu__link" @click="endDay"> End day</a>
                </li>
                <li v-if="isLoggin" class="menu__item menu__dropdown">
                    <div class="dropdown">
                        <a class="dropdown__trigger">Load &amp; Save</a>
                        <ul class="dropdown__list">
                            <li class="dropdown__item">
                                <a 
                                  @click.prevent="loadData"
                                  class="menu__link"
                                > Load Data</a>
                            </li>
                            <li class="dropdown__item">
                                <a
                                  @click.prevent="saveAll" 
                                  class="menu__link"
                                > Save Data</a>
                            </li>
                        </ul>
                    </div>
                 </li>
            </ul>
            <p v-if="isLoggin" class="user__funds"> Funds: {{ '$' + formattedFunds  }}</p>
            <a v-if="isLoggin" @click.prevent="logout" class="menu__link"> Logout </a>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters({
      isLoggin: 'user/isLoggin',
    }),
    funds () {
      return this.$store.getters['user/getFunds'];
    },
    formattedFunds () {
      const funds = this.funds;
      return funds.toLocaleString('en-US');
    }
  },
  methods: {
    endDay () {
      this.$store.dispatch('stocks/randomizePrices');
    },
    saveAll () {
      this.$store.dispatch('saveAll');
    },
    logout () {
      this.$store.dispatch('user/logout');
      this.$router.push('/login');
    },
    loadData () {
      
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    border: 1px solid grey;
    border-radius: 5px;
    background-color: #f5f5f5;
    font-size: 28px;
}
.menu {
    display: inline-block;
    color: #423f3f;
    &__item {
        cursor: pointer;
        display: inline-block;

        &:hover {
            background: lightgrey;
        }
    }
    .router-link-active {
        background: lightgrey;
    }
    &__link {
      cursor: pointer;
        color: inherit;
        text-decoration: none;
        padding: 20px 10px;
        display: inline-block;
    }

    &__dropdown {
        padding: 0;
    }
}
.dropdown {
    position: relative;
    &:hover {
        .dropdown__list {
            display: block;
        }
    }

    &__trigger {
        display: inline-block;
        padding: 20px 10px;
    }
    &__list {
        display: none;
        position: absolute;
        width: 100%;
        padding-bottom: 10px;
        background: moccasin;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    }

    &__item {
        padding: 10px;

        &:hover {
            background: coral;
        }
    }
}
.user__funds {
    cursor: default;
    display: inline-block;
    margin-left: 10px;
    font-size: 28px;
}
</style>
