<template>
  <div class="my-order">
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
              <span class="header-title">我的订单</span>
              <v-spacer/>
              <router-link
                to="/cart">
                <div class="icon">
                  <i class="iconfont icon-gouwuche"/>
                  <span
                    v-if="count>0"
                    class="icon-number">{{ count }}</span>
                </div>
              </router-link>
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
            id="scroll-target"
            style="max-height: 800px"
            class="scroll-y">
            <div
              v-scroll:#scroll-target="onScroll"
              class="items">
              <template v-for="(order,index) in orderItems">
                <div
                  :key="index+'l'"
                  class="list-item">
                  <div
                    class="item">
                    <div
                      :key="index"
                      class="item__title">
                      <div class="item__title-number">
                        <i class="iconfont icon-22"/>订单号:{{ order.number }}
                      </div>
                      <div>
                        {{ order.statusText }}
                      </div>
                    </div>
                    <div
                      @click="onDetail(order.id)"
                      v-for="item in order.items"
                      :key="item.id"
                      class="item__content">
                      <div class="item__content-details">
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
                            规格:
                            <span
                              v-for="(attributes,index) in item.productAttributes"
                              :key="index+'attributes'">
                              <span>
                                {{ attributes.value }}
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
                    <div
                      :key="index+'a'"
                      class="item__information">
                      <div class="item__total">
                        <span class="item__total-price">共{{ 1 }}件商品,&nbsp;合计{{ order.total | money }}&nbsp;(含运费:{{ '￥'+order.shippingFee }})</span>
                      </div>
                      <v-divider/>
                      <div class="item__btn">
                        <v-btn
                          v-if="order.cancelBtn"
                          class="item__btn-btn"
                          @click="onCancel(order)"
                          round
                          outline
                          color="blue accent-4"
                          small>取消订单</v-btn>
                        <v-btn
                          v-if="order.paymentBtn"
                          class="item__btn-btn"
                          @click="onPay(order)"
                          round
                          outline
                          color="blue accent-4"
                          small>付款</v-btn>
                        <v-btn
                          v-if="order.deleteBtn"
                          class="item__btn-btn"
                          @click="onDelete(order)"
                          round
                          outline
                          color="blue accent-4"
                          small>删除</v-btn>
                        <v-btn
                          v-if="order.affirmBtn"
                          class="item__btn-btn"
                          @click="onAffirm(order)"
                          round
                          outline
                          color="blue accent-4"
                          small>确认收货</v-btn>
                        <v-btn
                          v-if="order.againBtn"
                          class="item__btn-btn"
                          @click="onAgain(order)"
                          round
                          outline
                          color="blue accent-4"
                          small>再次购买</v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <v-bottom-sheet
            attach
            v-model="sheet">
            <div
              class="bottom-sheet-card"
              style="height:100%">
              <div
                style="height:100%"
                class="card-list">
                <div class="card-list__close">
                  <i
                    class="iconfont icon-roundclose"
                    @click="sheet=false"/>
                </div>
                <div class="card-list__items">
                  <div
                    class="card-list__item">
                    <template v-for="item in orderCurrentItem.items">
                      <div
                        :key="item.id"
                        class="card-list__content">
                        <div class="card-list__content-details">
                          <div class="card-list__content-image">
                            <img
                              :src="item.productThumb">
                          </div>
                          <div class="card-list__content-attribute">
                            <div
                              class="card-list__content-name">
                              <span>{{ item.productName }}</span>
                            </div>
                            <div
                              class="card-list__content-specification">
                              <span
                                v-for="(attributes,index) in item.productAttributes"
                                :key="index+'attributes'">
                                <span>
                                  {{ attributes.value }}
                                </span>
                              </span>
                            </div>
                            <div class="card-list__actions">
                              <div class="card-list__action">
                                <span class="card-list__action-price">{{ item.productPrice | money }}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="card-list__count">
                          <span>*{{ item.quantity }}</span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                <div class="card-list__actions">
                  <div
                    class="card-list__action">
                    <v-list>
                      <v-list-tile v-if="selectedAliPayMethod">
                        <v-list-tile-action class="card-list__action-way">
                          <i class="iconfont icon-iconfontrectangle390"/>
                        </v-list-tile-action>
                        <v-list-tile-content class="card-list__action-content">
                          <v-list-tile-title>支付宝</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action
                          class="card-list__action-enter">
                          <i
                            class="iconfont icon-yuanxingweixuanzhong"
                            v-if="selectPayMethod"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingxuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                      <v-list-tile v-if="selectedWxPayMethod">
                        <v-list-tile-action class="card-list__action-way">
                          <i class="iconfont icon-wechat"/>
                        </v-list-tile-action>
                        <v-list-tile-content class="card-list__action-content">
                          <v-list-tile-title>微信</v-list-tile-title>
                        </v-list-tile-content>
                        <v-list-tile-action
                          class="card-list__action-enter">
                          <i
                            class="iconfont icon-yuanxingxuanzhong"
                            v-if="selectPayMethod"/>
                          <i
                            v-else
                            class="iconfont icon-yuanxingweixuanzhong"/>
                        </v-list-tile-action>
                      </v-list-tile>
                    </v-list>
                  </div>
                </div>
                <div
                  class="card-list__btn">
                  <v-btn
                    block
                    color="blue"
                    @click="onSaveOrder()"
                    dark>提交订单</v-btn>
                </div>
              </div>
            </div>
          </v-bottom-sheet>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="isEmpty"
        class="empty-page"
        row>
        <v-flex
          xs12>
          <div class="empty">
            <div class="empty-content">
              <img src="../../../assets/images/order-image/order-empty.png">
              <div class="empty-content__text">
                <span class="empty-content__text-title">
                  还没有订单哦
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
      sheet: false,
      totalPrices: 0,
      offsetTop: 0,
      scrollHeight: 0,
      pagination: {
        page: 0,
        size: 10,
        sort: 'createdTime,desc'
      },
      orderCurrentItem: {},
      orderItems: [],
      selectPayMethod: false,
      orderId: '',
      cancelReceiving: false,
      confirmReceiving: false,
      deleteCurrentOrder: false,
      isEmpty: false,
      confirmOptions: {},
      selectedAliPayMethod: false,
      selectedWxPayMethod: false
    };
  },

  computed: {
    ...mapState({
      orders: state => state.order.orders,
      aliPayInformation: state => state.order.aliPayInformation,
      weChatInformation: state => state.order.weChatInformation,
      count: state => state.shoppingCart.count
    })
  },
  created() {
    this.getOrderAll(this.pagination).then(() => {
      this.orderItems = _.cloneDeep(this.orders.content);
      this.stateRefresh();
      if (this.orderItems.length === 0) {
        this.isEmpty = true;
      }
    });
    this.getCartItemsNumber();
    let that = this;
    window.wxPayResult = function(code) {
      if (code === '0') {
        that.$router.push(`/order/payment/success`);
        that.sheet = false;
      } else if (code === '-2') {
        that.$router.push(`/order/detail/${that.orderId}`);
        that.sheet = false;
      } else {
        that.$chip({
          chipOptions: '支付失败'
        });
        that.sheet = false;
      }
    };
    window.aliPayResult = function(json) {
      let value = JSON.parse(json);
      if (value.resultStatus === '9000') {
        that.$router.push(`/order/payment/success`);
        that.sheet = false;
      } else if (value.resultStatus === '6001') {
        that.$router.push(`/order/detail/${that.orderId}`);
        that.sheet = false;
      } else {
        that.$chip({
          chipOptions: '支付失败'
        });
        that.sheet = false;
      }
    };
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['getOrderAll', 'aliPayWay', 'weChatPayWay', 'cancelOrder', 'affirmOrder', 'deleteOrder', 'againByOrder', 'getCartItemsNumber']),
    ...mapMutations(['setTotalPrices', 'setOrderId']),
    onBack() {
      this.$router.push(`/home`);
    },
    onGo() {
      this.$router.push(`/home`);
    },
    onDetail(orderId) {
      this.$router.push(`/order/detail/${orderId}`);
    },
    onScroll(e) {
      this.offsetTop = e.target.scrollTop;
      let scale = (e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop) / e.target.clientHeight;
      if (scale === 0) {
        this.pagination.page++;
        this.getOrderAll({ page: this.pagination.page, size: this.pagination.size, sort: this.pagination.sort }).then(() => {
          this.orders.content.forEach(obj => {
            this.orderItems.push(_.cloneDeep(obj));
          });
          this.stateRefresh();
        });
      }
    },
    onPay(orderItemProducts) {
      this.sheet = true;
      this.orderCurrentItem = orderItemProducts;
      this.totalPrices = orderItemProducts.total;
      this.orderId = orderItemProducts.id;
      if (orderItemProducts.paymentMethod === 'ALIPAY') {
        this.selectedAliPayMethod = true;
        this.selectedWxPayMethod = false;
        this.selectPayMethod = false;
      }
      if (orderItemProducts.paymentMethod === 'WE_CHAT_PAY') {
        this.selectedAliPayMethod = false;
        this.selectedWxPayMethod = true;
        this.selectPayMethod = true;
      }
    },
    onConfirm() {
      if (this.cancelReceiving) {
        this.cancelOrder(this.orderId).then(() => {
          this.$refs.myConfirm.closeModel();
          this.getOrderAll(this.pagination).then(() => {
            this.orderItems = _.cloneDeep(this.orders.content);
            this.stateRefresh();
          });
        });
      } else if (this.confirmReceiving) {
        this.affirmOrder(this.orderId).then((response) => {
          this.$refs.myConfirm.closeModel();
          this.getOrderAll(this.pagination).then(() => {
            this.orderItems = _.cloneDeep(this.orders.content);
            this.stateRefresh();
          });
        }).catch((err) => {
          this.textMessage = err.response.data.message;
          let that = this;
          setTimeout(function() {
            that.dialogMessage = false;
          }, 1000);
        });
      } else if (this.deleteCurrentOrder) {
        this.deleteOrder(this.orderId).then(() => {
          this.$refs.myConfirm.closeModel();
          this.getOrderAll(this.pagination).then(() => {
            this.orderItems = _.cloneDeep(this.orders.content);
            this.stateRefresh();
            if (this.orderItems.length === 0) {
              this.isEmpty = true;
            }
          });
        });
      }
    },
    onCancel(order) {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {
        textMessage: '确定取消订单?'
      };
      this.cancelReceiving = true;
      this.confirmReceiving = false;
      this.deleteCurrentOrder = false;
      this.orderCurrentItem = order;
      this.orderId = this.orderCurrentItem.id;
    },
    onAffirm(order) {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {
        textMessage: '确定收货？'
      };
      this.cancelReceiving = false;
      this.confirmReceiving = true;
      this.deleteCurrentOrder = false;
      this.orderCurrentItem = order;
      this.orderId = this.orderCurrentItem.id;
    },
    onDelete(order) {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {
        textMessage: '确定删除？'
      };
      this.cancelReceiving = false;
      this.confirmReceiving = false;
      this.deleteCurrentOrder = true;
      this.orderCurrentItem = order;
      this.orderId = this.orderCurrentItem.id;
    },
    onAgain(order) {
      this.orderCurrentItem = order;
      this.orderId = this.orderCurrentItem.id;
      this.againByOrder(this.orderId).then(() => {
        this.$router.push('/cart');
      });
    },
    onSaveOrder() {
      if (!this.selectPayMethod) {
        this.setTotalPrices(this.totalPrices);
        this.setOrderId(this.orderId);
        this.aliPayWay(this.orderId).then(() => {
          if (window.JSInterface.aliPay) {
            window.JSInterface.aliPay(this.aliPayInformation.body);
          }
        });
      } else {
        this.setTotalPrices(this.totalPrices);
        this.setOrderId(this.orderId);
        this.weChatPayWay(this.orderId).then(() => {
          if (window.JSInterface.wxPay) {
            window.JSInterface.wxPay(JSON.stringify(this.weChatInformation));
          }
        });
      }
    },
    stateRefresh() {
      this.orderItems.forEach(obj => {
        if (obj.status === 'PENDING_PAYMENT') { // 待付款
          this.$set(obj, 'paymentBtn', true);
          this.$set(obj, 'cancelBtn', true);
          this.$set(obj, 'deleteBtn', false);
          this.$set(obj, 'affirmBtn', false);
          this.$set(obj, 'againBtn', false);
          this.$set(obj, 'statusText', '待付款');
        }
        if (obj.status === 'PENDING_SHIPMENT') { // 待发货
          this.$set(obj, 'paymentBtn', false);
          this.$set(obj, 'cancelBtn', false);
          this.$set(obj, 'deleteBtn', false);
          this.$set(obj, 'affirmBtn', false);
          this.$set(obj, 'againBtn', false);
          this.$set(obj, 'statusText', '待发货');
        } else if (obj.status === 'PENDING_RECEIVING') { // 待收货
          this.$set(obj, 'paymentBtn', false);
          this.$set(obj, 'cancelBtn', false);
          this.$set(obj, 'deleteBtn', false);
          this.$set(obj, 'affirmBtn', true);
          this.$set(obj, 'againBtn', false);
          this.$set(obj, 'statusText', '待收货');
        }
        if (obj.status === 'COMPLETE') { // 交易完成
          this.$set(obj, 'paymentBtn', false);
          this.$set(obj, 'cancelBtn', false);
          this.$set(obj, 'deleteBtn', true);
          this.$set(obj, 'affirmBtn', false);
          this.$set(obj, 'againBtn', true);
          this.$set(obj, 'statusText', '交易完成');
        }
        if (obj.status === 'CANCELLED') { // 交易取消
          this.$set(obj, 'paymentBtn', false);
          this.$set(obj, 'cancelBtn', false);
          this.$set(obj, 'deleteBtn', true);
          this.$set(obj, 'affirmBtn', false);
          this.$set(obj, 'againBtn', false);
          this.$set(obj, 'statusText', '交易取消');
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
.icon-roundclose {
  font-size: 18px;
}
.my-order {
  height: 100vh;
}

.items {
  margin-top: 15px;
}
.list-item {
  margin-bottom: 15px;
  background: #ffffff;
}
.item {
  margin: 15px 15px;
  padding: 10px 0;
  &__title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    &-number {
      display: flex;
      align-items: center;
    }
  }
  &__content {
    display: flex;
    justify-content: space-between;
    border-radius: 6px;
    margin: 5px 0;
    background: #f3f3f3;
    padding: 0 10px;
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
    &-details {
      display: flex;
      justify-content: space-around;
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
    justify-content: space-between;
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
  &__total {
    display: flex;
    justify-content: flex-end;
  }
  &__btn {
    display: flex;
    justify-content: flex-end;
    &-btn {
      margin-top: 10px !important;
      height: 22px !important;
      margin-left: 9px !important;
      min-width: 54px;
      margin-bottom: 0;
    }
  }
}

.card-list {
  height: 100%;
  padding: 0 15px;
  &__close {
    display: flex;
    justify-content: flex-end;
    font-size: 22px;
  }
  &__image {
    width: 180px;
    > img {
      width: 100%;
    }
  }
  &__items {
    overflow-y: scroll;
    height: 190px;
  }
  &__content {
    display: flex;
    justify-content: space-between;
    border-radius: 6px;
    margin: 5px 0;
    background: #f3f3f3;
    padding: 0 10px;
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
    &-details {
      display: flex;
      justify-content: space-around;
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
    justify-content: space-between;
    margin-bottom: 30px;
  }
  &__count {
    height: 72px;
    display: flex;
    align-items: flex-end;
  }
  &__btn {
    position: relative;
    width: 100%;
    padding: 0 15px;
  }
}
.btn-save__item {
  position: fixed;
  bottom: 0;
  padding: 0 15px;
  width: 100%;
  left: 0px;
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
</style>
