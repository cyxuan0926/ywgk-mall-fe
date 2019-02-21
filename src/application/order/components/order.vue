<template>
  <div class="order">
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
              <span class="header-title">确认订单</span>
              <v-spacer/>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="address-list"
        row>
        <v-flex
          xs12>
          <div
            class="address-list__action">
            <v-list>
              <router-link
                to="/address/list">
                <v-list-tile>
                  <v-list-tile-action class="address-list__action-location">
                    <i class="iconfont icon-dingwei"/>
                  </v-list-tile-action>
                  <v-list-tile-content class="address-list__action-content address-list__action-content-left">
                    <v-list-tile-title>收货人地址:{{ address.countryName }} {{ address.provinceName }} {{ address.cityName }} {{ address.countyName }} {{ address.streetDetail }}<span v-if="isAddress">请选择地址</span></v-list-tile-title>
                  </v-list-tile-content>
                  <v-list-tile-action class="address-list__action-enter">
                    <i class="iconfont icon-enter"/>
                  </v-list-tile-action>
                </v-list-tile>
              </router-link>
              <v-divider/>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div
            class="items"
            style="overflow-y: scroll;">
            <div
              class="list-item">
              <template v-for="(item,index) in selectItems">
                <div
                  :key="index"
                  class="item">
                  <div
                    class="item__content">
                    <div class="item__content-image">
                      <img
                        :src="item.productThumb">
                    </div>
                    <div class="item__content-attribute">
                      <div
                        class="item__content-name">
                        <span>{{ item.productName }}</span>
                      </div>
                      <div
                        class="item__content-specification">
                        已选:
                        <span
                          v-for="(value,index__1) in item.productAttributes"
                          :key="index__1">
                          <span>
                            {{ value.value }}
                          </span>
                        </span>
                      </div>
                      <div class="item__actions">
                        <div class="item__action">
                          <span class="item__action-price">{{ item.productPrice | money }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="item__count">
                    <span>*{{ item.quantity }}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="freight-total">
            <v-list>
              <v-list-tile>
                <v-list-tile-content class="freight-total__action-content">
                  <v-list-tile-title>运费</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="freight-total__action-enter">
                  ￥0
                </v-list-tile-action>
              </v-list-tile>
              <v-divider/>
              <v-list-tile>
                <v-list-tile-content class="freight-total__action-content">
                  <v-list-tile-title>合计</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action class="freight-total__action-enter">
                  {{ totalPrices | money }}
                </v-list-tile-action>
              </v-list-tile>
              <v-divider/>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="payment-method"
        row>
        <v-flex
          xs12>
          <div
            class="payment-method__action">
            <v-list>
              <v-list-tile>
                <v-list-tile-action class="payment-method__action-way">
                  <i class="iconfont icon-iconfontrectangle390"/>
                </v-list-tile-action>
                <v-list-tile-content class="payment-method__action-content">
                  <v-list-tile-title>支付宝</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action
                  @click="payMethod=false"
                  class="payment-method__action-enter">
                  <i
                    class="iconfont icon-yuanxingweixuanzhong"
                    v-if="payMethod"/>
                  <i
                    v-else
                    class="iconfont icon-yuanxingxuanzhong"/>
                </v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-action class="payment-method__action-way">
                  <i class="iconfont icon-wechat"/>
                </v-list-tile-action>
                <v-list-tile-content class="payment-method__action-content">
                  <v-list-tile-title>微信</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action
                  @click="payMethod=true"
                  class="payment-method__action-enter">
                  <i
                    class="iconfont icon-yuanxingxuanzhong"
                    v-if="payMethod"/>
                  <i
                    v-else
                    class="iconfont icon-yuanxingweixuanzhong"/>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="customer-message">
            <div class="customer-message__title">
              <span
                class="customer-message__title-remarks">
                买家备注:
              </span>
              <v-text-field
                v-model="customerMessage"
                single-line/>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        class="btn-save"
        row>
        <v-flex
          xs12>
          <div
            class="btn-save__item">
            <v-btn
              block
              color="blue"
              @click="onSaveOrder()"
              dark>提交订单</v-btn>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      totalPrices: 0,
      address: {},
      isAddress: false,
      orders: {items: []},
      payMethod: false,
      customerMessage: ''
    };
  },

  computed: {
    ...mapState({
      orderInformation: state => state.order.orderInformation,
      selectItems: state => state.shoppingCart.selectItems,
      addressDefault: state => state.address.addressDefault,
      selectedAddress: state => state.address.selectedAddress,
      addressAbsence: state => state.address.address,
      aliPayInformation: state => state.order.aliPayInformation,
      weChatInformation: state => state.order.weChatInformation,
      orderId: state => state.order.orderId
    })
  },
  created() {
    let total = 0;
    this.selectItems.forEach(obj => {
      console.log(obj);
      total += Math.floor(parseFloat(obj.productPrice * 100 * obj.quantity)) / 100;
      this.totalPrices = parseFloat(total).toFixed(2);
    });
    this.getAddressDefault().then(() => {
      if (JSON.stringify(this.selectedAddress) === '{}') {
        this.address = this.addressDefault;
      }
      if (this.selectedAddress.id !== '' && this.selectedAddress.id !== undefined) {
        this.getAddress(this.selectedAddress.id).then(() => {
          if (this.addressAbsence.id !== '') {
            this.address = this.selectedAddress;
            this.isAddress = false;
          } else {
            this.isAddress = true;
            this.address = {};
          }
        }).catch(() => {
          this.isAddress = true;
          this.address = {};
        });
      }
    }).catch((error) => {
      if (this.selectedAddress.id !== '' && this.selectedAddress.id !== undefined) {
        this.getAddress(this.selectedAddress.id).then(() => {
          if (this.addressAbsence.id !== '') {
            this.address = this.selectedAddress;
            this.isAddress = false;
          } else {
            this.isAddress = true;
            this.address = {};
          }
        }).catch(() => {
          this.isAddress = true;
          this.address = {};
        });
      }
      if (error.response.status === 404 && JSON.stringify(this.selectedAddress) === '{}') {
        this.isAddress = true;
      }
    });

    let that = this;
    window.wxPayResult = function(code) {
      console.log(code);
      if (code === '0') {
        that.$router.push(`/order/payment/success`);
      } else if (code === '-2') {
        that.$router.push(`/order/detail/${that.orderId}`);
      } else {
        that.$chip({
          chipOptions: '支付失败'
        });
      }
    };
    window.aliPayResult = function(json) {
      let value = JSON.parse(json);
      if (value.resultStatus === '9000') {
        that.$router.push(`/order/payment/success`);
      } else if (value.resultStatus === '6001') {
        that.$router.push(`/order/detail/${that.orderId}`);
      } else {
        that.$chip({
          chipOptions: '支付失败'
        });
      }
    };
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getAddressDefault', 'getAddress', 'addOrder', 'aliPayWay', 'weChatPayWay']),
    ...mapMutations(['setSelectedAddress', 'setTotalPrices', 'setOrderId', 'setAddressEntryId']),
    onBack() {
      this.$router.push('/cart');
      this.setSelectedAddress({});
      this.setAddressEntryId('');
    },
    onSaveOrder() {
      this.orders.shippingAddressId = this.address.id;
      if (this.orders.shippingAddressId === undefined) {
        this.$chip({
          chipOptions: '请选择地址'
        });
        return;
      }
      if (this.payMethod) {
        this.orders.paymentMethod = 'WE_CHAT_PAY';
      } else {
        this.orders.paymentMethod = 'ALIPAY';
      }
      this.selectItems.forEach(obj => {
        this.orders.items.push({cartItemId: obj.id});
      });
      this.orders.customerMessage = this.customerMessage;
      this.addOrder(this.orders).then(() => {
        if (!this.payMethod) {
          this.setTotalPrices(this.totalPrices);
          this.setOrderId(this.orderInformation.id);
          this.aliPayWay(this.orderInformation.id).then(() => {
            if (window.JSInterface.aliPay) {
              // 移动端交互 支付宝支付
              window.JSInterface.aliPay(this.aliPayInformation.body);
            }
          });
        } else {
          this.setTotalPrices(this.totalPrices);
          this.setOrderId(this.orderInformation.id);
          this.weChatPayWay(this.orderInformation.id).then(() => {
            if (window.JSInterface.wxPay) {
              // 移动端交互 微信支付
              window.JSInterface.wxPay(JSON.stringify(this.weChatInformation));
            }
          });
        }
      });
    }
  }
};

