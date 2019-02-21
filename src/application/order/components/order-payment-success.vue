<template>
  <div class="order-payment-success">
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
              class="header__toolbar">
              <i
                @click="onBack()"
                class="iconfont icon-return"/>
              <v-spacer/>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <div class="pay">
            <div class="pay__state">
              <div class="pay__state-success">
                <i class="iconfont icon-yuanxingxuanzhong"/>支付成功
              </div>
              <div class="pay__state-price">
                实付：{{ totalPrices |money }}
              </div>
            </div>
            <div class="pay__btn">
              <v-btn
                @click="onHome()"
                round
                outline
                small>返回首页</v-btn>
              <v-btn
                @click="onDetail()"
                round
                outline
                small>查看订单</v-btn>
            </div>
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
    };
  },

  computed: {
    ...mapState({
      totalPrices: state => state.order.totalPrices,
      orderId: state => state.order.orderId

    })
  },
  created() {
    let that = this;
    window.JSMobilePhoneBack = function() {
      that.onBack();
    };
  },
  methods: {
    ...mapActions(['']),
    ...mapMutations(['']),
    onBack() {
      this.$router.push('/home');
    },
    onHome() {
      this.$router.push('/home');
    },
    onDetail() {
      this.$router.push(`/order/detail/${this.orderId}`);
    }
  }
};

</script>

<style lang="scss" scoped>
.icon-return {
  color: #ffffff;
}
.icon-yuanxingxuanzhong {
  color: #ffffff;
  font-size: 25px;
}
.pay__state {
  display: flex;
  flex-direction: column;
  align-items: center;
  &-success {
    font-size: 25px;
    color: #ffffff;
  }
  &-price {
    color: #ffffff;
  }
}

.header__toolbar {
  background: #6085c5;
}
.pay {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 124px;
  background: #6085c5;
}
</style>
