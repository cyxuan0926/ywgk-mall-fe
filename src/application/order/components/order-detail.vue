<template>
  <div class="order-detail">
    <v-container
      fluid
      class="container">
      <v-layout
        row>
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
              <span class="header-title">订单详情</span>
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
        row>
        <v-flex
          xs12>
          <div class="order-status">
            <div class="current__status">
              <span>{{ detail.status | status }}</span>
            </div>
            <div class="status__image">
              <img
                src="../../../assets/images/order-image/status-image.png"
                alt="">
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="address">
            <div
              class="address-list address-list--consignee">
              <v-list>
                <v-list-tile>
                  <v-list-tile-action class="address-list__location">
                    <i class="iconfont icon-dingwei"/>
                  </v-list-tile-action>
                  <v-list-tile-content class="address-list__content address-list__content--left">
                    <v-list-tile-title>
                      收货人地址:{{ orderDetail.shippingAddress.consignee }} {{ orderDetail.shippingAddress.countryName }} {{ orderDetail.shippingAddress.provinceName }} {{ orderDetail.shippingAddress.cityName }} {{ orderDetail.shippingAddress.countyName }} {{ orderDetail.shippingAddress.streetDetail }}
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider/>
              </v-list>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div
            class="items">
            <div
              class="list-item">
              <template v-for="(item,index) in detail.items">
                <div
                  :key="index"
                  class="item">
                  <div
                    class="item__content">
                    <div class="item__content-image">
                      <img
                        :src="item.productThumb">
                    </div>
                    <div
                      class="item__content-attribute">
                      <div
                        class="item__content-name">
                        <span>{{ item.productName }}</span>
                      </div>
                      <div
                        class="item__content-specification">
                        规格:
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
                <div
                  :key="item.id"
                  class="item-refund-btn">
                  <v-btn
                    v-if="item.normalRefund"
                    class="item-refund-btn__btn item-refund-btn__btn--refund"
                    round
                    outline
                    @click="onRefund(item,detail.id)"
                    color="blue accent-4"
                    small>退款</v-btn>
                  <v-btn
                    v-if="item.refundProcessing"
                    class="item-refund-btn__btn item-refund-btn__btn--refund"
                    round
                    outline
                    @click="onRefundAmong(item.id,detail.id)"
                    color="blue accent-4"
                    small>退款中</v-btn>
                  <v-btn
                    v-if="item.refundCompleted"
                    class="item-refund-btn__btn item-refund-btn__btn--refund"
                    round
                    outline
                    @click="onRefundComplete(item.id,detail.id)"
                    color="blue accent-4"
                    small>退款完成</v-btn>
                </div>
              </template>
            </div>
            <div class="item-actions">
              <div
                class="item__action">
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content class="item__action-content">
                      <v-list-tile-title>运费</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action class="item__action-enter">
                      {{ detail.shippingFee |money }}
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider/>
                </v-list>
              </div>
              <div
                class="item__action">
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content class="item__action-content">
                      <v-list-tile-title>实付款</v-list-tile-title>
                    </v-list-tile-content>
                    <v-list-tile-action class="item__action-enter">
                      {{ detail.total |money }}
                    </v-list-tile-action>
                  </v-list-tile>
                  <v-divider/>
                </v-list>
              </div>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <v-bottom-sheet
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
                    <template v-for="item in detail.items">
                      <div
                        class="card-list__content"
                        :key="item.id">
                        <div class="card-list__content-details">
                          <div class="card-list__content-image">
                            <img
                              :src="item.productThumb">
                          </div>
                          <div
                            class="card-list__content-attribute">
                            <div
                              class="card-list__content-name">
                              <span>{{ item.productName }}</span>
                            </div>
                            <div
                              class="card-list__content-specification">
                              规格:
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
        row>
        <v-flex
          xs12>
          <div class="order-information">
            <span>买家留言:{{ detail.customerMessage }}</span>
            <span>订单编号:{{ detail.number }}</span>
            <span>创建时间:{{ detail.createdTime | moment }}</span>
            <span>支付方式:{{ detail.paymentMethod | payMethod }}</span>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="btnToolbar"
        row>
        <v-flex
          xs12>
          <div
            class="btn-navigation">
            <div
              class="btn-navigation__items">
              <v-btn
                v-if="detail.cancelBtn"
                class="btn-navigation__item-btn"
                @click="onCancel(detail)"
                round
                outline
                color="blue accent-4"
                small>取消订单</v-btn>
              <v-btn
                v-if="detail.paymentBtn"
                class="btn-navigation__item-btn"
                @click="onPay(detail)"
                round
                outline
                color="blue accent-4"
                small>付款</v-btn>
              <v-btn
                v-if="detail.deleteBtn"
                class="btn-navigation__item-btn"
                @click="onDelete(detail)"
                round
                outline
                color="blue accent-4"
                small>删除</v-btn>
              <v-btn
                v-if="detail.affirmBtn"
                class="btn__item-btn"
                @click="onAffirm(detail)"
                round
                outline
                color="blue accent-4"
                small>确认收货</v-btn>
              <v-btn
                v-if="detail.againBtn"
                class="btn__item-btn"
                @click="onAgain(detail)"
                round
                outline
                color="blue accent-4"
                small>再次购买</v-btn>
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
      address: {},
      orders: {items: []},
      orderId: '',
      selectPayMethod: false,
      detail: {},
      cancelReceiving: false,
      confirmReceiving: false,
      deleteCurrentOrder: false,
      btnToolbar: true,
      selectedAliPayMethod: false,
      selectedWxPayMethod: false,
      confirmOptions: {}
    };
  },

  computed: {
    ...mapState({
      orderInformation: state => state.order.orderInformation,
      aliPayInformation: state => state.order.aliPayInformation,
      weChatInformation: state => state.order.weChatInformation,
      orderDetail: state => state.order.orderDetail,
      count: state => state.shoppingCart.count
    })
  },
  created() {
    this.getOrderDetail(this.$route.params.id).then(() => {
      this.totalPrices = this.orderDetail.total;
      this.detail = _.cloneDeep(this.orderDetail);
      this.stateRefresh();
    });
    this.getCartItemsNumber();
    let that = this;
    window.wxPayResult = function(code) {
      if (code === '0') {
        that.$router.push(`/order/payment/success`);
        that.sheet = false;
      } else if (code === '-2') {
        that.$router.push(`/my/order`);
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
    ...mapActions(['addOrder', 'aliPayWay', 'weChatPayWay', 'getOrderDetail', 'cancelOrder', 'affirmOrder', 'deleteOrder', 'againByOrder', 'getCartItemsNumber']),
    ...mapMutations(['setTotalPrices', 'setOrderId', 'setRefund', 'setReundOrderId', 'setOrderItemId']),

    onBack() {
      this.$router.push('/my/order');
    },
    onPay(orderDetail) {
      this.sheet = true;
      if (orderDetail.paymentMethod === 'ALIPAY') {
        this.selectedAliPayMethod = true;
        this.selectedWxPayMethod = false;
        this.selectPayMethod = false;
      }
      if (orderDetail.paymentMethod === 'WE_CHAT_PAY') {
        this.selectedAliPayMethod = false;
        this.selectedWxPayMethod = true;
        this.selectPayMethod = true;
      }
    },
    onSaveOrder() {
      if (!this.selectPayMethod) {
        this.setTotalPrices(this.totalPrices);
        this.setOrderId(this.$route.params.id);
        this.aliPayWay(this.$route.params.id).then(() => {
          if (window.JSInterface.aliPay) {
            window.JSInterface.aliPay(this.aliPayInformation.body);
          }
        });
      } else {
        this.setTotalPrices(this.totalPrices);
        this.setOrderId(this.$route.params.id);
        this.weChatPayWay(this.$route.params.id).then(() => {
          if (window.JSInterface.wxPay) {
            window.JSInterface.wxPay(JSON.stringify(this.weChatInformation));
          }
        });
      }
    },
    onRefund(item, reundOrderId) {
      this.setRefund(item);
      this.setReundOrderId(reundOrderId);
      this.$router.push(`/select/service`);
    },
    onRefundAmong(itemId, reundOrderId) {
      this.setOrderItemId(itemId);
      this.setReundOrderId(reundOrderId);
      this.$router.push(`/refund/detail`);
    },
    onRefundComplete(itemId, reundOrderId) {
      this.setOrderItemId(itemId);
      this.setReundOrderId(reundOrderId);
      this.$router.push(`/refund/detail`);
    },
    onConfirm() {
      if (this.cancelReceiving) {
        this.cancelOrder(this.orderId).then(() => {
          this.$refs.myConfirm.closeModel();
          this.getOrderDetail(this.$route.params.id).then(() => {
            this.detail = _.cloneDeep(this.orderDetail);
            this.stateRefresh();
          });
        });
      } else if (this.confirmReceiving) {
        this.affirmOrder(this.orderId).then(() => {
          this.$refs.myConfirm.closeModel();
          this.getOrderDetail(this.$route.params.id).then(() => {
            this.detail = _.cloneDeep(this.orderDetail);
            this.stateRefresh();
          });
        });
      } else if (this.deleteCurrentOrder) {
        this.deleteOrder(this.orderId).then(() => {
          this.$refs.myConfirm.closeModel();
          this.$router.push('/my/order');
        });
      }
    },
    onCancel(order) {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {textMessage: '确定取消订单?'};
      this.cancelReceiving = true;
      this.confirmReceiving = false;
      this.deleteCurrentOrder = false;
      this.orderId = order.id;
    },
    onAffirm(order) {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {textMessage: '确定收货?'};
      this.cancelReceiving = false;
      this.confirmReceiving = true;
      this.deleteCurrentOrder = false;
      this.orderId = order.id;
    },
    onDelete(order) {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {textMessage: '确定删除?'};
      this.cancelReceiving = false;
      this.confirmReceiving = false;
      this.deleteCurrentOrder = true;
      this.orderId = order.id;
    },
    onAgain(order) {
      this.orderId = order.id;
      this.againByOrder(this.orderId).then(() => {
        this.$router.push('/cart');
      });
    },
    stateRefresh() {
      if (this.detail.status === 'PENDING_PAYMENT') { // 待付款
        this.$set(this.detail, 'paymentBtn', true);
        this.$set(this.detail, 'cancelBtn', true);
        this.$set(this.detail, 'deleteBtn', false);
        this.$set(this.detail, 'affirmBtn', false);
        this.$set(this.detail, 'againBtn', false);
      }
      if (this.detail.status === 'PENDING_SHIPMENT') { // 待发货
        this.$set(this.detail, 'paymentBtn', false);
        this.$set(this.detail, 'cancelBtn', false);
        this.$set(this.detail, 'deleteBtn', false);
        this.$set(this.detail, 'affirmBtn', false);
        this.$set(this.detail, 'againBtn', false);
      } else if (this.detail.status === 'PENDING_RECEIVING') { // 待收货
        this.$set(this.detail, 'paymentBtn', false);
        this.$set(this.detail, 'cancelBtn', false);
        this.$set(this.detail, 'deleteBtn', false);
        this.$set(this.detail, 'affirmBtn', true);
        this.$set(this.detail, 'againBtn', false);
      }
      if (this.detail.status === 'CANCELLED') { // 交易取消
        this.$set(this.detail, 'paymentBtn', false);
        this.$set(this.detail, 'cancelBtn', false);
        this.$set(this.detail, 'deleteBtn', true);
        this.$set(this.detail, 'affirmBtn', false);
        this.$set(this.detail, 'againBtn', false);
      }
      if (this.detail.status === 'COMPLETE') { // 交易完成
        this.$set(this.detail, 'paymentBtn', false);
        this.$set(this.detail, 'cancelBtn', false);
        this.$set(this.detail, 'deleteBtn', true);
        this.$set(this.detail, 'affirmBtn', false);
        this.$set(this.detail, 'againBtn', true);
      }
      this.detail.items.forEach((obj, key) => {
        if (this.detail.status !== 'COMPLETE') {
          if (obj.refundStatus === null && (this.detail.paymentStatus === 'PAID' || this.detail.paymentStatus === 'PARTIALLY_REFUNDED')) {
            obj.normalRefund = true;
            obj.refundProcessing = false;
            obj.refundCompleted = false;
          }
        }
        if (obj.refundStatus === 'REFUNDING') {
          obj.normalRefund = false;
          obj.refundProcessing = true;
          obj.refundCompleted = false;
        }
        if (obj.refundStatus === 'REFUNDED') {
          obj.normalRefund = false;
          obj.refundProcessing = false;
          obj.refundCompleted = true;
        }
        this.detail.items.splice(key, 1, obj);
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
.icon-wuliu {
  color: #04981c;
}
.icon-roundclose {
  font-size: 18px;
}
.wuliu__text {
  &--status {
    color: #04981c;
  }
}
.order-status {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: #264c90;
  color: #fff;
}
.address {
  background: #ffffff;
  padding: 0 15px;
}
.address-list {
  &__consignee {
    min-height: 55px;
    .list {
      min-height: 54px;
    }
  }
  &__location {
    min-width: 0;
    .icon-dingwei {
      font-size: 14px;
    }
  }
  &__content--left {
    margin-left: 10px;
    font-size: 12px;
  }
}

.items {
  background: #ffffff;
  padding: 0 15px;
  margin-top: 10px;
}
.list-item {
  padding-top: 15px;
}
.item {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__content {
    display: flex;
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
    &-image {
      height: 64px;
      width: 107px;
      display: flex;
      align-items: center;
      > img {
        height: 100%;
        width: 100%;
      }
    }
    &-attribute {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 5px;
    }
    &__actions {
      display: flex;
    }
    &__action {
      display: flex;
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
  &__action {
    &-price {
      font-size: 12px;
      color: #ff0000;
    }
    &-content {
      font-size: 12px;
    }
  }
}

.btn-navigation {
  padding: 0 15px;
  position: fixed;
  width: 100%;
  bottom: 0;
  background: #fff;
  &__items {
    display: flex;
    justify-content: flex-end;
  }
  &__item-btn {
    min-width: 54px;
  }
}
.item-refund-btn {
  display: flex;
  justify-content: flex-end;
  &__btn {
    margin-top: 10px !important;
    height: 22px !important;
    margin-left: 9px !important;
    min-width: 54px;
    &--refund {
      margin: 0 !important;
    }
  }
}
.order__message {
  display: flex;
  justify-content: center;
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
  }
}
.btn-save__item {
  position: fixed;
  bottom: 0;
  padding: 0 15px;
  width: 100%;
  left: 0px;
}

.order-information {
  color: #666666;
  background: #fff;
  font-size: 12px;
  height: 74px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-bottom: 38px;
  padding: 0 15px;
  margin-top: 10px;
}
</style>
