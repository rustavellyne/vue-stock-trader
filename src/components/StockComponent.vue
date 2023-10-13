<template>
    <div class="stock">
         <div class="stock__header">
              <h4 class="stock__title"> {{ stock.name }}</h4>
              <p class="stock__info">
                <slot
                    v-bind:stock="stock"
                    name="description"></slot>
              </p>
         </div>
         <div class="stock__body">
              <div class="stock__form">
                  <label>
                     <input
                        v-model="quantity"
                        type="number" 
                        min="1" 
                        step="any" 
                        placeholder="Quantity"
                     />
                  </label>
                  <button :disabled="disable" class="stock__btn" @click="send">
                      <slot name="btn">default</slot>
                  </button>
             </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
          stock: {
            type: Object,
            default: () => {}
          },
          typeStock: {
            type: String,
            required: true
          }
        },
        data () {
            return {
                quantity: '',
            }
        },
      computed: {
        disable () {
          if (this.typeStock === 'stock') {
            const totals = this.quantity * this.stock.price;
            return this.quantity <= 0 || this.$store.getters['user/getFunds'] < totals; 
          }
          if (this.typeStock === 'portfolio') {
            return this.quantity <= 0 || this.quantity > this.stock.qty;
          }
          return +this.quantity <= 0;
        }
      },
        methods: {
            send() {
                if (!this.quantity) return;
                const order = {
                    qty: +this.quantity,
                    stockId: this.stock.id,
                    stockPrice: this.stock.price
                };
                this.$emit('changed', order);
                this.quantity = '';
            },
        }
    }
</script>

<style lang="scss" scoped>
.stock {
    border-radius: 3px;
    border: 1px solid lightgrey;
    
    &__header {
        padding: 10px;
        background: antiquewhite;
        border-bottom: 1px solid lightgrey;
    }
    &__title {
        display: inline-block;
        font-size: 24px;
        font-weight: bold;
    }
    &__info {
        display: inline-block;
        margin-left: 10px;
    }

    &__body {
        padding: 10px;
    }

    &__form {
        display: flex;
        
        input {
            font-size: 18px;
            border-radius: 5px;
            border: 1px solid lightgrey;
            padding: 10px;
            outline: none;
            &:focus {
                box-shadow: 0 0 10px #719ECE;
                border-color: lightblue;
            }
        }
    }

    &__btn {
        cursor: pointer;
        margin-left: auto;
        font-size: 16px;
        padding: 0 10px;
        text-transform: uppercase;
        background-color: antiquewhite;
        border-radius: 3px;
        border: 1px solid darkblue;

        &:hover {
            background-color: darkorange;
        }
        &:disabled,
        &[disabled=disabled] {
          border: 1px solid #999999;
          background-color: #cccccc !important;
          color: #666666;
        }
    }
}
.stock-theme {
    .stock__header {
        background-color: lightgreen;
    }
    .stock__btn {
        background-color: lightgreen;

        &:hover {
            background-color: deeppink;
        }
    }
    .stock__form {
        input {
            border-color: lightgreen;

            &:focus {
                box-shadow: 0 0 10px lightgreen;
            }
        }
    }
}
.portfolio-theme {
    $color: coral;
    .stock__header {
        background-color: $color;
    }
    .stock__btn {
        background-color: $color;

        &:hover {
            background-color: deeppink;
        }
    }
    .stock__form {
        input {
            border-color: $color;

            &:focus {
                box-shadow: 0 0 10px $color;
            }
        }
    }
}
</style>
