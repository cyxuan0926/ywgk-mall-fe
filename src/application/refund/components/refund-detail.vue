<template>
  <div class="order-refund">
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
              <span class="header-title">退款详情</span>
              <v-spacer/>
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
              <span>{{ refundDetailData.status | refundState }}</span>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="refundApplicationSuccessful"
        row>
        <v-flex
          xs12>
          <div class="refund-dispose">
            <div class="refund-dispose__title">
              <span>
                你已成功发起退款申请,请耐心等待商家处理
              </span>
            </div>
            <div class="refund-dispose__item">
              <ul>
                <li>
                  商家同意后,请按照给出的退货地址退货,并请记录退货运单号.
                </li>
                <li>
                  如商家拒绝,您可以修改申请后再次发起,商家会重新处理。
                </li>
                <li>
                  如商家超时未处理,退货申请将达成,请按照系统给出的地址进行退货
                </li>
              </ul>
            </div>
            <div class="refund-dispose__btn">
              <v-btn
                @click="onWithdrawRefund()"
                class="btn__item--btn"
                round
                outline
                color="blue accent-4"
                small>撤销申请</v-btn>
              <v-btn
                @click="onAmendApplication()"
                class="btn__item--btn"
                round
                outline
                color="blue accent-4"
                small>修改申请</v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="refundLogistics"
        row>
        <v-flex
          xs12>
          <div class="refund-dispose">
            <div class="refund-dispose__title">
              <span>
                商家已同意申请,请在规定时间内寄出退货商品
              </span>
            </div>
            <div class="refund-dispose__item refund-dispose__item--padding">
              <dl>
                <dt>
                  退货地址:<span>{{ refundDetailData.returnAddress }}</span>
                </dt>
              </dl>
            </div>
            <div class="refund-dispose__btn">
              <v-btn
                @click="onWithdrawRefund()"
                class="btn__item--btn"
                round
                outline
                color="blue accent-4"
                small>撤销申请</v-btn>
              <v-btn
                @click="onFillLogistics()"
                class="btn__item--btn"
                round
                outline
                color="blue accent-4"
                small>我已寄出</v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="refundSuccessOrwaiting"
        row>
        <v-flex
          xs12>
          <div class="refund-dispose">
            <div class="refund-dispose__title refund-dispose__title--sum">
              <span>
                退回总金额
              </span>
              <span>
                ￥{{ refundDetailData.refundAmount }}
              </span>
            </div>
            <div class="refund-dispose__title--sum">
              <span>
                退回支付方式
              </span>
              <span>
                ￥{{ refundDetailData.paymentMethod |payMethod }}
              </span>
            </div>
            <div class="refund-dispose__btn">
              <v-btn
                v-if="withdrawBtn"
                @click="onWithdrawRefund()"
                class="btn__item--btn"
                round
                outline
                color="blue accent-4"
                small>撤销申请</v-btn>
              <v-btn
                v-if="AmendApplicationBtn"
                @click="onAmendApplication()"
                class="btn__item--btn"
                round
                outline
                color="blue accent-4"
                small>修改申请</v-btn>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        v-if="refundDown"
        row>
        <v-flex
          xs12>
          <div class="refund-dispose">
            <div class="refund-dispose__title--sum">
              <span>
                因你撤销退款申请,退款已关闭,交易将正常进行
              </span>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="regund-information">
            <template v-for="item in refundDetailData.items">
              <div
                :key="item.orderItemId"
                class="regund-information__title ">
                <span>退款信息</span>
              </div>
              <div
                :key="item.orderItemId+'1'"
                class="regund-information__content">
                <div class="item-content">
                  <div class="item-content__image">
                    <img
                      :src="item.product.thumb">
                  </div>
                  <div class="item-content__text">
                    <span>{{ item.product.name }}</span>
                    <div
                      class="item-content__specification">
                      规格:
                      <span
                        v-for="(attributes,index) in item.product.attributes"
                        :key="index+'attributes'">
                        <span>
                          {{ attributes.value }}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                :key="item.orderItemId+'2'"
                class="regund-information__detail">
                <span>退款原因:{{ refundDetailData.refundReason |refundReason }}</span>
                <span>退款金额:{{ refundDetailData.refundAmount |money }}</span>
                <span>申请时间:{{ refundDetailData.createdTime |moment }}</span>
                <span>退款编号:{{ refundDetailData.number }}</span>
              </div>
            </template>
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
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  data() {
    return {
      dialogMessage: false,
      textMessage: '',
      refundDown: false,
      refundSuccessOrwaiting: false,
      refundLogistics: false,
      refundApplicationSuccessful: false,
      withdrawBtn: false,
      AmendApplicationBtn: false,
      confirmOptions: {}
    };
  },

  computed: {
    ...mapState({
      refundDetailData: state => state.refund.refundDetail,
      orderItemId: state => state.refund.orderItemId,
      refundOrderId: state => state.refund.refundOrderId,
      refundId: state => state.refund.refundId
    })
  },
  created() {
    if (this.refundId !== null) {
      this.refundDetail(this.refundId).then(() => {
        this.setClearReundId(null);
        this.refundDetailStatus();
      });
    } else {
      this.getRefundStatus({ orderId: this.refundOrderId, itemId: this.orderItemId }).then(() => {
        this.refundDetailStatus();
      });
    }
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['refundDetail', 'withdrawRefund', 'getRefundStatus']),
    ...mapMutations(['setClearReundId']),
    onBack() {
      this.$router.push(`/order/detail/${this.refundOrderId}`);
    },
    onConfirm() {
      this.withdrawRefund(this.refundDetailData.id).then(() => {
        this.dialogMessage = false;
        this.$router.push(`/order/detail/${this.refundOrderId}`);
      });
    },
    onWithdrawRefund() {
      this.$refs.myConfirm.showModel();
      this.confirmOptions = {textMessage: '您确定取消?'};
    },
    onAmendApplication() {
      this.$router.push(`/refund/edit/${this.refundDetailData.id}`);
    },
    onFillLogistics() {
      this.$router.push(`/logistics/${this.refundDetailData.id}`);
    },
    refundDetailStatus() {
      if (this.refundDetailData.status === 'PENDING') { // 待处理
        this.refundDown = false;
        this.refundSuccessOrwaiting = false;
        this.refundLogistics = false;
        this.refundApplicationSuccessful = true;
      }
      if (this.refundDetailData.status === 'PENDING_SHIPMENT') { // 等待买家退货
        this.refundDown = false;
        this.refundSuccessOrwaiting = false;
        this.refundLogistics = true;
        this.refundApplicationSuccessful = false;
      }
      if (this.refundDetailData.status === 'PENDING_RECEIVING') { // 等待商家收货
        this.refundDown = false;
        this.refundSuccessOrwaiting = true;
        this.refundLogistics = false;
        this.refundApplicationSuccessful = false;
        this.withdrawBtn = true;
      }
      if (this.refundDetailData.status === 'COMPLETE') { // 退款完成
        this.refundDown = false;
        this.refundSuccessOrwaiting = true;
        this.refundLogistics = false;
        this.refundApplicationSuccessful = false;
      }
      if (this.refundDetailData.status === 'CANCELLED') { // 退款取消
        this.refundDown = true;
        this.refundSuccessOrwaiting = false;
        this.refundLogistics = false;
        this.refundApplicationSuccessful = false;
      }
      if (this.refundDetailData.status === 'REJECTED') { // 退款拒绝
        this.refundDown = false;
        this.refundSuccessOrwaiting = true;
        this.refundLogistics = false;
        this.refundApplicationSuccessful = false;
        this.AmendApplicationBtn = true;
        this.withdrawBtn = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.order-status {
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  background: #264c90;
  color: #fff;
}
.refund-dispose {
  padding: 0 15px;
  background: #fff;
  &__title {
    height: 38px;
    font-size: 13px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 13px;
  }
  &__item {
    font-size: 12px;
    padding: 0 18px;
  }
}
.refund-dispose__item--padding {
  padding: 0;
}
.refund-dispose__btn {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.regund-information {
  margin-top: 10px;
  flex-direction: column;
  background: #fff;
}
.regund-information__title {
  padding-left: 15px;
  padding-top: 15px;
}
.refund-dispose__title--sum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;
  height: 41px;
}
.regund-information__content {
  height: 84px;
  display: flex;
  align-items: center;
  background: #ebebeb;
  margin-top: 15px;
}
.item-content {
  padding-left: 15px;
  display: flex;
  &__image {
    width: 107px;
    height: 64px;
    > img {
      width: 100%;
      max-height: 64px;
    }
  }
  &__text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 15px;
  }
}
.regund-information__detail {
  display: flex;
  flex-direction: column;
  font-size: 12px;
  color: #999999;
  padding-left: 15px;
  margin-top: 15px;
  > span {
    margin-bottom: 10px;
  }
}
</style>
