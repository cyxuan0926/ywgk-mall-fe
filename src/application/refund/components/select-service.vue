<template>
  <div class="order-select-service">
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
              <span class="header-title">选择服务类型</span>
              <v-spacer/>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="product-information">
            <div class="product-information__image">
              <img :src="refundItem.productThumb">
            </div>
            <div class="product-information__text">
              <span class="product-information__text-name">{{ refundItem.productName }}</span>
              <span class="product-information__text-specification">
                规格:
                <template v-for="(item,index) in refundItem.productAttributes">
                  <span :key="index">
                    {{ item.value }}
                  </span>
                </template>
              </span>
            </div>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        wrap
        row>
        <v-flex
          xs12>
          <div class="status-cause">
            <div
              class="status-cause__action">
              <v-list>
                <v-list-tile
                  @click="onSelectRefund(0)">
                  <v-list-tile-content class="status-cause__action-content">
                    <div class="status-cause__only-refund">
                      <span class="status-cause__title">
                        仅退款
                      </span>
                      <span class="status-cause__hint">
                        未收到货(包含未签收)，或卖家协商同意前提下
                      </span>
                    </div>
                  </v-list-tile-content>
                  <v-list-tile-action class="status-cause__action-enter">
                    <i class="iconfont icon-enter"/>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
            <div
              class="status-cause__action">
              <v-list>
                <v-list-tile
                  @click="onSelectRefund(1)">
                  <v-list-tile-content class="status-causere__action-content">
                    <div class="status-cause__refund-product">
                      <span class="status-causere__title">
                        退货退款
                      </span>
                      <span class="status-causere__hint">
                        已收到货，需要退换已收到的货物
                      </span>
                    </div>
                  </v-list-tile-content>
                  <v-list-tile-action class="status-causere__action-enter">
                    <i class="iconfont icon-enter"/>
                  </v-list-tile-action>
                </v-list-tile>
              </v-list>
            </div>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {

    };
  },

  computed: {
    ...mapState({
      refundItem: state => state.refund.refundItem,
      refundOrderId: state => state.refund.refundOrderId

    })
  },
  created() {
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapMutations(['setSelectRefundWay']),
    onBack() {
      this.$router.push(`/order/detail/${this.refundOrderId}`);
    },
    onSelectRefund(value) {
      console.log(value);
      this.setSelectRefundWay(value);
      this.$router.push(`/refund`);
    }
  }
};

</script>

<style lang="scss" scoped>
.product-information {
  height: 62px;
  display: flex;
  align-items: center;
  padding-left: 15px;
  &__image {
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    > img {
      max-height: 50px;
      width: 100%;
    }
  }
  &__text {
    height: 50px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
  }
}
.status-cause {
  background: #ffffff;
  padding: 0 15px;
  .list {
    padding: 0;
    height: 58px;
  }
  &__action {
    border-bottom: 1px solid #e5e5e5;
  }
  &-content {
    font-size: 12px;
  }
  &-enter {
    flex-direction: row;
    align-items: center;
    color: #666666;
    font-size: 12px;
    min-width: auto;
    .icon-enter {
      font-size: 16px;
    }
  }
  &__only-refund {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    &__title {
      font-size: 13px;
    }
    &__hint {
      font-size: 12px;
      color: #999999;
    }
  }
  &__refund-product {
    display: flex;
    flex-direction: column;
    font-size: 12px;
    &__title {
      font-size: 13px;
    }
    &__hint {
      font-size: 12px;
      color: #999999;
    }
  }
}
</style>
