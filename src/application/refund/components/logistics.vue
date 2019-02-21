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
              <span class="header-title">填写物流</span>
              <v-spacer/>
            </v-toolbar>
          </div>
        </v-flex>
      </v-layout>
      <v-layout
        row>
        <v-flex
          xs12>
          <v-layout
            row>
            <v-flex
              xs12>
              <div class="logistics">
                <div class="logistics__title">
                  <span
                    class="logistics__title--name">
                    物流公司:
                  </span>
                  <v-text-field
                    v-model="logisticsCompany"/>
                </div>
                <div class="logistics__title">
                  <span
                    class="logistics__title--number">
                    物流单号:
                  </span>
                  <v-text-field
                    v-model="logisticsNumber"
                    single-line/>
                </div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            row>
            <v-flex
              xs12>
              <div class="phone">
                <div class="phone__title">
                  <span
                    class="phone__title--name">
                    联系电话:
                  </span>
                  <v-text-field
                    v-model="phoneNumber"
                    single-line/>
                </div>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            row>
            <v-flex
              xs12>
              <div class="return-instructions">
                <div class="return-instructions__title">
                  <span
                    class="return-instructions__title--name">
                    退货说明:
                  </span>
                  <v-text-field
                    v-model="returnDescription"
                    single-line/>
                </div>
              </div>
            </v-flex>
          </v-layout>
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
              @click="onSave()"
              dark>保存</v-btn>
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
      logisticsCompany: '',
      logisticsNumber: '',
      phoneNumber: '',
      returnDescription: ''
    };
  },

  computed: {
    ...mapState({
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
    ...mapActions(['fillLogistics']),
    ...mapMutations([]),
    onBack() {
      this.$router.push(`/order/detail/${this.refundOrderId}`);
    },
    onSave() {
      if (this.logisticsCompany === '') {
        this.$chip({
          chipOptions: '物流公司不能为空'
        });
        return;
      }
      if (this.logisticsNumber === '') {
        this.$chip({
          chipOptions: '物流单号不能为空'
        });
        return;
      }
      if (this.phoneNumber === '') {
        this.$chip({
          chipOptions: '电话不能为空'
        });
        return;
      }
      if (this.$validators.phoneNumber(this.phoneNumber, this.$chip)) {
        this.fillLogistics({
          logisticsId: this.$route.params.id,
          logisticsParams: {
            company: this.logisticsCompany,
            number: this.logisticsNumber,
            phoneNumber: this.phoneNumber,
            returnDescription: this.returnDescription
          }
        }).then(() => {
          this.$router.push(`/order/detail/${this.refundOrderId}`);
        });
      }
    }
  }
};

</script>

<style lang="scss" scoped>
.input-group {
  border-bottom: 1px solid;
  padding: 0;
}
.primary--text {
  color: #e5e5e5 !important;
}
.logistics {
  padding: 0 15px;
  background: #fff;
  &__title {
    height: 38px;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
}
.phone {
  padding: 0 15px;
  background: #fff;
  margin-top: 10px;
  &__title {
    height: 38px;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
}
.return-instructions {
  padding: 0 15px;
  background: #fff;
  margin-top: 10px;
  &__title {
    height: 38px;
    font-size: 13px;
    display: flex;
    align-items: center;
  }
}
.btn-save {
  position: fixed;
  width: 100%;
  bottom: 0;
  display: block;
  left: 0;
  &__item {
    padding: 0 15px;
  }
}
</style>
