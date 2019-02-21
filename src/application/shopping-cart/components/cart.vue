<template>
  <div class="cart">
    <v-container
      fluid
      class="container">
      <v-layout
        row
        class="header">
        <v-flex
          xs12>
          <div
            class="header-toolbar">
            <v-toolbar
              app
              :flat="true"
              color="white">
              <i
                @click="onBack()"
                class="iconfont icon-return"/>
              <v-spacer/>
              <span class="header-title">购物车</span>
              <v-spacer/>
              <div
                @click="onToggle()">
                <span
                  v-if="toggleState==false"
                  :class="{ 'header-activate': isEmpty }">管理</span><span v-else>完成</span>
              </div>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="!isEmpty"
        row>
        <v-flex
          xs12>
          <div
            class="list-item">
            <template v-for="(product,index) in products.items">
              <div
                :key="index"
                class="item">
                <div
                  class="item-content">
                  <div class="item-content__checbox">
                    <v-checkbox
                      @change="onSelected(product)"
                      hide-details
                      :input-value="product.checked"/>
                  </div>
                  <div class="item-content__image">
                    <img
                      :src="product.productThumb">
                  </div>
                  <div class="item-content__attribute">
                    <div
                      class="item-content__name">
                      <span>{{ product.productName }}</span>
                    </div>
                    <div class="item-content__specification">
                      已选:<span
                        :key="index"
                        v-for="(specification,index) in product.productAttributes">
                        <span>
                          {{ specification.value }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div class="item__actions">
                  <div class="item__action">
                    <span class="item__action-price">{{ product.productPrice |money }}</span>
                  </div>
                  <div class="item__action item__action--distance">
                    <i
                      class="iconfont icon-jianhao"
                      @click="minus(product)"/>
                    <v-text-field
                      class="item__action-count"
                      type="number"
                      disabled
                      single-line
                      outline
                      v-model="product.quantity"
                      :value="product.quantity"/>
                    <i
                      class="iconfont icon-jiahao1"
                      @click="add(product)"/>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="!isEmpty"
        row>
        <v-flex
          xs12>
          <v-footer
            class="cart-footer"
            style="height:50px"
            app>
            <v-layout
              row>
              <v-flex
                xs4>
                <div class="footer__action-all">
                  <v-checkbox
                    v-model="selectedAllState"
                    @change="onSelectAll()"
                    style="height:24px;"
                    label="全选"/>
                </div>
              </v-flex>
              <v-flex
                xs8>
                <div
                  v-if="toggleState"
                  class="footer-delete">
                  <div
                    class="footer-delete__clear"
                    @click="onClear()">
                    <i class="iconfont icon-shandian"/><span>清空购物车</span>
                  </div>
                  <v-btn
                    @click="onDelete()"
                    round
                    outline
                    color="red"
                    small>删除</v-btn>
                </div>
                <div
                  v-else
                  class="footer-aggregate">
                  <span class="footer-aggregate__price">合计:<span>￥{{ totalPrices }}</span></span>&nbsp;&nbsp;
                  <span
                    class="footer-aggregate__settlement"
                    @click="onSettlement()">结算</span>
                </div>
              </v-flex>
            </v-layout>
          </v-footer>
        </v-flex>
      </v-layout>
      <v-layout
        class="empty-page"
        v-if="isEmpty"
        row>
        <v-flex
          xs12>
          <div class="empty">
            <div class="empty-content">
              <img src="../../../assets/images/cart-image/cart-empty.png">
              <div class="empty-content__text">
                <span class="empty-content__text-title">
                  购物车还是空的
                </span>
                <span class="empty-content__text-like">
                  快去挑几件喜欢的东西吧
                </span>
              </div>
            </div>
            <div
              class="btn-item">
              <v-btn
                @click="onGo()"
                round
                outline
                color="blue accent-4"
                small>去逛逛</v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <dialog-model
            :confirm-modal-options="confirmOptions"
            ref="myConfirm"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {

  data() {
    return {
      selected: false,
      isEmpty: false,
      selectedAllState: false,
      products: {items: []},
      cartItemIds: [],
      toggleState: false,
      prices: [],
      totalPrices: 0,
      isClear: false,
      selectItems: [],
      confirmOptions: {}
    };
  },
  computed: {
    ...mapState({
      cartItems: state => state.shoppingCart.cartItems
    })
  },
  created() {
    this.getCart().then(() => {
      this.products = _.cloneDeep(this.cartItems);
      if (this.products.items.length === 0) {
        this.isEmpty = true;
      }
      this.products.items.forEach(obj => {
        obj.checked = false;
      });
    });
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getCart', 'updateCartQuantity', 'deleteCartItems', 'clearCart']),
    ...mapMutations(['setSelectItems']),
    onBack() {
      this.$router.push(`/home`);
    },
    onGo() {
      this.$router.push(`/home`);
    },
    onToggle() {
      if (this.products.items.length === 0) {
        this.toggleState = false;
        this.isEmpty = true;
      } else {
        this.toggleState = !this.toggleState;
      }
    },
    onSelected(selectProduct) {
      let value = 0;
      this.products.items.forEach((obj, key) => {
        if (selectProduct.id === obj.id) {
          obj.checked = !selectProduct.checked;
          this.products.items.splice(key, 1, obj);
          this.products.items.forEach(obj1 => {
            if (obj.checked === obj1.checked) {
              value++;
              this.selectedAllState = false;
              if (value === this.products.items.length && obj1.checked !== false) {
                this.selectedAllState = true;
              }
            }
          });
        }
      });
      this.total();
    },
    onSelectAll() {
      this.products.items.forEach(obj => {
        if (this.selectedAllState) {
          this.$set(obj, 'checked', true);
        } else {
          this.$set(obj, 'checked', false);
        }
      });
      if (this.selectedAllState) {
        this.totalPrices = 0;
      } else {
        this.total();
      }
    },
    onConfirm() {
      if (this.isClear) {
        this.clearCart().then(() => {
          this.getCart().then(() => {
            this.products = _.cloneDeep(this.cartItems);
            this.$refs.myConfirm.closeModel();
            this.total();
            if (this.products.items.length === 0) {
              this.isEmpty = true;
              this.toggleState = false;
              this.selectedAllState = false;
            };
          });
        });
      } else {
        this.cartItemIds.length = 0;
        this.products.items.forEach(obj => {
          if (obj.checked) {
            this.cartItemIds.push(`${obj.id}`);
          }
        });
        let cartItemIds = this.cartItemIds.join(',');
        this.deleteCartItems(cartItemIds).then(() => {
          this.getCart().then(() => {
            this.products = _.cloneDeep(this.cartItems);
            this.$refs.myConfirm.closeModel();
            this.total();
            if (this.products.items.length === 0) {
              this.isEmpty = true;
              this.toggleState = false;
              this.selectedAllState = false;
            };
          });
        });
      }
    },
    onClear() {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {textMessage: '确定清空购车?'};
      this.isClear = true;
    },
    onDelete() {
      this.isClear = false;
      for (let i = 0; i < this.products.items.length; i++) {
        if (this.products.items[i].checked) {
          this.$refs.myConfirm.showModel();
          this.confirmOptions = {textMessage: '确定删除？'};
          return;
        }
      }
    },
    onSettlement() {
      this.products.items.forEach(obj => {
        if (obj.checked) {
          this.selectItems.push(obj);
        }
      });
      this.setSelectItems(this.selectItems);
      if (this.totalPrices !== 0) {
        this.$router.push(`/order`);
      }
    },
    add(product) {
      this.products.items.forEach(obj => {
        if (product.id === obj.id) {
          obj.quantity++;
          this.updateCartQuantity({cartItemId: obj.id, quantity: obj.quantity}).then(() => {
          });
        }
      });
      this.total();
    },
    minus(product) {
      this.products.items.forEach(obj => {
        if (product.id === obj.id) {
          if (obj.quantity > 1) {
            obj.quantity--;
            this.updateCartQuantity({cartItemId: obj.id, quantity: obj.quantity});
          }
        }
      });
      this.total();
    },
    total() {
      let selected = 0;
      let total = 0;
      this.products.items.forEach(obj => {
        if (obj.checked) {
          selected++;
          this.prices.push(obj);
        }
      });
      this.prices = this.prices.splice(-selected, selected);
      this.prices.forEach(obj => {
        total += Math.floor(parseFloat(obj.productPrice * 100 * obj.quantity)) / 100;
        this.totalPrices = parseFloat(total).toFixed(2);
      });
      if (this.prices.length === 0) this.totalPrices = 0;
    }
  }
};

</script>

<style lang="scss" scoped>
.cart {
  height: 100vh;
}
.header-activate {
  color: #dddddd;
}
.icon-shandian {
  font-size: 16px;
  color: #0011ff;
}
.list-item {
  padding: 0 15px;
  margin-top: 15px;
  margin-bottom: 65px;
}
.item {
  border: 1px solid #dddddd;
  border-radius: 6px;
  padding: 0 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-content {
    display: flex;
    padding-left: 5px;
    &__checbox {
      display: flex;
      align-items: center;
      margin-right: 15px;
    }
    &__image {
      height: 72px;
      width: 90px;
      display: flex;
      align-items: center;
      > img {
        max-height: 70px;
        width: 100%;
      }
    }
    &__attribute {
      display: flex;
      flex-direction: column;
      padding-left: 5px;
    }
    &__name {
      font-size: 12px;
      word-break: break-all;
      white-space: normal;
    }
    &__specification {
      font-size: 12px;
      word-break: break-all;
      white-space: normal;
    }
  }
  &__actions {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 72px;
  }
  &__action {
    display: flex;
    justify-content: center;
    align-items: center;
    &-price {
      font-size: 12px;
      color: #ff0000;
    }
    &-count {
      width: 30px;
    }
  }
}
.item__action--distance {
  margin-bottom: 3px;
}
.cart-footer {
  border-top: 1px solid #dddddd;
  border-bottom: 1px solid #dddddd;
  background: #fff;
  padding: 0 0 0 30px;
}
.footer__action-all {
  height: 50px;
  display: flex;
  align-items: center;
}
.footer-delete {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
.footer-aggregate {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &__price {
    > span {
      color: #ff0000;
    }
  }
  &__settlement {
    font-size: 18px;
    display: inline-block;
    text-align: center;
    height: 50px;
    width: 60px;
    line-height: 50px;
    background: #648cd6;
  }
}
.empty-page {
  height: 100vh;
  margin-top: -56px;
  background: #fff;
}
.empty {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #fff;
}
.empty-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__text {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 35px;
    &-title {
      font-size: 13px;
    }
    &-like {
      font-size: 12px;
      color: #666666;
    }
  }
}
.btn-item {
  margin-top: 0;
}
</style>
