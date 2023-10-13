<template>
    <div class="portfolio-page">
        <div class="stocks">
            <template v-if="stocks.length">
                <stock
                    v-for="stock in stocks"
                    :key="stock.id"
                    :stock="stock"
                    @changed="sell"
                    typeStock="portfolio"
                    class="stock portfolio-theme"
                >
                    <template v-slot:description="{ stock }">
                      (Price: {{ stock.price }} | Quantity: {{ stock.qty }})
                    </template>
                    <template v-slot:btn>
                        Sell
                    </template>
                </stock>
            </template>
            <p class="no-stocks" v-else>No Portfolio Stocks</p>
        </div> 
    </div>
</template>

<script>
import Stock from './StockComponent.vue';

    export default {
        name: 'PortfolioPage',
        components: {
            Stock,
        },
        data () {
            return {
            }
        },
      computed: {
        stocks () {
          return this.$store.getters['portfolio/getItems'];
        }
      },
        methods: {
            sell (stock) {
                this.$store.dispatch('portfolio/sellStock', stock);
            }
        }
    }
</script>

<style lang="scss" scoped>

.stocks {
    display: flex;
    flex-wrap: wrap;
    gap: 40px 20px;

    .stock {
        flex: 0 1 calc(50% - 20px);
    }   
}
 .no-stocks {
    font-size: 42px;
 }
</style>