</script>

<style lang="scss" scoped>
.icon-iconfontrectangle390 {
  color: #00c3ff;
  font-size: 25px;
}
.icon-wechat {
  color: #008800;
  font-size: 25px;
}
.input-group {
  padding: 0;
}
.primary--text {
  color: #e5e5e5 !important;
}

.address-list {
  background: #ffffff;
  &__action {
    padding: 0 15px;
    &-location {
      min-width: 0;
    }
    &-way {
      min-width: 0;
    }
    &-content {
      font-size: 12px;
    }
    &-enter {
      flex-direction: row;
      align-items: center;
      color: #666666;
      font-size: 16px;
    }
    &-content-left {
      margin-left: 10px;
    }
  }
}
.items {
  overflow-y: scroll;
  height: 190px;
  background: #ffffff;
  margin-top: 15px;
}
.list-item {
  padding: 0 15px;
}
.item {
  border-radius: 6px;
  padding: 0 5px;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__content {
    display: flex;
    padding-left: 5px;
    &-image {
      height: 72px;
      width: 90px;
      display: flex;
      align-items: center;
      > img {
        max-height: 70px;
        width: 100%;
      }
    }
    &-name {
      font-size: 12px;
      word-break: break-all;
      white-space: normal;
    }
    &-specification {
      font-size: 12px;
      word-break: break-all;
      white-space: normal;
    }
    &-attribute {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 5px;
    }
  }
  &__actions {
    display: flex;
    flex-direction: column;
  }
  &__action {
    display: flex;
    justify-content: flex-start;
    &-price {
      font-size: 12px;
      color: #ff0000;
    }
  }
  &__count {
    height: 72px;
    display: flex;
    align-items: flex-end;
  }
}
.freight-total {
  padding: 0 15px;
  background: #ffffff;
  &__action {
    padding: 0 15px;
    &-location {
      min-width: 0;
    }
    &-way {
      min-width: 0;
    }
    &-content {
      font-size: 12px;
    }
    &-enter {
      flex-direction: row;
      align-items: center;
      color: #666666;
      font-size: 16px;
    }
  }
}
.payment-method {
  background: #ffffff;
  margin-top: 15px;
  &__action {
    padding: 0 15px;
    &-way {
      min-width: 0;
    }
    &-content {
      font-size: 12px;
    }
    &-enter {
      flex-direction: row;
      align-items: center;
      color: #666666;
      font-size: 16px;
    }
  }
}
.customer-message {
  padding: 0 15px;
  background: #fff;
  margin-top: 10px;
  margin-bottom: 60px;
  &__title {
    height: 38px;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
}
.btn-save {
  &__item {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 0 15px;
    background: #ffffff;
  }
}
</style>
