<template>
    <div class="home-page">
        <div class="jumbotrone">
            <h1 class="home-page__title">
                Trade or View your Portfolio
            </h1>
            <p>You may Save &amp; Load your Data</p>
            <p>Click on 'End Day' to begin a new Day!</p>
            <hr />
            <strong class="user-funds"> Your Funds: {{ fundsFormat }} </strong>
        </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'HomePage',
    computed: {
      ...mapGetters({
        userFunds: 'user/getFunds',
      }),
      fundsFormat () {
        return `$${this.userFunds.toLocaleString()}`
      }
    },
    mounted () {
      this.$store.dispatch('initApp');
    }
  }
</script>

<style lang="scss" scoped>
.jumbotrone {
    border: 1px solid black;
    border-radius: 4px;
    padding: 30px 20px;
}

.home-page {
    &__title {
        font-weight: 800;
        font-size: 42px;
    }
    p {
        margin-top: 10px;
        font-size: 18px;
    }

    p + p {
        margin-top: 5px;
    }

    hr {
        border: none;
        margin: 20px 0;
        height: 2px;
        background: grey;
    }

    .user-funds {
        font-size: 24px;
    }
}

</style>
