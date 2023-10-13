<template>
  <div id="app" class="app">
      <div class="container">
        <nav-bar class="app__navbar" />
        <main>
            <router-view></router-view>
        </main>
      </div>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue';
export default {
  name: 'App',
  components: {
      NavBar,
  },
}
</script>

<style lang="scss">
html {
  box-sizing: border-box;
  font-size: 16px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}

.container {
    margin: 10px auto;
    max-width: 1280px;
    padding: 0 20px;
}
.app {
    &__navbar {
        margin-top: 30px;
    }
    .home-page {
        margin-top: 40px;
    }
    .portfolio-page,
    .stocks-page {
        margin-top: 40px;
        padding: 0 20px;
    }
    .router-link-active {
        background-color: lightgrey;
    }
    .main-logo {
        cursor: pointer;
        padding: 20px 20px;
        text-decoration: none;
        color: inherit;
        &:hover {
            background: lightgrey;
        }
    }
}
</style>
