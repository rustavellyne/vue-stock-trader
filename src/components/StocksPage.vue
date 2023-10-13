<template>
    <div class="stocks-page">
        <div class="stocks">
            <template v-if="stocks">
                <stock
                    v-for="stock in stocks"
                    :key="stock.id"
                    :stock="stock"
                    @changed="buyStock"
                    typeStock="stock"
                    class="stock stock-theme"
                >
                    <template v-slot:description="{ stock }">
                        (Price: {{ stock.price }})                    
                    </template>
                    <template v-slot:btn>
                        Buy
                    </template>
                </stock>
            </template>
            <p class="no-stocks" v-else> No Stocks </p>
        </div>
    </div>
</template>

<script>
import Stock from './StockComponent.vue';
import { mapGetters } from 'vuex'
    export default {
        name: 'StocksPage',
        components: {
            Stock,
        },
        data () {
            return {
            }
        },
        computed: {
          ...mapGetters({
            stocks: 'stocks/getStocks',
            funds: 'user/getFunds',
          }),
        },
        methods: {
          buyStock (order) {
            this.$store.dispatch('stocks/buyStock', order);
          },
        }, 
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
